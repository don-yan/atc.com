<script lang="ts" setup>


import {useFetch} from '#app'
import {FlowbiteThemable, FwbTab, FwbTabs} from 'flowbite-vue'
import {computed, ref} from 'vue'
import type {TTEventMapped} from '~/@types'

import EventCard from "~/components/content/events/EventCard.vue";
import {scrollToId} from "~/utils/scroll-utils";

// Create a reactive variable to hold events.
const events = ref<TTEventMapped[]>([])
const activeTab = ref('upcoming');

// Fetch the data using useFetch
const {data, pending, error} = await useFetch('/api/ticketTailor')

// Watch for changes in the fetched data
watch(
    () => data.value,
    (newValue) => {
      if (newValue && newValue.data) {
        // Assuming your API returns { data: TTEvent[] }
        events.value = newValue.data
        console.log('Fetched events:', events.value)
      }
    },
    {immediate: true}
)

// Current time as Unix timestamp
const currentTime = Date.now() / 1000

// Computed property for upcoming events
const upcomingEvents = computed(() => {
  return events.value.filter(event => event.end.unix >= currentTime)
})

// Computed property for past events
const pastEvents = computed(() => {
  return events.value.filter(event => event.end.unix < currentTime)
})


// TODO: Match height of all event cards

// TODO: do we want to add any sort of pagination?

</script>


<template>
  <div
      class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
    <div class="w-full">

      <div v-if="pending">Loading events...</div>
      <div v-else-if="error">Error loading events: {{ error.message }}</div>
      <div v-else>
        <flowbite-themable theme="red">
          <fwb-tabs v-model="activeTab" directive="show" variant="underline"
                    class="flex flex-wrap justify-center yk-tab-container py-4">

            <fwb-tab name="upcoming" title="Upcoming Events" class="flex flex-wrap justify-center yk-tab">
              <div v-if="upcomingEvents.length === 0" class="text-center">
                <h2 class="text-2xl">There are no scheduled events at this time...</h2>
                <h3
                    @click="scrollToId('contact')"
                    class="m-0 py-4 text-900 text-xl text-center">
                  Subscribe to our <strong class="px-1">mailing list</strong> to learn more
                </h3>
              </div>
              <div v-else
                   v-for="event in upcomingEvents"
                   class="p-4 sm:mb-0 mb-6 space-y-3 text-center"
                   :class="upcomingEvents.length > 1 ? 'md:w-1/2' : ''"
                   v-equal-heights="['h2.event-title']"
              >
                <EventCard :item="event"/>
              </div>
            </fwb-tab>
            <fwb-tab name="past" title="Past Events" class="flex flex-wrap justify-center yk-tab">
              <div v-for="event in pastEvents" class="p-4 sm:mb-0 mb-6 space-y-3 text-center"
                   :class="pastEvents.length > 1 ? 'md:w-1/2' : ''"
                   v-equal-heights="['h2.event-title']"
              >
                <EventCard :item="event" :is-past="true"/>
              </div>
            </fwb-tab>

          </fwb-tabs>
        </flowbite-themable>
      </div>

    </div>
  </div>


</template>

<style lang="scss" scoped>

</style>
