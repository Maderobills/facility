import React, { useEffect, useState } from "react";
import styles from "./assets.module.css";
import DashboardWidget from "@/app/widgets/dashtop/dashboard";
import TableWidget from "@/app/widgets/table/table";
import LinearLoader from "@/app/widgets/components/loader/linear";
import { db } from "../../firebase/sync";
import { collection, getDocs } from "firebase/firestore";
import * as XLSX from "xlsx";


interface Asset {
  
  count: number;
  item: string;
  brand: string;
  location: string;
  model: string;
  serial: string;
  tag: string;
  condition: string;
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

  const handleSearchInputChange = (input: string) => {
    setSearchValue(input);
  };

  const handleExcelClick = () => {
  try {
    // Define the desired order of columns
    const orderedData = filteredData.map(asset => ({
      Count: asset.count,
      Item: asset.item,
      Brand: asset.brand,
      Location: asset.location,
      Model: asset.model,
      Serial: asset.serial,
      Tag: asset.tag,
      Condition: asset.condition,
    }));

    // Create a worksheet from the ordered data
    const worksheet = XLSX.utils.json_to_sheet(orderedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Assets");

    // Add table headings
    XLSX.utils.sheet_add_aoa(worksheet, [
      ["Count", "Item", "Brand", "Location", "Model", "Serial", "Tag", "Condition"],
    ], { origin: "A1" });

    // Write the workbook to an Excel file
    XLSX.writeFile(workbook, "Assets_Data.xlsx");
    console.log("Data exported to Excel successfully");
  } catch (error) {
    console.error("Error exporting data to Excel:", error);
  }
};

  const handleReportClick = () => {
    // Logic to generate or download report
    console.log("Generate Report");
  };

  const handlePrintPdfClick = () => {
    // Logic to print or download as PDF
    console.log("Print PDF");
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

  return (
    <div className={styles.assetsPage}>
      <DashboardWidget
        titleIconClass={dashboardIconClass}
        title={dashboardTitle}
        filterButtons={filterButtons}
        filterButtonsOnClick={handleFilterButton}
        itemCounts={itemCounts}
        onSearchInputChange={handleSearchInputChange}
        tableHeadings={tableHeadings}
        tableData={filteredData}
        onExcelClick={handleExcelClick}
        onReportClick={handleReportClick}
        onPrintPdfClick={handlePrintPdfClick}
      />
      <TableWidget headings={tableHeadings} data={filteredData} />
    </div>
  );
};

export default Assets;
