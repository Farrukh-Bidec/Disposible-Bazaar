

import React, { Suspense } from "react";
import PrivacyPolicy from "../src/Pages/PrivacyPolicy"

export const dynamic = "force-dynamic";
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      
   <PrivacyPolicy/>
     </Suspense>
  );
}