/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-blue': 'var(--color-deep-blue)',  // #1F4AA8
        'flow-teal': 'var(--color-flow-teal)',   // #2EC4B6
        'soft-white': 'var(--color-soft-white)', // #F7F9FC
        'deep-navy': 'var(--color-deep-navy)',   // #16315F
        'mist-gray': 'var(--color-mist-gray)',   // #DCE3EC
        'slate-gray': 'var(--color-slate-gray)', // #8A9BB4
        'success': 'var(--color-success)',       // #22C55E
        'warning': 'var(--color-warning)',       // #F59B0D
        'danger': 'var(--color-danger)',         // #E50522
        'info': 'var(--color-info)',             // #8B82F6
      },
      fontFamily: {
        'sora': ['Sora', 'sans-serif'],  // Utilitza la font personalitzada
      },
      backgroundImage: {
        'gradient-conflict': 'var(--gradient-conflict)',
        'gradient-conflict-h': 'var(--gradient-conflict-h)',
        'gradient-conflict-v': 'var(--gradient-conflict-v)',
        'gradient-card-bg': 'var(--gradient-card-bg)',
      },
      boxShadow: {
        'glow': 'var(--shadow-glow)',
        'blue': 'var(--shadow-blue)',
        'card': 'var(--shadow-card)',
      },
      // Afegeix més extensions si cal (radi, espais, etc.)
    },
  },
  plugins: [],
}