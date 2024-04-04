<template>

  <!-- component -->
  <div class="bg-gray-100 flex items-center hero">
    <section class="bg-cover bg-center py-32 w-full">
      <div class="container mx-auto text-left text-white md:mx-6">
        <div class="flex items-center sm:flex-column md:flex-row">
          <div class="w-3/4 text-container p-3 rounded-e-xl space-y-5">
            <div class="font-don space-y-3">
              <h1 class="text-5xl font-medium">Standup Comedy Events</h1>
              <h2 class="text-3xl font-medium">in Cambridge & beyond!</h2>
            </div>
            <p class="text-xl mb-12">Acquired Taste Comedy is Greater Boston's leading purveyor of acclaimed Standup Comedy Events™.</p>
            <Button  to="/shows" class="primary text-white py-4 px-12 rounded-full hover:bg-indigo-600">Book Now</Button>
          </div>
          <!--          <div class="w-1/2 pl-16 img-container">
                      <img src="/images/promo/standup-comedy-event-arrow.jpg" class="h-64 w-full object-cover rounded-xl" alt="Layout Image">
                    </div>-->
        </div>
      </div>
    </section>
  </div>
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
