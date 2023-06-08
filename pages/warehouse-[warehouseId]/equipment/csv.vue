<template>
  <div class="mt-6 mb-4">
    <div class="mt-6 mb-4">
      <h1 class="text-4xl font-bold text-white">
        Upload Inventory
      </h1>
      <div
        v-if="data.inventoryList.length != 0"
        class="flex justify-end mt-6"
      >
        <button
          class="btn btn--primary"
          type="submit"
          @click="createInventoryItems"
        >
          Save
        </button>
      </div>
    </div>
  </div>
  <TheTable
    v-if="data.inventoryList.length != 0"
    :rows="['', 'Item Name', 'Manufacturer', 'Quantity', 'Threshold']"
    :template-columns="{ 'grid-template-columns': '5% 25% 25% 15% 20% 10%' }"
  >
    <TableRow
      v-for="(p, index) in data.inventoryList"
      :key="index"
      :data="p"
      class=" mb-3"
      :toggle-details="false"
      :template-columns="{ 'grid-template-columns': '5% 25% 25% 15% 20% 10%'}"
    >
      <template #row-data="rowData">
        <td>
          <CheckBox
            v-model="data.selected"
            :value="index"
          />
        </td>
        <td>
          <p class="text-base">
            {{ rowData.name }}
          </p>
          <small class="text-xs text-vvn-gray text-ellipsis">{{ rowData.description }}</small>
        </td>
        <td class=" text-base">
          {{ rowData.manufacturer }}
        </td>
        <td class=" text-base">
          {{ rowData.quantity }}
        </td>
        <td class=" text-base">
          {{ rowData.threshold }}
        </td>
        <td class="flex justify-end">
          <button
            class="btn btn--secondary mr-3"
            @click="removeItem(index)"
          >
            Remove
          </button>
          <button
            class="btn btn--primary"
            @click="editItem(index)"
          >
            Edit
          </button>
        </td>
      </template>
    </TableRow>
  </TheTable>
  <!-- ================================================ -->
  <!-- ===================File Uploader==================== -->
  <!-- ================================================ -->
  <DropFile
    v-else 
    @change="uploadFile"
  />
  <!-- ================================================ -->
  <!-- ===================Edit Form==================== -->
  <!-- ================================================ -->
  <LazyDefaultModal
    v-model="editItemsOpen"
    @close="editItemsOpen = false"
  >
    <form
      id="form"
      class="p-6"
      @submit.prevent="saveEdit"
    >
      <h1 class="text-4xl font-bold text-white">
        Edit Item
      </h1>
      <div class=" border border-vvn-white-15 p-5 rounded-[10px] bg-vvn-white-02 backdrop-blur-sm mt-4">
        <div class="flex items-start">
          <div class="w-48 mr-4">
            <label
              for="name"
              class=" text-vvn-gray text-base mb-2 inline-block"
            >Name/Number</label>
            <TextInput
              id="name"
              v-model="data.inventoryItem.name"
              name="name"
              :rules="'required|min:2'"
            />
          </div>
          <div class="w-48 mr-4">
            <label
              for="description"
              class=" text-vvn-gray text-base mb-2 inline-block"
            >Description</label>
            <TextInput
              id="description"
              v-model="data.inventoryItem.description"
              name="description"
              :rules="'required|min:2'"
            />
          </div>
          <div class="w-48 mr-4">
            <label
              for="portNumber"
              class=" text-vvn-gray text-base mb-2 inline-block"
            >Port Number</label>
            <TextInput
              id="portNumber"
              v-model="data.inventoryItem.portNumber"
              name="portNumber"
              :rules="'required|min:2'"
            />
          </div>
        </div>
        <div class="mt-4 flex">
          <div class="w-48 mr-4">
            <label
              for="mfg"
              class=" text-vvn-gray text-base mb-2"
            >Manufacturer/Vendor</label>
            <TextInput
              id="mfg"
              v-model="data.inventoryItem.manufacturer"
              name="manufacturer"
              :rules="'required|min:2'"
            />
          </div>
          <div class="w-48 mr-4">
            <label
              for="quantity"
              class=" text-vvn-gray text-base mb-2"
            >Quantity</label>
            <TextInput
              id="quantity"
              v-model.number="data.inventoryItem.quantity"
              name="quantity"
              :rules="'required|numeric'"
            />
          </div>
          <div class="w-48">
            <label
              for="threshold"
              class=" text-vvn-gray text-base mb-2"
            >Inventory Threshold</label>
            <TextInput
              id="threshold"
              v-model.number="data.inventoryItem.threshold"
              name="threshold"
              :rules="'required|numeric'"
            />
          </div>
        </div>
      </div>
      <hr class=" w-full border border-vvn-white-10 my-6">
      <div class="flex justify-end items-center">
        <button class=" btn btn--primary">
          Save
        </button>
      </div>
    </form>
  </LazyDefaultModal>
  <!-- ================================================ -->
  <!-- ===================Success Modal================ -->
  <!-- ================================================ -->
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
import Papa from 'papaparse';
import { Inventory } from "~/types"
interface State {
  selected: [] | boolean
  inventoryList: Inventory[]
  selectedItem: number | null
  inventoryItem: Inventory 
}
const store = useInventoryStore()
const data  = reactive<State>({
  selected: [],
  inventoryList: [],
  inventoryItem: {
    name: "",
    description: "",
    totalInventory: 0,
    manufacturer: "",
    
  },
  selectedItem: null
})


const editItemsOpen = ref(false)
const successModalOpen = ref(false)

const uploadFile = async (file: File) => {
  Papa.parse<Inventory>(file, {
                header: true, 
                complete: (results) => {
                    results.data.forEach(i => {
                        data.inventoryList.push({
                          ...i, 
                          threshold: (Number(i.threshold) ), 
                          quantity: (Number(i.quantity)), 
                          totalInventory: (Number(i.quantity))
                        })
                    })
                }
            })
}

const removeItem = (index: number) => {
  data.inventoryList.splice(index, 1)
}

const editItem = (index: number) => {
  data.selectedItem = index
  const selectedItem = data.inventoryList[index]
  data.inventoryItem.name = selectedItem.name
  data.inventoryItem.description = selectedItem.description
  data.inventoryItem.manufacturer = selectedItem.manufacturer 
  data.inventoryItem.quantity = selectedItem.quantity
  data.inventoryItem.threshold = selectedItem.threshold
  data.inventoryItem.portNumber = selectedItem.portNumber
  editItemsOpen.value = true
}

const saveEdit = () => {
  data.inventoryList[data.selectedItem as number] = data.inventoryItem
  console.log(data.inventoryList)
  editItemsOpen.value = false
}

const createInventoryItems = () => {
  store.createBulkInventoryInstance(data.inventoryList)
  .then(() => {
    successModalOpen.value = true
    data.inventoryList = []
  })
}
</script>