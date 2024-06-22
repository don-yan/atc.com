/**
 * Vue Equal Heights Plugin
 *
 * https://www.npmjs.com/package/@morev/equal-heights
 */

import {plugin as EqualHeights} from '@morev/equal-heights/vue';


export default defineNuxtPlugin((nuxtApp) => {

    // const config = useRuntimeConfig()

    nuxtApp.vueApp.use(EqualHeights, {})

    console.log('load match heights')
})
