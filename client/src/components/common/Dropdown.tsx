import React, { useState } from "react";

// 1. Interface lo onSelect ni add cheshanu
interface DropdownProps {
  options: string[];
  placeholder?: string;
  onSelect?: (option: string) => void; // Optional function prop
}

const Dropdown = ({ options, placeholder, onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Select Option");

  const handleOptionClick = (opt: string) => {
    setSelected(opt);
    setIsOpen(false);

    // 2. Parent (Registration.tsx) state ni update chestundi
    if (onSelect) {
      onSelect(opt);
    }
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <button
        type="button" // 👈 Mana refresh bug fix!
        onClick={() => setIsOpen(!isOpen)}
        className="proma-input text-left flex justify-between items-center"
        style={{
          width: "100%",
          backgroundColor: "#000",
          color: "#fff",
          border: "1px solid #333",
          borderRadius: "8px",
          padding: "12px",
          boxShadow: isOpen ? "0 0 10px hsla(330, 100%, 50%)" : "none",
        }}
      >
        <p>{selected === "" ? placeholder : selected}</p>
        {/* <span>{isOpen ? "▲" : "▼"}</span> */}
      </button>
      <ul className={`absolute top-[60px] w-full bg-black/50 backdrop-blur-xl border border-gray-700 rounded-lg z-50 max-h-52 overflow-y-auto transform
          transition-all duration-500
          ${isOpen ? "translate-y-0 opacity-100 pointer-events-auto filter blur-0" : "translate-y-10 opacity-0 pointer-events-none filter blur-xl"}
        `}>
        {options.map((opt) => (
          <li
            key={opt}
            onClick={() => handleOptionClick(opt)} // 3. Function call ikkada!
            style={{
              padding: "10px 15px",
              color: "#bbb",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            className={`${selected === opt ? "gradient-bg" : ""} hover:bg-purple-700 hover:shadow-[0_0_50px_hsla(270,100%,50%)] transition-none duration-0`}
          >
            {opt === "" ? placeholder : opt}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
