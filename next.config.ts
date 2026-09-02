import type { NextConfig } from "next";
import fs from "fs";
import path from "path";
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Unsplash CDN host
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com", // Pexels CDN host
        port: "",
        pathname: "/**",
      },
    ],
  },
  transpilePackages: ["next-mdx-remote"],
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

if (process.env.NODE_ENV === "development") {
  const contentDir = path.join(process.cwd(), "content");
  const triggerFile = path.join(process.cwd(), "app/layout.tsx");

  try {
    fs.watch(contentDir, { recursive: true }, (event, filename) => {
      if (filename && (filename.endsWith(".mdx") || filename.endsWith(".md"))) {
        const now = new Date();
        try {
          fs.utimesSync(triggerFile, now, now);
        } catch (err) {
          // Ignore errors if the file is busy
        }
      }
    });
  } catch (err) {
    console.error("Failed to start content watcher:", err);
  }
}

export default nextConfig;
