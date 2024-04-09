<script lang="ts" setup>
import TailwindBreakpoints from "~/components/util/TailwindBreakpoints.vue";

import StructureHeader from '~/components/structure/Header.vue'
// import StructureHeader from '~/components/structure/HeaderScroll.vue'

import StructureFooter from '~/components/structure/Footer.vue'


</script>
<template>


   <TailwindBreakpoints/>

  <!-- <div class="min-h-screen font-sans antialiased relative"> -->
  <!-- <header class="dark">
    <StructureHeader class="dark:bg-gray-800"/>
  </header> -->
  <header class="">
    <StructureHeader class="" :hide-nav="false" :is-landing-nav="true"/>
  </header>

  <!--  <main class="h-full py-4 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 flex align-items-center justify-content-between relative lg:static mb-3">-->
  <main id="content" class="mt-[150px] w-full max-w-[1200px] mx-auto">
    <!-- <main id="content"> -->
  <!-- <div class="max-w-[85rem] mx-auto min-h-screen bg-white border-x-gray-200 py-10 px-4 sm:px-6 lg:px-8 xl:border-x dark:bg-gray-800 dark:border-x-gray-700"> -->
    <NuxtPage/>
    <!-- </div> -->
  </main>

  <footer>
    <StructureFooter  :hide-nav="true"/>
  </footer>
  <!-- </div> -->


</template>

