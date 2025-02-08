/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add any configuration options here
  reactStrictMode: true,
  swcMinify: true,
  // Optional: Configure experimental features
  experimental: {
    // Add any experimental features if needed
  },
  // Optional: Configure webpack if necessary
  webpack: (config) => {
    return config;
  }
};

export default nextConfig;
