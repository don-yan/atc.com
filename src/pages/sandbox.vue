<script lang="ts" setup>
import Banner from '~/components/content/Banner.vue'
import Card from '~/components/content/Card.vue'
import CallToAction from '~/components/content/CallToAction.vue'
import DescriptionList from '~/components/content/DescriptionList.vue'
import FeatureBlocks from '~/components/content/FeatureBlocks.vue'
import PricingBlocks from '~/components/content/PricingBlocks.vue'
import Image from 'primevue/image'

import Hero from '~/components/content/hero/Hero.vue'


definePageMeta({
  // layout: 'alt'
})
</script>

<template>


  <section class="md:container md:mx-auto">


    <Banner class="mb-1"/>
  </section>
  <section>

    <Image src="/images/hero-1.png" alt="Image" width="250" preview/>
    <!--    <hr/>-->
    <!--    <Image alt="Image" width="250"-->
    <!--           preview-->
    <!--           pt:image:src="~assets/images/hero-1.png"-->
    <!--    />-->

    <Hero class="mb-3"/>

    <FeatureBlocks/>
    <CallToAction/>
    <Card/>
    <DescriptionList class="mb-2"/>

    <PricingBlocks/>

  </section>


</template>
<style lang="scss">
</style>
