import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"] },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;