/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Definición de color personalizado para Foodiesaurus
        foodiesaurus: {
          DEFAULT: '#22c55e', // Verde principal de la marca
          light: '#4ade80',   // Variante clara (hover, badges)
          dark: '#15803d',    // Variante oscura (texto, bordes)
        },
        // Nuevo color corporativo secundario (Púrpura / Berry)
        'foodiesaurus-secondary': {
          DEFAULT: '#781C68', // Color corporativo #781C68
          light: '#a12c8c',   // Variante clara para hovers, badges y acentos
          dark: '#521147',    // Variante oscura para sombras y estados activos
        },
      },
    },
  },
  plugins: [],
}