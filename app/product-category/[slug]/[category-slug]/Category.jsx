"use client";

import { Suspense } from "react";
import Category from "./page";

export default function CategoryWrapper(props) {
  return (
    <Suspense fallback={<div className="p-10 text-white">Loading...</div>}>
      <Category {...props} />
    </Suspense>
  );
}
