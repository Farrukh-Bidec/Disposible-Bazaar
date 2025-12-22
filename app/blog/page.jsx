export const dynamic = "force-dynamic";


// 🟩 Dynamic Metadata Function for Blog Page
export async function generateMetadata() {
  const res = await fetch(
    "https://ecommerce-inventory.thegallerygen.com/api/page/detail/10", // API page ID for Blog
    { cache: "no-store" }
  );

  const data = await res.json();

  return {
    title: data?.data?.meta_title || "Blog",
    description: data?.data?.meta_description || "Blog page",

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
import Blog from "../../app/src/Pages/Blog";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Blog />
    </Suspense>
  );
}