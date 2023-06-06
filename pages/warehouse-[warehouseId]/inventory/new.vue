<template>
  <form
    id="form"
    class="p-6"
    @submit.prevent="onSubmit"
  >
    <WarehouseHeaderWidget>Add Inventory</WarehouseHeaderWidget>
    <div class="flex justify-end">
      <a
        :href="`/warehouse-${$route.params.warehouseId}/inventory`"
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
      <div class="flex-1 border border-vvn-white-15 p-5 rounded-[10px] bg-vvn-white-02 backdrop-blur-sm mt-4">
        <p class="text-2xl text-vvn-green mb-3 font-semibold">
          Basic Information
        </p>
        <div class="w-full mr-4">
          <label
            for="name"
            class=" text-vvn-gray text-base mb-2 inline-block"
          >Main Identifier</label>
          <TextInput
            id="name"
            v-model="data.name"
            name="name"
            :rules="'required|min:2'"
          />
        </div>
        <div>
          <label
            for="description"
            class=" text-vvn-gray text-base mb-2 mt-4 inline-block"
          >Description</label>
          <TextArea
            id="description"
            v-model="data.description"
            name="description"
            :rules="'required|min:2|max:4'"
          />
        </div>
      </div>
      <div class=" border border-vvn-white-15 p-5 rounded-[10px] bg-vvn-white-02 backdrop-blur-sm mt-4 w-[378px]">
        <p class="text-2xl text-vvn-green mb-3 font-semibold">
          Inventory
        </p>
        <div class="w-full mr-4">
          <label
            for="name"
            class=" text-vvn-gray text-base mb-2 inline-block"
          >Current Inventory</label>
          <TextInput
            id="quantity"
            v-model.number="data.quantity"
            type="number"
            name="quantity"
            :rules="'required|numeric'"
          />
        </div>
        <div class="mt-4">
          <label
            for="trackThreshold"
            class=" text-vvn-gray text-base mb-2 block"
          >Track Inventory Threshold</label>
          <CheckBox
            v-model.number="data.trackThreshold"
            class="block"
            :value="false"
            name="trackThreshold"
          />
        </div>
        <div class=" mt-4">
          <label
            for="threshold"
            class=" text-vvn-gray text-base mb-2"
          >Inventory Threshold</label>
          <TextInput
            id="threshold"
            v-model.number="data.threshold"
            type="number"
            name="threshold"
            :rules="'numeric'"
            :disabled="!data.trackThreshold"
          />
        </div>
      </div>
    </div>
    <div class=" border border-vvn-white-15 p-5 rounded-[10px] bg-vvn-white-02 backdrop-blur-sm mt-6">
      <p class="text-2xl text-vvn-green mb-3 font-semibold">
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
        @click="successModalOpen = !successModalOpen"
      >
        Close
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
  description: string,
  extraFields: { name: string, value: string }[],
  quantity: number,
  threshold: number,
  trackThreshold: boolean
}>({
  name: "",
  description: "",
  extraFields: [],
  quantity: 0,
  threshold: 0,
  trackThreshold: false
})

const successModalOpen = ref(false)

const validationSchema = toTypedSchema(
  z.object({
    name: z.string().nonempty('Name is required')
      .min(3, "Name should not be less than 3 characters"),
    description: z.string().nonempty('Description is required')
      .min(5, "Description should contain at least 5 characters")
      .max(100, "Description should not contain more than 100 characters"),
    quantity: z.number().min(0),
    threshold: z.number().min(0),
  })
);

const validationResult = useForm({
  validationSchema,
})

const onSubmit = validationResult.handleSubmit(values => {
  const inventory: Inventory = {
    name: values.name,
    description: values.description,
    quantity: values.quantity,
    trackThreshold: data.trackThreshold,
    threshold: values.threshold,
    extraDetails: data.extraFields.map(i => ({ name: i.name, value: i.value })), //fixes proxy cloning issue
    warehouseID: route.params.warehouseId as string
  }
  store.createInventoryInstance(inventory)
    .then(() => {
      successModalOpen.value = true;
      (document.getElementById("form") as HTMLFormElement).reset();
    })
    .catch(() => {
      useToast().error("Item creation failed")
    })
    ;
})

const addNewField = () => { data.extraFields.push({ name: '', value: '' }) }

</script>