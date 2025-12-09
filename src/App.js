// Styles
import "./App.css";

// Data
import { Pages, Forms } from "./Data/Pages";

// Components
import ScrollIndicator from "./Components/Common/ScrollIndicator";
import NavMenu from "./Components/Layout/NavMenu";

// Dependencies
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  document.body.className = "light default";
  const location = useLocation();
  const [navMenuIsOpen, setNavMenuIsOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = (navMenuIsOpen) ? "hidden" : "auto"
  }, [navMenuIsOpen])
  return (
    <>
      {(window.location.pathname === "/" ||
        window.location.pathname === "/tutorial" ||
        window.location.pathname === "/contact") && <ScrollIndicator />}
      {NavMenu(navMenuIsOpen)}
      <button className={`navbar-toggle ${navMenuIsOpen ? "open" : ""}`} onClick={() => setNavMenuIsOpen(prev => !prev)}>
        <span></span>
        <span></span>
      </button>
      <Routes key={location.pathname} location={location}>
        {Pages.map((page, index) => (
          <Route key={index} path={page.slug} element={page.component} />
        ))}
        {Forms.map((form, index) => (
          <Route key={index} path={form.slug} element={form.component} />
        ))}
      </Routes>
    </>
  );
}

export default App;
