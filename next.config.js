/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.thenounproject.com",
      },
      {
        protocol: "https",
        hostname: "meal-bucket-s3.s3.us-east-1.amazonaws.com",
      },
    ],
  },
};
