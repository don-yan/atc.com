<script lang="ts" setup>


// import {definePageMeta, useHead} from "nuxt/";

definePageMeta({
  title: 'Shows',
  // layout: 'alt'
})
/*
useHead({
  script: [
    // {
    //   src: "https://cdn.tickettailor.com/js/widgets/min/widget.js",
    //   type: "text/javascript",
    //   'data-type': "inline",
    //   'data-inline-minimal': "false",
    //   'data-inline-show-logo': "false",
    //   'data-inline-bg-fill': "false",
    //   'data-inline-inherit-ref-from-url-param': "",
    //   'data-inline-ref': "website_widget",
    //   async: true,
    //   defer: true
    // },
    {
      src: "/scripts/tt-widget.js",
      type: "text/javascript",
      'data-url': "https://www.tickettailor.com/all-tickets/acquiredtastecomedy/?ref=website_widget",
      'data-type': "inline",
      'data-inline-minimal': "false",
      'data-inline-show-logo': "true",
      'data-inline-bg-fill': "false",
      'data-inline-inherit-ref-from-url-param': "",
      'data-inline-ref': "website_widget",
      async: true,
      defer: true
    },
  ]
})*/

</script>


<template>


  <div class="wrapper">

    <h1>Shows Page</h1>
    <div class="surface-card p-4 shadow-2 border-round">
      <!-- Ticket Tailor Widget. Paste this into your website where you want the widget to appear. Do not change the code or the widget may not work properly. -->
      <div class="tt-widget">
        <div class="tt-widget-fallback">
          <p>
            <a href="https://www.tickettailor.com/all-tickets/acquiredtastecomedy/?ref=website_widget&show_search_filter=true&show_date_filter=true&show_sort=true" target="_blank">Click here to buy tickets</a>
            <br/>
            <small>
              <a href="https://www.tickettailor.com?rf=wdg_135886" class="tt-widget-powered">Sell tickets online with Ticket Tailor</a>
            </small>
          </p>
        </div>

      </div>
      <!-- End of Ticket Tailor Widget -->
    </div>
  </div>


</template>
<style lang="scss">
//@import "~primeflex/primeflex.css";
</style>
