/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      unoptimized: true, // Disable Image Optimization API
    },
    typescript: {
      ignoreBuildErrors: true, // Temporary during debugging
    },
  };
  
  module.exports = nextConfig;