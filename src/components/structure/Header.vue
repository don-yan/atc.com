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
  <div class="py-4 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 flex align-items-center justify-content-between relative lg:static mb-3">
    <NuxtLink class="flex align-items-center" to="/">
      <img src="~assets/images/logo/atc-logo-full-transparent.png" alt="Acquired Taste Comedy Logo" class="mr-0 lg:mr-2 max-w-[75px] w-full"/>
<!--      <span class="text-900 font-medium text-2xl line-height-3 mr-8">{{ props.hideNav }}</span>-->
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
    <div class="align-items-center surface-0 flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full left-0 px-6 lg:px-0 z-2" style="top: 120px">
      <ul class="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row cursor-pointer">
        <li>
          <NuxtLink v-ripple to="/shows" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple" :class="{'active':isChild('/shows')}">
            <span>Shows</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink v-ripple to="/media" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple">
            <span>Media</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink v-ripple to="/about" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple">
            <span>About</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink v-ripple to="/contact" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple">
            <span>Contact</span>
          </NuxtLink>
        </li>
      </ul>
      <div class="flex justify-content-between lg:block border-top-1 lg:border-top-none surface-border py-3 lg:py-0 mt-3 lg:mt-0">
        <a href="https://www.tickettailor.com/events/acquiredtastecomedy?" target="_blank">
<!--          <Button label="Buy Tickets" class="p-button-rounded border-none ml-5 font-light text-white line-height-2 bg-primary hover:bg-red-400"></Button>-->
          <Button label="Buy Tickets" class="p-button-rounded border-none ml-5 font-light text-white line-height-2"></Button>
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

a.router-link-active span{
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
