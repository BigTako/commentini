/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/ui"],
  env: {
    SERVER_URL: process.env.SERVER_URL,
  },
};
