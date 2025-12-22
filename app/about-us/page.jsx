// 🟩 Dynamic Metadata Function for About Us Page
export async function generateMetadata() {
  const res = await fetch(
    "https://ecommerce-inventory.thegallerygen.com/api/page/detail/8", // API page ID for About Us
    { cache: "no-store" }
  );

  const data = await res.json();

  return {
    title: data?.data?.meta_title || "About Us",
    description: data?.data?.meta_description || "About Us page",

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


import { Suspense } from "react";
import About from "../src/Pages/AboutUs";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <About />
    </Suspense>
  );
}
