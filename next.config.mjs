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
  experimental: {
    serverExternalPackages: ['sharp']
  }
}

export default nextConfig
