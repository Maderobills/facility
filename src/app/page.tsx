"use client";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import mainStyle from "./styles/main.module.css";
import "@flaticon/flaticon-uicons/css/all/all.css";
import Topbar from "./widgets/topbar/topbar";
import Sidebar from "./widgets/sidebar/sidebar";
import dashStyle from "./styles/dash.module.css";
import contStyle from "./styles/content.module.css"
import { title } from "process";
import PillButton from "./widgets/components/pillbtn/pillbtn";
import Button from "./widgets/components/btn/btn";

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
            <div className={dashStyle.dashboard}>
              <div className={`row`}>
                <div className="col-8">
                  <div className="col-12">
                    <div className={dashStyle.title}>
                      {currentNavItem && (
                        <i className={`${currentNavItem.iconClass}`}></i>
                      )}
                      {currentNavItem && <h2>{currentNavItem.title}</h2>}
                    </div>
                  </div>
                  <div className="col-12 px-4 my-2">
                    <span className={dashStyle.note}>
                      Filter search to view
                    </span>
                    <div className="row">
                      <div className="col">
                        <div className={dashStyle.group}>
                          <div className={dashStyle.icon}>
                            <i className="fi fi-tr-user-shield"></i>
                          </div>
                          <input
                            className={dashStyle.inputStyle}
                            type="text"
                            placeholder="Type to search"
                            id="search"
                            name="search"
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className={dashStyle.btnGroup}>
                          <PillButton text="Good" onClick={handleClick} />
                          <PillButton text="Bad" onClick={handleClick} />
                          <PillButton text="Repair" onClick={handleClick} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 px-4 my-4">
                    <div className={dashStyle.itemCounter}>
                      <span>Total: 16</span>
                      <span>Good: 12</span>
                      <span>Bad: 2</span>
                      <span>Repair: 2</span>
                    </div>
                  </div>
                </div>
                <div className="col">Chart Here</div>
                <div className="col-2">
                <div className={dashStyle.btnActionGroup}>
                          <Button text="Excel" onClick={handleClick} icon={"fi fi-sr-file-excel"} variant={"secondary"} />
                          <Button text="Report" onClick={handleClick} icon={"fi fi-sr-file-excel"} variant={"secondary"} />
                          <Button text="Print PDF" onClick={handleClick} icon={"fi fi-sr-file-excel"} variant={"secondary"} />
                        </div>
                </div>
              </div>
            </div>
            <div className={contStyle.contentBox}>
                <div className={`row ${contStyle.tableHeading}`}>
                  <div className="col-1">QTY</div>
                  <div className="col">Item</div>
                  <div className="col">Brand</div>
                  <div className="col">Location</div>
                  <div className="col">Model No.</div>
                  <div className="col">Serial No.</div>
                  <div className="col">Tag</div>
                  <div className="col-1">Condition</div>
                </div>
                <div className={`row ${contStyle.tableContent}`}>
                  <div className="col-1">
                  <div className={contStyle.qty}>
                  <i className="fi fi-sr-pen-field"></i>
                  <span>5</span>
                  </div>
                  </div>
                  <div className="col">Projector</div>
                  <div className="col">Dell</div>
                  <div className="col">Library</div>
                  <div className="col">1210s</div>
                  <div className="col">001515050</div>
                  <div className="col">DUC/LTC/PRO/10</div>
                  <div className="col-1">Good</div>
                </div>
            </div>
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
            <h1>Assets</h1>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
