import React from "react";
import Header from "../admin/Header";

export default function AdminPageLayout({ page }: { page: React.ReactNode }) {
  
  return (
    <>
      <Header />
      {page}
    </>
  )
}