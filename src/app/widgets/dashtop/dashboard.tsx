import React from "react";
import styles from "./dash.module.css";
import Button from "../components/btn/btn";
import PillButton from "../components/pillbtn/pillbtn";
import Doughnut3DChart from "../components/chart/donut/donut";

type TitleWidgetProps = {
  iconClass?: string;
  title: string;
};

type ItemCounterProps = {
  total: number;
  items: { label: string; count: number }[];
};

type DashboardWidgetProps = {
  titleIconClass: string;
  title: string;
  filterButtons: string[];
  itemCounts: { label: string; count: number }[];
  onSearchInputChange: (input: string) => void;
};

// TitleWidget Component
const TitleWidget: React.FC<TitleWidgetProps> = ({ iconClass, title }) => {
  return (
    <div className={styles.title}>
      {iconClass && <i className={iconClass}></i>}
      <h2>{title}</h2>
    </div>
  );
};

// ItemCounter Component
const ItemCounter: React.FC<ItemCounterProps> = ({ items }) => {
  return (
    <div className={styles.itemCounter}>
      {items.map((item, index) => (
        <span key={index}>
          {item.label}: {item.count}
        </span>
      ))}
    </div>
  );
};

const DashboardWidget: React.FC<DashboardWidgetProps> = ({
  titleIconClass,
  title,
  filterButtons,
  itemCounts,
  onSearchInputChange,
}) => {
  const handlePillButtonClick = (text: string) => {
    console.log(`${text} button clicked`);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchInputChange(event.target.value);
  };

  // Transform itemCounts into the format required for the chart, excluding "Total"
  const chartData = itemCounts
    .filter(item => item.label !== "Total") // Exclude items with label "Total"
    .map(item => ({
      name: item.label,
      y: item.count,
    }));

  return (
    <div className={styles.dashboard}>
      <div className="row">
        <div className="col-8">
          <div className="col-12">
            <TitleWidget iconClass={titleIconClass} title={title} />
          </div>
          <div className="col-12 px-4 my-2">
            <span className={styles.note}>Filter search to view</span>
            <div className="row">
              <div className="col">
                <div className={styles.group}>
                  <div className={styles.icon}>
                    <i className="fi fi-tr-search-alt"></i>
                  </div>
                  <input
                    className={styles.inputStyle}
                    type="text"
                    placeholder="Type to search"
                    id="search"
                    name="search"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col">
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
          <div className="col-12 px-4 my-4">
            <ItemCounter items={itemCounts} total={0} />
          </div>
        </div>
        <div className={`col ${styles.chart}`}>
          
          <Doughnut3DChart data={chartData} />
        </div>
        <div className="col-2">
          <div className={styles.btnActionGroup}>
            <Button
              text="Excel"
              onClick={() => {}}
              icon="fi fi-sr-file-excel"
              variant="secondary"
            />
            <Button
              text="Report"
              onClick={() => {}}
              icon="fi fi-sr-file-excel"
              variant="secondary"
            />
            <Button
              text="Print PDF"
              onClick={() => {}}
              icon="fi fi-sr-file-excel"
              variant="secondary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWidget;
