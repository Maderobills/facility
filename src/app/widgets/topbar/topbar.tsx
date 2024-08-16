import React from 'react';
import classNames from 'classnames';
import topbarStyle from './topnav.module.css'; // Adjust the path based on your file structure

interface TopbarProps {
  iconLeft: string;
  name: string;
  iconRight: string;
  actionText: string;
  showRight?: boolean;
  onClick: () => void; // Corrected the onClick type
}

const Topbar: React.FC<TopbarProps> = ({ iconLeft, name, iconRight, actionText, showRight = true, onClick }) => {
  return (
    <div className={topbarStyle.topbar}>
      <div className={topbarStyle.left}>
        <div className={topbarStyle.menuName}>
          <i className={classNames(iconLeft)}></i>
          <span>{name}</span>
        </div>
      </div>
      {showRight && (
        <div className={topbarStyle.right}>
          <div className={topbarStyle.action} onClick={onClick}> {/* Updated onClick here */}
            <i className={classNames(iconRight)}></i>
            <span>{actionText}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Topbar;
