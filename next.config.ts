import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Fotos de stock temporales (Unsplash) hasta tener el banco propio del cliente
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com", pathname: "/photo-*" }],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
