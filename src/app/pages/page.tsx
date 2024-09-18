"use client";
import React, { useState, useEffect } from "react";
import mainStyle from "../styles/main.module.css";
import "@flaticon/flaticon-uicons/css/all/all.css";
import Topbar from "../widgets/topbar/topbar";
import Sidebar from "../widgets/sidebar/sidebar";
import Assets from "../pages/assets/assets";
import SpaceLayout from "../pages/space/space";
import { signOut } from 'firebase/auth';
import ModalWidget from "../widgets/components/modal/addmodal";
import Drawer from '@mui/material/Drawer';
import { auth } from "../firebase/sync";
import { useRouter } from 'next/navigation';
import Auth from "./auth/Auth";



interface Props {
  username: string;
}

const Home: React.FC<Props> = ({ username }) => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const router = useRouter();

  // Retrieve the saved section or default to 'dashboard'
  const savedSection = sessionStorage.getItem('visibleSection') || 'dashboard';
  const [visibleSection, setVisibleSection] = useState(savedSection);

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
      children: [
        {
          id: "space",
          iconClass: "fi fi-rr-rectangles-mixed",
          label: "Layouts",
          onClick: () => handleNavClick("space"),
        },
      ],
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
    {
      id: "settings",
      iconClass: "fi fi-rr-settings",
      label: "Settings",
      onClick: () => handleNavClick("settings"),
      children: [
        {
          id: "profile",
          iconClass: "fi fi-rr-user",
          label: "Profile",
          onClick: () => handleNavClick("profile"),
        },
        {
          id: "account",
          iconClass: "fi fi-rr-lock",
          label: "Account",
          onClick: () => handleNavClick("account"),
        },
      ],
    },
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleDrawer2 = (newOpen: boolean) => () => setOpen(newOpen);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleNavClick = (href: string) => {
    setVisibleSection(href);
    sessionStorage.setItem('visibleSection', href); // Save section to sessionStorage
    console.log(`Navigating to ${href}`);
  };

  useEffect(() => {
    const element = document.getElementById(visibleSection);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [visibleSection]);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      sessionStorage.clear();  // Clear session storage on logout
      setIsLoggedOut(true);
      router.push('/');
      console.log('Logging out');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  if (isLoggedOut) {
    return <Auth />;
  }

  const currentNavItem = navItems.find((item) => item.id === visibleSection);

  
  return (
    <div className={mainStyle.main}>
      <div onClick={toggleDrawer} className={`${mainStyle.menuButton} ${drawerOpen ? mainStyle.hidden : ""}`}>
        <i className="fi fi-br-grid"></i>
      </div>
      <div className={mainStyle.mainToggle} onClick={toggleDrawer2(true)}>
      <i className="fi fi-br-grid"></i>
    </div>
      <div className={mainStyle.sideMenu}>
      <Drawer
       open={open} onClose={toggleDrawer2(false)}
       PaperProps={{
        style: {
          width: '600px',
          backgroundColor: "transparent",
          border: 'none',
          borderRadius: '15px 5px 5px 15px',
          padding: 10,
        },
      }}
       >
      
      <Sidebar
          adminUserIcon="fi fi-sr-user-pen"
          username={username}
          isUser="OtherUser"
          navItems={navItems}
          onLogout={() => console.log("Logging out")}
          onClick={toggleDrawer2(false)}
        />
      </Drawer></div>
     <div className={mainStyle.sideMenu}>
     <Drawer
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            border: 'none',
            borderRadius: '15px 5px 5px 15px',
            padding: 10,
          },
        }}
        
      >
        <Sidebar
          adminUserIcon="fi fi-sr-user-pen"
          username={username}
          isUser="OtherUser"
          navItems={navItems}
          onLogout={handleLogout}
          onClick={toggleDrawer}
        />
      </Drawer>
      
     </div>

      <main
        className={mainStyle.mainRight}
        style={{
          marginLeft: drawerOpen ? "240px" : "0px",
          transition: "margin 0.3s",
        }}
      >
        {currentNavItem && (
          <Topbar
            iconLeft={currentNavItem.iconClass}
            name={currentNavItem.label}
            iconRight="fi fi-sr-square-plus"
            actionText={"Add " + currentNavItem.label}
            showRight={currentNavItem.view}
            onClick={handleModalOpen}
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
            {currentNavItem && (
              <SpaceLayout
                dashboardTitle={currentNavItem.title}
                dashboardIconClass={currentNavItem.iconClass}
              />
            )}
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

      {currentNavItem && (
        <ModalWidget
          open={modalOpen}
          onClose={handleModalClose}
          title={"Add " + currentNavItem.label}
          description="This is content inside the dashboard modal."
        />
      )}
    </div>
  );
};

export default Home;
