import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/garden/**/*.{js,ts,jsx,tsx,mdx}',
    './mdx-components.tsx',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        muted: 'var(--muted)',
        link: 'var(--link)',
        'link-hover': 'var(--link-hover)',
        paper: 'var(--paper)',
        'paper-line': 'var(--paper-line)',
        'paper-dot': 'var(--paper-dot)',
        card: 'var(--card)',
        'card-border': 'var(--card-border)',
      },
      fontFamily: {
        hand: ['var(--font-hand)', 'ui-rounded', 'cursive'],
      },
    },
  },
  plugins: [],
} satisfies Config;
