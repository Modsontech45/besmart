/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // African-inspired color palette
        'savanna-green': '#6B8E23',
        'sunset-orange': '#FF7043',
        'earth-brown': '#8B4513',
        'desert-sand': '#F4A460',
        'clay-terracotta': '#D2691E',
        'deep-sky-blue': '#1E90FF',
        'charcoal-black': '#2E2E2E',
        'ivory': '#FFFFF0',
        'baobab-green': '#3A5F0B',
        'flame-red': '#DC143C',
        
        // Primary colors using CSS variables (Sunset Orange theme)
        primary: {
          50: 'rgb(var(--color-primary-50) / <alpha-value>)',
          100: 'rgb(var(--color-primary-100) / <alpha-value>)',
          200: 'rgb(var(--color-primary-200) / <alpha-value>)',
          300: 'rgb(var(--color-primary-300) / <alpha-value>)',
          400: 'rgb(var(--color-primary-400) / <alpha-value>)',
          500: 'rgb(var(--color-primary-500) / <alpha-value>)',
          600: 'rgb(var(--color-primary-600) / <alpha-value>)',
          700: 'rgb(var(--color-primary-700) / <alpha-value>)',
          800: 'rgb(var(--color-primary-800) / <alpha-value>)',
          900: 'rgb(var(--color-primary-900) / <alpha-value>)',
        },
        
        // Semantic color mappings
        success: '#3A5F0B', // Baobab Green
        warning: '#FF7043', // Sunset Orange
        error: '#DC143C',   // Flame Red
        info: '#1E90FF',    // Deep Sky Blue
      },
      
      backgroundImage: {
        'gradient-african-sunset': 'linear-gradient(135deg, #FF7043, #D2691E)',
        'gradient-african-earth': 'linear-gradient(135deg, #8B4513, #F4A460)',
        'gradient-african-nature': 'linear-gradient(135deg, #6B8E23, #3A5F0B)',
        'gradient-african-sky': 'linear-gradient(135deg, #1E90FF, #F4A460)',
        'gradient-african-warm': 'linear-gradient(135deg, #FF7043, #F4A460)',
      },
      
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      
      boxShadow: {
        'african': '0 4px 14px 0 rgba(255, 112, 67, 0.15)',
        'african-lg': '0 10px 25px -3px rgba(255, 112, 67, 0.2), 0 4px 6px -2px rgba(255, 112, 67, 0.1)',
        'earth': '0 4px 14px 0 rgba(139, 69, 19, 0.15)',
        'nature': '0 4px 14px 0 rgba(107, 142, 35, 0.15)',
      },
      
      animation: {
        'african-pulse': 'african-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gentle-bounce': 'gentle-bounce 3s ease-in-out infinite',
      },
      
      keyframes: {
        'african-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'gentle-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
};