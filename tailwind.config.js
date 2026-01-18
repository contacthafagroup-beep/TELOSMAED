/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // TELOS MAED Official Brand Colors
        primary: {
          // Royal Faith Blue - Primary brand color from logo
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d6ff',
          300: '#a5b8ff',
          400: '#8191ff',
          500: '#5d6aff',
          600: '#1F3C88', // Royal Faith Blue (Official)
          700: '#1a3374',
          800: '#152a60',
          900: '#10214c',
        },
        secondary: {
          // Heaven Deep Blue - Secondary brand color
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d6ff',
          300: '#a5b8ff',
          400: '#8191ff',
          500: '#5d6aff',
          600: '#2F56B0', // Heaven Deep Blue (Official)
          700: '#284a9a',
          800: '#213e84',
          900: '#1a326e',
        },
        // Brand Grays
        'light-word': '#FFFFFF', // Pure White - Light of Word
        'scripture': '#F2F4F8',  // Scripture Gray - Soft backgrounds
        'wisdom': '#6B7280',     // Wisdom Gray - Text secondary
        'truth': '#111827',      // Truth Black - Main text
        
        // Glory Gold - Highlight accent (use sparingly)
        'glory': {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#F4C430', // Glory Gold (Official)
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        
        // Dark Mode Variants
        'dark-bg': '#0B1220',    // Dark background
        'dark-card': '#121A2F',  // Dark card background
        'dark-primary': '#3B82F6', // Dark mode primary
        'dark-text': '#E5E7EB',  // Dark mode main text
        'dark-secondary': '#9CA3AF', // Dark mode secondary text
        'dark-border': '#1F2933', // Dark mode borders
      },
      fontFamily: {
        'serif': ['Crimson Text', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Playfair Display', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#334155',
            lineHeight: '1.75',
          }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}