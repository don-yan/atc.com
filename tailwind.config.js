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
//            primary: '#FF0000',
//            transparent: 'transparent',
//            current: 'currentColor',
//            black: colors.black,
//            white: colors.white,
//            gray: colors.trueGray,
//            indigo: colors.indigo,
//            red: colors.red,
//
//
//            yellow: colors.amber
        },
        extend: {
            colors: {
                red: {
                    // TODO-YK: how to set default color?
                    // Reference: https://tailwindcss.com/docs/customizing-colors
                    500: '#FF0000'
                }
            }
        },
    },
    plugins: []
};
