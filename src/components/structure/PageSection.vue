<script lang="ts" setup>

const props = defineProps({
  title: String,
  description: String,

})

</script>

<template>
  <section class="text-gray-600 body-font scroll-mt-[115px] mt-12">
    <div class="container px-5 mx-auto">
      <div class="flex flex-col">
        <div class="h-1 bg-gray-200 rounded overflow-hidden">
          <!--            <div class="w-24 h-full bg-red-500"></div>-->
          <div class="w-full h-full bg-red-500"></div>
        </div>
        <div class="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
          <h2 class="sm:w-2/5 text-gray-900 font-extrabold title-font text-4xl mb-2 sm:mb-0 dark:text-white">
            {{ props.title }}
          </h2>
          <p  class="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0">
            <slot name="description">
              {{props.description}}
            </slot>
          </p>
        </div>
      </div>

      <div
          class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 gap-8 lg:gap-16 rounded-3xl- shadow-lg shadow-none shadow-red-600">

        <slot name="content">

        </slot>


      </div>
    </div>
  </section>

</template>

<style lang="scss" scoped>

</style>
