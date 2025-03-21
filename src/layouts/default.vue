<script lang="ts" setup>


import StructureHeader from '~/components/structure/Header.vue'

import StructureFooter from '~/components/structure/Footer.vue'



import {ref} from 'vue'



// We'll hold our dev-only component (if available) in a reactive ref.
const DevOnlyComponent = ref<typeof import('*.vue').default | null>(null)

if (process.env.NODE_ENV === 'development') {
  // Dynamically import the component so it doesn't get bundled in production.
  import('~/components/util/TailwindBreakpoints.vue').then(module => {
    DevOnlyComponent.value = module.default
  })
}

</script>
<template>


  <!-- Only render the dev-only component if it was imported -->
  <component v-if="DevOnlyComponent" :is="DevOnlyComponent"/>

  <!-- <div class="min-h-screen font-sans antialiased relative"> -->
  <!-- <header class="dark">
    <StructureHeader class="dark:bg-gray-800"/>
  </header> -->
  <header class="">
    <StructureHeader class=""/>
  </header>

  <!--  <main class="h-full py-4 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 flex align-items-center justify-content-between relative lg:static mb-3">-->
  <main id="content" class="mt-[130px] w-full max-w-[1000px] mx-auto">
    <!-- <main id="content"> -->
    <!-- <div class="max-w-[85rem] mx-auto min-h-screen bg-white border-x-gray-200 py-10 px-4 sm:px-6 lg:px-8 xl:border-x dark:bg-gray-800 dark:border-x-gray-700"> -->
    <NuxtPage/>
    <!-- </div> -->
  </main>

  <footer>
    <StructureFooter/>
  </footer>
  <!-- </div> -->


</template>

