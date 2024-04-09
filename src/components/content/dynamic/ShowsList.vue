<script lang="ts" setup>


import type {TTEvent} from "~/@types";

import Button from '~/components/content/Button.vue'

const {data} = await useFetch('/api/ticketTailor')


// const shows:Ref<Array<TTEvent>> = ref(data.value?.data ?? [])
// console.log(shows.value.length)

const shows: Array<TTEvent> = data.value?.data ?? []


/**
 * Parses the TT API result & removes cropping attributes
 *
 * Ex: https://uploads.tickettailor.com/c_crop,dpr_1.0,h_1000,q_100,w_1000,x_0,y_0/c_scale,h_108,q_85,w_108/v1/production/userfiles/jbjpynvwsk25fwv6rkev.jpg?_a=BAAAUWDQ
 *
 * // TODO: improve using Regex
 *
 * @param url
 */
const formatImgUrl = (url: string): string => {

  let result = url.substring(url.indexOf('/v1'));
  result = `https://uploads.tickettailor.com${result}`;
  console.log({imgUrl: url, result})
  return result;

}

const formatTicketLink = (url: string): string => {

  let result = url.substring(0, url.indexOf('?'));
  result = `${result}?ref=atc-website`;

  return result;

}

const isMultipleShows = shows.length > 1


// shows.value[0].

// TODO: Show some sort of message if there aren't any upcoming shows

</script>


<template>

  <section class="text-gray-600 body-font">
    <div class="container px-5 pt-36 mx-auto">
      <div class="flex flex-col">
        <div class="h-1 bg-gray-200 rounded overflow-hidden">
          <div class="w-24 h-full bg-red-500"></div>
        </div>
        <div class="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
          <h2 class="sm:w-2/5 text-gray-900 font-extrabold title-font text-4xl mb-2 sm:mb-0 dark:text-white">Shows</h2>
          <p class="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0">Catch a show near you.</p>
        </div>
      </div>
      <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
        <div v-for="item in shows" class="p-4 sm:mb-0 mb-6 space-y-3" :class="isMultipleShows ? 'md:w-1/2' : ''">
          <div class="rounded-lg h-64 overflow-hidden">
            <!--            <img alt="content" class="object-cover object-center h-full w-full" :src="rewriteTicketTailorImgUrl(item.images.thumbnail)">-->
            <img alt="content" class="object-scale-down h-full w-full"
                 :src="formatImgUrl(item.images.thumbnail)">
          </div>
          <h2 class="text-xl font-medium title-font text-gray-900 mt-5">{{ item.name }}</h2>
          <h3 class="tracking-widest text-red-500 text-xs font-medium title-font">{{ item.venue.name }}</h3>
          <p class="text-base leading-relaxed mt-2">{{ item.start.formatted }}</p>

          <Button :is-blank=true
                  :href="formatTicketLink(item.url)"
                  text="Buy Tickets"
                  :show-arrow="true"/>


        </div>

      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>

</style>
