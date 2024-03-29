import {defineNuxtConfig} from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: ["@nuxtjs/tailwindcss", "nuxt-primevue"],
    primevue: {
        cssLayerOrder: "tailwind-base, primevue, tailwind-utilities, primeflex",
        components: {
            exclude: ["Editor", "Chart"]
        },
        ripple: true
    },
    // scss: ["~assets/scss/primevue-sass-theme-3.50.0/themes/mytheme/theme.scss"],
    css: [
        "primeflex/primeflex.css",
        "primeicons/primeicons.css",
        "assets/scss/primevue-sass-theme-3.50.0/themes/atc-theme/theme.scss"
        // "primevue/resources/themes/lara-light-purple/theme.css"
    ],

    srcDir: 'src/'

});
