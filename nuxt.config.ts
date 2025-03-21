import {defineNuxtConfig} from 'nuxt/config'
import viteTsConfigPaths from 'vite-tsconfig-paths';
// import { resolve } from 'path';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    /*  alias: {
          "~": "./src", // Ensure ~ points to src/
          "#shared": "./shared",
          "~": resolve(__dirname, 'src'),
          "#shared": resolve(__dirname, 'shared')
      },
  */
    app: {
        pageTransition: {name: 'page', mode: 'out-in'},
    },

    devtools: {enabled: true},

    modules: [
        "@nuxt/image",
        "@nuxtjs/tailwindcss",
        '@pinia/nuxt',
        "@nuxt/eslint"
    ],

    css: [
        '../node_modules/flowbite-vue/dist/index.css'
    ],

    image: {
        provider: process.env.VERCEL_ENV ? 'vercel' : 'ipx',
        ipx: {
            // dir: 'public',
        },
    },

    // Add nitro.preset here
    nitro: {
        preset: 'vercel', // Targets Vercel Serverless Functions
        prerender: {
            crawlLinks: true, // Optional: Prerender pages
            routes: ['/', '/events', '/links'] // Prerender homepage
        },
        routeRules: {
            '/api/**': {isr: false, runtime: 'nodejs'}, // Ensure APIs are dynamic
            // '/**': { // Static pages
            //     isr: false // Optional: Incremental Static Regeneration
            // }
        },
        // serverAssets: [{ baseName: 'assets', dir: './assets' }], // Ensure server-side assets are included
        output: {
            dir: '.output',
            publicDir: 'public',
            serverDir: '.output/server' // Explicitly set server output
        }
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
        public: {
            GTAG_ID: process.env.GTAG_ID
        }
    },

    srcDir: 'src/',
    ssr: true,
    target: 'static',

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
    typescript: {
        shim: true, // Disable shims to enforce strict TS
    },
    vite: {
        plugins: [
            viteTsConfigPaths({
                root: '.',
                loose: true
            })
        ]
    },

    compatibilityDate: "2025-03-20"
})
