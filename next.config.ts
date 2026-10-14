import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Use GITHUB_ACTIONS or repo subfolder fallback cleanly
  basePath: process.env.BASE_PATH || (isProd ? "/BMSCEWebProject" : ""),
  assetPrefix: process.env.BASE_PATH || (isProd ? "/BMSCEWebProject" : ""),
};

export default nextConfig;