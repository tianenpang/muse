/**
 * Next Config
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  compress: true,
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: true,
  productionBrowserSourceMaps: false,
  pageExtensions: ['page.tsx', 'page.ts'],
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
    localeDetection: true
  },
  images: {
    domains: []
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: process.env.IS_VERCEL_PROD === 'true'
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig;
