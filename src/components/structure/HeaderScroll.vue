<script lang="ts" setup>

import {ref} from 'vue'
import {LinkService} from "~/service/NavService";

const props = defineProps({
  hideNav: Boolean
})

const navLinks = props.hideNav ? [] : LinkService.getNavLinks();


const isOpen = ref(props.hideNav)

const scrollToId = (id: string) => {

  console.log('scrollToId', id)

  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });

}

</script>
<template>
  <!--  <div class="py-6 px-6 mx-0 lg:px-20 flex items-center justify-between relative lg:fixed mb-4 shadow-md w-full top-0 bg-white z-20">-->
  <div
      class="py-6 px-6 mx-0 lg:px-20 flex justify-center fixed mb-4 shadow-md w-full top-0 left-0 bg-white z-20">
    <nav class="max-w-[1000px] mx-auto sm:mx-4 w-full flex items-center justify-between">
      <NuxtLink class="flex items-center" to="/" title="Home">
        <img src="~assets/images/logo/atc-logo-full-transparent.png" alt="Acquired Taste Comedy Logo"
             class="mr-0 lg:mr-2 max-w-[75px] w-full"/>
        <!--      <span class="text-900 font-medium text-2xl leading-normal mr-20">{{ props.hideNav }}</span>-->
      </NuxtLink>

      <div class="flex justify-between w-full">
        <button @click="isOpen = !isOpen" type="button" class="block lg:hidden focus:outline-none">
          <i class="text-4xl pi" :class="isOpen ? 'pi-times': 'pi-bars'"></i>
        </button>
        <div
            class="items-center surface-0 grow justify-between lg:flex absolute lg:static shadow-md lg:shadow-none right-0 px-12 lg:px-0 z-20 bg-white top-full"
            :class="isOpen ? '' : 'hidden'">
          <div class="flex justify-between w-full items-center flex-col lg:flex-row">
            <ul class="list-none p-0 m-0 flex items-center space-y-1 select-none flex-col lg:flex-row cursor-pointer ">
              <!--              <li v-for="link in navLinks">
                              <NuxtLink :to="link.slug"
                                        class="flex m-0 px-0 py-4 text-900 font-medium leading-normal lg:ml-8">
                                <span>{{ link.title }}</span>
                              </NuxtLink>
                            </li>-->
              <li>
                <a @click="scrollToId('shows')" class="flex m-0 px-0 py-4 text-900 font-medium leading-normal lg:ml-8">
                  Scroll</a>
              </li>
            </ul>
            <div class="flex justify-between lg:block border-t lg:border-t-0 surface-border py-4 lg:py-0 mt-4 lg:mt-0">
              <a href="https://www.tickettailor.com/events/acquiredtastecomedy?"
                 target="_blank"
                 class="px-3 py-1 shadow-lg shadow-gray-500/50 bg-primary text-white rounded-lg text-[15px] cursor-pointer active:scale-[.97]">
                <!--          <Button label="Buy Tickets" class="p-button-rounded border-0 ml-8 font-light text-white leading-tight bg-primary hover:bg-red-400"></Button>-->
                Buy Tickets
              </a>
            </div>
          </div>
        </div>
      </div>
      <div v-if="props.hideNav">
        <a href="https://www.tickettailor.com/events/acquiredtastecomedy?ref=website"
           target="_blank"
           class="px-3 py-2 shadow-gray-500/50 bg-primary text-white rounded-lg text-[15px] cursor-pointer active:scale-[.97]">
          <!--          <Button label="Buy Tickets" class="p-button-rounded border-0 ml-8 font-light text-white leading-tight bg-primary hover:bg-red-400"></Button>-->
          Buy Tickets
        </a>
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
