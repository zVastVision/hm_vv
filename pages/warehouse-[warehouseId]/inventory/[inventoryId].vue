<template>
  <!-- ================================================ -->
  <!-- ===================Details View==================== -->
  <!-- ================================================ -->
  <main
    v-if="!edit"
  >
    <WarehouseHeaderWidget>
      {{ store.inventoryData?.name }}
    </WarehouseHeaderWidget>
    <div class="flex justify-end">
      <NuxtLink
        type="submit"
        class="btn btn--primary ml-4 flex"
        :to="`${store.inventoryData?.id}?edit=true`"
        :prefetch="true"
      >
        Edit
      </NuxtLink>
    </div>
    <div class="flex gap-6">
      <div class="flex-1 border border-vvn-white-15 p-5 rounded-[10px] bg-vvn-white-02 backdrop-blur-sm mt-4">
        <div class="flex justify-between items-center">
          <p class="text-2xl text-vvn-green mb-3 font-semibold">
            Basic Information
          </p>
          <div class="flex rounded-lg bg-vvn-gray-50 w-max items-center px-2 py-1 text-xs border-2 border-vvn-gray text-white">
            <div
              v-if="store.inventoryData?.trackThreshold && (store.inventoryData?.threshold as number) > store.inventoryData?.quantity"
              class="rounded-full bg-red-600 h-2 w-2 mr-2"
            />
            <div
              v-else
              class="rounded-full bg-green-600 h-2 w-2 mr-2"
            />
            <p><span v-if="store.inventoryData?.trackThreshold && (store.inventoryData?.threshold as number) > store.inventoryData?.quantity">Needs Attention</span><span v-else>Okay</span></p>
          </div>
        </div>
        <div class="w-full mr-4">
          <label
            for="name"
            class=" text-vvn-gray text-base mb-2 inline-block"
          >Main Identifier</label>
          <p class=" text-white text-base">
            {{ store.inventoryData?.name }}
          </p>
        </div>
        <div 
          v-if="store.inventoryData?.isKit == true"
          class="w-full mr-4 mt-4"
        >
          <label
            for="name"
            class=" text-vvn-gray text-base inline-block"
          >Is Kit</label>
          <p
            class=" text-white text-base"
          >
            Yes
          </p>
        </div>
        <div>
          <label
            for="description"
            class=" text-vvn-gray text-base mb-2 mt-4 inline-block"
          >Description</label>
          <p class=" text-white text-base">
            {{ store.inventoryData?.description }}
          </p>
        </div>
      </div>
      <div class=" border border-vvn-white-15 p-5 rounded-[10px] bg-vvn-white-02 backdrop-blur-sm mt-4 w-[378px]">
        <p class="text-2xl text-vvn-green mb-3 font-semibold">
          Inventory
        </p>
        <div class="w-full mr-4">
          <label
            for="name"
            class=" text-vvn-gray text-base mb-2 inline-block "
          >Current Inventory</label>
          <p class=" text-white text-base">
            {{ store.inventoryData?.quantity }}
          </p>
        </div>
        <div class="mt-4">
          <label
            for="trackThreshold"
            class=" text-vvn-gray text-base mb-2 block"
          >Track Inventory
            Threshold</label>
          <p class=" text-white text-base">
            <span v-if="true && store.inventoryData?.trackThreshold">Yes</span>
            <span v-else>No</span>
          </p>
        </div>
        <div class=" mt-4">
          <label
            for="threshold"
            class=" text-vvn-gray text-base mb-2"
          >Inventory Threshold</label>
          <p class=" text-white text-base">
            {{ store.inventoryData?.threshold || "Not Set" }}
          </p>
        </div>
        <div class=" mt-4">
          <label
            for="threshold"
            class=" text-vvn-gray text-base mb-2"
          >Tagged Inventory</label>
          <p class=" text-white text-base">
            0
          </p>
        </div>
        <div class=" mt-4">
          <label
            for="threshold"
            class=" text-vvn-gray text-base mb-2"
          >UnTagged Inventory</label>
          <p class=" text-white text-base">
            0
          </p>
        </div>
      </div>
    </div>
    <div class=" border border-vvn-white-15 p-5 rounded-[10px] bg-vvn-white-02 backdrop-blur-sm mt-6">
      <p class="text-2xl text-vvn-green mb-3 font-semibold">
        Custom Fields
      </p>
      <div v-if="store.inventoryData?.extraDetails.length != 0">
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
      <p
        v-else
        class=" text-vvn-gray-50"
      >
        No custom fields added
      </p>
      <hr
        v-if="store.inventoryData?.extraDetails.length != 0" 
        class=" border-y-vvn-gray-90 mb-3"
      >
      <div
        v-for="(item, index) in store.inventoryData?.extraDetails"
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
  </main>
  <!-- ================================================ -->
  <!-- ===================Edit View==================== -->
  <!-- ================================================ -->
  <form
    v-else
    id="form"
    @submit.prevent="onSubmit"
  >
    <WarehouseHeaderWidget>
      Edit {{ store.inventoryData?.name }}
    </WarehouseHeaderWidget>
    <div class="flex justify-end">
      <a
        :href="`${inventory.id}`"
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
            v-model="data.editInventoryData.name"
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
            v-model="data.editInventoryData.description"
            name="description"
            :rules="'required|minMax:5,10'"
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
            v-model.number="data.editInventoryData.quantity"
            type="number"
            name="quantity"
            :rules="'required|numeric'"
          />
        </div>
        <div class=" mt-4">
          <label
            for="trackThreshold"
            class=" text-vvn-gray text-base mb-2 block"
          >Track Inventory
            Threshold</label>
          <CheckBox
            v-model="data.editInventoryData.trackThreshold"
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
            v-model.number="data.editInventoryData.threshold"
            type="number"
            name="threshold"
            :rules="'numeric'"
            :disabled="!data.editInventoryData.trackThreshold"
          />
        </div>
      </div>
    </div>
    <div class=" border border-vvn-white-15 p-5 rounded-[10px] bg-vvn-white-02 backdrop-blur-sm mt-6">
      <p class="text-2xl text-vvn-green mb-3 font-semibold">
        Custom Fields
      </p>
      <div v-if="data.editInventoryData.extraDetails.length != 0">
        <div
          v-for="index in data.editInventoryData.extraDetails.length"
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
              v-model="data.editInventoryData.extraDetails[index-1].name"
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
              v-model="data.editInventoryData.extraDetails[index-1].value"
              :name="`customField${index-1}-value`"
            />
          </div>
          <button
            class="btn btn--secondary mb-1"
            type="button"
            @click="data.editInventoryData.extraDetails.splice(index-1, 1)"
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
  <!-- ================================================ -->
  <!-- ===================Kit Part List==================== -->
  <!-- ================================================ -->
  <div
    v-if="store.inventoryData?.isKit && !edit"
    class="flex-1 border border-vvn-white-15 p-5 rounded-[10px] bg-vvn-white-02 backdrop-blur-sm mt-4"
  >
    <p class="text-2xl text-vvn-green mb-3 font-semibold">
      Kit Parts
    </p>
    <TheTable
      :rows="['Item Name', 'Status', 'Quantity In Kit', '', '']"
      :template-columns="{ 'grid-template-columns': '50% 20% 15% 15%' }"
    >
      <TableRow
        v-for="(p, index) in store.inventoryList"
        :key="index"
        :data="p"
        class=" mb-3"
        :template-columns="{ 'grid-template-columns': '50% 20% 15% 15%' }"
      >
        <template #row-data="rowData: Inventory">
          <td class="pr-3">
            <p class="text-base relative text-white">
              {{ rowData.name }}
              <span
                v-if="rowData.isKit"
                class=" text-xs absolute top-0 bg-vvn-gray-50 rounded px-1 ml-1"
              >Kit</span>
            </p>
            <small class="text-xs text-vvn-gray line-clamp-1">{{ rowData.description }}</small>
          </td>
          <td>
            <div class="flex rounded-lg bg-vvn-gray-50 w-max items-center px-2 py-1 text-xs border-2 border-vvn-gray">
              <div
                v-if="rowData.trackThreshold && (rowData.threshold as number) > rowData.quantity"
                class="rounded-full bg-red-600 h-2 w-2 mr-2"
              />
              <div
                v-else
                class="rounded-full bg-green-600 h-2 w-2 mr-2"
              />
              <p><span v-if="rowData.trackThreshold && (rowData.threshold as number) > rowData.quantity">Needs Attention</span><span v-else>Okay</span></p>
            </div>
          </td>
          <td class=" text-base">
            {{ rowData.quantity }}
          </td>
          <td class="flex justify-end">
            <a
              class="btn btn--secondary flex"
              :href="`/warehouse-${$route.params.warehouseId}/inventory/${rowData.id}`"
            >
              View Inventory
            </a>
          </td>
        </template>
      </TableRow>
    </TheTable>
  </div>
