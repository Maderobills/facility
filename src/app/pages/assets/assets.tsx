import React, { useState } from "react";
import styles from "./assets.module.css";
import DashboardWidget from "@/app/widgets/dashtop/dashboard";
import TableWidget from "@/app/widgets/table/table";

// Define the props for the Assets component
interface AssetsProps {
  dashboardTitle: string;
  dashboardIconClass: string;
}

const Assets: React.FC<AssetsProps> = ({ dashboardTitle, dashboardIconClass }) => {
  const [searchValue, setSearchValue] = useState('');

  const tableHeadings = [
    "Count",
    "Item",
    "Brand",
    "Location",
    "Model No.",
    "Serial No.",
    "Tag",
    "Condition",
  ];

  const tableData = [
    {
      item: "Projector",
      brand: "Dell",
      location: "Library",
      modelNo: "1210s",
      serialNo: "001515050",
      tag: "DUC/LTC/PRO/10",
      condition: "Good",
    },
    {
      item: "Laptop",
      brand: "HP",
      location: "Office",
      modelNo: "Pavilion",
      serialNo: "002345678",
      tag: "DUC/OFC/LPT/22",
      condition: "Repair",
    },
    {
      item: "Monitor",
      brand: "Samsung",
      location: "Conference Room",
      modelNo: "S24F350",
      serialNo: "004567890",
      tag: "DUC/CNF/MON/15",
      condition: "Bad",
    },
    {
      item: "Projector",
      brand: "Epson",
      location: "Classroom",
      modelNo: "EB-S41",
      serialNo: "005678912",
      tag: "DUC/CLS/PRO/11",
      condition: "Good",
    },
    {
      item: "Keyboard",
      brand: "Logitech",
      location: "Office",
      modelNo: "K120",
      serialNo: "006789123",
      tag: "DUC/OFC/KBD/03",
      condition: "Good",
    },
    {
      item: "Mouse",
      brand: "Dell",
      location: "Library",
      modelNo: "WM126",
      serialNo: "007890234",
      tag: "DUC/LIB/MS/06",
      condition: "Good",
    },
    {
      item: "Printer",
      brand: "HP",
      location: "Reception",
      modelNo: "LaserJet Pro",
      serialNo: "008901345",
      tag: "DUC/REC/PRNT/09",
      condition: "Good",
    },
  ];

  // Filter table data based on search value
  const filteredData = tableData.filter((row) =>
    Object.values(row).some((value) =>
      value.toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  // Calculate counts based on conditions
  const countByCondition = filteredData.reduce((acc: { [key: string]: number }, curr) => {
    const condition = curr.condition || 'Unknown';
    acc[condition] = (acc[condition] || 0) + 1;
    return acc;
  }, {});

  // Define filter buttons (optional)
  const filterButtons = ["All", "Good", "Repair", "Bad"];

  // Define item counts for the DashboardWidget
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
        itemCounts={itemCounts}
        onSearchInputChange={handleSearchInputChange} // Pass the search handler
      />
      <TableWidget headings={tableHeadings} data={filteredData} />
    </div>
  );
};

export default Assets;
