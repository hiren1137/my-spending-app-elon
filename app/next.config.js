/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000', // Add this if your localhost runs on a specific port
        pathname: '/**',
      },
    ],
    formats: ['image/webp'],
  },
}

module.exports = nextConfig;
