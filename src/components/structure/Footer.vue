<script lang="ts" setup>

</script>
<template>

  <div class="py-4 px-4 mx-0 mt-8 lg:mx-8">
    <div class="grid justify-content-between">
      <div class="col-12 md:col-2" style="margin-top: -1.5rem">
        <NuxtLink to="/" class="flex flex-wrap align-items-center justify-content-center md:justify-content-start md:mb-0 mb-3 cursor-pointer">
          <!--          <img :src="logoUrl" alt="footer sections" width="50" height="50" class="mr-2"/>-->

          <img src="~assets/images/logo/atc-logo-abbreviated-transparent.png" alt="Acquired Taste Comedy Logo" height="50" class="lg:mr-2  max-h-9"/>

          <!--          <h4 class="font-medium text-3xl text-900">Acquired Taste Comedy</h4>-->
        </NuxtLink>
      </div>

      <div class="col-12 md:col-10 lg:col-7">
        <div class="grid text-center md:text-left">
          <div class="col-12 md:col-3">
            <h4 class="font-medium text-2xl line-height-3 mb-3 text-900">Info</h4>
            <NuxtLink to="/shows" class="line-height-3 text-xl block cursor-pointer mb-2 text-700">
              <span>Shows</span>
            </NuxtLink>
            <NuxtLink to="/about" class="line-height-3 text-xl block cursor-pointer mb-2 text-700">
              <span>About Us</span>
            </NuxtLink>
            <NuxtLink to="/links" class="line-height-3 text-xl block cursor-pointer mb-2 text-700">
              <span>Links</span>
            </NuxtLink>
          </div>

          <div class="col-12 md:col-3 mt-4 md:mt-0">
            <h4 class="font-medium text-2xl line-height-3 mb-3 text-900">Resources</h4>
            <NuxtLink to="/media" class="line-height-3 text-xl block cursor-pointer mb-2 text-700">
              <span>Media</span>
            </NuxtLink>
            <NuxtLink to="/contact" class="line-height-3 text-xl block cursor-pointer mb-2 text-700">
              <span>Contact</span>
            </NuxtLink>
            <NuxtLink to="/sandbox" class="line-height-3 text-xl block cursor-pointer mb-2 text-700">
              <span>Sandbox</span>
            </NuxtLink>

          </div>

        </div>
      </div>
    </div>
  </div>

</template>

<style lang="scss" scoped>

a.router-link-active span {
  //text-decoration: underline;
  //text-decoration-color: red;

  /* Increase this as per requirement */
  padding-bottom: 5px;
  border-bottom-style: solid;
  border-bottom-width: 3.1px;
  width: fit-content;
  border-color: red;
}

</style>
