import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 75 is the Next.js default used site-wide; 80 is used on the hero image
    // for slightly higher fidelity on the LCP element.
    qualities: [75, 80],
  },
};

export default nextConfig;
