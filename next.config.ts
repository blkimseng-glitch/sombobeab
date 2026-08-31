import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // 👈 អនុញ្ញាតឱ្យទាញរូបពី HTTPS គ្រប់ domain ទាំងអស់!
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;