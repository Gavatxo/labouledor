import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Autorise l'upload de photos jusqu'à ~10 Mo via les Server Actions.
    serverActions: { bodySizeLimit: "10mb" },
  },
};

export default nextConfig;
