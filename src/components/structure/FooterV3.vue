<script lang="ts" setup>

const currentYear = new Date().getFullYear()

</script>
<template>
  <div class="container flex flex-col mx-auto">
    <div class="flex flex-col items-center w-full my-20">
      <span class="mb-8 sm:mb-3">
        <img src="~assets/images/logo/atc-logo-abbreviated-transparent.png" alt="Acquired Taste Comedy Logo" height="50" class="lg:mr-2  max-h-12"/>
      </span>
      <div class="flex flex-col items-center gap-6 mb-8">
        <div class="flex md:flex-wrap md:flex-row items-center sm:flex-col sm:flex-column justify-center gap-5 lg:gap-12 gap-y-3 lg:flex-nowrap text-dark-grey-900">

<!--           <div class="flex md:flex-wrap items-center justify-center gap-5 lg:gap-12 gap-y-3 sm:flex-col lg:flex-wrap text-dark-grey-900">-->

          <NuxtLink to="/shows" class="text-gray-600 hover:text-gray-900">
            <span>Shows</span>
          </NuxtLink>
          <NuxtLink to="/about" class="text-gray-600 hover:text-gray-900">
            <span>About</span>
          </NuxtLink>
          <!--        <NuxtLink to="/blog" class="text-gray-600 hover:text-gray-900"><span>Blog</span></NuxtLink>-->
          <!--          <NuxtLink to="/links"  class="text-gray-600 hover:text-gray-900"><span>Links</span></NuxtLink>-->
          <NuxtLink to="/media" class="text-gray-600 hover:text-gray-900">
            <span>Media</span>
          </NuxtLink>
          <NuxtLink to="/contact" class="text-gray-600 hover:text-gray-900">
            <span>Contact</span>
          </NuxtLink>
          <NuxtLink to="/sandbox" class="text-gray-600 hover:text-gray-900">
            <span>Sandbox</span>
          </NuxtLink>

        </div>
        <div class="flex items-center gap-1">


          <a href="mailto:atc@acquiredtastecomedy.com">
            <Button
                class="button"
                v-tooltip.bottom="'Email'"
                text
                rounded
            >

              <i class="icon pi pi-envelope"></i>

            </Button>
          </a>
          <a href="https://youtube.com/@acquiredtastecomedy" target="_blank">
            <Button
                class="button"
                v-tooltip.bottom="'YouTube'"
                text
                rounded

            >
              <i class="icon pi pi-youtube"></i>
            </Button>

          </a>
          <a href="https://instagram.com/acquiredtastecomedy" target="_blank">
            <Button
                class="button"
                v-tooltip.bottom="'Instagram'"
                text
                rounded

            >
              <i class="icon pi pi-instagram"></i>
            </Button>
          </a>
          <a href="https://facebook.com/acquiredtastecomedy" target="_blank">
            <Button
                class="button"
                v-tooltip.bottom="'Facebook'"
                text
                rounded

            >
              <i class="icon pi pi-facebook"></i>
            </Button>
          </a>
          <a href="https://www.tickettailor.com/events/acquiredtastecomedy?ref=website" target="_blank">
            <Button
                class="button"
                v-tooltip.bottom="'Tickets'"
                text
                rounded
            >
              <i class="icon pi pi-ticket"></i>
            </Button>
          </a>
        </div>
      </div>
      <div class="flex items-center">
        <p class="text-base font-normal leading-7 text-center text-grey-700">
          &copy; {{ currentYear }} Acquired Taste Comedy. All rights reserved.
        </p>
      </div>
    </div>
  </div>

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
