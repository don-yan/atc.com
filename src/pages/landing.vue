<script lang="ts" setup>


definePageMeta({
  layout: 'no-nav'
})

</script>
<template>


  <div class="flex flex-col  space-y-4">
  <section class="bg-white dark:bg-gray-900">
    <div
        class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16 rounded-3xl shadow-lg shadow-red-600">
      <div class="flex flex-col justify-center">
        <h1 class="font-don mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Standup Comedy
          <span class="block md:inline">in Cambridge & beyond!</span>
        </h1>
        <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Acquired Taste Comedy is Greater
          Boston's leading purveyor of acclaimed Standup Comedy Events™.
          <br/>
          <br/>
          With a growing collection of extraordinary venues, rotating lineups of hilarious comics & surprise musical
          guests, get ready to discover an unparalleled underground comedy experience.
<!--          <br/>
          <br/>
          Forget comedy shows, these are comedy events.-->
          </p>
        <div class="flex flex-col space-y-4 sm:flex-row sm:space-y-0">
          <a
              href="https://www.tickettailor.com/events/acquiredtastecomedy?ref=website"
              target="_blank"
              class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary hover:bg-red-900 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
            Buy Tickets
            <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                 fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </a>

        </div>
      </div>
      <div>
       <img class="mx-auto w-full lg:max-w-xl h-64 rounded-xl sm:h-96 shadow-xl object-cover" src="/images/promo/standup-comedy-event-arrow.jpg" />
<!--        <iframe class="aspect-video mx-auto w-full lg:max-w-xl h-64 rounded-lg sm:h-96 shadow-xl"
                src="https://www.youtube.com/embed/1bV0ljC9CoY" title="YouTube video player" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
                --> 
      </div>
    </div>
  </section>

  <section class="dark:bg-gray-900 mt-3">
    <div
        class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 gap-8 lg:gap-16 rounded-3xl shadow-lg shadow-red-600">

      <iframe class="mx-auto w-full lg:max-w-xl h-64 rounded-lg sm:h-96 shadow-xl"
              src="https://www.youtube.com/embed/1bV0ljC9CoY" title="YouTube video player" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>

    </div>
  </section>
    </div>

</template>