import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import CommonPagesHeader from "../common/CommonPagesHeader";

export default function CommonPageLayout({ page }: { page: React.ReactNode }) {
  const [isHeaderOpened, setIsHeaderOpenened] = useState<boolean>(false);
  return (
    <>
      <CommonPagesHeader
        opened={isHeaderOpened}
        onclick={() => setIsHeaderOpenened((prev) => !prev)}
      />
      {page}
    </>
  );
}
