<template>
  <form
    id="form"
    class="p-6"
    @submit.prevent="onSubmit"
  >
    <WarehouseHeaderWidget>Add Employee</WarehouseHeaderWidget>
    <div class="flex justify-end">
      <a
        :href="`/warehouse-${$route.params.warehouseId}/employees`"
        class="btn btn--secondary flex"
      >
        Cancel
      </a>
      <button
        type="submit"
        class="btn btn--primary ml-4"
      >
        Save
      </button>
    </div>
    <div class="flex gap-6">
      <div class=" border border-vvn-white-15 p-5 rounded-[10px] bg-vvn-white-02 backdrop-blur-sm mt-4 h-[250px] w-[730px]">
        <p class="text-2xl text-vvn-green mb-3">
          Basic Information
        </p>
        <div class="w-full mr-4">
          <label
            for="name"
            class=" text-vvn-gray text-base mb-2 inline-block"
          >Name</label>
          <TextInput
            id="name"
            v-model="data.name"
            name="name"
            :rules="'required|min:2'"
          />
        </div>
        <div class="w-full mr-4">
          <label
            for="title"
            class=" text-vvn-gray text-base mb-2 inline-block"
          >Title</label>
          <TextInput
            id="title"
            v-model="data.title"
            name="title"
            :rules="'required|min:2'"
          />
        </div>
      </div>
      <div class=" border border-vvn-white-15 p-5 rounded-[10px] bg-vvn-white-02 backdrop-blur-sm mt-4 h-[250px] w-[450px]">
        <p class="text-2xl text-vvn-green mb-3">
          Contact
        </p>
        <div class="w-full mr-4">
          <label
            for="name"
            class=" text-vvn-gray text-base mb-2 inline-block"
          >Email</label>
          <TextInput
            id="email"
            v-model="data.email"
            name="email"
            :rules="'required|min:2'"
          />
        </div>
        <div class="w-full mr-4">
          <label
            for="phone"
            class=" text-vvn-gray text-base mb-2 inline-block"
          >Phone</label>
          <TextInput
            id="phone"
            v-model="data.phone"
            name="phone"
            :rules="'required|min:2'"
          />
        </div>
      </div>
    </div>
    <div class=" border border-vvn-white-15 p-5 rounded-[10px] bg-vvn-white-02 backdrop-blur-sm mt-6">
      <p class="text-2xl text-vvn-green mb-3">
        Custom Fields
      </p>
      <div>
        <div
          v-for="(i, index) in data.extraFields.length"
          :key="index"
          class="flex items-end mb-4"
        >
          <div class="mr-4 w-52">
            <label
              for="name"
              class=" text-vvn-gray text-base mb-2 inline-block"
            >Name</label>
            <TextInput
              id="name"
              v-model="data.extraFields[index].name"
              :name="`customField${index}-name`"
            />
          </div>
          <div class="mr-4 w-[500px]">
            <label
              for="name"
              class=" text-vvn-gray text-base mb-2 inline-block"
            >Value</label>
            <TextInput
              id="name"
              v-model="data.extraFields[index].value"
              :name="`customField${index}-value`"
            />
          </div>
          <button
            class="btn btn--secondary mb-1"
            type="button"
            @click="data.extraFields.splice(index, 1)"
          >
            Remove field
          </button>
        </div>
      </div>
      <button
        class="btn btn--secondary mt-5"
        type="button"
        @click="addNewField"
      >
        Add Field
      </button>
    </div>
  </form>
  <LazyConfirmationModal v-model="successModalOpen">
    <h5 class=" text-2xl text-white text-center mt-4">
      Inventory created successfully
    </h5>
    <div class="flex justify-center mt-8">
      <button
        class="btn btn--primary mr-5"
        style="background-color: transparent; border-color:white"
      >
        <a :href="`../employees`">Close</a>
      </button>
    </div>
  </LazyConfirmationModal>
</template>
<script lang="ts" setup>
// Begin Imports
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { Inventory } from '~/types';
// End of Imports

const store = useInventoryStore()
const route = useRoute()

const data = reactive<{
  name: string,
  title: string,
  extraFields: {name: string, value: string}[],
  email: string,
  phone: string
}>({
  name: "",
  title: "",
  extraFields: [],
  email: "",
  phone: ""
})

const successModalOpen = ref(false)

const validationSchema = toTypedSchema(
  z.object({
    name: z.string().nonempty('Name is required'),
    title: z.string().nonempty('Description is required'),
    email: z.string().nonempty('Email is required'),
    phone: z.string().nonempty('Phone is required'),
  })
);

const validationResult = useForm({
  validationSchema,
})

const onSubmit = validationResult.handleSubmit(values => {
  const employee: Employee = {
    name: values.name,
    title: values.title,
    email: values.email,
    phone: values.phone,
    extraDetails: data.extraFields.map(i => ({name: i.name, value: i.value})), //fixes proxy cloning issue
  }

  //console.log("Employee Created:")
  //console.log(employee)

  store.createEmployeeInstance(employee)
  .then(() => {
    successModalOpen.value = true;
    (document.getElementById("form") as HTMLFormElement).reset();
  })
  .catch(err => {
    console.log(err)
  })
  ;
})

const addNewField = () => {data.extraFields.push({name: '', value: ''})}

</script>
