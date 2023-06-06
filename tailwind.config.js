/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: 'jit',
  content: [
    'components/**/*.{vue,js,ts}',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'plugins/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      spacing: {
        4.5: '1.125rem',
      },
      colors: {
        'black-card': '#222222',
        'black-inner-card': '#2B2B2B',
        'vvn-black': {
          DEFAULT: '#141414',
          10: '#191919'
        },
        'vvn-green': {
          DEFAULT: '#5DDFA2',
        },
        'vvn-blue': {
          DEFAULT: '#00C0DF'
        },
        'vvn-white': {
          '02': 'rgba(255, 255, 255, 0.02)',
          '04': 'rgba(255, 255, 255, 0.04)',
          10: 'rgba(255, 255, 255, 0.1)',
          15: 'rgba(255, 255, 255, 0.15)',
        },
        'vvn-gray': {
          DEFAULT: '#9E9E9E',
          50: '#858585',
          90: '#434343'
        },
      },
      fontFamily: {
        poppins: ['Poppins'],
      },
      backgroundImage: {
        'gradient-green':
          'linear-gradient(315deg, #53DDAC, #90E96F 50%, #CAF435)',
        'gradient-blue':
          'linear-gradient(315deg, #0099CC, #00C0DF 50%, #00E5F2)',
        'gradient-red':
          ' linear-gradient(315deg, #DC111D, #FF525C 50%, #FE9CA1)',
      },
    },
  }
}
