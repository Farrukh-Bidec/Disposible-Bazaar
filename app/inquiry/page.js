


import React, { Suspense } from "react";
import Inquiry from "../src/Pages/Invoice"

export const dynamic = "force-dynamic";
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      
   <Inquiry/>
     </Suspense>
  );
}