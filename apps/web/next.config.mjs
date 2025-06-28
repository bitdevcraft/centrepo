/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui", "@repo/cent-auth", "@repo/cent-database"],
};

export default nextConfig;
