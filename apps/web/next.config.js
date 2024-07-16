/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  transpilePackages: ["@repo/ui"],
  env: {
    SERVER_URL: process.env.SERVER_URL,
  },
};
