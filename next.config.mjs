import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/wp-content/uploads/Kylan-Sean-Groen-Curriculum-Vitae.pdf',
        destination: '/kylan-groen-cv.pdf',
        permanent: true,
      },
      {
        source: '/wp-content/uploads/Curriculum-Vitae-Kylan-Sean-Groen.pdf',
        destination: '/kylan-groen-cv.pdf',
        permanent: true,
      },
    ]
  },
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 220, 256, 384, 440],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
      },
    ],
  },
}

export default withNextIntl(nextConfig)
