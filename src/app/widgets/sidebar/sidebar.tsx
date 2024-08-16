import React from 'react';
import classNames from 'classnames';
import sidebarStyle from './sidebar.module.css';

interface NavItem {
  id: string;
  iconClass: string;
  label: string;
  onClick: () => void;
}

interface SidebarProps {
  adminUserIcon: string;
  username: string;
  isUser: string;
  navItems: NavItem[];
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ adminUserIcon, username, isUser, navItems, onLogout }) => {
  return (
    <div className={sidebarStyle.sideMenu}>
      <div className={sidebarStyle.top}>
        <div className={sidebarStyle.adminUser}>
          <i className={classNames(adminUserIcon)}></i>
          <span>{username}</span>
        </div>
        <div>
          <i className="fi fi-br-arrow-small-left"></i>
        </div>
      </div>

      <div className={sidebarStyle.group}>
          <div className={sidebarStyle.icon}>
            <i className="fi fi-tr-search-alt"></i>
          </div>
          <input
            className={sidebarStyle.inputStyle}
            type="text"
            placeholder="Type to search"
            id="search"
            name="search"
          />
        </div>
        <div className={sidebarStyle.spaceXsm}></div>
        <hr />

      <ul className={sidebarStyle.navItems}>
        {navItems.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} onClick={item.onClick}>
              <i className={classNames(item.iconClass)}></i>
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>

      <hr />

      {isUser !== username && (
        <div className={sidebarStyle.out} onClick={onLogout}>
          <i className="fi fi-bs-sign-out-alt"></i>
          <span>Logout</span>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
