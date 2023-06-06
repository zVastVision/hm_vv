<template>
  <main class=" h-screen bg-vvn-black p-6">
    <DashboardTopBar />
    <h1 class="text-white text-4xl font-semibold ">
      {{ store.organization?.name }}
    </h1>

    <h2 class="text-vvn-gray text-xl capitalize">
      Warehouses
    </h2>
    <div class=" grid grid-cols-5 gap-4 mt-10">
      <a
        v-for="(warehouse, index) in store.warehouseList"
        :key="index"
        class=" bg-vvn-white-10 h-28 rounded-lg text-2xl text-white p-4 font-semibold"
        :href="`/warehouse-${warehouse.id}/inventory`"
      >
        <p>
          {{ warehouse.name }}
        </p>
        <p class=" text-base text-vvn-gray">{{ warehouse.location }}</p>
      </a>
      <button
        type="button"
        class=" bg-vvn-white-10 h-28 rounded-lg text-2xl text-white p-4 font-semibold flex justify-center items-center flex-col"
        @click="editItemsOpen = !editItemsOpen"
      >
        <img
          class=" w-12"
          src="/images/svg/add.svg"
          alt="Add Warehouse"
        >
        <p class=" text-sm font-normal mt-2 text-vvn-gray">
          Add a warehouse
        </p>
      </button>
    </div>
  </main>
  <LazyDefaultModal
    v-model="editItemsOpen"
    small
    @close="editItemsOpen = false"
  >
    <form
      id="form"
      @submit.prevent="onSubmit"
    >
      <p class=" text-lg font-normal mt-2 text-white">
        Add a warehouse
      </p>
      <label
        for="name"
        class=" text-vvn-gray text-base mb-2 inline-block mt-8"
      >Name</label>
      <TextInput
        id="name"
        v-model="data.name"
        name="name"
        rules="required|min:3"
      />
      <label
        for="location"
        class=" text-vvn-gray text-base mb-2 inline-block mt-8"
      >Location</label>
      <TextInput
        id="location"
        v-model="data.location"
        name="location"
        rules="required|min:10"
      />
      <button
        class="btn btn--primary w-full mt-20 mb-5"
        type="submit"
        @click="submitClick()"
      >
        Save
      </button>
    </form>
  </LazyDefaultModal>
</template>
<script lang="ts" setup>
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

definePageMeta({
  middleware: "auth"
})

const store = useWarehouseStore()
useAsyncData(async () => {
  await store.getOrganization()
    .catch((err) => {
      console.log("ERROR")
      console.log(err)
      useToast().error("Failed to fetch organization details")
    })
})

const data = reactive({
  name: "",
  location: ""
})
const editItemsOpen = ref(false)

const validationSchema = toTypedSchema(
  z.object({
    name: z.string().nonempty('Name is required')
      .min(3, "Name should not be less than 3 characters"),
    description: z.string().nonempty('Description is required')
      .min(5, "Description should contain at least 5 characters")
      .max(100, "Description should not contain more than 100 characters"),
    quantity: z.number().min(0),
  }));

const validationResult = useForm({
  validationSchema,
})

const submitClick = () => {
  console.log("is this being called?")
  store.getOrganization()
  editItemsOpen.value = false
  store.createWarehouse(data.name, data.location, store.organization?.id as string)
    .then(() => {
      (document.getElementById("form") as HTMLFormElement).reset();
      store.getOrganization()
      editItemsOpen.value = false
    })
    .catch(() => {
      useToast().error("Warehouse creation failed")
    })
}

/*const onSubmit = validationResult.handleSubmit(values => {
  console.log("is this being called?")
  store.createWarehouse(values.name, data.location, store.organization?.id as string)
    .then(() => {
      (document.getElementById("form") as HTMLFormElement).reset();
      store.getOrganization()
      editItemsOpen.value = false

    })
    .catch(() => {
      useToast().error("Warehouse creation failed")
    })
})*/
</script>
