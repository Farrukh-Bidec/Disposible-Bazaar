"use client";

import { Suspense } from "react";
import Bundle from "./page";

export default function BundleWrapper(props) {
  return (
    <Suspense fallback={<div className="p-10 text-white">Loading...</div>}>
      <Bundle {...props} />
    </Suspense>
  );
}
