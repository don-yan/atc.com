<script lang="ts" setup>

import {consola, createConsola} from "consola";

import {LinkService} from "~/service/NavService";

const currentYear = new Date().getFullYear()

console.log('footer');

const props = defineProps({
  hideNav: Boolean
})


const navLinks = props.hideNav ? [] : LinkService.getNavLinks();



const socialLinks = LinkService.getSocialLinks();







</script>
<template>
  <div class="container flex flex-col mx-auto">
    <div class="flex flex-col items-center w-full my-20">
      <span class="mb-8 sm:mb-3">
        <img src="~assets/images/logo/atc-logo-abbreviated-transparent.png" alt="Acquired Taste Comedy Logo" height="50"
             class="lg:mr-2  max-h-12"/>
      </span>
      <div class="flex flex-col items-center gap-6 mb-8">
        <div
            class="flex flex-col sm:flex-row sm:flex-wrap md:flex-row items-center justify-center gap-5 lg:gap-12 gap-y-3 lg:flex-nowrap text-dark-grey-900">

          <!--           <div class="flex md:flex-wrap items-center justify-center gap-5 lg:gap-12 gap-y-3 sm:flex-col lg:flex-wrap text-dark-grey-900">-->

          <NuxtLink v-for="link in navLinks" :to="link.slug" class="text-gray-600 hover:text-gray-900">
            <span>{{ link.title }}</span>
          </NuxtLink>

        </div>
        <div class="flex items-center justify-center space-x-4 gap-2 text-primary">


          <a v-for="link in socialLinks" 
          :href="link.slug" 
          target="_blank"
          class="p-button-rounded border-0 font-light leading-tight">
            <!-- <Button
                class="button"
                text
                rounded
                :title="link.title"
            > -->
              <i class="icon pi" :class="link.icon"></i>
            <!-- </Button> -->
          </a>
        </div>
      </div>
      <div class="flex items-center">
        <p class="text-base font-normal leading-7 text-center text-grey-700 f">
          <span>
            &copy; {{ currentYear }} Acquired Taste Comedy.
          </span>
          <span class="block sm:inline">
            All rights reserved.
          </span>
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
  padding-bottom: 5px;
  border-bottom-style: solid;
  border-bottom-width: 3.1px;
  width: fit-content;
  border-color: red;
}

</style>
