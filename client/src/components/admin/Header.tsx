
import { useEffect, useState } from "react";
import { Data } from "../../pages/admin/Data";
import { useNavigate } from "react-router-dom";

export default function Header({ isHeaderOpen, onclick }: { isHeaderOpen: boolean; onclick: () => void }) {
  const [isOpen, setIsOpen] = useState<boolean>(isHeaderOpen);
  const gender = localStorage.getItem("proma-gender");

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
  const [activeRoute, setActiveRoute] = useState<string | null>(
    localStorage.getItem("proma-admin-last-active-page") || "",
  );
  const [routeName, setRouteName] = useState<string>(`${activeRoute?.charAt(0).toUpperCase()}${activeRoute?.slice(1) || ""}`);
  const setRoute = (route: string) => {
    const formattedRoute = route.toLowerCase();
    localStorage.setItem("proma-admin-last-active-page", formattedRoute);
    setActiveRoute(formattedRoute);
    setTimeout(() => setRouteName(`${formattedRoute.charAt(0).toUpperCase()}${formattedRoute.slice(1)}`), 1000);
  };
  useEffect(() => {
    const handleStorageChange = () => {
      const storedRoute = localStorage.getItem("proma-admin-last-active-page");
      setActiveRoute(storedRoute || "");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [activeRoute]);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("proma-firstname");
    localStorage.removeItem("proma-last_name");
    localStorage.removeItem("proma-email");
    localStorage.removeItem("proma-role");
    localStorage.removeItem("proma-accountStatus");
    localStorage.removeItem("proma-created_at");
    localStorage.removeItem("proma-gender");
    localStorage.removeItem("proma-id");
    navigate("/login");
  }
  return (
    <>
      <div
        className={`fixed inset-0 z-40 ${isOpen ? "opacity-100 pointer-events-all" : "opacity-0 pointer-events-none"} backdrop-blur-xl transition-all duration-200`}
        onClick={() => setIsOpen(false)}
      />
      <div className="fixed bottom-4 right-4 z-50 flex flex-col justify-end items-end gap-4 h-[calc(100vh-32px)] w-fit pointer-events-none">
        <div className={`bg-white/20 h-full min-w-64 rounded-3xl ${isOpen ? "opacity-100 pointer-events-auto translate-y-0 blur-none delay-200" : "opacity-0 pointer-events-none translate-y-2 blur-lg"} transition-all duration-200`}>
          <div className="flex flex-col justify-between items-start gap-2 h-full w-full p-4">
            <div className="flex flex-col justify-start items-start gap-2 h-full w-full">
              <div className="h-fit w-full p-2 bg-primary-100/10 rounded-xl">
                <p>{routeName}</p>
              </div>
              <div className="flex flex-col justify-start items-start gap-2 max-h-[44svh] w-full px-2 overflow-y-auto no-scrollbar">
                {[
                  Data.routes.map((route, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setRoute(route);
                        onclick();
                        setIsOpen(false)
                      }}
                    >
                      {route}
                    </button>
                  ))
                ]}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="h-fit w-full p-2 rounded-xl bg-red-500/20"
            >
              Logout
            </button>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(prev => !prev)}
        >
          <div className={`relative flex justify-center items-center min-h-12 max-h-12 min-w-12 max-w-12 ${gender === "Male" ? "bg-primary-100" : "bg-secondary-100"} rounded-xl pointer-events-auto`}>
            <div className={`absolute transform ${isOpen ? "-translate-y-0 -rotate-45" : "-translate-y-1 -rotate-0 "} min-h-1 w-[60%] bg-${gender === "Male" ? "primary" : "secondary"}-500 rounded-xl filter blur-sm brightness-200 mix-blend-plus-lighter`}></div>
            <div className={`absolute transform ${isOpen ? "translate-y-0 rotate-45" : "translate-y-1 rotate-0 "} min-h-1 w-[60%] bg-${gender === "Male" ? "primary" : "secondary"}-500 rounded-xl filter blur-sm brightness-200 mix-blend-plus-lighter`}></div>
            <div className={`absolute transform ${isOpen ? "-translate-y-0 -rotate-45" : "-translate-y-1 -rotate-0 "} min-h-1 w-[60%] ${gender === "Male" ? "bg-primary-700" : "bg-secondary-700"} rounded-xl filter blur-none`}></div>
            <div className={`absolute transform ${isOpen ? "translate-y-0 rotate-45" : "translate-y-1 rotate-0 "} min-h-1 w-[60%] ${gender === "Male" ? "bg-primary-700" : "bg-secondary-700"} rounded-xl filter blur-none`}></div>
          </div>
        </button>
      </div>
    </>
  );
}
