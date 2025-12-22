// 🟩 Dynamic Metadata Function for Account Settings Page
export async function generateMetadata() {
  const res = await fetch(
    "https://ecommerce-inventory.thegallerygen.com/api/page/detail/6", // API page ID for Account Settings
    { cache: "no-store" }
  );

  const data = await res.json();

  return {
    title: data?.data?.meta_title || "Account Settings",
    description: data?.data?.meta_description || "Manage your account settings",

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

// 🟩 Load AccountSettings Component

import React, { Suspense } from "react";
import { AccountSettings } from '../../app/src/Pages/AccountSettings';

export const dynamic = "force-dynamic";
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      
 <AccountSettings />     
 </Suspense>
  );
}