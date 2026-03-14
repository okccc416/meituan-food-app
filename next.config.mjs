/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/meituan-food-app",
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
