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
    // scss: ["primeflex/primeflex.scss"],
    css: ["primeflex/primeflex.css", "primeicons/primeicons.css", "primevue/resources/themes/lara-light-purple/theme.css"],

    srcDir: 'src/'

});
