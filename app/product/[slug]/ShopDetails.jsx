"use client";

import React, { Suspense } from "react";
import ShopDetails from "../[slug]/page";

export default function ProductPage() {
  return (
    <Suspense fallback={<div className="p-10 text-white">Loading...</div>}>
      <ShopDetails />
    </Suspense>
  );
}
