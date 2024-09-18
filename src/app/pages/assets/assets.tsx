import React, { useEffect, useState } from 'react';
import styles from './assets.module.css';
import DashboardWidget from '@/app/widgets/dashtop/dashboard';
import TableWidget from '@/app/widgets/table/table';
import LinearLoader from '@/app/widgets/components/loader/linear';
import { db } from '../../firebase/sync';
import { collection, getDocs } from 'firebase/firestore';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AlignmentType, Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

const apiKey = process.env.NEXT_PUBLIC_API_KEY ?? '';
const genAI = new GoogleGenerativeAI(apiKey);


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
  dashboardTitle?: string;
  dashboardIconClass?: string;
}


const Assets: React.FC<AssetsProps> = ({ dashboardTitle, dashboardIconClass }) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [tableData, setTableData] = useState<Asset[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const tableHeadings = [
    'Count',
    'Item',
    'Brand',
    'Location',
    'Model',
    'Serial',
    'Tag',
    'Condition',
  ];

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'Assets'));
        const data: Asset[] = querySnapshot.docs.map(doc => {
          const assetData = doc.data() as Asset;
          return {
            id: doc.id,
            ...assetData,
          };
        });
        setTableData(data);
      } catch (error) {
        console.error('Error fetching table data:', error);
        setError('Error fetching table data.');
      } finally {
        setLoading(false);
      }
    };

    fetchTableData();
  }, []);


const handleReportClick = async () => {
  try {
    // Format the table data into a readable string
    const formattedTableData = filteredData.map(item => `
      Item: ${item.item}
      Brand: ${item.brand}
      Location: ${item.location}
      Condition: ${item.condition}
    `).join('\n');

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Create a prompt for the report
    const prompt = `As a facility manager, write a text-based report based on the following asset information:\n${formattedTableData}`;

    // Generate content using the model
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = await response.text();

    text = text.replace(/\*{1}/g, '');
    text = text.replace(/\*{2}/g, '');
    text = text.replace(/\*{3}/g, '');
    text = text.replace(/\*{4}/g, '');
    text = text.replace(/\*{5}/g, '');
    text = text.replace(/\#{1}/g, '');
    text = text.replace(/\#{2}/g, '');

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              alignment: AlignmentType.LEFT,
              children: [
                new TextRun({
                  text: 'Facility Manager Report',
                  bold: true,
                  size: 24,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.LEFT,
              children: [
                new TextRun({
                  text: 'Date: ',
                  bold: true,
                  size: 24,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: '\n\n' + text,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Thank you for reviewing the report.',
                  italics: true,
                }),
              ],
            }),
          ],
        },
      ],
    });

    // Convert the document to a blob and save it
    const blob = await Packer.toBlob(doc);
    saveAs(blob, 'Facility_Manager_Report.docx');

    console.log('Report exported to Word successfully');

  } catch (error) {
    console.error('Error generating report:', error);
  }
};

  

  const handleFilterButton = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleSearchInputChange = (input: string) => {
    setSearchValue(input);
  };

  const handleExcelClick = () => {
    try {
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

      const worksheet = XLSX.utils.json_to_sheet(orderedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Assets');
      XLSX.utils.sheet_add_aoa(worksheet, [
        ['Count', 'Item', 'Brand', 'Location', 'Model', 'Serial', 'Tag', 'Condition'],
      ], { origin: 'A1' });

      XLSX.writeFile(workbook, 'Assets_Data.xlsx');
      console.log('Data exported to Excel successfully');
    } catch (error) {
      console.error('Error exporting data to Excel:', error);
    }
  };

  const handlePrintPdfClick = () => {
    try {
      const doc = new jsPDF();
      doc.text('Assets PDF', 14, 20);
      const tableColumnHeaders = [
        'Item',
        'Brand',
        'Location',
        'Model',
        'Serial',
        'Tag',
        'Condition',
      ];

      const tableRows = filteredData.map(asset => [
        asset.item,
        asset.brand,
        asset.location,
        asset.model,
        asset.serial,
        asset.tag,
        asset.condition,
      ]);

      autoTable(doc, {
        head: [tableColumnHeaders],
        body: tableRows,
        startY: 30,
        theme: 'striped',
        margin: { top: 20 },
      });

      doc.save('Assets_Report.pdf');
      console.log('PDF generated and downloaded successfully');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
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
      activeFilter === 'All' || row.condition.toLowerCase() === activeFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const countByCondition = filteredData.reduce((acc: Record<string, number>, curr) => {
    const condition = curr.condition || 'Unknown';
    acc[condition] = (acc[condition] || 0) + 1;
    return acc;
  }, {});

  const filterButtons = ['All', 'Good', 'Repair', 'Bad'];

  const itemCounts = [
    { label: 'Total', count: filteredData.length },
    { label: 'Good', count: countByCondition['Good'] || 0 },
    { label: 'Repair', count: countByCondition['Repair'] || 0 },
    { label: 'Bad', count: countByCondition['Bad'] || 0 },
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