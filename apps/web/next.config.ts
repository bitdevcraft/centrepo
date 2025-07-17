import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  transpilePackages: ["@repo/ui", "@repo/cent-auth", "@repo/cent-database"],
  experimental: {
    nodeMiddleware: true,
  },
  
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
