const colors = require('tailwindcss/colors');

module.exports = {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}'

    ],
    theme: {
        colors: {
            primary: '#FF0000'
                        transparent: 'transparent',
                        current: 'currentColor',
                        black: colors.black,
                        white: colors.white,
                        gray: colors.trueGray,
                        indigo: colors.indigo,
//                        red: colors.red,


                        yellow: colors.amber
        },
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

            }
        },
        screens: {
//            xs: '415px',
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px'
        }
    },
    plugins: []
};
