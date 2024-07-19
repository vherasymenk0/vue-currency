/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}'
  ],
  theme: {
    extend: {
      borderWidth: {
        '12': '12px'
      },
      height: {
        '128': '32rem'
      },
      colors: {
        green: {
          700: '#007b47',
          600: '#007b47',
          800: '#005a32'
        },
        gray: {
          600: '#727272',
          300: '#727272'
        },
        customGray: '#f5f5f5'
      }
    }
  },
  plugins: []
}
