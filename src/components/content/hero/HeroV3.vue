<script lang="ts" setup>

// import Image from 'primevue/image';
// import Carousel from 'primevue/carousel'

const products = ref()

products.value = [{
  id: '1000',
  code: 'f230fh0g3',
  name: 'Bamboo Watch',
  description: 'Product Description',
  image: 'bamboo-watch.jpg',
  price: 65,
  category: 'Accessories',
  quantity: 24,
  inventoryStatus: 'INSTOCK',
  rating: 5
}, {
  id: '1000',
  code: 'f230fh0g3',
  name: 'Blah Blah Watch',
  description: 'Product Description',
  image: 'bamboo-watch.jpg',
  price: 65,
  category: 'Accessories',
  quantity: 24,
  inventoryStatus: 'INSTOCK',
  rating: 5
}, {
  id: '10002',
  code: 'f230fh0g3',
  name: '3 Blah Watch',
  description: 'Product Description',
  image: 'bamboo-watch.jpg',
  price: 65,
  category: 'Accessories',
  quantity: 24,
  inventoryStatus: 'INSTOCK',
  rating: 5
},
  {
    id: '1000',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5
  }, {
    id: '1000',
    code: 'f230fh0g3',
    name: 'Blah Blah Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5
  }, {
    id: '10002',
    code: 'f230fh0g3',
    name: '3 Blah Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5
  }]

const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '1199px',
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '767px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '575px',
    numVisible: 1,
    numScroll: 1
  }
]);

</script>
<template>

  <!-- <div class="card">
    <Carousel :value="products" :numVisible="2" :numScroll="2" :responsiveOptions="responsiveOptions" orientation="horizontal" autoplayInterval="2000" :showNavigators="false">
      <template #item="slotProps">
        <div class="border-1 surface-border border-round m-2  p-3">
          <div class="mb-3">
            <div class="relative mx-auto">
              <Image  :src="'https://primefaces.org/cdn/primevue/images/product/' + slotProps.data.image" :alt="slotProps.data.name" class="w-full border-round" preview />
              <Tag :value="slotProps.data.inventoryStatus" severity="contrast" class="absolute" style="left:5px; top: 5px"/>
            </div>
          </div>
          <div class="mb-3 font-medium">{{ slotProps.data.name }}</div>
          <div class="flex justify-content-between align-items-center">
            <div class="mt-0 font-semibold text-xl">${{ slotProps.data.price }}</div>
            <span>
                            <Button icon="pi pi-heart" severity="secondary" outlined />
                            <Button icon="pi pi-shopping-cart" class="ml-2"/>
                        </span>
          </div>
        </div>
      </template>
    </Carousel>
  </div> -->
<!--

  <div
      class="container flex flex-col px-6 py-4 mx-auto space-y-6 md:h-128 md:py-16 md:flex-row md:items-center md:space-x-6">
    <div class="flex flex-col items-center w-full md:flex-row md:w-1/2">
      <div class="flex justify-center order-2 mt-6 md:mt-0 md:space-y-3 md:flex-col">
        <button class="w-3 h-3 mx-2 bg-blue-500 rounded-full md:mx-0 focus:outline-none"></button>
        <button class="w-3 h-3 mx-2 bg-gray-300 rounded-full md:mx-0 focus:outline-none hover:bg-blue-500"></button>
        <button class="w-3 h-3 mx-2 bg-gray-300 rounded-full md:mx-0 focus:outline-none hover:bg-blue-500"></button>
        <button class="w-3 h-3 mx-2 bg-gray-300 rounded-full md:mx-0 focus:outline-none hover:bg-blue-500"></button>
      </div>

      <div class="max-w-lg md:mx-12 md:order-2">
        <h1 class="text-3xl font-medium tracking-wide text-gray-800 dark:text-white md:text-4xl">The best Apple Watch
          apps</h1>
        <p class="mt-4 text-gray-600 dark:text-gray-300">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut
          quia asperiores alias vero magnam recusandae adipisci ad vitae laudantium quod rem voluptatem eos accusantium
          cumque.</p>
        <div class="mt-6">
          <a href="#"
             class="block px-3 py-2 font-semibold text-center text-white transition-colors duration-200 transform bg-blue-500 rounded-md md:inline hover:bg-blue-400">Download
            from App Store</a>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-center w-full h-96 md:w-1/2">
      <img class="object-cover w-full h-full max-w-2xl rounded-md"
           src="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
           alt="apple watch photo">
    </div>
  </div>-->
</template>

<style lang="scss" scoped>

.hero > section {
  background-image: url('/images/promo/atc-clouds-bg.jpeg');
}

.text-container {
  background-color: rgba(0, 0, 0, 0.3);
}

.img-container > img {
  clip-path: circle(40%)

}
</style>
