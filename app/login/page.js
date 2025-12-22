




import React, { Suspense } from "react";
import Login from '../src/Pages/Login'

export const dynamic = "force-dynamic";
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      
   <Login/>
     </Suspense>
  );
}