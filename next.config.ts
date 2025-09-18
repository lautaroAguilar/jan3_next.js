import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['localhost', 'images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '2368',
        pathname: '/content/images/**',
      },
      {
        protocol: 'https',
        hostname: '*.ghost.io',
        pathname: '/content/images/**',
      },
    ],
  },
  async redirects() {
    return [
      // Add any necessary redirects from Ghost URLs to Next.js URLs
    ];
  },
  async rewrites() {
    return [
      // Handle Ghost URL patterns if needed
    ];
  },
};

export default nextConfig;
