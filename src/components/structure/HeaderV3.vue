<template>
  <header class="py-4 px-4 mx-0 lg:px-8  sm:flex sm:justify-between sm:items-center mb-3 lg:fixed lg:top-0 lg:w-full shadow-md">
    <div class="flex items-center justify-between px-4 py-3 sm:p-0">

      <!--        <img class="h-8" src="/img/logo-inverted.svg" alt="Workcation">-->
      <img src="~assets/images/logo/atc-logo-full-transparent.png" alt="Acquired Taste Comedy Logo" class="mr-0 lg:mr-2 max-w-[75px] w-full"/>
      <!--         <img src="~assets/images/logo/atc-logo-full-transparent.png" alt="Acquired Taste Comedy" class="h-8"/>-->
    </div>
    <div class="sm:hidden">
      <button @click="isOpen = !isOpen" type="button" class="block text-gray-500 focus:outline-none">
        <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
          <path v-if="isOpen" fill-rule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>
          <path v-if="!isOpen" fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
        </svg>
      </button>
    </div>

    <div :class="isOpen ? 'block' : 'hidden'" class="px-2 pt-2 pb-4 sm:flex sm:p-0 text-black justify-between">
      <nav class="sm:flex justify-center">

        <NuxtLink v-ripple to="/shows" class="flex m-0 sm:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple">
          <span>Shows</span>
        </NuxtLink>
        <NuxtLink v-ripple to="/media" class="flex m-0 sm:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple">
          <span>Media</span>
        </NuxtLink>
        <NuxtLink v-ripple to="/about" class="flex m-0 sm:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple">
          <span>About</span>
        </NuxtLink>
        <NuxtLink v-ripple to="/contact" class="flex m-0 sm:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple">
          <span>Contact</span>
        </NuxtLink>
        <!--      <a href="#" class="mt-1 block px-2 py-1  font-semibold rounded hover:bg-gray-800 sm:mt-0 sm:ml-2">Trips</a>-->
        <!--      <a href="#" class="mt-1 block px-2 py-1  font-semibold rounded hover:bg-gray-800 sm:mt-0 sm:ml-2">Messages</a>-->
      </nav>
      <a href="https://www.tickettailor.com/events/acquiredtastecomedy?" target="_blank">
        <!--          <Button label="Buy Tickets" class="p-button-rounded border-none ml-5 font-light text-white line-height-2 bg-primary hover:bg-red-400"></Button>-->
        <Button label="Buy Tickets" class="p-button-rounded border-none ml-5 font-light text-white line-height-2"></Button>
      </a>
    </div>
  </header>
</template>

<script>
export default {
  data () {
    return {
      isOpen: false
    };
  }
};
</script>
