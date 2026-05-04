import { Data } from "../../pages/admin/Data";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 726);
  const checkDeviceWidth = () => {
    setIsMobile(window.innerWidth < 726);
    console.log(isMobile);
  };
  useEffect(() => {
    window.addEventListener("resize", checkDeviceWidth);
    return () => {
      window.removeEventListener("resize", checkDeviceWidth);
    };
  }, [window.innerWidth]);
  return (
    <>
      {/* --- Mobile Toggle Button --- */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-4 z-50 p-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg shadow-lg text-white"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* --- Sidebar Container --- */}
      <aside
        className={`
          ${isMobile ? "fixed top-0 left-0" : "relative"} h-screen z-40 transition-all duration-300 ease-in-out
          /* Glassmorphism Logic */
          bg-white/10 backdrop-blur-xl border-r border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
          ${isMobile ? (isOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full") : "w-64 translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo / Title */}
          <div className="mb-10 pt-4">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {Data.routes.find(
                (route) => route.path === window.location.pathname,
              )?.title || "Admin"}
            </h1>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 h-full overflow-auto space-y-2 bg-red-500 rounded-xl no-scrollbar">
            {Data.routes.map((route) => (
              <NavLink
                key={route.path}
                to={route.path}
                onClick={() => {
                  document.title = `Admin${route.title === "Dashboard" ? "" : ` - ${route.title}`}`;
                  if (isMobile) setIsOpen(false); // Close sidebar on click in mobile
                }}
                className={({ isActive }) => `
                  flex items-center px-4 py-3 rounded-xl transition-all duration-200
                  ${
                    isActive
                      ? "bg-white/20 text-white border border-white/40 shadow-inner"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }
                `}
              >
                {route.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* --- Overlay for Mobile --- */}
      <div
        className={`fixed inset-0 ${isMobile && isOpen ? "bg-black/20 backdrop-blur-sm pointer-events-auto" : "bg-black/0 backdrop-blur-none pointer-events-none"} z-30 transition-all duration-200`}
        onClick={() => setIsOpen(false)}
      />
    </>
  );
}
