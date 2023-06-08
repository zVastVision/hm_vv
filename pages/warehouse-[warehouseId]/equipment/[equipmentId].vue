<template>
  <main
    v-if="!edit"
    class="p-6"
  >
    <WarehouseHeaderWidget>
      {{ store.equipmentData?.name }}
    </WarehouseHeaderWidget>
    <div class="flex justify-end">
      <a
        type="submit"
        class="btn btn--secondary ml-4 flex"
        :href="`../equipment`"
      >
        Back
      </a>
      <a
        type="submit"
        class="btn btn--primary ml-4 flex"
        :href="`${store.equipmentData?.id}?edit=true`"
      >
        Edit
      </a>
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
          <p class=" text-white text-base">
            {{ store.equipmentData?.name }}
          </p>
        </div>
        <div>
          <label
            for="part_id"
            class=" text-vvn-gray text-base mb-2 inline-block"
          >Part ID</label>
          <p class=" text-white text-base">
            {{ store.equipmentData?.part_id }}
          </p>
        </div>
        <div class="w-full mr-4">
          <label
            for="description"
            class=" text-vvn-gray text-base mb-2 inline-block"
          >Description</label>
          <p class=" text-white text-base">
            {{ store.equipmentData?.description }}
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
        v-for="(item, index) in store.equipmentData?.extraDetails"
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
        Live View - {{ store.equipmentData?.name }}
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
      Edit {{ store.equipmentData?.name }}
    </WarehouseHeaderWidget>
    <div class="flex justify-end">
      <a
        :href="`${equipment.id}`"
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
            v-model="data.editEquipmentData.name"
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
            v-model="data.editEquipmentData.part_id"
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
            v-model="data.editEquipmentData.description"
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
      <div v-if="data.editEquipmentData.extraDetails.length != 0">
        <div
          v-for="index in data.editEquipmentData.extraDetails.length"
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
              v-model="data.editEquipmentData.extraDetails[index-1].name"
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
              v-model="data.editEquipmentData.extraDetails[index-1].value"
              :name="`customField${index-1}-value`"
            />
          </div>
          <button
            class="btn btn--secondary mb-1"
            type="button"
            @click="data.editEquipmentData.extraDetails.splice(index-1, 1)"
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

const data = reactive<{ editEquipmentData: Equipment }>({
    editEquipmentData: {
        id: "",
        name: "",
        description: "",
        part_id: "",
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
    store.getEquipmentItemById(route.params.equipmentId as string)
        .catch(() => {
            useToast().error("Could not fetch inventory details")
        })
})

const equipment = computed(() => {
    data.editEquipmentData.id = store.equipmentData?.id
    data.editEquipmentData.name = store.equipmentData?.name || ""
    data.editEquipmentData.description = store.equipmentData?.description || ""
    data.editEquipmentData.extraDetails = [...store.equipmentData?.extraDetails as []]
    data.editEquipmentData.part_id = store.equipmentData?.part_id || ""
    return data.editEquipmentData
})
const addNewField = () => {
    data.editEquipmentData.extraDetails.push({name: '', value: ''})
}

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
    id: route.params.equipmentId as string,
    name: values.name,
    description: values.description,
    part_id: values.part_id,
    extraDetails: data.editEquipmentData.extraDetails.map(i => ({name: i.name, value: i.value})) //fixes proxy cloning issue
  }


  store.editEquipmentItem(equipment)
  .then(() => {
    window.location.href = `${route.params.equipmentId}`
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
