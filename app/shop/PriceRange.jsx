"use client";

import { Suspense } from "react";
import PriceRange from "../src/components/Shop/PriceRange";

export default function PriceRangeWrapper(props) {
  return (
    <Suspense fallback={<div className="p-10 text-white">Loading...</div>}>
      <PriceRange {...props} />
    </Suspense>
  );
}
