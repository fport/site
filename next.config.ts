import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

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
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
