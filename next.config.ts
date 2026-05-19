import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fix para o Turbopack inferir corretamente a raiz do workspace
  // (evita erro “couldn't find the Next.js package next/package.json”)
  turbopack: {
    root: __dirname,
  },
};


export default nextConfig;
