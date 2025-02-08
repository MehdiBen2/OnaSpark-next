/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
        pathname: '/user-attachments/**',
      },
    ],
  },
  // Removed invalid experimental configuration
}

export default nextConfig
