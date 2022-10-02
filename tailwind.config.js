const colors = require('tailwindcss/colors')
const svgToDataUri = require('mini-svg-data-uri')
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    purge: {
        enabled: process.env.NODE_ENV === 'production',
        content: [
            "./pages/**/*.tsx", "./src/**/*.tsx"
        ],
        options: {
            safelist: ['dark', 'system', 'light'],
        },
    },
    darkMode: 'class',
    theme: {
          fill: ({ theme }) => ({
            gray: theme('colors.gray')
          }),

          screens: {
            '2xs': '320px',
            'xs': '475px',
            ...defaultTheme.screens,
          },
        
        extend: {
          colors: {
            brown: {
              50: '#fdf8f6',
              100: '#f2e8e5',
              200: '#eaddd7',
              300: '#e0cec7',
              400: '#d2bab0',
              500: '#bfa094',
              600: '#a18072',
              700: '#977669',
              800: '#846358',
              900: '#43302b',
            },
          },
          padding: {
            '0.25': '0.10rem',
          },
          maxWidth: {
            
            'screen-xl': '1380px',
            '8xl': '1920px',
          },
          borderWidth: {
            '0.5' : '0.5px',
            '1.5' : '1.5px'
          },
          spacing: {
            '13': '3.25rem',
            '15': '3.75rem',
            '17': '4.25rem',
            '18': '4.5rem',
            '19': '4.75rem',
          },
          fontSize: {
            'xxs': '.7rem',
          },
          colors: ({ colors }) => ({
            primary: colors.purple,
            secondary: colors.indigo,
            tertiary: colors.violet,
            'light-palette': colors.slate,
            'dark-palette': colors.gray,
            'light-text': colors.slate,
            'dark-text': colors.gray,
            info: colors.blue,
            success: colors.green,
            danger: colors.red,
            warning: colors.yellow,
            default: colors.gray,
            lightgray: '#fdfdfd'
          }),
          boxShadow: {
            'outline-normal': '0 0 0 2px var(--accent-2)',
            magical:
              'rgba(0, 0, 0, 0.02) 0px 30px 30px, rgba(0, 0, 0, 0.03) 0px 0px 8px, rgba(0, 0, 0, 0.05) 0px 1px 0px',
          },
          lineHeight: {
            'extra-loose': '2.2',
          },
          scale: {
            120: '1.2',
            97: '0.97',
          },
        },
      },
    variants: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/line-clamp'),
        function ({ matchUtilities, theme }) {
          matchUtilities(
            {
              'bg-grid': (value) => ({
                backgroundImage: `url("${svgToDataUri(
                  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
                )}")`,
              }),
            },
            { values: flattenColorPalette(theme('backgroundColor')), type: 'color' }
          )

          matchUtilities(
            {
              "bg-shadow": (value) => ({
                boxShadow: `0 0 0 10px ${value} inset`
              })
            },
            { 
              values: flattenColorPalette(theme("colors")), 
              type: "color" 
            }
          )
        
          matchUtilities(
            {
              highlight: (value) => ({ boxShadow: `inset 0 1px 0 0 ${value}` }),
            },
            { values: flattenColorPalette(theme('backgroundColor')), type: 'color' }
          )
        },
        function ({ addUtilities, theme }) {
          let backgroundSize = '7.07px 7.07px'
          let backgroundImage = (color) =>
            `linear-gradient(135deg, ${color} 10%, transparent 10%, transparent 50%, ${color} 50%, ${color} 60%, transparent 60%, transparent 100%)`
          let colors = Object.entries(theme('backgroundColor')).filter(
            ([, value]) => typeof value === 'object' && value[400] && value[500]
          )
    
          addUtilities(
            Object.fromEntries(
              colors.map(([name, colors]) => {
                let backgroundColor = colors[400] + '1a' // 10% opacity
                let stripeColor = colors[500] + '80' // 50% opacity
    
                return [
                  `.bg-stripes-${name}`,
                  {
                    backgroundColor,
                    backgroundImage: backgroundImage(stripeColor),
                    backgroundSize,
                  },
                ]
              })
            )
          )
    
          addUtilities({
            '.bg-stripes-white': {
              backgroundImage: backgroundImage('rgba(255 255 255 / 0.75)'),
              backgroundSize,
            },
          })
    
          addUtilities({
            '.ligatures-none': {
              fontVariantLigatures: 'none',
            },
          })

          addUtilities({
            '.bg-light-color-accent-1': {
              'background-color': theme('colors.light-palette.50'),
            },
            '.bg-light-color-accent-2': {
              'background-color': theme('colors.light-palette.100'),
            },
            '.bg-light-color-accent-3': {
              'background-color': theme('colors.light-palette.200'),
            },
            '.bg-light-color-accent-4': {
              'background-color': theme('colors.light-palette.300'),
            },
            '.bg-light-color-accent-5': {
              'background-color': theme('colors.light-palette.400'),
            },
            '.bg-light-color-accent-6': {
              'background-color': theme('colors.light-palette.500'),
            },
            '.bg-light-color-accent-7': {
              'background-color': theme('colors.light-palette.600'),
            },
            '.bg-light-color-accent-8': {
              'background-color': theme('colors.light-palette.700'),
            },
            '.bg-light-color-accent-9': {
              'background-color': theme('colors.light-palette.800'),
            },
            '.bg-light-color-accent-10': {
              'background-color': theme('colors.light-palette.900'),
            },
            '.bg-dark-color-accent-1': {
              'background-color': theme('colors.dark-palette.50'),
            },
            '.bg-dark-color-accent-2': {
              'background-color': theme('colors.dark-palette.100'),
            },
            '.bg-dark-color-accent-3': {
              'background-color': theme('colors.dark-palette.200'),
            },
            '.bg-dark-color-accent-4': {
              'background-color': theme('colors.dark-palette.300'),
            },
            '.bg-dark-color-accent-5': {
              'background-color': theme('colors.dark-palette.400'),
            },
            '.bg-dark-color-accent-6': {
              'background-color': theme('colors.dark-palette.500'),
            },
            '.bg-dark-color-accent-7': {
              'background-color': theme('colors.dark-palette.600'),
            },
            '.bg-dark-color-accent-8': {
              'background-color': theme('colors.dark-palette.700'),
            },
            '.bg-dark-color-accent-9': {
              'background-color': theme('colors.dark-palette.800'),
            },
            '.bg-dark-color-accent-10': {
              'background-color': theme('colors.dark-palette.900'),
            },
          })
        
        },
      ],
};
