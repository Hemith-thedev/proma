import { Data } from "../../pages/admin/Data";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header({ onclick }: { onclick: () => void }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  // responsiveness
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

  // role update
  const [role, setRole] = useState<"admin" | "teammate" | string>("");
  useEffect(() => {
    const checkRole = () => {
      const storedRole = localStorage.getItem("proma-role");
      if (storedRole === "admin" || storedRole === "teammate") {
        setRole(storedRole);
      } else {
        setRole("");
      }
    };
    checkRole();
    window.addEventListener("storage", checkRole);
    return () => window.removeEventListener("storage", checkRole);
  }, []);

  // active route and polling
  const [activeRoute, setActiveRoute] = useState<string | null>(localStorage.getItem("proma-admin-last-active-page") || "");
  const setRoute = (route: string) => {
    const formattedRoute = route.toLowerCase();
    localStorage.setItem("proma-admin-last-active-page", formattedRoute);
    setActiveRoute(formattedRoute);
  };
  useEffect(() => {
    const handleStorageChange = () => {
      const storedRoute = localStorage.getItem("proma-admin-last-active-page");
      setActiveRoute(storedRoute || "");
    }
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [activeRoute]);
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
          bg-white/10 backdrop-blur-xl
          min-w-64  rounded-r-3xl
          ${isMobile ? (isOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full") : "w-64 translate-x-0"}
        `}
      >
        {!isMobile && (
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex h-[calc(150%)] w-[calc(110%)] gradient-bg-top-bottom -z-10 filter blur-3xl"></div>
        )}
        <div className="flex flex-col h-full gap-6 p-6 z-50 bg-black rounded-r-3xl">
          {/* Logo / Title */}
          <div className="mb-10 pt-4">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Admin
            </h1>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 h-full overflow-auto rounded-xl no-scrollbar">
            {Data.routes.map((route, i) => (
              <button
                key={i}
                onClick={() => {
                  setRoute(route);
                  onclick();
                }}
                className={`relative flex flex-col justify-center items-center ${activeRoute === route.toLowerCase() ? "gradient-bg" : ""} h-fit w-full rounded-xl px-4 py-4`}
              >
                <span>{route}</span>
              </button>
            ))}
          </nav>
          {role === "admin" && (
            <button
              onClick={() => {
                localStorage.removeItem("proma-role");
                window.location.pathname = "/login";
              }}
            className="relative flex flex-col justify-center items-center rounded-xl h-fit w-full px-4 py-4 bg-red-950/20 hover:bg-red-800">
              <p>Logout</p>
            </button>
          )}
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
