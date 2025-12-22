

import React, { Suspense } from "react";
import Security from "../src/Pages/Security"

export const dynamic = "force-dynamic";
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      
    <Security/>
     </Suspense>
  );
}