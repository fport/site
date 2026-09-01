import createMDX from '@next/mdx';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  pageExtensions: ['mdx', 'ts', 'tsx'],
  // Note: Using the Rust compiler means we cannot use
  // rehype or remark plugins. For my app, this is fine.
  experimental: {
    mdxRs: true,
  },
  async redirects() {
    return [
      // The gardens used to live at the top level and under /paper.
      { source: '/ai-garden', destination: '/garden/ai', permanent: true },
      { source: '/ai-garden/:slug', destination: '/garden/ai/:slug', permanent: true },
      { source: '/paper/talks', destination: '/garden/talks', permanent: true },
      { source: '/paper/stack', destination: '/garden/stack', permanent: true },
    ];
  },
};

const withMDX = createMDX({});
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

export default withNextIntl(withMDX(nextConfig));
