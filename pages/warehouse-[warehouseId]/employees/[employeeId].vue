<template>
  <main
    v-if="!edit"
    class="p-6"
  >
    <WarehouseHeaderWidget>
      {{ store.employeeData?.name }}
    </WarehouseHeaderWidget>
    <div class="flex justify-end">
      <a
        type="submit"
        class="btn btn--secondary ml-4 flex"
        :href="`../employees`"
      >
        Back
      </a>
      <a
        type="submit"
        class="btn btn--primary ml-4 flex"
        :href="`${store.employeeData?.id}?edit=true`"
      >
        Edit
      </a>
    </div>
    <div class="flex gap-6">
      <div class=" border border-vvn-white-15 p-5 rounded-[10px] bg-vvn-white-02 backdrop-blur-sm mt-4 h-[225px] w-[730px]">
        <p class="text-2xl text-vvn-green mb-3">
          Basic Information
        </p>
        <div class="w-full mr-4">
          <label
            for="name"
            class=" text-vvn-gray text-base mb-2 inline-block"
          >Name</label>
          <p class=" text-white text-base">
            {{ store.employeeData?.name }}
          </p>
        </div>
        <div>
          <label
            for="title"
            class=" text-vvn-gray text-base mb-2 mt-4 inline-block"
          >Title</label>
          <p class=" text-white text-base">
            {{ store.employeeData?.title }}
          </p>
        </div>
      </div>
      <div class=" border border-vvn-white-15 p-5 rounded-[10px] bg-vvn-white-02 backdrop-blur-sm mt-4 h-[225px] w-[450px]">
        <p class="text-2xl text-vvn-green mb-3">
          Contact
        </p>
        <div class="w-full mr-4">
          <label
            for="email"
            class=" text-vvn-gray text-base mb-2 inline-block"
          >Email</label>
          <p class=" text-white text-base">
            {{ store.employeeData?.email }}
          </p>
        </div>
        <div class=" mt-4">
          <label
            for="phone"
            class=" text-vvn-gray text-base mb-2 block"
          >Phone</label>
          <p class=" text-white text-base">
            {{ store.employeeData?.phone }}
          </p>
        </div>
      </div>
    </div>
    <div class=" border border-vvn-white-15 p-5 rounded-[10px] bg-vvn-white-02 backdrop-blur-sm mt-6">
      <p class="text-2xl text-vvn-green mb-3">
        Custom Fields
      </p>
      <div>
        <p
          for="name"
          class=" text-vvn-gray text-base mb-2 inline-block w-96"
        >
          Key
        </p>

        <p
          for="name"
          class=" text-vvn-gray text-base mb-2 inline-block w-96"
        >
          Value
        </p>
      </div>
      <hr class=" border-y-vvn-gray-90 mb-3">
      <div
        v-for="(item, index) in store.employeeData?.extraDetails"
        :key="index"
        class="flex items-end mb-2 text-white"
      >
        <p
          for="name"
          class=" text-base mb-2 inline-block w-96"
        >
          {{ item.name }}
        </p>

        <p
          for="name"
          class="text-base mb-2 inline-block w-96"
        >
          {{ item.value }}
        </p>
      </div>
    </div>
    <div>"  "</div>
    <div>
      <h1 class="font-bold text-white">
        Live View - {{ store.employeeData?.name }}
      </h1>
    </div>
    <canvas class="canvas"></canvas>
  </main>
  <form
    v-else
    id="form"
    class="p-6"
    @submit.prevent="onSubmit"
  >
    <WarehouseHeaderWidget>
      Edit {{ store.employeeData?.name }}
    </WarehouseHeaderWidget>
    <div class="flex justify-end">
      <a
        :href="`${employee.id}`"
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
      <div class=" border border-vvn-white-15 p-5 rounded-[10px] bg-vvn-white-02 backdrop-blur-sm mt-4 w-[730px]">
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
            v-model="data.editEmployeeData.name"
            name="name"
          />
        </div>
        <div class="w-full mr-4">
          <label
            for="title"
            class=" text-vvn-gray text-base mb-2 inline-block"
          >Title</label>
          <TextInput
            id="title"
            v-model="data.editEmployeeData.title"
            name="title"
          />
        </div>
      </div>
      <div class=" border border-vvn-white-15 p-5 rounded-[10px] bg-vvn-white-02 backdrop-blur-sm mt-4 w-[450px]">
        <p class="text-2xl text-vvn-green mb-3">
          Contact
        </p>
        <div class="w-full mr-4">
          <label
            for="email"
            class=" text-vvn-gray text-base mb-2 inline-block"
          >Email</label>
          <TextInput
            id="email"
            v-model.number="data.editEmployeeData.email"
            name="email"
          />
        </div>
        <div class="w-full mr-4">
          <label
            for="phone"
            class=" text-vvn-gray text-base mb-2 inline-block"
          >Phone</label>
          <TextInput
            id="phone"
            v-model.number="data.editEmployeeData.phone"
            name="phone"
          />
        </div>
      </div>
    </div>
    <div class=" border border-vvn-white-15 p-5 rounded-[10px] bg-vvn-white-02 backdrop-blur-sm mt-6">
      <p class="text-2xl text-vvn-green mb-3">
        Custom Fields
      </p>
      <div v-if="data.editEmployeeData.extraDetails.length != 0">
        <div
          v-for="index in data.editEmployeeData.extraDetails.length"
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
              v-model="data.editEmployeeData.extraDetails[index-1].name"
              :name="`customField${index-1}-name`"
            />
          </div>
          <div class="mr-4 w-[500px]">
            <label
              for="name"
              class=" text-vvn-gray text-base mb-2 inline-block"
            >Value</label>
            <TextInput
              id="name"
              v-model="data.editEmployeeData.extraDetails[index-1].value"
              :name="`customField${index-1}-value`"
            />
          </div>
          <button
            class="btn btn--secondary mb-1"
            type="button"
            @click="data.editEmployeeData.extraDetails.splice(index-1, 1)"
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
</template>
<script lang="ts" setup>
// Begin Imports
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { Inventory } from '~/types';
// End of Imports

