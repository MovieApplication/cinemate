/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['image.tmdb.org'], // Add "image.tmdb.org" as an allowed image source
  },
}

module.exports = nextConfig
