"use client";
import React, { useState, useEffect } from "react";
import mainStyle from "./styles/main.module.css";
import sidebarStyle from "./styles/sidebar.module.css";
import "@flaticon/flaticon-uicons/css/all/all.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HeadsetMicRoundedIcon from "@mui/icons-material/HeadsetMicRounded";

const Home: React.FC = () => {
  const [visibleSection, setVisibleSection] = useState("dashboard");

  const handleNavClick = (href: string) => {
    setVisibleSection(href);
  };

  useEffect(() => {
    const element = document.getElementById(visibleSection);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [visibleSection]);

  return (
    <div className={mainStyle.main}>
      <div className={sidebarStyle.sideMenu}>
        <div
          className={`d-flex flex-column flex-shrink-0 p-3 position-fixed ${sidebarStyle.sideBar}`}
        >
          <div className={sidebarStyle.top}>
            <div className={sidebarStyle.adminUser}>
              <i className="fi fi-sr-user-pen"></i>
              <span>Administrator</span>
            </div>
            <div>
              <i className="fi fi-br-arrow-small-left"></i>
            </div>
          </div>
          <div className={mainStyle.spaceXsm}></div>
          <div className={sidebarStyle.group}>
            <div className={sidebarStyle.icon}>
              <i className="fi fi-tr-user-shield"></i>
            </div>
            <input
              className={sidebarStyle.inputStyle}
              type="text"
              placeholder="Type to search"
              id="search"
              name="search"
            />
          </div>
          <div className={mainStyle.spaceXsm}></div>
          <hr />
          <div className={mainStyle.spaceXsm}></div>
          <ul className={sidebarStyle.navItems}>
            <li>
              <a href="#dashboard" onClick={() => handleNavClick("dashboard")}>
                <i>
                  <DashboardIcon />
                </i>
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#space" onClick={() => handleNavClick("space")}>
                <i className="fi fi-sr-rectangles-mixed"></i>
                <span>Space Layout</span>
              </a>
            </li>
            <li>
              <a
                href="#maintenance"
                onClick={() => handleNavClick("maintenance")}
              >
                <i className="fi fi-ss-tools"></i>
                <span>Maintenance</span>
              </a>
            </li>
            <li>
              <a href="#safety" onClick={() => handleNavClick("safety")}>
                <i className="fi fi-ss-doctor"></i>
                <span>Health and Safety</span>
              </a>
            </li>
            <li>
              <a href="#security" onClick={() => handleNavClick("security")}>
                <i className="fi fi-sr-shield-divided-four"></i>
                <span>Security Management</span>
              </a>
            </li>
            <li>
              <a href="#vendor" onClick={() => handleNavClick("vendor")}>
                <i className="fi fi-sr-list-dropdown"></i>
                <span>Vendor and Contract</span>
              </a>
            </li>
            <li>
              <a href="#emergency" onClick={() => handleNavClick("emergency")}>
                <i className="fi fi-sr-light-emergency-on"></i>
                <span>Emergency Response</span>
              </a>
            </li>
            <li>
              <a href="#assets" onClick={() => handleNavClick("assets")}>
                <i className="fi fi-sr-wallet"></i>
                <span>Assets</span>
              </a>
            </li>
            <li>
              <a href="#services" onClick={() => handleNavClick("services")}>
                <i>
                  <HeadsetMicRoundedIcon />
                </i>
                <span>Services</span>
              </a>
            </li>
            <li>
              <a href="#reports" onClick={() => handleNavClick("reports")}>
                <i className="fi fi-sr-newspaper"></i>
                <span>Reports</span>
              </a>
            </li>
          </ul>
          <hr />
          <div className={sidebarStyle.out}>
            <i className="fi fi-tr-sign-out-alt"></i>
            <span>Logout</span>
          </div>
        </div>
      </div>
      <main>
        <div className={sidebarStyle.content}>
          <section
            id="dashboard"
            style={{
              display: visibleSection === "dashboard" ? "block" : "none",
            }}
          >
            <h1>Dashboard</h1>
          </section>
          <section
            id="projects"
            style={{
              display: visibleSection === "projects" ? "block" : "none",
            }}
          >
            <h1>Space Layout</h1>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
