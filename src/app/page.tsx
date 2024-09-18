<<<<<<< HEAD
import Auth from './pages/auth/Auth';
=======
"use client";
import React, { useState, useEffect } from "react";
import mainStyle from "./styles/main.module.css";
import "@flaticon/flaticon-uicons/css/all/all.css";
import Topbar from "./widgets/topbar/topbar";
import Sidebar from "./widgets/sidebar/sidebar";
import Assets from "./pages/assets/assets";
import SpaceLayout from "./pages/space/space";

import ModalWidget from "./widgets/components/modal/addmodal";
import Drawer from '@mui/material/Drawer';

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
      children: [
        {
          id: "workdone",
          iconClass: "fi fi-rr-user",
          label: "Work done",
          onClick: () => handleNavClick("services"),
        },
        {
          id: "jobdone",
          iconClass: "fi fi-rr-lock",
          label: "Job Done",
          onClick: () => handleNavClick("jobdone"),
        },
      ],
    },
    {
      id: "reports",
      iconClass: "fi fi-sr-newspaper",
      label: "Reports",
      onClick: () => {handleNavClick("reports")},
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

  const [visibleSection, setVisibleSection] = useState("dashboard");
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [open, setOpen] = React.useState(false);

  const toggleDrawer2 = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavClick = (href: string) => {
    setVisibleSection(href);
    console.log(`Navigating to ${href}`);
    toggleDrawer2(false)();
  };

  useEffect(() => {
    const element = document.getElementById(visibleSection);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [visibleSection]);

  const currentNavItem = navItems.find((item) => item.id === visibleSection);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

>>>>>>> 6f0144889aad34fa2f8057417c899d39d5acc1dd

export default function Home() {
  return (
    <main>
      <Auth />
    </main>
  );
}