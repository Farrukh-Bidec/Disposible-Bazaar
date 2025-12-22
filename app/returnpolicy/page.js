
import React, { Suspense } from "react";
import ReturnPolicy from "../src/Pages/ReturnPolicy"

export const dynamic = "force-dynamic";
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      
    <ReturnPolicy/>
     </Suspense>
  );
}