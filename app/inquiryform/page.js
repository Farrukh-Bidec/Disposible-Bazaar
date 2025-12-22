
// 🟩 Dynamic Metadata Function for Inquiry Form Page
export async function generateMetadata() {
  const res = await fetch(
    "https://ecommerce-inventory.thegallerygen.com/api/page/detail/2",
    { cache: "no-store" }
  );

  const data = await res.json();

  return {
    title: data?.data?.meta_title || "Inquiry Form",
    description: data?.data?.meta_description || "Inquiry form page",

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

// 🟩 Page Component
import { Suspense } from "react";
import InquiryFormClient from "../src/Pages/InquiryForm";
export const dynamic = "force-dynamic";
export default function Page() {
  return (
    <Suspense fallback={<div>Loading Inquiry Form...</div>}>
      <InquiryFormClient />
    </Suspense>
  );
}
