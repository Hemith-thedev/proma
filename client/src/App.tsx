import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/common/Home";
import AboutPage from "./pages/common/About";
import ContactPage from "./pages/common/Contact";

function App() {
  const role = localStorage.getItem("proma-user-role");
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      {role === "user" && <></>}
    </Routes>
  );
}

export default App;
