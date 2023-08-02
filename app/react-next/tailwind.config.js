/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFAE03',
          50: '#FFE9BB',
          100: '#FFE2A6',
          200: '#FFD57D',
          300: '#FFC855',
          400: '#FFBB2C',
          500: '#FFAE03',
          600: '#CA8900',
          700: '#926300',
          800: '#5A3D00',
          900: '#221700',
          950: '#060400'
        },
        secondary: '#FFECCB',
        tertiary: '#FDF4E5',
        darkBrown: '#A58356'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
