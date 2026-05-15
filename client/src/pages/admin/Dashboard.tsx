import React, { useState } from "react";
import AdminPageLayout from "../../components/layouts/AdminPageLayout";

export default function AdminDashboard() {
  const [role, setRole] = useState(() => {
    const stored = localStorage.getItem("proma-role");
    return stored ? stored : "";
  });
  return (
    <>
      {role}
      {localStorage.getItem("proma-firstname")}
    </>
  );
}
