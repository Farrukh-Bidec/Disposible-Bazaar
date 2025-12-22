"use client";

import { Suspense } from "react";
import CustomDetails from "./page";

export default function CustomDetailsWrapper(props) {
  return (
    <Suspense fallback={<div className="p-10 text-white">Loading...</div>}>
      <CustomDetails {...props} />
    </Suspense>
  );
}