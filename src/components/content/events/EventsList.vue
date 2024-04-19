<script lang="ts" setup>


import {ref} from 'vue'
import {FwbTab, FwbTabs, FlowbiteThemable} from 'flowbite-vue'

import type {TTEvent} from "~/@types";
import EventCard from "~/components/content/events/EventCard.vue";
import {scrollToId} from "~/utils/scroll-utils";


const {data} = await useFetch('/api/ticketTailor')


// const shows:Ref<Array<TTEvent>> = ref(data.value?.data ?? [])
// console.log(shows.value.length)


// let shows = ref<Array<TTEvent>>(data.value?.data ?? [])
let shows: Array<TTEvent> = data.value?.data ?? []

// TODO: sort shows
shows = shows.sort((a, b) => {
  return b.end.unix - a.end.unix
})

// TODO: Show "upcoming" & "past" shows

// TODO: Create /shows/[slug].vue with more info

const isMultipleShows = shows.length > 1
const isNoShows = shows.length === 0;


// shows.value[0].

// TODO: Show some sort of message if there aren't any upcoming shows

const activeTab = ref('upcoming')

</script>


<template>

  <div
      class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
    <div v-if="!isNoShows" class="w-full">
      <flowbite-themable theme="red">
        <fwb-tabs v-model="activeTab" directive="show" variant="underline" class="flex flex-wrap justify-center yk-tab-container">

          <fwb-tab name="upcoming" title="Upcoming Events" class="flex flex-wrap justify-center yk-tab">
            <div v-for="event in shows" class="p-4 sm:mb-0 mb-6 space-y-3 text-center"
                 :class="isMultipleShows ? 'md:w-1/2' : ''">
              <EventCard :item="event"/>
            </div>
          </fwb-tab>
          <fwb-tab name="past" title="Past Events">
            Lorem ipsum dolor...
          </fwb-tab>

        </fwb-tabs>
      </flowbite-themable>
    </div>
    <div v-else>
      <!-- TODO: Decide what should be shown when there aren't any events      -->
      <h2>There are no shows at this time...</h2>
      <h3
          @click="scrollToId('contact')"
          class="flex m-0 px-0 py-4 text-900 font-medium leading-normal lg:ml-8">
        subscribe to our <strong class="px-1">mailing list</strong> to learn more
      </h3>
    </div>
  </div>


</template>

<style lang="scss" scoped>

</style>
