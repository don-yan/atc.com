<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import {Carousel, initCarousels} from 'flowbite'


const items = ref([
  {
    img: 'https://flowbite.com/docs/images/carousel/carousel-1.svg',
    title: 'slide 1'
  },
  {
    img: 'https://flowbite.com/docs/images/carousel/carousel-2.svg',
    title: 'slide 2'
  },
  {
    img: 'https://flowbite.com/docs/images/carousel/carousel-3.svg',
    title: 'slide 3'
  },
  {
    img: 'https://flowbite.com/docs/images/carousel/carousel-4.svg',
    title: 'slide 4'
  },
]);

onMounted(() => {

  initCarousels()
})
</script>

<template>

  <div id="default-carousel" class="relative" data-carousel="slide" data-carousel-interval="5000">
    <!-- Carousel wrapper -->
    <div class="overflow-hidden relative h-56 rounded-lg sm:h-64 xl:h-80 2xl:h-96">
      <!-- Item 1 -->
      <div v-for="(item, idx) in items"
           class="hidden duration-700 ease-in-out"
           :class="idx === 0 ? 'absolute' : 'hidden'"
           data-carousel-item>
        <span
            class="absolute top-1/2 left-1/2 text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 sm:text-3xl dark:text-gray-800">
        {{item.title}}
        </span>
        <img :src="item.img"
             class="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2" alt="...">
      </div>

    </div>
    <!-- Slider indicators -->
    <div class="flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
      <button type="button"
              class="w-3 h-3 rounded-full"
              aria-current="false"
              aria-label="Slide 1"

              v-for="(item, idx) in items"
              :data-carousel-slide-to="idx"
      >

      </button>
    </div>
    <!-- Slider controls -->
    <button type="button"
            class="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
            data-carousel-prev>
        <span
            class="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor"
                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round"
                                                                              stroke-linejoin="round" stroke-width="2"
                                                                              d="M15 19l-7-7 7-7"></path></svg>
            <span class="hidden">Previous</span>
        </span>
    </button>
    <button type="button"
            class="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
            data-carousel-next>
        <span
            class="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor"
                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round"
                                                                              stroke-linejoin="round" stroke-width="2"
                                                                              d="M9 5l7 7-7 7"></path></svg>
            <span class="hidden">Next</span>
        </span>
    </button>
  </div>
</template>