import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import styles from './table.module.css';

type TableWidgetProps = {
  headings: string[];
  data: { [key: string]: any }[];
};

const TableWidget: React.FC<TableWidgetProps> = ({ headings, data }) => {

  const getTextColor = (text: string) => {
    switch (text) {
      case 'Good':
        return '#28A745';
      case 'Bad':
        return '#B22222';
      case 'Repair':
        return '#FFA500';
      default:
        return '#212a31';
    }
  };

  return (
    <div className={styles.contentBox}>
      <div className={`row ${styles.tableHeading}`}>
        {headings.map((heading, index) => (
          <div key={index} className={`col-xl col-lg-2  col-sm-3  col-3 ${index === 0 || index === headings.length - 1 ? '1' : ''}`}>
            {heading}
          </div>
        ))}
      </div>

      {data.map((row, rowIndex) => (
        <div key={rowIndex} className={`row ${styles.tableContent}`}>
          {headings.map((heading, colIndex) => (
            <div
              key={colIndex}
              className={`col-xl col-lg-2 col-sm-3 col-3 ${colIndex === 0 || colIndex === headings.length - 1 ? '1' : ''}`}
              style={heading === 'Condition' ? { color: getTextColor(row[heading.toLowerCase()]) } : {}}
            >
              {heading === 'Count' ? (
                <div className={styles.qty}>
                  <i className="fi fi-sr-pen-field"></i>
                  <span>{rowIndex + 1}</span>
                </div>
              ) : (
                row[heading.toLowerCase()] || 'N/A'
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableWidget;
