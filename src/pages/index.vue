<script lang="ts" setup>

import EventsList from '~/components/content/events/EventsList.vue'

import Button from '~/components/content/buttons/Button.vue'
import PageSection from '~/components/structure/PageSection.vue'
import EmailSignupForm from "~/components/forms/EmailSignupForm.vue";


definePageMeta({
  // layout: 'no-nav',
  layout: 'landing',
  title: 'Acquired Taste Comedy',

})

useHead({
  title: 'Acquired Taste Comedy',
  // title: 'Landing',
  titleTemplate: '%s'
})


// $gtag.pageview({ page_path: '/about' })


onMounted(() => {
  console.log('mount page')
})

type Link = {
  id: number,
  title: string,
  description: string,
  url: string
}
const links = ref<Link[]>([
  /*{
    id: 1,
    title: "Blog",
    description: "Check out my latest posts",
    url: "https://example.com/blog",
  },
  {
    id: 2,
    title: "Shop",
    description: "Browse my products",
    url: "https://example.com/shop",
  },
  {
    id: 3,
    title: "Twitter",
    description: "Follow me on X",
    url: "https://twitter.com/yourhandle",
  },*/
]);


function trackClick(link: Link) {
  console.log(`Clicked: ${link.title}`);
  // $gtag.pageview({ page_path: '/about' })
  // Add your analytics tracking here (e.g., gtag, custom event)
}

</script>
<template>


  <div>
    <section id="hero" class="scroll-mt-[105px]">
      <!--      <div class="bg-white dark:bg-gray-900 py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:grid lg:grid-cols-3 gap-8 lg:gap-16 rounded-3xl shadow-lg shadow-red-600">-->
      <div
          class="bg-white dark:bg-gray-900 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-3 gap-8 lg:gap-16 shadow-red-600">
        <div>
          <!--       <img class="mx-auto w-full lg:max-w-xl h-64 rounded-xl sm:h-96 shadow-xl object-cover" src="/images/promo/standup-comedy-event-arrow.jpg" />-->
          <img class="mx-auto w-full lg:max-w-xl h-64 rounded-xl sm:h-96 object-scale-down"
               src="/images/header/standup-arrow-red.png"/>
          <!--        <iframe class="aspect-video mx-auto w-full lg:max-w-xl h-64 rounded-lg sm:h-96 shadow-xl"
                          src="https://www.youtube.com/embed/1bV0ljC9CoY" title="YouTube video player" frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen></iframe>
                          -->
        </div>
        <div class="flex flex-col justify-center text-center col-span-2">
          <h1 class="mb-4 text-xl font-extrabold tracking-tight leading-none text-black md:text-3xl lg:text-4xl dark:text-white">
            Standup Comedy
            <strong class="block xs:inline">in Cambridge <br/><em>& beyond!</em></strong>
          </h1>
          <p class="mb-8 text-lg font-normal text-gray-900 lg:text-xl dark:text-gray-400">
            With a growing collection of extraordinary venues, rotating lineups of hilarious comics & surprise musical
            guests, <strong class="whitespace-nowrap">Acquired Taste Comedy</strong> is Greater Boston's leading
            purveyor of unparalleled
            underground comedy experience.
            <!--          <br/>
                      <br/>
                      Forget comedy shows, these are comedy events.-->
          </p>
          <div class="  justify-center space-y-4 sm:space-y-0">
            <Button :is-blank=true href="https://www.tickettailor.com/events/acquiredtastecomedy?ref=atc-website-hero"
                    text="Buy Tickets" :show-arrow="true"/>
          </div>
        </div>

      </div>
    </section>

    <PageSection id="links" title="Links" style="display:none;">
      <template #description>
        Links
      </template>
      <template #content>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <a
              v-for="link in links"
              :key="link.id"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="block"
              @click="trackClick(link)"
          >
            <div
                class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center space-x-4"
            >
              <!-- Icon (Flowbite/Tailwind) -->
              <div
                  class="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"
              >
                <svg
                    class="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>

              <!-- Link Info -->
              <div>
                <h3 class="text-lg font-semibold text-gray-900">{{ link.title }}</h3>
                <p class="text-sm text-gray-500">{{ link.description }}</p>
              </div>
            </div>
          </a>
        </div>


      </template>
    </PageSection>


    <PageSection id="events" title="Events" description="Come join the fun!">
      <template #content>
        <!--        <client-only>-->
        <EventsList id="events" title="Events"/>
        <!--        </client-only>-->
      </template>
    </PageSection>

    <PageSection id="media" title="Media">
      <template #description>
        See what all of the fuss is about.
      </template>
      <template #content>
        <iframe class="mx-auto w-full lg:max-w-xl h-64 rounded-lg sm:h-96 shadow-xl"
                src="https://www.youtube.com/embed/1bV0ljC9CoY" title="YouTube video player" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>

      </template>
    </PageSection>

    <PageSection id="contact" title="Contact">
      <template #description>
<!--        Contact us with any inquiries.-->
        Become a TasteBud!
      </template>
      <template #content>
<!-- TODO: fix vercel server function (precompile all TS)-->
<!--        <EmailSignupForm/>-->

          <div class="flex flex-col gap-2 text-center items-center">
          <p class="inline_">Join our mailing list!</p>

          <br/>

          <Button :is-blank=true
                  href="https://mailchi.mp/c77ba9dd35e3/acquired-taste-comedy"
                  text="Email Signup"
                  class="inline_ "
                  :show-arrow="false"/>
        </div>

      </template>
    </PageSection>

    <PageSection id="booking" title="Booking">
      <template #description>
        Interested in performing?
      </template>
      <template #content>
        <div class="flex flex-col gap-2 text-center items-center">
          <p class="inline_">Fill out the following form to get on a show!</p>

          <br/>

          <Button :is-blank=true
                  href="https://docs.google.com/forms/d/e/1FAIpQLSeac72xR7rzwFd7mW0QcKrnt-vpKfmh2vPxMGIK9r70UtwHcA/viewform?pli=1"
                  text="Comics Signup"
                  class="inline_ "
                  :show-arrow="false"/>
        </div>

      </template>
    </PageSection>

  </div>

</template>
