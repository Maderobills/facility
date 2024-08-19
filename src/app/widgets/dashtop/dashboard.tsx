import React from "react";
import styles from "./dash.module.css";
import PillButton from "../components/pillbtn/pillbtn";
import Doughnut3DChart from "../components/chart/donut/donut";
import Button from "../components/btn/btn";

interface DashboardWidgetProps {
  titleIconClass: string;
  title: string;
  filterButtons: string[];
  filterButtonsOnClick: (filter: string) => void;
  itemCounts: { label: string; count: number }[];
  onSearchInputChange: (input: string) => void;
  tableHeadings: string[];
  tableData: any[];
  onExcelClick: () => void;
  onReportClick: () => void;
  onPrintPdfClick: () => void;
}

const DashboardWidget: React.FC<DashboardWidgetProps> = ({
  titleIconClass,
  title,
  filterButtons,
  filterButtonsOnClick,
  itemCounts,
  onSearchInputChange,
  tableHeadings,
  tableData,
  onExcelClick,
  onReportClick,
  onPrintPdfClick,
}) => {
  const handlePillButtonClick = (filter: string) => {
    filterButtonsOnClick(filter);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchInputChange(event.target.value);
  };

  const chartData = itemCounts
    .filter((item) => item.label !== "Total")
    .map((item) => ({
      name: item.label,
      y: item.count,
    }));

  return (
    <div className={styles.dashboard}>
      <div className="row">
        <div className="col-xxl-8 col-xl-8 col-lg-7 col-md-5 col-sm-7 col-7 row">
          <div className="col-12">
            <div className={styles.dashTop}>
            <div className={styles.title}>
              {titleIconClass && <i className={titleIconClass}></i>}
              <h2>{title}</h2>
            </div>
            <div className={styles.actionIcons}>
              <i onClick={onExcelClick} className="fi fi-sr-file-excel"></i>
              <i onClick={onReportClick}  className="fi fi-sr-file-word"></i>
              <i onClick={onPrintPdfClick}  className="fi fi-sr-file-pdf"></i>
            </div>
            </div>
          </div>
          <div className={styles.filter}>
            <div className=" col-sm-12 col-12">
              <span className={styles.note}>Filter search to view</span>
              <div className="row">
                <div className="col-xl-4 col-lg-5 col-sm-12 col-12">
                  <div className={styles.group}>
                    <div className={styles.icon}>
                      <i className="fi fi-tr-search-alt"></i>
                    </div>
                    <input
                      className={styles.inputStyle}
                      type="text"
                      placeholder="Type to search"
                      id="searchFilter"
                      name="search"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-xl-8 col-lg-7 col-sm-12 col-12">
                  {filterButtons.map((pillText, index) => (
                    <PillButton
                      key={index}
                      text={pillText}
                      onClick={() => handlePillButtonClick(pillText)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="col-12 my-2">
              <div className={styles.itemCounter}>
                {itemCounts.map((item, index) => (
                  <span key={index}>
                    {item.label}: {item.count}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={`col-xxl-4 col-xl-4 col-lg-5 col-md-7 col-sm-5 col row ${styles.dashRight}`}
        >
          <div
            className={`col-xl-8 col-lg-7 col-md-8 col-sm-12 col ${styles.chart}`}
          >
            <Doughnut3DChart data={chartData} />
          </div>
          <div className={`col-xl-4 col-lg-5 col-md-4 ${styles.export}`}>
            <div className={styles.btnActionGroup}>
              <Button
                text="Excel"
                onClick={onExcelClick}
                icon="fi fi-sr-file-excel"
                variant="secondary"
              />
              <Button
                text="Report"
                onClick={onReportClick}
                icon="fi fi-sr-file-word"
                variant="secondary"
              />
              <Button
                text="Print PDF"
                onClick={onPrintPdfClick}
                icon="fi fi-sr-file-pdf"
                variant="secondary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWidget;
