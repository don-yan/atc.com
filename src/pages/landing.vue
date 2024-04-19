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


    <PageSection id="events" title="Events" description=" See what all of the fuss is about.">
      <template #content>
        <EventsList id="events" title="Events"/>
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
        Contact us with any inquiries.
      </template>
      <template #content>
        <EmailSignupForm/>
      </template>
    </PageSection>


  </div>

</template>