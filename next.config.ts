import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // Required for static HTML export
  },
  // If your repo is named BMSCEWebProject (not <username>.github.io), 
  // you must set basePath so assets load from /BMSCEWebProject:
  basePath: process.env.NODE_ENV === "production" ? "/BMSCEWebProject" : "",
};

export default nextConfig;