import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      // Frontend assets
      {
        protocol: "https",
        hostname: "ecommerce-inventory.thegallerygen.com",
        pathname: "/public/Frontend/Assets/**",
      },
      // Product images
      {
        protocol: "https",
        hostname: "ecommerce-inventory.thegallerygen.com",
        pathname: "/storage/product_images/**",
      },
    ],
  },
};

export default nextConfig;
