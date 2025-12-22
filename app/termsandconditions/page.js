

// import React, { Suspense } from "react";
import TermsAndConditions from "../src/Pages/TermsAndConditions"

export const dynamic = "force-dynamic";
export default function Page() {
  return (
    // <Suspense fallback={<div>Loading...</div>}>
      
    <TermsAndConditions/>
    //  </Suspense>
  );
}