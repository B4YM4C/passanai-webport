/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Large video files are streamed directly from /public — no special webpack needed.
  experimental: {
    // App Router is default in Next 14
  }
};

export default nextConfig;
