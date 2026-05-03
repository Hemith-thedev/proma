import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { Routes, Route } from "react-router-dom";

// common pages
import HomePage from "./pages/common/Home";
import AboutPage from "./pages/common/About";
import ContactPage from "./pages/common/Contact";
import LoginPage from "./pages/common/Login";
import RegistrationPage from "./pages/common/Registration";

// admin pages
import AdminDashboard from "./pages/admin/Dashboard";

function App() {
  const role = localStorage.getItem("proma-role");
  useEffect(() => {
    const document = Document as any;
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        // This callback runs during the view transition.
        // You can perform any DOM updates here, and they will be smoothly transitioned.
      });
    }
  }, [window.location.pathname]);
  return (
    <div className="app relative flex flex-col justify-start items-center min-h-screen min-w-full bg-black text-white">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        {role === "admin" && (
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
