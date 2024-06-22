<script lang="ts" setup>


import {ref} from 'vue'
import {FlowbiteThemable, FwbTab, FwbTabs} from 'flowbite-vue'

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

// TODO: Create /shows/[slug].vue with more info


const currentTime = Date.now() / 1000
const upcomingShows = shows.filter(item => {
      console.log({unix: item.end.unix, now: Date.now()})
      return item.end.unix >= currentTime
    }
)
const pastShows = shows.filter(item => {
  return item.end.unix < currentTime
})


// shows.value[0].

// TODO: Show some sort of message if there aren't any upcoming shows

const activeTab = ref('upcoming')

// TODO: Match height of all event cards

</script>


<template>
  <div
      class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
    <div class="w-full">
      <flowbite-themable theme="red">
        <fwb-tabs v-model="activeTab" directive="show" variant="underline"
                  class="flex flex-wrap justify-center yk-tab-container">

          <fwb-tab name="upcoming" title="Upcoming Events" class="flex flex-wrap justify-center yk-tab">
            <div v-if="upcomingShows.length === 0">
              <h2>There are no scheduled events at this time...</h2>
              <h3
                  @click="scrollToId('contact')"
                  class="flex m-0 px-0 py-4 text-900 font-medium leading-normal lg:ml-8">
                subscribe to our <strong class="px-1">mailing list</strong> to learn more
              </h3>
            </div>
            <div v-else
                 v-for="event in upcomingShows"
                 class="p-4 sm:mb-0 mb-6 space-y-3 text-center"
                 :class="upcomingShows.length > 1 ? 'md:w-1/2' : ''"
                 v-equal-heights="['h2.event-title']"
            >
              <EventCard :item="event"/>
            </div>
          </fwb-tab>
          <fwb-tab name="past" title="Past Events" class="flex flex-wrap justify-center yk-tab">
            <div v-for="event in pastShows" class="p-4 sm:mb-0 mb-6 space-y-3 text-center"
                 :class="pastShows.length > 1 ? 'md:w-1/2' : ''"
                 v-equal-heights="['h2.event-title']"
            >
              <EventCard :item="event" :is-past="true"/>
            </div>
          </fwb-tab>

        </fwb-tabs>
      </flowbite-themable>
    </div>
  </div>


</template>

<style lang="scss" scoped>

</style>
