import {defineNuxtConfig} from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        pageTransition: {name: 'page', mode: 'out-in'},
    },
    devtools: {enabled: true},
    modules: ["@nuxtjs/tailwindcss", "nuxt-primevue",
        // TODO: configure eslint & prettier
        // REF: https://dev.to/nikitadmitr/configure-eslint-prettier-for-nuxt-3-45f7
        // "@nuxtjs/eslint-module"
    ],
    primevue: {
        // cssLayerOrder: "tailwind-base, primevue, tailwind-utilities, primeflex",
        cssLayerOrder: "tailwind-base, primevue, tailwind-utilities",
        components: {
            exclude: ["Editor", "Chart"]
        },
        ripple: true
    },

    css: [

        "primeicons/primeicons.css",
        "assets/scss/primevue-sass-theme-3.50.0/themes/atc-theme/theme.scss"
        // "primevue/resources/themes/lara-light-purple/theme.css"
    ],


    srcDir: 'src/',
    // vue: {
    //     compilerOptions: {
    //         // TODO
    //         // isCustomElement: (tag) =>
    //         //     ['swiper-slide', 'swiper-container'].includes(tag),
    //     },
    // },

});
