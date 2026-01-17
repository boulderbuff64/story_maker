import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bloom-pink': '#FF6B9D',
        'bloom-coral': '#FF8E72',
        'bloom-orange': '#FFB347',
        'bloom-blue': '#4ECDC4',
        'bloom-teal': '#45B7AA',
        'bloom-purple': '#A78BFA',
        'bloom-lavender': '#C4B5FD',
      },
      backgroundImage: {
        'gradient-bloom': 'linear-gradient(135deg, #FF6B9D 0%, #FF8E72 25%, #FFB347 50%, #4ECDC4 75%, #A78BFA 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #FF6B9D 0%, #FF8E72 50%, #FFB347 100%)',
        'gradient-ocean': 'linear-gradient(135deg, #4ECDC4 0%, #45B7AA 50%, #A78BFA 100%)',
      },
      animation: {
        'fizz': 'fizz 2s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'bubble': 'bubble 4s ease-in-out infinite',
      },
      keyframes: {
        fizz: {
          '0%, 100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
          '50%': { transform: 'translateY(-10px) scale(1.1)', opacity: '0.8' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        bubble: {
          '0%': { transform: 'translateY(100%) scale(0)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(-100vh) scale(1)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
export default config
