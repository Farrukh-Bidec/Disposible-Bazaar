"use client";

import { Suspense } from "react";
import CustomizationCategory from "./page";

export default function CustomizationCategoryWrapper(props) {
  return (
    <Suspense fallback={<div className="p-10 text-white">Loading...</div>}>
      <CustomizationCategory {...props} />
    </Suspense>
  );
}
