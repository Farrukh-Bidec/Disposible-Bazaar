// 🟩 Dynamic Metadata Function for Shop Page
export async function generateMetadata() {
  const res = await fetch(
    "https://ecommerce-inventory.thegallerygen.com/api/page/detail/1", 
    { cache: "no-store" }
  );

  const data = await res.json();

  return {
    title: data?.data?.meta_title || "Shop - Default Title",
    description: data?.data?.meta_description || "Shop page description",

    alternates: {
      canonical: data?.data?.canonical_url || "",
    },

    // 🟦 Robots Tag Added
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

// 🟩 Load Shop Component



import React, { Suspense } from "react";
import Shop from "../src/Pages/Shop";

export const dynamic = "force-dynamic";
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      
      <Shop />
     </Suspense>
  );
}
