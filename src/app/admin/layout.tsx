import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return <MaxWidthWrapper className="">{children}</MaxWidthWrapper>;
}

export default layout;
