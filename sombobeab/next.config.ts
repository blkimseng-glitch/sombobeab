import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" }, // ⚠️ allows all hosts — lock down in production
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
