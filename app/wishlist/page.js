


// 🟩 Dynamic Metadata Function for Wishlist Page
export async function generateMetadata() {
  const res = await fetch(
    "https://ecommerce-inventory.thegallerygen.com/api/page/detail/11", // API page ID for Wishlist
    { cache: "no-store" }
  );

  const data = await res.json();

  return {
    title: data?.data?.meta_title || "Wishlist",
    description: data?.data?.meta_description || "Your Wishlist",

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

// 🟩 Load Wishlist Component




import Wishlist from "../src/Pages/Wishlist";

export const dynamic = "force-dynamic";
export default function Page() {
  return (

  <Wishlist />


  );
}

