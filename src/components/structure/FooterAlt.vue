<script lang="ts" setup>


</script>
<template>

  <!-- Foooter -->
  <section class="bg-white">
    <div class="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
      <div class="flex flex-wrap justify-center -mx-5 -my-2">
        <NuxtLink to="/" class="flex flex-wrap align-items-center justify-content-center md:justify-content-start md:mb-0 mb-3 cursor-pointer">
          <!--          <img :src="logoUrl" alt="footer sections" width="50" height="50" class="mr-2"/>-->

          <img src="~assets/images/logo/atc-logo-abbreviated-transparent.png" alt="Acquired Taste Comedy Logo" height="50" class="lg:mr-2  max-h-9"/>

          <!--          <h4 class="font-medium text-3xl text-900">Acquired Taste Comedy</h4>-->
        </NuxtLink>
      </div>
    </div>
    <div class="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
      <nav class="flex flex-wrap justify-center -mx-5 -my-2">
        <div class="px-5 py-2">
          <NuxtLink to="/" class="flex flex-wrap align-items-center justify-content-center md:justify-content-start md:mb-0 mb-3 cursor-pointer">
            <!--          <img :src="logoUrl" alt="footer sections" width="50" height="50" class="mr-2"/>-->

            <img src="~assets/images/logo/atc-logo-abbreviated-transparent.png" alt="Acquired Taste Comedy Logo" height="50" class="lg:mr-2  max-h-9"/>

            <!--          <h4 class="font-medium text-3xl text-900">Acquired Taste Comedy</h4>-->
          </NuxtLink>
        </div>
        <div class="px-5 py-2">
          <a href="#" class="text-base leading-6 text-gray-500 hover:text-gray-900">
            About
          </a>
        </div>
        <div class="px-5 py-2">
          <a href="#" class="text-base leading-6 text-gray-500 hover:text-gray-900">
            Blog
          </a>
        </div>
        <div class="px-5 py-2">
          <a href="#" class="text-base leading-6 text-gray-500 hover:text-gray-900">
            Team
          </a>
        </div>
        <div class="px-5 py-2">
          <a href="#" class="text-base leading-6 text-gray-500 hover:text-gray-900">
            Pricing
          </a>
        </div>
        <div class="px-5 py-2">
          <a href="#" class="text-base leading-6 text-gray-500 hover:text-gray-900">
            Contact
          </a>
        </div>
        <div class="px-5 py-2">
          <a href="#" class="text-base leading-6 text-gray-500 hover:text-gray-900">
            Terms
          </a>
        </div>
      </nav>
      <div class="flex justify-center mt-8 space-x-6">

        <Button
            class="button"
            v-tooltip.bottom="'Email'"
            text
            rounded
            @click="handleLink('mail')"
        >
          <a href="#">
          <i class="icon pi pi-envelope"></i>
            </a>
        </Button>

        <Button
            class="button"
            v-tooltip.bottom="'YouTube'"
            text
            rounded
            @click="handleLink('youtube')"
        >
          <i class="icon pi pi-youtube"></i>
        </Button>

        <Button
            class="button"
            v-tooltip.bottom="'Instagram'"
            text
            rounded
            @click="handleLink('instagram')"
        >
          <i class="icon pi pi-instagram"></i>
        </Button>

        <Button
            class="button"
            v-tooltip.bottom="'Facebook'"
            text
            rounded
            @click="handleLink('facebook')"
        >
          <i class="icon pi pi-facebook"></i>
        </Button>

        <Button
            class="button"
            v-tooltip.bottom="'Tickets'"
            text
            rounded
            @click="handleLink('ticket-tailor')"
        >
          <i class="icon pi pi-ticket"></i>
        </Button>

      </div>
      <p class="mt-8 text-base leading-6 text-center text-gray-400  text-quicksand">
        © 2024 Acquired Taste Comedy
        <br/>
        All rights reserved.
      </p>
    </div>
  </section>

</template>

<style lang="scss" scoped>

a.router-link-active span {
  //text-decoration: underline;
  //text-decoration-color: red;

  /* Increase this as per requirement */
  padding-bottom: 15px;
  border-bottom-style: solid;
  border-bottom-width: 3.1px;
  width: fit-content;
  border-color: red;
}

</style>
