 "use client";

import { Suspense } from "react";
import Blogdetail from "./page";

export default function BlogdetailWrapper(props) {
  return (
    <Suspense fallback={<div className="p-10 text-white">Loading...</div>}>
      <Blogdetail {...props} />
    </Suspense>
  );
}