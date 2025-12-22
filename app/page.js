// 🟩 Dynamic Metadata Function
export async function generateMetadata() {
  try {
    const res = await fetch(
      "https://ecommerce-inventory.thegallerygen.com/api/page/detail/7",
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("API returned error");
    }

    const data = await res.json();

    return {
      title: data?.data?.meta_title || "Default Title",
      description: data?.data?.meta_description || "Default Description",
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
  } catch (error) {
    console.error("Metadata fetch failed:", error);

    // ✔ Always return fallback metadata
    return {
      title: "Default Title",
      description: "Default Description",
      robots: {
        index: true,
        follow: true,
      },
    };
  }
}


// 🔹 Important for client hooks

import Homes from "./src/Pages/Homes";
export const dynamic = "force-dynamic";
export default function Page() {
  return (
  // <Suspense fallback={<div>Loading Homes...</div>}>
  <Homes />
// </Suspense>

  );
}
