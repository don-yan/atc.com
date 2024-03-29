<script lang="ts" setup></script>

<template>

 <div class="surface-section">
    <div class="font-medium text-3xl text-900 mb-4">Movie Information</div>
    <div class="text-500 mb-8">Morbi tristique blandit turpis. In viverra ligula id nulla hendrerit rutrum.</div>
    <ul class="list-none p-0 m-0">
      <li class="flex items-center py-4 px-2 border-t surface-border flex-wrap">
        <div class="text-500 w-6/12 md:w-2/12 font-medium">Title</div>
        <div class="text-900 w-full md:w-8/12 md:order-0 order-1">Heat</div>
        <div class="w-6/12 md:w-2/12 flex justify-end">
          <Button label="Edit" icon="pi pi-pencil" class="p-button-text"></Button>
        </div>
      </li>
      <li class="flex items-center py-4 px-2 border-t surface-border flex-wrap">
        <div class="text-500 w-6/12 md:w-2/12 font-medium">Genre</div>
        <div class="text-900 w-full md:w-8/12 md:order-0 order-1">
          <Chip label="Crime" class="mr-2"></Chip>
          <Chip label="Drama" class="mr-2"></Chip>
          <Chip label="Thriller"></Chip>
        </div>
        <div class="w-6/12 md:w-2/12 flex justify-end">
          <Button label="Edit" icon="pi pi-pencil" class="p-button-text"></Button>
        </div>
      </li>
      <li class="flex items-center py-4 px-2 border-t surface-border flex-wrap">
        <div class="text-500 w-6/12 md:w-2/12 font-medium">Director</div>
        <div class="text-900 w-full md:w-8/12 md:order-0 order-1">Michael Mann</div>
        <div class="w-6/12 md:w-2/12 flex justify-end">
          <Button label="Edit" icon="pi pi-pencil" class="p-button-text"></Button>
        </div>
      </li>
      <li class="flex items-center py-4 px-2 border-t surface-border flex-wrap">
        <div class="text-500 w-6/12 md:w-2/12 font-medium">Actors</div>
        <div class="text-900 w-full md:w-8/12 md:order-0 order-1">Robert De Niro, Al Pacino</div>
        <div class="w-6/12 md:w-2/12 flex justify-end">
          <Button label="Edit" icon="pi pi-pencil" class="p-button-text"></Button>
        </div>
      </li>
      <li class="flex items-center py-4 px-2 border-t border-b surface-border flex-wrap">
        <div class="text-500 w-6/12 md:w-2/12 font-medium">Plot</div>
        <div class="text-900 w-full md:w-8/12 md:order-0 order-1 leading-normal">
          A group of professional bank robbers start to feel the heat from police when they unknowingly leave a clue at their latest heist.
        </div>
        <div class="w-6/12 md:w-2/12 flex justify-end">
          <Button label="Edit" icon="pi pi-pencil" class="p-button-text"></Button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>

</style>
