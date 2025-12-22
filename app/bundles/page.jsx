// 🟩 Dynamic Metadata Function for BundleShop Page
export async function generateMetadata() {
  const res = await fetch(
    "https://ecommerce-inventory.thegallerygen.com/api/page/detail/3", // API page ID for BundleShop
    { cache: "no-store" }
  );

  const data = await res.json();

  return {
    title: data?.data?.meta_title || "Bundle Shop",
    description: data?.data?.meta_description || "Bundle Shop products page",

    alternates: {
      canonical: data?.data?.canonical_url || "",
    },

    robots: {
      index: data?.data?.robots_index !== "noindex",
      follow: data?.data?.robots_follow !== "nofollow",

      googleBot: {
        index: data?.data?.robots_index !== "noindex",
        follow: data?.data?.robots_follow !== "nofollow",
      },
    },
  };
}


import React, { Suspense } from "react";
import BundleShop from "../src/Pages/BundleShop";


export const dynamic = "force-dynamic";
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      
     <BundleShop />
    </Suspense>
  );
}
