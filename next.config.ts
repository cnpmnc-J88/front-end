import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_BACKEND_URL: "http://192.168.137.24:8080",
  },
};

export default nextConfig;
