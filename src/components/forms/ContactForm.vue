<script lang="ts" setup>

import EmailSignupForm from "~/components/forms/EmailSignupForm.vue";
</script>
<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5 pt-36 mx-auto">
      <div class="flex flex-col">
        <div class="h-1 bg-gray-200 rounded overflow-hidden">
          <!--            <div class="w-24 h-full bg-red-500"></div>-->
          <div class="w-full h-full bg-red-500"></div>
        </div>
        <div class="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
          <h2 class="sm:w-2/5 text-gray-900 font-extrabold title-font text-4xl mb-2 sm:mb-0 dark:text-white">
            Contact</h2>
          <p class="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0">Contact us with any inquiries.</p>
        </div>
      </div>
      <EmailSignupForm/>
    </div>
  </section>
</template>