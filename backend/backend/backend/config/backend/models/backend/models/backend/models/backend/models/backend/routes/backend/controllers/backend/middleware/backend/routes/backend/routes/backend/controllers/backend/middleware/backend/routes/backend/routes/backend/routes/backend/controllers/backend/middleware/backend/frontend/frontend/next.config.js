/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // Faster builds with SWC minifier
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL, // Backend API URL
    NEXT_PUBLIC_HUGGINGFACE_API_KEY: process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY,
  },
  images: {
    domains: [
      "images.unsplash.com", // Example for external images
      "res.cloudinary.com",  // Example if using Cloudinary for uploads
    ],
  },
  experimental: {
    appDir: false, // Set to true if using Next.js App Router
  },
};

module.exports = nextConfig;
