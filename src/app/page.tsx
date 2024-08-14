"use client";
import React, { useState, useEffect } from "react";
import mainStyle from "./styles/main.module.css"
import sidebarStyle from "./styles/sidebar.module.css";

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
          <div className={sidebarStyle.adminUser}>
            <span>Administrator</span>
          </div>
          <hr />
          <ul className={sidebarStyle.navItems}>
            <li>
              <a href="#dashboard" onClick={() => handleNavClick("dashboard")}>
                <i className="fi fi-ts-house-chimney"></i>
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#projects" onClick={() => handleNavClick("projects")}>
                <i className="fi fi-tr-bank"></i>
                <span>Space Layout</span>
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
