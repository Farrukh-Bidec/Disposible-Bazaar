
import React, { Suspense } from "react";
import Checkout from "../src/Pages/Checkout"

export const dynamic = "force-dynamic";
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      
    <Checkout/>
     </Suspense>
  );
}