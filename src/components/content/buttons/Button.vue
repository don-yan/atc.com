<script lang="ts" setup>

const props = defineProps({
  text: String,
  url: String,
  isBlank: Boolean,
  showArrow: Boolean,
  isDisabled: Boolean
})

const target = props.isBlank ? '_blank' : '_self'
</script>

<template>

  <a
      :href="props.url"
      :target="target"
      class="inline-flex justify-center items-center py-2 px-6 text-base font-normal text-center text-white rounded-lg bg-red-600  hover:bg-red-500 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900">
    {{ props.text }}
    <svg v-if="props.showArrow" class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true"
         xmlns="http://www.w3.org/2000/svg"
         fill="none" viewBox="0 0 14 10">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"/>
    </svg>
  </a>


</template>

<style lang="scss" scoped>

</style>
