

import { Suspense } from "react";
import CustomSeo from "../src/components/CustomSeo";
export const dynamic = "force-dynamic";
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CustomSeo />
    </Suspense>
  );
}
