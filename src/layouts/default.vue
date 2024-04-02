<script lang="ts" setup>
import TailwindBreakpoints from "~/components/util/TailwindBreakpoints.vue";

import StructureHeader from '~/components/structure/Header.vue'

import StructureFooter from '~/components/structure/Footer.vue'


</script>
<template>


  <TailwindBreakpoints/>

  <header>
    <StructureHeader/>
  </header>

  <!--  <main class="h-full py-4 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 flex align-items-center justify-content-between relative lg:static mb-3">-->
  <main class="mt-[130px]">
    <NuxtPage/>
  </main>

  <footer>
    <StructureFooter/>
  </footer>


</template>

