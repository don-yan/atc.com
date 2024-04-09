<script lang="ts" setup>
</script>
<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5 pt-36 mx-auto">
      <div class="flex flex-col">
        <div class="h-1 bg-gray-200 rounded overflow-hidden">
          <div class="w-24 h-full bg-red-500"></div>
        </div>
        <div class="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
          <h2 class="sm:w-2/5 text-gray-900 font-extrabold title-font text-4xl mb-2 sm:mb-0 dark:text-white">
            Contact</h2>
          <p class="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0">Contact us with any inquiries.</p>
        </div>
      </div>
      <div
          class="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
        <div class="relative flex-grow w-full">
          <label for="full-name" class="leading-7 text-sm text-gray-600">Full Name</label>
          <input type="text" id="full-name" name="full-name"
                 class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-transparent focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
        </div>
        <div class="relative flex-grow w-full">
          <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
          <input type="email" id="email" name="email"
                 class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-transparent focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
        </div>
        <button class="text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg">
          Submit
        </button>
      </div>
    </div>
  </section>
</template>