const data = reactive<{ editEmployeeData: Employee }>({
    editEmployeeData: {
        id: "",
        name: "",
        title: "",
        email: "",
        phone: "",
        extraDetails: []
    }
})
const store = useInventoryStore()
const route = useRoute()
const edit = ref(false)

onMounted(() => {
    if (route.query.edit == "true") {
        edit.value = true
    }
})

useAsyncData(async () => {
    store.getEmployeeItemById(route.params.employeeId as string)
        .catch(() => {
            useToast().error("Could not fetch employee details")
        })
})

const employee = computed(() => {
    data.editEmployeeData.id = store.employeeData?.id
    data.editEmployeeData.name = store.employeeData?.name || ""
    data.editEmployeeData.title = store.employeeData?.title || ""
    data.editEmployeeData.extraDetails = [...store.employeeData?.extraDetails as []]
    data.editEmployeeData.email = store.employeeData?.email || ""
    data.editEmployeeData.phone = store.employeeData?.phone || ""
    return data.editEmployeeData
})
const addNewField = () => {
    data.editEmployeeData.extraDetails.push({name: '', value: ''})
}

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
    id: route.params.employeeId as string,
    name: values.name,
    title: values.title,
    email: values.email,
    phone: values.phone,
    extraDetails: data.editEmployeeData.extraDetails.map(i => ({name: i.name, value: i.value})) //fixes proxy cloning issue
  }


  store.editEmployeeItem(employee)
  .then(() => {
    window.location.href = `${route.params.employeeId}`
  })
  .catch(() => {
    useToast().error("Update failed")
  })
  ;
})

</script>

<style lang="scss" scoped>
.canvas {
  position: relative;
  left: 0px;
  top: 0px;
  width: 1180px;
  height: 630px;
  background-color: white;
  opacity: 0.05;
}

.overlay {
  position: absolute;
  left: var(--x, 10px);
  top: var(--y, 10px);
}
</style>
