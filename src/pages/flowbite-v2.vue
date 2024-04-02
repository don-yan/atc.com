<script lang="ts" setup>
import Banner from '~/components/content/Banner.vue'
import Hero from '~/components/content/hero/HeroV2.vue'

import { onMounted } from 'vue'
// import { initFlowbite } from 'flowbite'
// import FlowbiteModal from "~/components/content/modal/FlowbiteModal.vue";
import FlowbiteModalV2 from "~/components/content/modal/FlowbiteModalV2.vue";

// initialize components based on data attribute selectors
onMounted(() => {
  // initFlowbite();
  console.log('mount my page')
})

</script>

<template>


  <div class="wrapper flex justify-center">


  <FlowbiteModalV2 title="modal 1" id="modal-1"/>

  <FlowbiteModalV2 title="modal 2" id="modal-2"/>


  </div>


</template>
<style lang="scss">
</style>
