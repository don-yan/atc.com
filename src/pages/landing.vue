<script lang="ts" setup>

import ShowsList from '~/components/content/dynamic/ShowsList.vue'
import ContactForm from '~/components/forms/ContactForm.vue'
import Button from '~/components/content/buttons/Button.vue'


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


</script>
<template>


  <div>
    <section id="hero" class="">
      <!--      <div class="bg-white dark:bg-gray-900 py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:grid lg:grid-cols-3 gap-8 lg:gap-16 rounded-3xl shadow-lg shadow-red-600">-->
      <div
          class="bg-white dark:bg-gray-900 py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:grid lg:grid-cols-3 gap-8 lg:gap-16 shadow-red-600">
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
            <span class="block xs:inline">in Cambridge & beyond!</span>
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
    <!--    <section class="">
          <div
              class="bg-[#E0E2E3] dark:bg-gray-900 py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16 rounded-3xl shadow-lg shadow-red-600">
            <div>
              &lt;!&ndash;       <img class="mx-auto w-full lg:max-w-xl h-64 rounded-xl sm:h-96 shadow-xl object-cover" src="/images/promo/standup-comedy-event-arrow.jpg" />&ndash;&gt;
              <img class="mx-auto w-full lg:max-w-xl h-64 rounded-xl sm:h-96 object-scale-down"
                   src="/images/header/arrow-header.png"/>
              &lt;!&ndash;        <iframe class="aspect-video mx-auto w-full lg:max-w-xl h-64 rounded-lg sm:h-96 shadow-xl"
                              src="https://www.youtube.com/embed/1bV0ljC9CoY" title="YouTube video player" frameborder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowfullscreen></iframe>
                              &ndash;&gt;
            </div>
            <div class="flex flex-col justify-center text-center">
              <h1 class="mb-4 text-xl font-extrabold tracking-tight leading-none text-black md:text-3xl lg:text-4xl dark:text-white">
                Standup Comedy
                <span class="block xs:inline">in Cambridge & beyond!</span>
              </h1>
              <p class="mb-8 text-lg font-normal text-gray-900 lg:text-xl dark:text-gray-400"><strong>Acquired Taste
                Comedy</strong> is
                Greater Boston's leading purveyor of acclaimed Standup Comedy Events™.
                <br/>
                <br/>
                With a growing collection of extraordinary venues, rotating lineups of hilarious comics & surprise musical
                guests, get ready to discover an unparalleled underground comedy experience.
                &lt;!&ndash;          <br/>
                          <br/>
                          Forget comedy shows, these are comedy events.&ndash;&gt;
              </p>
              <div class="  justify-center space-y-4 sm:space-y-0">
                <a
                    href="https://www.tickettailor.com/events/acquiredtastecomedy?ref=website"
                    target="_blank"
                    class="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-lg bg-primary hover:bg-red-900 focus:ring-4 focus:ring-red-300 dark:focus:ring-blue-900">
                  Buy Tickets
                  <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                       fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
                </a>

              </div>
            </div>

          </div>
        </section>-->

    <ShowsList id="events"/>

    <section id="media" class="text-gray-600 body-font">
      <div class="container px-5 pt-36 mx-auto">
        <div class="flex flex-col">
          <div class="h-1 bg-gray-200 rounded overflow-hidden">
            <!--            <div class="w-24 h-full bg-red-500"></div>-->
            <div class="w-full h-full bg-red-500"></div>
          </div>
          <div class="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
            <h2 class="sm:w-2/5 text-gray-900 font-extrabold title-font text-4xl mb-2 sm:mb-0 dark:text-white">
              Media</h2>
            <p class="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0">See what all of the fuss is about.</p>
          </div>
        </div>

        <div
            class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 gap-8 lg:gap-16 rounded-3xl- shadow-lg shadow-none shadow-red-600">

          <iframe class="mx-auto w-full lg:max-w-xl h-64 rounded-lg sm:h-96 shadow-xl"
                  src="https://www.youtube.com/embed/1bV0ljC9CoY" title="YouTube video player" frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen></iframe>

        </div>
      </div>
    </section>


    <ContactForm id="contact"/>
  </div>

</template>