</template>
<script lang="ts" setup>
// Begin Imports
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { Inventory } from '~/types';
// End of Imports

const data = reactive<{ editInventoryData: Inventory }>({
    editInventoryData: {
        id: "",
        name: "",
        description: "",
        quantity: 0,
        trackThreshold: false,
        warehouseID: "",
        threshold: 0,
        extraDetails: []
    }
})
const store = useInventoryStore()
const route = useRoute()
// const router = useRouter()
const edit = ref(false)

onMounted(() => {
    if (route.query.edit == "true") {
        edit.value = true
    }
})

useRouter().beforeEach((to, from, next) => {
  if (to.query.edit == "true") {
        edit.value = true
    } else edit.value = false
  next()
})

useAsyncData(async () => {
    store.getInventoryItemById(route.params.inventoryId as string)
        .catch(() => {
            useToast().error("Could not fetch inventory details")
        })
})

const inventory = computed(() => {
    data.editInventoryData.id = store.inventoryData?.id
    data.editInventoryData.name = store.inventoryData?.name || ""
    data.editInventoryData.description = store.inventoryData?.description || ""
    data.editInventoryData.extraDetails = store.inventoryData !=null ? [...store.inventoryData?.extraDetails as []] : []
    data.editInventoryData.trackThreshold = store.inventoryData?.trackThreshold || false
    data.editInventoryData.threshold = store.inventoryData?.threshold || 0
    data.editInventoryData.quantity = store.inventoryData?.quantity || 0
    return data.editInventoryData
})
const addNewField = () => {
    data.editInventoryData.extraDetails.push({name: '', value: ''})
}

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

const onSubmit = validationResult.handleSubmit(async values => {
  const inventory: Inventory = {
    id: route.params.inventoryId as string,
    name: values.name,
    description: values.description,
    quantity: values.quantity,
    trackThreshold: data.editInventoryData.trackThreshold,
    threshold: values.threshold,
    extraDetails: data.editInventoryData.extraDetails.map(i => ({name: i.name, value: i.value})), //fixes proxy cloning issue
    warehouseID: route.params.warehouseId as string
  }

  store.editInventoryItem(inventory)
  .then(() => {
    (document.getElementById("form") as HTMLFormElement).reset();
    store.getInventoryItemById(route.params.inventoryId as string)
    .then(() => {
      useRouter().push({path: route.params.inventoryId as string, query: {}, replace: true})
    })
  })
  .catch(() => {
    useToast().error("Update failed")
  })
  ;
})

</script>