<script lang="ts" setup>
import TailwindBreakpoints from "~/components/util/TailwindBreakpoints.vue";

import StructureHeader from '~/components/structure/Header.vue'

import StructureFooter from '~/components/structure/Footer.vue'


</script>
<template>


  <TailwindBreakpoints/>

  <!-- <div class="min-h-screen font-sans antialiased relative"> -->
  <!-- <header class="dark">
    <StructureHeader class="dark:bg-gray-800"/>
  </header> -->
  <header class="">
    <StructureHeader class=""/>
  </header>

  <!--  <main class="h-full py-4 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 flex align-items-center justify-content-between relative lg:static mb-3">-->
  <main class="mt-[130px] w-full max-w-[1000px] mx-auto">
    <NuxtPage/>
  </main>

  <footer>
    <StructureFooter/>
  </footer>
  <!-- </div> -->


</template>

