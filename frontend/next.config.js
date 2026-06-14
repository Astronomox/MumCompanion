/** @type {import('next').NextConfig} */
const nextConfig = {
  // PWA setup handled via manifest.json + service worker
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
      ],
    },
  ],
}

module.exports = nextConfig
