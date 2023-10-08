/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cssbattle.dev", "avatars.githubusercontent.com"],
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
