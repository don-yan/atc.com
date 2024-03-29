<script lang="ts" setup>


import StructureHeader from '~/components/structure/Header.vue'
// import StructureFooter from '~/components/structure/Footer.vue'

// import StructureHeader from '~/components/structure/HeaderAlt.vue'
// import StructureFooter from '~/components/structure/FooterAlt.vue'
import StructureFooter from '~/components/structure/FooterV3.vue'

const hideNav = false;
</script>
<template>

  <header>
    <StructureHeader :hide-nav=false />



  </header>

  <main class="h-full py-4 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 flex align-items-center justify-content-between relative lg:static mb-3">
    <NuxtPage/>
  </main>

  <footer>
    <StructureFooter/>
  </footer>


</template>

