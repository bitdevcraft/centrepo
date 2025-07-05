import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui", "@repo/cent-auth", "@repo/cent-database"],
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
