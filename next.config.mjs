/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add any configuration options here
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // Enable image optimization
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      }
    ],
    // Fallback to other image optimization methods if sharp is not available
    unoptimized: false,
  },
  // Add logging for debugging
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  // Optional: Configure experimental features
  experimental: {
    // Increase memory limit for the build process
    serverComponentsExternalPackages: ['sharp']
  },
  // Optional: Configure webpack if necessary
  webpack: (config) => {
    return config;
  }
};

export default nextConfig;
