<script lang="ts" setup>
import Button from '~/components/content/buttons/Button.vue';
import { LinkService } from '~/service/NavService.ts';
import { scrollToId } from '~/utils/scroll-utils.ts';
import { useMobileMenuStore } from '~/store/mobileMenu';

const mobileMenuStore = useMobileMenuStore();

const props = defineProps({
  hideNav: {
    type: Boolean,
    default: false,
  },
  isLandingNav: {
    type: Boolean,
    default: false,
  },
});

const navLinks = props.hideNav
  ? []
  : props.isLandingNav
    ? LinkService.getLandingNavLinks()
    : LinkService.getNavLinks();

const socialLinks = LinkService.getSocialLinks();

onMounted(() => {
  console.log('mount header');
});
</script>

<template>
  <div class="py-6 px-6 lg:px-20 flex justify-center fixed w-full top-0 left-0 bg-white shadow-md z-20">
    <nav class="max-w-[1000px] mx-auto sm:mx-4 w-full flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink class="flex items-center" @click="scrollToId('hero')" title="Home">
        <img
            class="mr-0 lg:mr-2 max-w-[75px] w-full"
            src="/images/logo/atc-logo-full-transparent.png"
            alt="Acquired Taste Comedy Logo"
        />
      </NuxtLink>

      <!-- Buy Tickets Button (when hideNav is true) -->
      <Button
        v-if="hideNav"
        :is-blank="true"
              href="https://www.tickettailor.com/events/acquiredtastecomedy?ref=atc-website-nav"
              text="Buy Tickets"
              class="block"
        :show-arrow="false"
      />

      <!-- Hamburger Button (Mobile) -->
      <button
        v-if="!hideNav"
        @click="mobileMenuStore.toggleMobileMenu"
        type="button"
        class="lg:hidden focus:outline-none"
        aria-label="Toggle mobile menu"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            v-if="!mobileMenuStore.isOpen"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <!-- Navigation (Desktop + Mobile Menu) -->
      <div
        v-if="!hideNav"
        class="items-center grow justify-between lg:flex"
        :class="[
          mobileMenuStore.isOpen ? 'block' : 'hidden lg:block',
          'absolute lg:static shadow-md lg:shadow-none right-0 px-12 lg:px-0 z-20 bg-white top-full w-full lg:w-auto',
        ]"
      >
        <div class="flex justify-between w-full items-center flex-col lg:flex-row">
          <!-- Nav Links -->
          <ul class="list-none p-0 m-0 flex items-center flex-col lg:flex-row cursor-pointer">
            <li v-for="link in navLinks" :key="link.slug">
              <NuxtLink
                v-if="!isLandingNav"
                        :to="link.slug"
                @click="mobileMenuStore.closeMobileMenu"
                class="flex m-0 px-0 py-4 text-900 font-medium leading-normal lg:ml-8"
              >
                <span>{{ link.title }}</span>
              </NuxtLink>
              <NuxtLink
                v-if="isLandingNav"
                @click="() => { scrollToId(link.slug); mobileMenuStore.closeMobileMenu(); }"
                class="flex m-0 px-0 py-4 text-900 font-medium leading-normal lg:ml-8"
              >
                <span>{{ link.title }}</span>
              </NuxtLink>
            </li>
          </ul>

          <!-- Social Links (Mobile Only) -->
          <div
            class="lg:hidden flex items-center justify-center space-x-4 gap-2 text-primary border-t surface-border pt-4"
          >
            <a
              v-for="link in socialLinks"
              :key="link.slug"
               :href="link.slug"
               target="_blank"
              class="p-button-rounded border-0 font-light leading-tight"
              @click="mobileMenuStore.closeMobileMenu"
            >
              <i class="icon pi" :class="link.icon"></i>
            </a>
          </div>

          <!-- Buy Tickets Button -->
          <div class="flex justify-between lg:block lg:border-t-0  py-4 lg:py-0 mt-1 lg:mt-0">
<!-- surface-border -->
            <Button
              :is-blank="true"
                    href="https://www.tickettailor.com/events/acquiredtastecomedy?ref=atc-website-nav"
                    text="Buy Tickets"
              :show-arrow="false"
              @click="mobileMenuStore.closeMobileMenu"
            />
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
a.router-link-active span {
  padding-bottom: 1px;
  border-bottom-style: solid;
  border-bottom-width: 3.1px;
  width: fit-content;
  border-color: red;
}
</style>
