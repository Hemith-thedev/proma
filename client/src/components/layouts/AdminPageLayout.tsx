import React from "react";
import Header from "../admin/Header";
import AdminDashboard from "../../pages/admin/Dashboard";
import { useLocation } from "react-router-dom"; // Hook import cheyi

export default function AdminPageLayout({ page }: { page?: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="flex bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 min-h-screen w-full">
      {/* Mana Glassmorphism Header (Sidebar) */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 p-8 ml-0 md:ml-64 transition-all duration-300">
        {/* Conditional Rendering Logic */}
        {location.pathname === "/admin/dashboard" ? (
          <AdminDashboard />
        ) : (
          page // Dashboard kakapothe nuvvu pampina 'page' prop render avtundi
        )}
      </main>
    </div>
  );
}
