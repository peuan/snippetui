/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cssbattle.dev"],
  },
  async headers() {
    return [
      {
        source: "/api/convert-to-image",
        headers: [
          {
            key: "Content-Type",
            value: "image/png",
          },
        ],
      },
    ]
  },
  httpAgentOptions: {
    keepAlive: false,
  },
}

module.exports = nextConfig
