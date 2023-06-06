<template>
  <main class=" h-screen bg-vvn-black">
    <div class="h-full bg-cover flex justify-center items-center">
      <form
        class="w-[27.5rem]"
        @submit.prevent="onSubmit"
      >
        <img
          src="/images/svg/logo-dark.svg"
          alt="logo"
          class="block mx-auto"
        >
        <label
          for="email"
          class=" text-vvn-gray text-base mb-2 inline-block mt-8"
        >Email</label>
        <TextInput
          id="email"
          v-model.trim="data.name"
          name="email"
          rules="required|email"
        />

        <label
          for="password"
          class=" text-vvn-gray text-base mb-2 inline-block mt-6"
        >Password</label>
        <TextInput
          id="password"
          v-model.trim="data.password"
          name="password"
          type="password"
          rules="required|min:2"
        />
        <button
          class="btn btn--primary btn--large w-full mt-20"
          type="submit"
        >
          Log in
        </button>
      </form>
    </div>
  </main>
</template>
<script lang="ts" setup>
// Begin Imports
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
// End of Imports

definePageMeta({
  middleware: "auth"
})

const data = reactive({
  name: "",
  password: ""
})

const store = useAuthStore()

const validationSchema = toTypedSchema(
  z.object({
    email: z.string().nonempty('Email is required').email("Should be a valid email"),
    password: z.string().nonempty('Password is required').min(5, "Password should be at least 5 characters")
  })
);

const validationResult = useForm({
  validationSchema,
})

const onSubmit = validationResult.handleSubmit(values => {
  store.login(values.email, values.password)
  .then(() => {
    window.location.href = "/"
  })
  .catch((error: Error) => {
    useToast().error(error.message)
  })
})
</script>
<style lang="scss" scoped>
main>div {
  background-image: url("/images/png/home-background.png");
}
</style>
