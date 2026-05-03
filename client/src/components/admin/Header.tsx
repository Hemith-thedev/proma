import { Data } from "../../pages/admin/Data";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div>
        <div>
          <h1 className="text-2xl font-bold">
            {Data.routes.find(
              (route) => route.path === window.location.pathname,
            )?.title || "Admin"}
          </h1>
        </div>
        <div>
          {Data.routes.map((route) => (
            <NavLink key={route.path} to={route.path} onClick={() => document.title = `Admin${(route.title === "Dashboard" ? "" : ` - ${route.title}`)}`}>
              {route.label}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}
