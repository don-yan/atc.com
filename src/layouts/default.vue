<script lang="ts" setup>
import TailwindBreakpoints from "~/components/util/TailwindBreakpoints.vue";

import StructureHeader from '~/components/structure/Header.vue'
// import StructureHeader from '~/components/structure/HeaderV3.vue'
// import StructureFooter from '~/components/structure/Footer.vue'

import StructureFooter from '~/components/structure/FooterV3.vue'
// import StructureHeader from '~/components/structure/HeaderAlt.vue'
// import StructureFooter from '~/components/structure/FooterAlt.vue'


</script>
<template>

  <!--  <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap" rel="stylesheet">-->

  <TailwindBreakpoints/>
<!--  <header>-->

    <StructureHeader/>

<!--  </header>-->

  <!--  <main class="h-full py-4 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 flex align-items-center justify-content-between relative lg:static mb-3">-->
  <main class="lg:my-[130px]">
    <NuxtPage/>
  </main>

  <footer>
    <StructureFooter/>
  </footer>


</template>

