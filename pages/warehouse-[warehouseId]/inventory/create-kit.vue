<template>
  <form
    id="form"
    class="p-6"
    @submit.prevent="onSubmit"
  >
    <div class="mt-6 mb-4">
      <h1 class="text-4xl font-bold text-white">
        Create Kit
      </h1>
      <small class=" text-base text-vvn-gray">Albuquerque facility</small>
      <div class="flex justify-end">
        <a
          :href="`/warehouse-${$route.params.warehouseId}/inventory`"
          class="btn btn--secondary flex mr-2"
        >
          Cancel
        </a>
        <button
          class="btn btn--primary"
          type="submit"
        >
          Save
        </button>
      </div>
    </div>
    <div class=" border border-vvn-white-15 p-5 rounded-[10px] bg-vvn-white-02 backdrop-blur-sm mt-4">
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
              :rules="'required|minMa:5,10'"
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
          <div class=" mt-4">
            <label
              for="trackThreshold"
              class=" text-vvn-gray text-base mb-2 block"
            >Track Inventory Threshold</label>
            <CheckBox
              v-model.number="data.trackThreshold"
              class="block"
              :value="false"
              name="trackThreshold"
              :rules="'required|numeric'"
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
              name="threshold"
              :rules="'required|numeric'"
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
      <div class="bg-vvn-white-04 mt-9 rounded-xl px-5 py-6">
        <div class="flex justify-between">
          <h5 class=" text-vvn-green">
            <span v-if="true && data.kitParts.length == 0">Add parts to kit</span>
            <span v-else> Kit parts</span>
          </h5>
          <button
            class="btn btn--primary"
            type="button"
            @click="editItemsOpen = true"
          >
            <span>Add Item</span>
          </button>
        </div>
        <TheTable
          :rows="['Item Name', 'Status', 'Available Stock', '', '']"
          :template-columns="{ 'grid-template-columns': '40% 20% 15% 15% 10%' }"
        >
          <TableRow
            v-for="(p, index) in data.kitParts"
            :key="index"
            :data="p"
            class="mb-3"
            :toggle-details="false"
            :template-columns="{ 'grid-template-columns': '40% 20% 15% 15% 10%' }"
          >
            <template #row-data="rowData">
              <td class="pr-3">
                <p class="text-base">
                  {{ rowData.name }}
                </p>
                <small class="text-xs text-vvn-gray line-clamp-1">{{ rowData.description }}</small>
              </td>
              <td>
                <div class="flex rounded-lg bg-vvn-gray-50 w-max items-center px-2 py-1 text-xs border-2 border-vvn-gray">
                  <div
                    v-if="rowData.threshold < rowData.quantity"
                    class="rounded-full bg-red-600 h-2 w-2 mr-2"
                  />
                  <div
                    v-else
                    class="rounded-full bg-green-600 h-2 w-2 mr-2"
                  />
                  <p><span v-if="rowData.threshold < rowData.quantity">Need Attention</span><span v-else>Okay</span></p>
                </div>
              </td>
              <td class="text-base">
                {{ rowData.quantity }}
              </td>
              <td>
                <DefaultCounter
                  v-model.number="data.kitParts[index].quantity"
                  @change="data.kitParts[index].quantity == 0 ? data.kitParts.splice(index, 1) : null"
                />
              </td>
            </template>
          </TableRow>
        </TheTable>
      </div>
    </div>
  </form>
  <!-- ================================================ -->
  <!-- ===================Kit Items Modal==================== -->
  <!-- ================================================ -->
  <LazyDefaultModal
    v-model="editItemsOpen"
    @close="editItemsOpen = false"
  >
    <h1 class="text-3xl font-bold text-white">
      Search Inventory
    </h1>
    <small class=" text-base text-vvn-gray">Albuquerque facility</small>
    <div class=" w-80 mt-5 mb-7">
      <SearchInput
        v-model.trim.lazy="searchInput"
        :show-secondary-icon="true"
        @input="tableDetails = []"
      />
    </div>
    <TheTable
      v-if="tableDetails.length != 0"
      :rows="['Item Name', 'Status', 'Inventory', 'Available Stock', '']"
      :template-columns="{ 'grid-template-columns': '40% 20% 15% 15% 10%' }"
    >
      <TableRow
        v-for="(p, index) in tableDetails"
        :key="index"
        :data="p"
        class="mb-3"
        :toggle-details="false"
        :template-columns="{ 'grid-template-columns': '40% 20% 15% 15% 10%' }"
      >
        <template #row-data="rowData">
          <td>
            <p class="text-base">
              {{ rowData.name }}
            </p>
            <small class="text-xs text-vvn-gray">Used on mobile unit</small>
          </td>
          <td>
            <div class="flex rounded-lg bg-vvn-gray-50 w-max items-center px-2 py-1 text-xs border-2 border-vvn-gray">
              <div
                v-if="rowData.threshold < rowData.quantity"
                class="rounded-full bg-red-600 h-2 w-2 mr-2"
              />
              <div
                v-else
                class="rounded-full bg-green-600 h-2 w-2 mr-2"
              />
              <p><span v-if="rowData.threshold < rowData.quantity">Needs Attention</span><span v-else>Okay</span></p>
            </div>
          </td>
          <td class="text-base">
            {{ rowData.quantity }}
          </td>
          <td>
            <DefaultCounter v-model.number="data.counterList[index]" />
          </td>
          <td class="flex justify-end">
            <button
              class="btn btn--primary"
              type="button"
              @click="addToKitItems({ ...(rowData as Inventory), quantity: data.counterList[index] || 0 }, index)"
            >
              Add
            </button>
          </td>
        </template>
      </TableRow>
    </TheTable>
    <Loader v-else />
  </LazyDefaultModal>
  <LazyConfirmationModal v-model="successModalOpen">
    <h5 class=" text-2xl text-white text-center mt-4">
      Kit created successfully
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
  
