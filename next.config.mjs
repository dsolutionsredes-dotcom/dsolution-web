/** @type {import('next').NextConfig} */
const directusOrigin = new URL(process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://admin.d-solution.org').origin;

const nextConfig = {
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  async headers() {
    return [{
      source: '/:path*',
      headers: [{
        key: 'Content-Security-Policy',
        value: `frame-ancestors 'self' ${directusOrigin}`,
      }],
    }];
  },
};
export default nextConfig;
