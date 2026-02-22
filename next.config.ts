import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/norby-tactical-operator-base',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
