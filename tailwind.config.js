/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#0B0B0B',
          900: '#12100E',
          800: '#1A1613',
          700: '#251F1A',
        },
        vanilla: {
          50: '#FFF3E0',
          100: '#F8D6A1',
          200: '#E7B56A',
        },
        caramel: {
          400: '#E7B56A',
          500: '#D8903D',
          600: '#B87324',
        },
        chocolate: {
          700: '#6B3A1E',
          800: '#4A2713',
        },
        tec: {
          navy: '#0F2236',
          blue: '#1E3A5F',
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', '"Orbitron"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-amber': '0 0 30px -5px rgba(216, 144, 61, 0.35)',
        'glow-soft': '0 0 45px -10px rgba(231, 181, 106, 0.2)',
      }
    },
  },
  plugins: [],
}
