
import { useEffect, useState } from "react";
import { Data } from "../../pages/admin/Data";

export default function Header({ onclick }: { onclick: () => void }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
  return (
    <>
      <div
        className={`fixed inset-0 z-40 ${isOpen ? "opacity-100 pointer-events-all" : "opacity-0 pointer-events-none"} backdrop-blur-xl transition-all duration-200`}
        onClick={() => setIsOpen(false)}
      />
      <div className="fixed bottom-4 right-4 z-50 flex flex-col justify-end items-end gap-4">
        <div className={`bg-white/20 min-h-64 min-w-64 rounded-3xl ${isOpen ? "opacity-100 pointer-events-auto translate-y-0 blur-none delay-200" : "opacity-0 pointer-events-none translate-y-2 blur-lg"} transition-all duration-200`}>
          <div className="flex flex-col justify-start items-start gap-2 p-4">
            <div className="h-fit w-full p-2 bg-primary-100/10 rounded-xl">
              <p>{routeName}</p>
            </div>
            <div className="flex flex-col justify-start items-start gap-2 px-2">
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
        </div>
        <button
          onClick={() => setIsOpen(prev => !prev)}
        >
          <div className="relative flex justify-center items-center min-h-12 max-h-12 min-w-12 max-w-12 bg-primary-100/100 rounded-xl">
            <div className={`absolute transform ${isOpen ? "-translate-y-0 -rotate-45" : "-translate-y-1 -rotate-0 "} min-h-1 w-[60%] bg-primary-500 rounded-xl filter blur-sm brightness-200 mix-blend-plus-lighter`}></div>
            <div className={`absolute transform ${isOpen ? "translate-y-0 rotate-45" : "translate-y-1 rotate-0 "} min-h-1 w-[60%] bg-primary-500 rounded-xl filter blur-sm brightness-200 mix-blend-plus-lighter`}></div>
            <div className={`absolute transform ${isOpen ? "-translate-y-0 -rotate-45" : "-translate-y-1 -rotate-0 "} min-h-1 w-[60%] bg-primary-600 rounded-xl filter blur-none`}></div>
            <div className={`absolute transform ${isOpen ? "translate-y-0 rotate-45" : "translate-y-1 rotate-0 "} min-h-1 w-[60%] bg-primary-600 rounded-xl filter blur-none`}></div>
          </div>
        </button>
      </div>
    </>
  );
}
