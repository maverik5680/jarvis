/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./**/*.html",
    "./**/*.js",
    "../ds/src/**/*.js",
    "../ds/src/**/*.css",
  ],

  theme: {
    extend: {
      colors: {
        brand: {
          black: 'var(--color-brand-black)',
          'black-hover': 'var(--color-brand-black-hover)',
          orange: 'var(--color-brand-orange)',
          'orange-hover': 'var(--color-brand-orange-hover)',
        },
        gray: {
          100: 'var(--color-gray-100)',
          200: 'var(--color-gray-200)',
          300: 'var(--color-gray-300)',
          400: 'var(--color-gray-400)',
          500: 'var(--color-gray-500)',
          600: 'var(--color-gray-600)',
          700: 'var(--color-gray-700)',
          800: 'var(--color-gray-800)',
          900: 'var(--color-gray-900)',
        },
      },
      spacing: {
        xxs: 'var(--space-xxs)',
        xs: 'var(--space-xs)',
        s: 'var(--space-s)',
        m: 'var(--space-m)',
        l: 'var(--space-l)',
        xl: 'var(--space-xl)',
        xxl: 'var(--space-xxl)',
        xxxl: 'var(--space-xxxl)',
      },
      screens: {
        xs: '0px',
        s: '375px',
        m: '768px',
        l: '1024px',
        xl: '1440px',
        xxl: '1920px',
      },
      borderRadius: {
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      boxShadow: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        xxl: 'var(--shadow-xxl)',
      },
    },
  },
  plugins: [],
}
