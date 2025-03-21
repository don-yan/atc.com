<script lang="ts" setup>

import Button from '~/components/content/buttons/Button.vue'
import {LinkService} from "~/service/NavService.ts";
import {scrollToId} from "~/utils/scroll-utils.ts";

import {useMobileMenuStore} from '~/store/mobileMenu.ts';

const mobileMenuStore = useMobileMenuStore();

const props = defineProps({
  hideNav: Boolean,
  isLandingNav: Boolean
})

const navLinks = props.hideNav ? [] : props.isLandingNav ? LinkService.getLandingNavLinks() : LinkService.getNavLinks();


// const scrollToId = (id: string) => {
//
//   console.log('scrollToId', id)
//
//   document.getElementById(id)?.scrollIntoView({
//     behavior: 'smooth',
//     block: 'start',
//     inline: "nearest"
//   });
//
// }


const socialLinks = LinkService.getSocialLinks();


onMounted(() => {
  console.log('mount header')
})


// TODO: Underline current section based on scroll position

// TODO: Read hash onLoad & scroll to position


// TODO: Create "navigateTo()" function which either scrolls or pushes to router
// {route} = useNuxtApp()


// TODO: Separate Header into scroll vs navigate behavior

</script>
<template>
  <!--  <div class="py-6 px-6 mx-0 lg:px-20 flex items-center justify-between relative lg:fixed mb-4 shadow-md w-full top-0 bg-white z-20">-->
  <div
      class="py-6 px-6 mx-0 lg:px-20 flex justify-center fixed mb-4 shadow-md w-full top-0 left-0 bg-white z-20">
    <nav class="max-w-[1000px] mx-auto sm:mx-4 w-full flex items-center justify-between">
      <NuxtLink class="flex items-center" @click="scrollToId('hero')" title="Home">
        <NuxtImg
            class="mr-0 lg:mr-2 max-w-[75px] w-full"
            src="/images/logo/atc-logo-full-transparent.png"
            alt="Acquired Taste Comedy Logo"
            format="webp"
            provider="static"

        />
      </NuxtLink>

      <Button :is-blank=true
              href="https://www.tickettailor.com/events/acquiredtastecomedy?ref=atc-website-nav"
              text="Buy Tickets"
              class="block"
              v-if="props.hideNav"
              :show-arrow="false"/>

      <button @click="mobileMenuStore.toggleMobileMenu()" type="button" class="block lg:hidden focus:outline-none"
              :class="props.hideNav ? 'hidden' : ''">
        <i class="text-4xl pi" :class="mobileMenuStore.isOpen ? 'pi-times': 'pi-bars'"></i>
      </button>

      <div
          v-if="!props.hideNav"
          class="items-center surface-0 grow justify-between lg:flex absolute lg:static shadow-md lg:shadow-none right-0 px-12 lg:px-0 z-20 bg-white top-full"
          :class="mobileMenuStore.isOpen ? '' : 'hidden'">
        <div class="flex justify-between w-full items-center flex-col lg:flex-row">
          <ul class="list-none p-0 m-0 flex items-center select-none flex-col lg:flex-row cursor-pointer sm:last:pb-0y">
            <li v-for="link in navLinks">

              <!-- TODO: Create "navigateTo()" function which either scrolls or pushes to router  -->

              <NuxtLink v-if="!props.isLandingNav"
                        :to="link.slug"
                        class="flex m-0 px-0 py-4 text-900 font-medium leading-normal lg:ml-8">
                <span>{{ link.title }}</span>
              </NuxtLink>

              <NuxtLink
                  v-if="props.isLandingNav"
                  @click="scrollToId(link.slug)"
                  class="flex m-0 px-0 py-4 text-900 font-medium leading-normal lg:ml-8">
                <span>{{ link.title }}</span>
              </NuxtLink>

            </li>

          </ul>
          <div class="lg:hidden xl:hidden md:flex xs:flex sm:flex items-center justify-center space-x-4 gap-2 text-primary  border-t surface-border pt-4">


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
          <div class="flex justify-between lg:block border-t lg:border-t-0 surface-border py-4 lg:py-0 mt-4 lg:mt-0">

            <Button :is-blank=true
                    href="https://www.tickettailor.com/events/acquiredtastecomedy?ref=atc-website-nav"
                    text="Buy Tickets"
                    :show-arrow="false"/>

            <!--            <a href="https://www.tickettailor.com/events/acquiredtastecomedy?"-->
            <!--               target="_blank"-->
            <!--               class="px-3 py-1 shadow-lg shadow-gray-500/50 bg-primary text-white rounded-lg text-[15px] cursor-pointer active:scale-[.97]">-->
            <!--              &lt;!&ndash;          <Button label="Buy Tickets" class="p-button-rounded border-0 ml-8 font-light text-white leading-tight bg-primary hover:bg-red-400"></Button>&ndash;&gt;-->
            <!--              Buy Tickets-->
            <!--              -->
            <!--            </a>-->
          </div>
        </div>

      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>

a.router-link-active span {
  //text-decoration: underline;
  //text-decoration-color: red;

  /* Increase this as per requirement */
  padding-bottom: 1px;
  border-bottom-style: solid;
  border-bottom-width: 3.1px;
  width: fit-content;
  border-color: red;
}


</style>
