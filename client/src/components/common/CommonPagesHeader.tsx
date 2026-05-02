import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { X, Menu } from "lucide-react";
import { JSX, useEffect, useState, useRef, useLayoutEffect } from "react";

interface HeaderProps {
  opened: boolean;
  onclick: () => void;
  onLinkClick?: () => void; // ✨ Kotha prop baby!
}

const UseNavigationLinks = ({
  links,
  mobile = false,
  closeMenu,
  onLinkClick,
}: {
  links: { path: string; label: string }[];
  mobile: boolean;
  closeMenu: () => void;
  onLinkClick?: () => void; // ✨ Optional ga pettadam better baby!
}) => {
  const navigate = useNavigate();

  const handleNavigation = (e: React.MouseEvent, path: string) => {
    e.preventDefault();

    // 1. First, loading overlay ni trigger chey (Opacity 0 -> 1 start avtundi)
    if (onLinkClick) {
      onLinkClick();
    }

    // 2. Overlay motham cover ayye daka (0.6s to 0.8s) wait chesi navigate chey
    // Appude user ki smooth transition kanipisthundi
    setTimeout(() => {
      navigate(path);
      if (mobile && closeMenu) closeMenu();
    }, 700); // 700ms is perfect for your 0.6s transition
  };

  return (
    <nav
      className={`flex ${mobile ? "flex-col gap-6 text-xl" : "flex-row gap-8 text-sm"} font-['Lexend_Deca'] font-medium`}
    >
      {links.map((link, index) => (
        <a
          key={index}
          href={link.path}
          onClick={(e) => handleNavigation(e, link.path)}
          className={`text-gray-300 transition-all duration-300 ${(window.location.pathname === link.path) ? "text-primary-500" : ""} hover:text-secondary-400`}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
};

export default function CommonPagesHeader({
  opened,
  onclick,
  onLinkClick,
}: HeaderProps): JSX.Element {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const [headerState, setHeaderState] = useState<
    "hide" | "show" | "show-partial"
  >("show-partial");
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();

  // ✨ Reset on Navigation: Sudden snap to 'hide'
  useLayoutEffect(() => {
    // setHeaderState("hide");
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
    // Instant reset scroll state
    setLastScrollY(window.scrollY);
  }, [location.pathname, isMobile]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Page mottam height entha undi?
      const scrollHeight = document.documentElement.scrollHeight;
      // User screen height entha?
      const clientHeight = document.documentElement.clientHeight;

      // Logic: User full kindaki reach ayyara? (Bottom of the page)
      // Formula: Scrolled distance + screen height >= total page height
      // if (currentScrollY + clientHeight >= scrollHeight - 5) {
      //   setHeaderState("hide"); // Full kindaki vachaka 'Maaya' (Hide)
      // }
      // if (currentScrollY <= 0) {
      //   setHeaderState("hide");
      // } else
        if (currentScrollY < lastScrollY) {
        // Paiki (Up) scroll chesthe: Show Partial
        setHeaderState("show-partial");
      } else if (currentScrollY > lastScrollY) {
        // Kindaki (Down) scroll chesthe: Show
        setHeaderState("show");
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const LINKS = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "Login", path: "/login" },
    { label: "Registration", path: "/register" },
  ];

  // Helper for dynamic styles
  const getHeaderStyle = (): Object => {
    switch (headerState) {
      case "hide":
        return { transform: "translateY(-100%)", opacity: 0 };
      case "show-partial":
        return { transform: "translateY(0%)", opacity: 0.9 }; // Subtle peek
      case "show":
        return { transform: "translateY(0)", opacity: 1 };
      default:
        return {};
    }
  };

  return (
    <>
      {/* <div style={{ height: `${headerHeight}px` }} className="relative w-full" /> */}

      <header
        ref={headerRef}
        style={getHeaderStyle()}
        className={`fixed top-0 z-[1000] h-fit w-full flex justify-between items-center px-6 md:px-16 transition-all duration-500 ease-in-out
        ${
          headerState === "show" ? "py-4 backdrop-blur-3xl bg-black/70" : "py-6"
        }`}
      >
        <div
          className={`${headerState !== "show" ? "opacity-100 transform translate-x-0" : "opacity-0 transform translate-y-10"}`}
        >
          <img
            src="./logos-favicons/favicons/no-bg/favicon-low.png"
            alt="Logo"
            className="h-16 w-auto object-contain mix-blend-difference"
          />
        </div>

        {!isMobile && (
          <UseNavigationLinks
            links={LINKS}
            onLinkClick={onLinkClick}
            mobile={false}
            closeMenu={() => {}} // Desktop ki avasaram ledu
          />
        )}

        {isMobile && (
          <button className="text-white z-[60] p-2" onClick={onclick}>
            {opened ? <X size={28} /> : <Menu size={28} />}
          </button>
        )}
      </header>

      {/* Sidebar & Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${opened ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={onclick}
      />
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[75%] bg-primary-500/0 backdrop-blur-xl border-l border-white/10 p-10 transform transition-transform duration-500 ${opened ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col gap-2 mt-16">
          <h2 className="text-gray-500 font-['Lexend_Deca'] text-xs tracking-[0.2em] uppercase font-bold">
            Navigation
          </h2>
          <UseNavigationLinks
            links={LINKS}
            mobile={true}
            closeMenu={onclick}
            onLinkClick={onLinkClick}
          />
        </div>
      </div>
    </>
  );
}

{
  /* <div style={{ height: `${headerHeight}px` }} className="relative w-full" /> */
}
