import React, { useState } from "react";
import AdminPageLayout from "../../components/layouts/AdminPageLayout";

export default function AdminUsers() {
  const [role, setRole] = useState(() => {
    const stored = localStorage.getItem("proma-role");
    return stored ? stored : "";
  });
  return (
    <main
      className="proma-page min-w-full light no-scrollbar transition-all"
      // ref={container}
    >
      <div></div>
      <div></div>
      <div></div>
      {role}
      Users
      {localStorage.getItem("proma-firstName")}
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </main>
  );
}
