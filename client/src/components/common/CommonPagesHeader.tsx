import { NavLink } from "react-router-dom";
import { X, Menu } from "lucide-react";
import { JSX } from "react";

const UseNavigationLinks = ({
  links,
}: {
  links: { label: string; path: string }[];
}) => {
  return (
    <nav>
      {links.map((link, index) => (
        <NavLink key={index} to={link.path}>
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default function CommonPagesHeader({
  opened,
  onclick,
}: {
  opened: boolean;
  onclick: () => void;
}) {
  const LINKS = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "About",
      path: "/about",
    },
    {
      label: "Contact",
      path: "/contact",
    },
    {
      label: "Login",
      path: "/login",
    },
    {
      label: "Registration",
      path: "/register",
    },
  ];
  return (
    <header>
      <div className="logo">
        <img src="./logos-favicons/logos/logo-high.png" alt="Logo" />
      </div>
      <nav>
        <UseNavigationLinks links={LINKS} />
      </nav>
      <div>
        <button className={`${opened ? "opened" : ""}`} onClick={onclick}>
          {opened ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
