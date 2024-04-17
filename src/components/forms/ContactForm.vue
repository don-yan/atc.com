<script lang="ts" setup>

/*
imports
*/
import {useVuelidate} from '@vuelidate/core';
import {required, email, helpers} from '@vuelidate/validators';

/*
   form state
   */
const formState = ref({
  name: '',
  email: '',

  // subject: '',
  // message: ''
});

const isSubmitted = ref(false);

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
    const formData = new FormData(event.target);

    console.log('submit form');
    $fetch('/api/mailChimp', {
      method: 'POST',
      body: formState.value
    }).then((response) => {
      console.log('then', response)
      isSubmitted.value = true; // Show success message
    })
        .catch((error) => console.error(error));
    /* fetch('/', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       body: new URLSearchParams(formData).toString()
     })
         .then(() => {
           isSubmitted.value = true; // Show success message
         })
         .catch((error) => console.error(error));*/
  } else {
    console.warn('form validation error', v$.value.$errors)
  }
};

const submitForm = async () => {

}
</script>
<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5 pt-36 mx-auto">
      <div class="flex flex-col">
        <div class="h-1 bg-gray-200 rounded overflow-hidden">
          <!--            <div class="w-24 h-full bg-red-500"></div>-->
          <div class="w-full h-full bg-red-500"></div>
        </div>
        <div class="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
          <h2 class="sm:w-2/5 text-gray-900 font-extrabold title-font text-4xl mb-2 sm:mb-0 dark:text-white">
            Contact</h2>
          <p class="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0">Contact us with any inquiries.</p>
        </div>
      </div>
      <form
          v-if="!isSubmitted"
          name="contact-form"
          @submit="handleValidation">
        <div
            class="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
          <div class="relative flex-grow w-full">
            <label for="full-name" class="leading-7 text-sm text-gray-600">Full Name</label>
            <input type="text"
                   id="full-name"
                   name="full-name"
                   v-model="formState.name"
                   class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-transparent focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
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
          <button class="text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg"
                  @click="submitForm">
            Submit
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
      <!--
            <div>
              <a
                  class="relative z-0 p-5 font-bold text-black bg-red-500 border-2 border-black group"
                  href=""
              >BUY TICKETS &ndash;&gt;

                <span
                    class="absolute w-full h-full transition-all duration-300 border-2 border-black -z-10 group-hover:left-0 group-hover:top-0 left-1 top-1"
                ></span>
                <span
                    class="absolute w-full h-full transition-all duration-300 border-2 border-black -z-20 group-hover:left-0 group-hover:top-0 left-2 top-2"
                ></span>
      &lt;!&ndash;          <span&ndash;&gt;
      &lt;!&ndash;              class="absolute w-full h-full transition-all duration-300 border-2 border-black -z-30 group-hover:left-0 group-hover:top-0 left-3 top-3"&ndash;&gt;
      &lt;!&ndash;          ></span>&ndash;&gt;
              </a>
            </div>
            -->
    </div>
  </section>
</template>