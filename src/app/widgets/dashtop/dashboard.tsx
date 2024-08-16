import React from "react";
import styles from "./dash.module.css";
import Button from "../components/btn/btn";
import PillButton from "../components/pillbtn/pillbtn";

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
  onSearchInputChange: (input: string) => void; // Add this prop
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
const ItemCounter: React.FC<ItemCounterProps> = ({ total, items }) => {
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
  onSearchInputChange, // Use the prop
}) => {
  const handlePillButtonClick = (text: string) => {
    console.log(`${text} button clicked`);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchInputChange(event.target.value); // Call the passed function
  };

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
                    onChange={handleInputChange} // Update state in Assets component
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
        <div className="col">Chart Here</div>
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
