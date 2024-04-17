import {defineNuxtConfig} from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        pageTransition: {name: 'page', mode: 'out-in'},
    },
    devtools: {enabled: true},
    modules: [
        "@nuxt/image",
        "@nuxtjs/tailwindcss",
        // TODO: why cannt we remove `nuxt-primevue` as a dependency?
        //  "nuxt-primevue",
        // TODO: configure eslint & prettier
        // REF: https://dev.to/nikitadmitr/configure-eslint-prettier-for-nuxt-3-45f7
        // "@nuxtjs/eslint-module"
    ],
    // primevue: {
    //     // cssLayerOrder: "tailwind-base, primevue, tailwind-utilities, primeflex",
    //     cssLayerOrder: "tailwind-base, primevue, tailwind-utilities",
    //     components: {
    //         exclude: ["Editor", "Chart"]
    //     },
    //     ripple: true
    // },

    css: [

        "primeicons/primeicons.css",
        // "assets/scss/primevue-sass-theme-3.50.0/themes/atc-theme/theme.scss",
        // "primevue/resources/themes/lara-light-purple/theme.css"
    ],
    image: {
        provider: process.env.VERCEL_ENV ? 'vercel' : 'ipx',
    },


    runtimeConfig: {
        private: {
            CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
            CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
            TICKET_TAILOR_KEY: process.env.TICKET_TAILOR_KEY,
            MAILCHIMP_KEY: process.env.MAILCHIMP_KEY,
            MAILCHIMP_SERVER_PREFIX: process.env.MAILCHIMP_SERVER_PREFIX,
            MAILCHIMP_AUDIENCE_ID: process.env.MAILCHIMP_AUDIENCE_ID,
        },
    },
    srcDir: 'src/',
    ssr: true
    // vue: {
    //     compilerOptions: {
    //         // TODO
    //         // isCustomElement: (tag) =>
    //         //     ['swiper-slide', 'swiper-container'].includes(tag),
    //     },
    // },
    // alias:{
    //     '~':'./src'
    // }

})
