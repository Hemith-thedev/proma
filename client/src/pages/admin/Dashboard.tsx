import React, { useState } from "react";
import AdminPageLayout from "../../components/layouts/AdminPageLayout";

export default function AdminDashboard() {
  const [role, setRole] = useState(() => {
    const stored = localStorage.getItem("proma-role");
    return (stored) ? stored : "";
  });
  return (
    <AdminPageLayout
      page={
        <>
          <main
            className="proma-page min-w-full light no-scrollbar transition-all"
            // ref={container}
          >
            <div></div>
            <div></div>
            <div></div>
            {role}
            {localStorage.getItem("proma-firstName")}
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </main>
        </>
      }
    />
  );
}
