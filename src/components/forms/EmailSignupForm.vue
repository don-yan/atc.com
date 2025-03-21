<script lang="ts" setup>

/*
imports
*/
import {useVuelidate} from '@vuelidate/core';
import {required, email, helpers} from '@vuelidate/validators';
import LoadingIcon from "~/components/util/LoadingIcon.vue";

/*
   form state
   */
const formState = ref({
  name: '',
  email: '',

  // subject: '',
  // message: ''
});

const isComplete = ref(false);
const isSubmitting = ref(false);

/*
  validation rules
  */
const rules = {
  name: {
    required: helpers.withMessage('Please enter your full name', required)
  },
  email: {
    required: helpers.withMessage(
        'Please enter your email address',
        required
    ),
    email: helpers.withMessage('Please enter a valid email address', email)
  },
  /*  subject: {
      required: helpers.withMessage('Please enter subject', required)
    },
    message: {
      required: helpers.withMessage('Please enter your message', required)
    }*/
};

/*
   init vuelidate
   */
const v$ = useVuelidate(rules, formState);

/*
  form submit
  */
// @ts-ignore
const handleValidation = async (event) => {
  event.preventDefault();
  await v$.value.$validate();

  if (!v$.value.$error) {

    isSubmitting.value = true

    console.log('submit form');
    $fetch('/api/mailChimp', {
      method: 'POST',
      body: formState.value
    }).then((response) => {
      console.log('then', response)
      isComplete.value = true; // Show success message
    })
        .catch((error) => console.error(error)).finally(() => {
      isSubmitting.value = true
    });
  } else {
    console.warn('form validation error', v$.value.$errors)
  }
};

</script>
<template>

  <form
      v-if="!isComplete"
      name="contact-form"
      :disabled="isSubmitting"
      @submit="handleValidation">
    <div
        class="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
      <div class="relative flex-grow w-full">
        <label for="full-name" class="leading-7 text-sm text-gray-600">Full Name
          <input type="text"
                 id="full-name"
                 name="full-name"
                 v-model="formState.name"
                 class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-transparent focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
        </label>
        <div>
          <p
              class="mt-1 text-xs text-red-500"
              v-for="error of v$.name.$errors"
              :key="error.$uid"
          >
            {{ error.$message }}
          </p>
        </div>
      </div>
      <div class="relative flex-grow w-full">
        <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
        <input type="email"
               id="email"
               name="email"
               v-model="formState.email"
               class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-transparent focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
        <div>
          <p
              class="mt-1 text-xs text-red-500"
              v-for="error of v$.email.$errors"
              :key="error.$uid"
          >
            {{ error.$message }}
          </p>
        </div>
      </div>
<!--TODO: Make button align with inputs even when error messages are shown-->
      <button
          class="text-white bg-red-600 border-0 py-2 px-8 focus:bg-red-500 focus:outline-none hover:bg-red-500 rounded text-lg"
          :disabled="isSubmitting"
          :class="{'bg-red-500':isSubmitting}"
          @click="handleValidation">
        <span v-if="!isSubmitting">
        Submit
        </span>
        <span v-else>
          Submitting...
        </span>

        <!--        <LoadingIcon />-->
      </button>


    </div>
  </form>
  <div v-else>
    <div class="mt-5 text-center">
      <h2 class="z-10 mb-3 text-2xl font-extrabold md:text-3xl">
        Thank you!
        <br/>
        We will reach out to you as soon as possible!
      </h2>
    </div>
  </div>


</template>