<script setup lang="ts">
// Begin Imports
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { Inventory } from '~/types';
// End of Imports
interface KitData {
  name: string
  description: string
  quantity: number
  threshold: number
  trackThreshold: boolean
  extraFields: { name: string, value: string }[]
  kitParts: Inventory[]
  counterList: { [key: string]: number }
}
const data = reactive<KitData>({
  name: "",
  description: "",
  quantity: 0,
  trackThreshold: false,
  threshold: 0,
  kitParts: [],
  counterList: {},
  extraFields: []
})

const editItemsOpen = ref(false)
const searchInput = useDebouncedRef("", 200)
const successModalOpen = ref(false)
const route = useRoute()
const inventoryStore = useInventoryStore()

await useAsyncData('', () => inventoryStore.getInventoryItems(route.params.warehouseId as string, {
  page: 0,
  size: 5
}))

const tableDetails = computed(() => {
  return searchInput.value == "" ? inventoryStore.inventoryList : inventoryStore.inventorySearch
})

watch(searchInput, async (current) => {
  inventoryStore.searchInventoryItem(current, route.params.warehouseId as string, { page: 0, size: 5 })
})

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
  if (data.kitParts.length == 0) {
    useToast().error("Kit items cannot be empty")
  } else {
    const inventory: Inventory = {
      name: values.name,
      description: values.description,
      quantity: values.quantity,
      trackThreshold: data.trackThreshold,
      threshold: values.threshold,
      extraDetails: data.extraFields.map(i => ({ name: i.name, value: i.value })), //fixes proxy cloning issue
      warehouseID: route.params.warehouseId as string
    }
    inventoryStore.createKit(inventory, data.kitParts.map(i => ({
        partId: i.id as string,
        quantity: i.quantity as number
      })
    ));
    (document.getElementById("form") as HTMLFormElement).reset();
    data.kitParts = []
    successModalOpen.value = true
  }
})

const addToKitItems = (rowData: Inventory, index: number) => {
  if (rowData.quantity as number <= 0) {
    useToast().error("Invalid item quantity")
  } else {
    data.kitParts.push(rowData)
    data.counterList[index] = 1
    useToast().success(`${rowData.name} added to kit items`)
  }
}
const addNewField = () => { data.extraFields.push({ name: '', value: '' }) }
</script>
  