/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          navy: '#1a2332',
          red: '#E53935',
          yellow: '#FFD700',
          white: '#FFFFFF',
          lightGray: '#F5F5F5',
          darkGray: '#212121',
          mediumGray: '#666666',
          borderGray: '#E0E0E0',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'h1': '3.5rem',
        'h2': '2.5rem',
        'h3': '2rem',
      },
      fontWeight: {
        light: 300,
        normal: 400,
        semibold: 600,
        bold: 700,
        black: 900,
      },
      spacing: {
        'section-py': '80px',
      },
    },
  },
  plugins: [],
}

