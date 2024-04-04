const colors = require('tailwindcss/colors');

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        './src/components/**/*.{js,vue,ts}',
        './src/layouts/**/*.vue',
        './src/pages/**/*.vue',
        './src/plugins/**/*.{js,ts}',

        './nuxt.config.{js,ts}',
        "./node_modules/flowbite/**/*.{js,ts}"

    ],
    darkMode: 'class',
    extend: {
        colors: {
            // NOTE: Generated with https://uicolors.app/create
            'red': {
                '50': '#fff0f0',
                '100': '#ffdddd',
                '200': '#ffc0c0',
                '300': '#ff9494',
                '400': '#ff5757',
                '500': '#ff2323',
                '600': '#ff0000',
                '700': '#d70000',
                '800': '#b10303',
                '900': '#920a0a',
                '950': '#500000'
            }

        },

    },
    theme: {
        colors: {
            primary: '#FF0000',
            transparent: 'transparent',
            current: 'currentColor',
            black: colors.black,
            white: colors.white,
            gray: colors.neutral,
            indigo: colors.indigo, //                        red: colors.red,


            yellow: colors.amber
        },
        extend: {
            fontFamily: {
                'sans': ['"Proxima Nova"', ...defaultTheme.fontFamily.sans],
                'don': ['"DonYan"', ...defaultTheme.fontFamily.sans]
            },
        }, screens: {
            xs: '415px',
            ...defaultTheme.screens
            //  sm: '576px', md: '768px', lg: '992px', xl: '1200px'

            /*
            // Default Values
            
            'sm': '640px',
            // => @media (min-width: 640px) { ... }
      
            'md': '768px',
            // => @media (min-width: 768px) { ... }
      
            'lg': '1024px',
            // => @media (min-width: 1024px) { ... }
      
            'xl': '1280px',
            // => @media (min-width: 1280px) { ... }
      
            '2xl': '1536px',
            // => @media (min-width: 1536px) { ... }
            */
        }
    }, variants: {},
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        // require('@tailwindcss/aspect-ratio'),
        require('flowbite/plugin')

    ]
};
