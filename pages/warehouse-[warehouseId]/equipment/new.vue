<template>
  <form
    id="form"
    class="p-6"
    @submit.prevent="onSubmit"
  >
    <WarehouseHeaderWidget>Add Equipment</WarehouseHeaderWidget>
    <div class="flex justify-end">
      <a
        :href="`/warehouse-${$route.params.warehouseId}/equipment`"
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
      <div class=" border border-vvn-white-15 p-5 rounded-[10px] bg-vvn-white-02 backdrop-blur-sm mt-4 w-[1250px]">
        <p class="text-2xl text-vvn-green mb-3">
          Basic Information
        </p>
        <div class="w-full mr-4">
          <label
            for="name"
            class=" text-vvn-gray text-base mb-2 inline-block"
          >Item Name</label>
          <TextInput
            id="name"
            v-model="data.name"
            name="name"
            :rules="'required|min:2'"
          />
        </div>
        <div class="w-full mr-4">
          <label
            for="part_id"
            class=" text-vvn-gray text-base mb-2 inline-block"
          >Part ID</label>
          <TextInput
            id="part_id"
            v-model="data.part_id"
            name="part_id"
            :rules="'required|min:2'"
          />
        </div>
        <div class="w-full mr-4">
          <label
            for="description"
            class=" text-vvn-gray text-base mb-2 mt-4 inline-block"
          >Description</label>
          <TextArea
            id="description"
            v-model="data.description"
            name="description"
            :rules="'required|min:2|max:256'"
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
        <a :href="`../equipment`">Close</a>
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
  extraFields: {name: string, value: string}[],
  part_id: string
}>({
  name: "",
  description: "",
  extraFields: [],
  part_id: ""
})

const successModalOpen = ref(false)

const validationSchema = toTypedSchema(
  z.object({
    name: z.string().nonempty('Name is required'),
    description: z.string().nonempty('Description is required'),
    part_id: z.string().nonempty('Part ID is required') 
  })
);

const validationResult = useForm({
  validationSchema,
})

const onSubmit = validationResult.handleSubmit(values => {
  const equipment: Equipment = {
    name: values.name,
    description: values.description,
    part_id: values.part_id,
    extraDetails: data.extraFields.map(i => ({name: i.name, value: i.value})) //fixes proxy cloning issue
  }
  store.createEquipmentInstance(equipment)
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
