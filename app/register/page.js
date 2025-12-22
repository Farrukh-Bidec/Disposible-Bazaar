

import React, { Suspense } from "react";
import Register from "../src/Pages/Register"

export const dynamic = "force-dynamic";
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      
<Register/>
     </Suspense>
  );
}