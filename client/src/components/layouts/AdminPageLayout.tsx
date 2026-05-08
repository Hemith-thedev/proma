import React, { JSX, useEffect, useState } from "react";
import Header from "../admin/Header";
import { useLocation } from "react-router-dom"; // Hook import cheyi

import AdminDashboard from "../../pages/admin/Dashboard";
import AdminUsers from "../../pages/admin/pages/Users";

export default function AdminPageLayout() {
  const [page, setPage] = useState<JSX.Element>(<AdminDashboard />);
  const location = useLocation();
  const updatePage = async () => {
    const storedRoute = localStorage.getItem("proma-admin-last-active-page");
    if (storedRoute === "dashboard") {
      setPage(<AdminDashboard />);
    }
    else if (storedRoute === "users") {
      setPage(<AdminUsers />);
    }
  };
  useEffect(() => {
    updatePage();
    window.addEventListener("storage", updatePage);
    return () => window.removeEventListener("storage", updatePage);
  }, []);
  return (
    <div className="flex bg-gradient-to-br min-h-screen w-full">
      {/* Mana Glassmorphism Header (Sidebar) */}
      <Header onclick={() => updatePage()} />

      {/* Main Content Area */}
      <main className="flex flex-col justify-start items-center h-screen w-full p-20">
        {page}
      </main>
    </div>
  );
}
