/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/explore',
        destination: '/universities',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig