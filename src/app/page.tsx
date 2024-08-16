"use client";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import mainStyle from "./styles/main.module.css";
import "@flaticon/flaticon-uicons/css/all/all.css";
import Topbar from "./widgets/topbar/topbar";
import Sidebar from "./widgets/sidebar/sidebar";
import dashStyle from "./styles/dash.module.css";
import contStyle from "./styles/content.module.css";
import { title } from "process";
import PillButton from "./widgets/components/pillbtn/pillbtn";
import Button from "./widgets/components/btn/btn";
import DashboardWidget from "./widgets/dashtop/dashboard";
import TableWidget from "./widgets/table/table";
import Assets from "./pages/assets/assets";

const Home: React.FC = () => {
  const navItems = [
    {
      id: "dashboard",
      iconClass: "fi fi-ss-objects-column",
      label: "Dashboard",
      onClick: () => handleNavClick("dashboard"),
      view: false,
      title: "Overview",
    },
    {
      id: "space",
      iconClass: "fi fi-sr-rectangles-mixed",
      label: "Space Layout",
      onClick: () => handleNavClick("space"),
      view: true,
      title: "Overview",
    },
    {
      id: "maintenance",
      iconClass: "fi fi-ss-tools",
      label: "Maintenance",
      onClick: () => handleNavClick("maintenance"),
      view: true,
      title: "Overview",
    },
    {
      id: "safety",
      iconClass: "fi fi-ss-doctor",
      label: "Health and Safety",
      onClick: () => handleNavClick("safety"),
      view: true,
      title: "Overview",
    },
    {
      id: "security",
      iconClass: "fi fi-ss-shield",
      label: "Security Management",
      onClick: () => handleNavClick("security"),
      view: true,
      title: "Overview",
    },
    {
      id: "vendor",
      iconClass: "fi fi-sr-list-dropdown",
      label: "Vendor and Contract",
      onClick: () => handleNavClick("vendor"),
      view: true,
      title: "Overview",
    },
    {
      id: "emergency",
      iconClass: "fi fi-sr-light-emergency-on",
      label: "Emergency Response",
      onClick: () => handleNavClick("emergency"),
      view: true,
      title: "Overview",
    },
    {
      id: "assets",
      iconClass: "fi fi-sr-wallet",
      label: "Assets",
      onClick: () => handleNavClick("assets"),
      view: true,
      title: "Overview",
    },
    {
      id: "services",
      iconClass: "fi fi-sr-headset",
      label: "Services",
      onClick: () => handleNavClick("services"),
      view: true,
      title: "Overview",
    },
    {
      id: "reports",
      iconClass: "fi fi-sr-newspaper",
      label: "Reports",
      onClick: () => handleNavClick("reports"),
      view: true,
      title: "Overview",
    },
  ];

  const [visibleSection, setVisibleSection] = useState("dashboard");

  const handleNavClick = (href: string) => {
    setVisibleSection(href);
    console.log(`Navigating to ${href}`);
  };

  const handleClick = () => {
    console.log("Button clicked");
  };
  useEffect(() => {
    const element = document.getElementById(visibleSection);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [visibleSection]);

  const currentNavItem = navItems.find((item) => item.id === visibleSection);

  return (
    <div className={mainStyle.main}>
      <div className={mainStyle.sideMenu}>
        <Sidebar
          adminUserIcon="fi fi-sr-user-pen"
          username="Shekinah"
          isUser="OtherUser"
          navItems={navItems}
          onLogout={() => console.log("Logging out")}
        />
      </div>
      <main className={mainStyle.mainRight}>
        {currentNavItem && (
          <Topbar
            iconLeft={currentNavItem.iconClass}
            name={currentNavItem.label}
            iconRight="fi fi-sr-square-plus"
            actionText={"Add " + currentNavItem.label}
            showRight={currentNavItem.view}
          />
        )}
        <div className={mainStyle.content}>
          <section
            id="dashboard"
            style={{
              display: visibleSection === "dashboard" ? "block" : "none",
            }}
          >
            <h1>DashBoard</h1>
          </section>
          <section
            id="space"
            style={{
              display: visibleSection === "space" ? "block" : "none",
            }}
          >
            <h1>Space Layout</h1>
          </section>
          <section
            id="assets"
            style={{
              display: visibleSection === "assets" ? "block" : "none",
            }}
          >
            {currentNavItem && (
              <Assets
                dashboardTitle={currentNavItem.title}
                dashboardIconClass={currentNavItem.iconClass}
              />
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
