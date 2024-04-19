/**
 * Vue Google Tag Plugin
 *
 * vue-gtag-next
 */
import VueGtag, {trackRouter} from 'vue-gtag-next'


export default defineNuxtPlugin((nuxtApp) => {

    const config = useRuntimeConfig()

    nuxtApp.vueApp.use(VueGtag, {
        property: {
            id: config.public.GTAG_ID
        }
    })
    trackRouter(useRouter())

    // nuxtApp.provide('contentfulClient', client)
})