/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', 
    './src/**/*.{js,jsx,ts,tsx}', // Esto asegura que Tailwind procese tus archivos JSX y TSX
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
