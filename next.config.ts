import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    remotePatterns: [new URL('https://bellasartes.gob.ar/**')],
  },
};

export default nextConfig;
