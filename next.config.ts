import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "minio.nutech-integrasi.com",
        protocol: "https"
      },
      {
        hostname: "nutech-integrasi.app",
        protocol: "https"
      }
    ]
  }
};

export default nextConfig;
