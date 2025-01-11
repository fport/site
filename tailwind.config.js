/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      rotate: {
        '90': '90deg',
        '-90': '-90deg',
      },
      transformOrigin: {
        'top': 'top',
        'bottom': 'bottom',
      },
    },
  },
  plugins: [],
} 