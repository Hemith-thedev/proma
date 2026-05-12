import React, { JSX, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

// common pages
import HomePage from "./pages/common/Home";
import AboutPage from "./pages/common/About";
import ContactPage from "./pages/common/Contact";
import LoginPage from "./pages/common/Login";
import RegistrationPage from "./pages/common/Registration";

// admin pages
import AdminPageLayout from "./components/layouts/AdminPageLayout";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(
    localStorage.getItem("proma-role"),
  );
  const setActiveRole = () => {
    const storedRole = localStorage.getItem("proma-role");
    setRole(storedRole || "");
    if (storedRole === "admin") {
      navigate("/admin");
    }
  };
  useEffect(() => {
    const storedRole = localStorage.getItem("proma-role");
    if (storedRole === "admin") {
      if (!location.pathname.startsWith("/admin")) {
        navigate("/admin");
      } else {
        // if (location.pathname.startsWith("/admin")) {
        //   navigate("/login");
        // }
      }
    }
    const handleStorageChange = () => {
      setRole(storedRole || "");
    };
    window.addEventListener("storage", handleStorageChange);
    setActiveRole();
    return () => window.removeEventListener("storage", handleStorageChange);
  });
  useEffect(() => {
    const document = Document as any;
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        // This callback runs during the view transition.
        // You can perform any DOM updates here, and they will be smoothly transitioned.
      });
    }
  }, [window.location.pathname]);
  useEffect(() => {
    const changeRoute = () => {
      if (role === "admin" && !location.pathname.startsWith("/admin")) {
        navigate("/admin");
      }
      // if (role !== "admin" && location.pathname.startsWith("/admin")) {
      //   navigate("/login");
      // }
    };
    window.addEventListener("storage", changeRoute);
    return () => window.removeEventListener("storage", changeRoute);
  }, []);
  return (
    <div className={`app relative flex justify-start items-center min-h-screen w-screen bg-black text-white
    ${location.pathname.startsWith("/admin") ? "overflow-hidden" : ""}`}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        {role === "admin" && (
          <Route path="/admin" element={<AdminPageLayout />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
