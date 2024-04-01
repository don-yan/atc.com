<script lang="ts" setup>
import {computed} from "vue";
// import {RouteLocationRaw} from "#build/node_modules/vue-router";
const route = useRoute();

// pass it a string to check if the route has a parent with that name. its wrapped in a computed so that its reactive
const isChild = computed(() => (name: string) => {
  return route.matched.map((item) => {
    return item.name;
  }).includes(name);
});

const props = defineProps({
  hideNav: Boolean
})

</script>
<template>
  <!--  <div class="py-6 px-6 mx-0 lg:px-20 flex items-center justify-between relative lg:fixed mb-4 shadow-md w-full top-0 bg-white z-20">-->
  <div class="py-6 px-6 mx-0 lg:px-20 flex items-center justify-between fixed mb-4 shadow-md w-full top-0 left-0 bg-white z-20">
    <div class="max-w-[1200px] mx-auto w-full flex items-center justify-between">
      <NuxtLink class="flex items-center" to="/">
        <img src="~assets/images/logo/atc-logo-full-transparent.png" alt="Acquired Taste Comedy Logo" class="mr-0 lg:mr-2 max-w-[75px] w-full"/>
        <!--      <span class="text-900 font-medium text-2xl leading-normal mr-20">{{ props.hideNav }}</span>-->
      </NuxtLink>
      <a
          v-ripple
          v-styleclass="{
                        selector: '@next',
                        enterClass: 'hidden',
                        leaveToClass: 'hidden',
                        hideOnOutsideClick: true
                    }"
          class="cursor-pointer block lg:hidden text-700 p-ripple"
      >
        <i class="pi pi-bars text-4xl"></i>
      </a>
      <div class="items-center surface-0 grow justify-between hidden lg:flex absolute lg:static shadow-md lg:shadow-none right-0 px-12 lg:px-0 z-20 bg-white top-full">
        <div class="flex justify-between w-full items-center flex-col lg:flex-row">
          <ul class="list-none p-0 m-0 flex lg:items-center select-none flex-col lg:flex-row cursor-pointer">
            <li>
              <NuxtLink v-ripple to="/shows" class="flex m-0 md:ml-8 px-0 py-4 text-900 font-medium leading-normal p-ripple">
                <span>Shows</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink v-ripple to="/media" class="flex m-0 md:ml-8 px-0 py-4 text-900 font-medium leading-normal p-ripple">
                <span>Media</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink v-ripple to="/about" class="flex m-0 md:ml-8 px-0 py-4 text-900 font-medium leading-normal p-ripple">
                <span>About</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink v-ripple to="/contact" class="flex m-0 md:ml-8 px-0 py-4 text-900 font-medium leading-normal p-ripple">
                <span>Contact</span>
              </NuxtLink>
            </li>
          </ul>
          <div class="flex justify-between lg:block border-t lg:border-t-0 surface-border py-4 lg:py-0 mt-4 lg:mt-0">
            <a href="https://www.tickettailor.com/events/acquiredtastecomedy?" target="_blank">
              <!--          <Button label="Buy Tickets" class="p-button-rounded border-0 ml-8 font-light text-white leading-tight bg-primary hover:bg-red-400"></Button>-->
              <Button label="Buy Tickets" class="p-button-rounded border-0 font-light text-white leading-tight"></Button>
            </a>
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
  padding-bottom: 1px;
  border-bottom-style: solid;
  border-bottom-width: 3.1px;
  width: fit-content;
  border-color: red;
}


</style>
