import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: '#071827',
        navySoft: '#102A43',
        gold: '#D4AF37',
        cream: '#F7F2E8',
        ink: '#0B1220'
      },
      boxShadow: {
        soft: '0 20px 80px rgba(7,24,39,0.14)'
      }
    }
  },
  plugins: []
};
export default config;
