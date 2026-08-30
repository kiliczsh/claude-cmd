/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    turbo: {
      root: ".",
    },
  },
};

export default nextConfig;
