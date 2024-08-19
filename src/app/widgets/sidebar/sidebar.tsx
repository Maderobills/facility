import React, { useState } from "react";
import classNames from "classnames";
import Grow from "@mui/material/Grow";
import sidebarStyle from "./sidebar.module.css";
import { Box } from "@mui/material";

interface NavItem {
  id: string;
  iconClass: string;
  label: string;
  onClick: () => void;
  children?: NavItem[];
}

interface SidebarProps {
  adminUserIcon: string;
  username: string;
  isUser: string;
  navItems: NavItem[];
  onClick: () => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  adminUserIcon,
  username,
  isUser,
  navItems,
  onClick,
  onLogout,
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setActiveDropdown((prev) => (prev === id ? null : id));
  };

  return (
    <div className={sidebarStyle.sideMenu}>
      <div className={sidebarStyle.top}>
        <div className={sidebarStyle.adminUser}>
          <i className={classNames(adminUserIcon)}></i>
          <span>{username}</span>
        </div>
        <div onClick={onClick}>
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
          <li key={item.id} className={sidebarStyle.navItem}>
            <div
              className={classNames(sidebarStyle.navLink, {
                [sidebarStyle.active]: activeDropdown === item.id,
              })}
              onClick={() => {
                if (item.children) {
                  toggleDropdown(item.id);
                } else {
                  item.onClick();
                }
              }}
            >
              <i className={classNames(item.iconClass)}></i>
              <span>{item.label}</span>
              <div className={sidebarStyle.drop}>
                {item.children && (
                  <i
                    className={classNames("fi", {
                      "fi-br-angle-small-down": activeDropdown !== item.id,
                      "fi-br-angle-small-up": activeDropdown === item.id,
                      [sidebarStyle.rotateIcon]: true,
                    })}
                  ></i>
                )}
              </div>
            </div>

            {item.children && (
              <Grow
                in={activeDropdown === item.id}
                style={{ transformOrigin: "top left" }}
                timeout={1000}
              >
                <Box
                  component="ul"
                  className={classNames(sidebarStyle.dropdown, {
                    [sidebarStyle.dropdownVisible]: activeDropdown === item.id,
                  })}
                  sx={{ m: 0, p: 0, listStyle: "none" }}
                >
                  {item.children.map((child) => (
                    <li key={child.id} className={sidebarStyle.dropdownItem}>
                      <a href={`#${child.id}`} onClick={child.onClick}>
                        <i className={classNames(child.iconClass)}></i>
                        <span>{child.label}</span>
                      </a>
                    </li>
                  ))}
                </Box>
              </Grow>
            )}
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
