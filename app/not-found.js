

import React, { Suspense } from "react";
import ErrorPage from "../app/src/Pages/ErrorPage"

export const dynamic = "force-dynamic";
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      
   <ErrorPage/>
     </Suspense>
  );
}