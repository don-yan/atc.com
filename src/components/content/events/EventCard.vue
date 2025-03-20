<script lang="ts" setup>


import type {TTEventMapped} from "~/@types";

// import Button from '~/components/content/buttons/ButtonAnimated.vue'
import Button from '~/components/content/buttons/Button.vue'
import type {PropType} from "vue";


// TODO: Create /shows/[slug].vue with more info


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
  // console.log({imgUrl: url, result})
  return result;

}

const formatTicketLink = (url: string): string => {
  let result = url.substring(0, url.indexOf('?'));
  result = `${result}?ref=atc-website`;
  return result;
}

const formatEventTitle = (title: string): string => {
  // TODO: Remove "standup comedy event"
  return title.substring(0, title.indexOf("("))
}

const formatGoogleMapsQueryUrl = (name: string, postal_code: string): string => {
  // TODO: Remove "standup comedy event"
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' ' + postal_code)}`
}


const props = defineProps({
  title: String,
  description: String,
  item: {
    type: Object as PropType<TTEventMapped>,
    required: true,
  },
  isPast: Boolean
})


// shows.value[0].

// TODO: Show some sort of message if there aren't any upcoming shows

onMounted(() => {
  console.log('mount card')
})

const item = ref<TTEventMapped>(props.item)


</script>


<template>


  <div class="rounded-lg h-64 overflow-hidden">
    <!--            <img alt="content" class="object-cover object-center h-full w-full" :src="rewriteTicketTailorImgUrl(item.images.thumbnail)">-->
    <img alt="content" class="object-scale-down h-full w-full"
         :src="formatImgUrl(item.images.thumbnail)">
  </div>
  <h2 class="text-xl font-medium title-font text-gray-900 mt-5 event-title">{{ formatEventTitle(item.name) }}</h2>
  <h2 class="text-lg font-bold title-font text-gray-900 mt-3 hidden">(A Standup Comedy Event)</h2>
  <h3 class="tracking-widest text-red-500 text-xs font-medium title-font">
    <a :href="formatGoogleMapsQueryUrl(item.venue.name, item.venue.postal_code)" target="_blank">
      {{ item.venue.name }} <span class="text-gray-800">({{ item.venue.postal_code }})</span>
    </a>
  </h3>
  <p class="text-base leading-relaxed mt-2">{{ item.start.formatted }}</p>

  <!--  TODO: Change button text for past shows -->
  <Button class="link-btn"
          :is-blank=true
          :href="formatTicketLink(item.url)"
          :text="isPast ? 'See details' :'Buy Tickets'"
          :show-arrow="true"/>


</template>

<style lang="scss" scoped>

</style>
