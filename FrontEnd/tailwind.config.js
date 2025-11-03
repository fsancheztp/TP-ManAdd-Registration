/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      // Using modern `rgb`
      'primary': '#3c2a4d',
      'secondary': '#e0f0ea',
      'third': '#95adbe',
      'white': '#ffffff',
      'red':'#ff0000',
      'green':'#00cc00',
      'blue': '#0040ff',
      'orange': '#ff8000',
      'yellow':'#ffff00',
      'text-primary':'#3c2a4d',
      'text-secondary':'#e0f0ea',
      'text-third':'#ff8000',
      'card': '#95adbe',
      'popover':'#3c2a4d',
      'popover-foreground':'#ffffff',
      'input-enabled':'#e0f0ea',
      'input-disabled':'#3c2a4d',
      'input':'#3c2a4d',
      'black':'#000000'
    }
  },
  plugins: [],
}