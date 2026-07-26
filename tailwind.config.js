/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        swiggy: {
          orange: "#FC8019",
          "orange-light": "#FFF4EC",
          "orange-hover": "#E5700F",
          charcoal: "#1C1C1E",
          offwhite: "#FAFAF8",
          card: "#F5F5F3",
          border: "#E8E8E8",
          muted: "#6B7280",
          success: "#22C55E",
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 12px rgba(0, 0, 0, 0.05)',
        'elevated': '0 4px 24px rgba(0, 0, 0, 0.08)',
        'pill': '0 4px 14px rgba(252, 128, 25, 0.25)',
      },
      borderRadius: {
        'card': '20px',
      }
    },
  },
  plugins: [],
}
