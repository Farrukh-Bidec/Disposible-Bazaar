// 🟩 Dynamic Metadata Function for Contact Page
export async function generateMetadata() {
  const res = await fetch(
    "https://ecommerce-inventory.thegallerygen.com/api/page/detail/9", // API page ID for Contact Us
    { cache: "no-store" }
  );

  const data = await res.json();

  return {
    title: data?.data?.meta_title || "Contact Us",
    description: data?.data?.meta_description || "Contact Us page",

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

// 🟩 Load ContactUs Component


import React, { Suspense } from "react";
import ContactUs from "../src/Pages/ContactUs";

export const dynamic = "force-dynamic";
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      
   <ContactUs />
     </Suspense>
  );
}