import React, { useEffect, useState } from "react";
import styles from "./assets.module.css";
import DashboardWidget from "@/app/widgets/dashtop/dashboard";
import TableWidget from "@/app/widgets/table/table";
import LinearLoader from "@/app/widgets/components/loader/linear";
import { db } from "../../firebase/sync";
import { collection, getDocs } from "firebase/firestore";

interface Asset {
  condition: string;
  count: number;
  Item: string;
  Brand: string;
  Location: string;
  Model: string;
  serial: string;
  Tag: string;
  Condition: string;
}

interface AssetsProps {
  dashboardTitle: string;
  dashboardIconClass: string;
}

const Assets: React.FC<AssetsProps> = ({ dashboardTitle, dashboardIconClass }) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [tableData, setTableData] = useState<Asset[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const tableHeadings = [
    "Count",
    "Item",
    "Brand",
    "Location",
    "Model",
    "Serial",
    "Tag",
    "Condition",
  ];

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        setLoading(true);
        
        const querySnapshot = await getDocs(collection(db, "Assets"));
        const data: Asset[] = querySnapshot.docs.map(doc => {
          const assetData = doc.data() as Asset;
          console.log("Fetched asset data:", assetData); 
          return {
            id: doc.id,
            ...assetData
          };
        });
        setTableData(data);
      } catch (error) {
        console.error("Error fetching table data: ", error);
        setError("Error fetching table data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTableData();
  }, []);

  const handleFilterButton = (filter: string) => {
    setActiveFilter(filter);
  };

  if (loading) {
    return <LinearLoader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const filteredData = tableData.filter(row => {
    const matchesSearch = Object.values(row).some(value =>
      typeof value === 'string' && value.toLowerCase().includes(searchValue.toLowerCase())
    );
    const matchesFilter =
      activeFilter === "All" || row.condition.toLowerCase() === activeFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const countByCondition = filteredData.reduce((acc: Record<string, number>, curr) => {
    const condition = curr.condition || 'Unknown';
    acc[condition] = (acc[condition] || 0) + 1;
    return acc;
  }, {});

  const filterButtons = ["All", "Good", "Repair", "Bad"];

  const itemCounts = [
    { label: "Total", count: filteredData.length },
    { label: "Good", count: countByCondition["Good"] || 0 },
    { label: "Repair", count: countByCondition["Repair"] || 0 },
    { label: "Bad", count: countByCondition["Bad"] || 0 },
  ];

  const handleSearchInputChange = (input: string) => {
    setSearchValue(input);
  };

  return (
    <div className={styles.assetsPage}>
      <DashboardWidget
        titleIconClass={dashboardIconClass}
        title={dashboardTitle}
        filterButtons={filterButtons}
        filterButtonsOnClick={handleFilterButton}
        itemCounts={itemCounts}
        onSearchInputChange={handleSearchInputChange}
      />
      <TableWidget headings={tableHeadings} data={filteredData} />
    </div>
  );
};

export default Assets;
