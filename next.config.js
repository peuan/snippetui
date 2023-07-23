/** @type {import('next').NextConfig} */
const nextConfig = {
  httpAgentOptions: {
    keepAlive: false,
  },
};

module.exports = nextConfig;
