<script lang="ts" setup>
import {ref} from "vue";

let isOpen = ref(true);

</script>

<template>

  <div class="bg-gray-900 text-gray-100 p-4 flex justify-between lg:justify-center items-center flex-wrap space-y-2 mb-4" v-if="isOpen">
    <div class="font-bold mr-20">🔥 Hot Deals!</div>
    <div class="items-center hidden lg:flex">
      <span class="leading-normal">Libero voluptatum atque exercitationem praesentium provident odit.</span>
    </div>
    <!--    <a class="flex items-center ml-2 mr-20">
          <a class="text-white" href="#">
            <span class="underline font-bold">Learn More</span>
          </a>
        </a>-->
    <a @click="isOpen = false" v-ripple class="flex items-center no-underline justify-center rounded-full text-gray-50 hover:bg-bluegray-700 cursor-pointer transition-colors duration-150 p-ripple" style="width:2rem; height: 2rem">
      <i class="pi pi-times"></i>
    </a>
  </div>
</template>

<style lang="scss" scoped>

</style>
