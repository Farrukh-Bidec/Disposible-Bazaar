



import React, { Suspense } from "react";
import CustomizationCategory from "../../app/product-category/[slug]/page"

export const dynamic = "force-dynamic";
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      
<CustomizationCategory/>
     </Suspense>
  );
}