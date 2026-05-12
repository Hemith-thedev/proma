import React, { JSX, useEffect, useState } from "react";
import Header from "../admin/Header";
import { useLocation } from "react-router-dom"; // Hook import cheyi

import AdminDashboard from "../../pages/admin/Dashboard";
import AdminUsers from "../../pages/admin/pages/Users";

export default function AdminPageLayout() {
  const [page, setPage] = useState<JSX.Element>(<AdminDashboard />);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const location = useLocation();
  const updatePage = async () => {
    setIsLoading(true);
    const storedRoute = localStorage.getItem("proma-admin-last-active-page");
    if (storedRoute) {
      setTimeout(() => {
        if (storedRoute === "dashboard") {
          setPage(<AdminDashboard />);
        }
        else if (storedRoute === "users") {
          setPage(<AdminUsers />);
        }
        setIsLoading(false);
      }, 1000);
    }
  };
  useEffect(() => {
    updatePage();
    window.addEventListener("storage", updatePage);
    return () => window.removeEventListener("storage", updatePage);
  }, []);
  return (
    <div className="flex w-full">
      <Header onclick={() => updatePage()} />
      <main className="flex flex-1 flex-col justify-start items-center gap-10 h-screen w-full p-20">
        {page}
        <div className={`fixed top-0 left-0 h-full w-full z-20 bg-black ${isLoading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} transition-opacity duration-500`} />
      </main>
    </div>
  );
}
