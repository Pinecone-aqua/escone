/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BACK_END_URL: "http://localhost:3030",
  },
};

module.exports = nextConfig;
