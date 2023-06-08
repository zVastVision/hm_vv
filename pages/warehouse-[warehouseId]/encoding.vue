<template>
  <div
    class="bg-vvn-black-10 rounded-md"
    @submit.prevent="onSubmit"
  >
    <div class="mt-6 mb-4">
      <WarehouseHeaderWidget>Encoding</WarehouseHeaderWidget>
      <div class="flex justify-between my-5">
        <button
          class="btn btn--primary"
          @click="editItemsOpen = true"
        >
          Add Items To Queue
        </button>
        <div>
          <button
            :disabled="data.encodingList.length == 0"
            class="btn btn--secondary mr-2 disabled:cursor-not-allowed"
            type="button"
            @click="clearQueue"
          >
            Clear queue
          </button>
          <button
            class="btn btn--primary"
            type="submit"
            :disabled="true && data.encodingList.length == 0"
            @click="sendToPrinter()"
          >
            Print and Encode
          </button>
        </div>
      </div>
    </div>
    <TheTable
      v-if="data.encodingList.length != 0"
      :rows="['Item Name', 'Type', 'Status', '', '']"
      :template-columns="{ 'grid-template-columns': '40% 20% 15% 15% 10%' }"
    >
      <TableRow
        v-for="(p, index) in data.encodingList"
        :key="index"
        :data="p"
        class="mb-3"
        :toggle-details="false"
        :template-columns="{ 'grid-template-columns': '40% 20% 15% 15% 10%' }"
      >
        <template #row-data="rowData: Inventory">
          <td>
            <p class="text-base">
              {{ rowData.name }}
            </p>
            <small class="text-xs text-vvn-gray line-clamp-1">{{ rowData.description }}</small>
          </td>
          <td>
            <div class="flex rounded-lg bg-vvn-gray-50 w-max items-center px-2 py-1 text-xs border-2 border-vvn-gray">
              <p><span v-if="rowData.isKit">Kit</span><span v-else>Inventory</span></p>
            </div>
          </td>
          <td>
            <div
              v-if="sentToPrinterClicked == true"
              class="flex rounded-lg w-max items-center px-2 py-1 text-xs border-2 border-green-900 bg-green-800"
            >
              <div class="rounded-full bg-green-600 h-2 w-2 mr-2" />
              Sent to Printer
            </div>
            <div
              v-else
              class="flex rounded-lg w-max items-center px-2 py-1 text-xs border-2 border-red-900 bg-red-800"
            >
              <div class="rounded-full bg-red-600 h-2 w-2 mr-2" />
              Not Printed
            </div>
          </td>
          <td>
            <DefaultCounter
              v-model.number="data.encodingList[index].quantity"
              @change="data.encodingList[index].quantity == 0 ? data.encodingList.splice(index, 1) : null"
            />
          </td>
        </template>
      </TableRow>
    </TheTable>
    <div
      v-else
      class="w-full h-[30rem] flex justify-center items-center"
    >
      <div>
        <img
          src="/images/svg/no-content.svg"
          alt=""
        >
        <p class="text-vvn-gray-90 text-center text-lg mt-6">
          Encoding queue empty
        </p>
      </div>
    </div>
  </div>
  <!-- ================================================ -->
  <!-- ===================Search Modal==================== -->
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
      :rows="['Item Name', 'Type', 'Available Stock', '', '']"
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
        <template #row-data="rowData:Inventory">
          <td class="pr-3">
            <p class="text-base">
              {{ rowData.name }}
            </p>
            <small class="text-xs text-vvn-gray line-clamp-1">{{ rowData.description }}</small>
          </td>
          <td>
            <div class="flex rounded-lg bg-vvn-gray-50 w-max items-center px-2 py-1 text-xs border-2 border-vvn-gray">
              <p><span v-if="rowData.isKit">Kit</span><span v-else>Inventory</span></p>
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
              @click="addItemToEncodingQueue({ ...(rowData as Inventory), quantity: data.counterList[index] || 0 }, index)"
            >
              Add
            </button>
          </td>
        </template>
      </TableRow>
    </TheTable>
    <Loader v-else />
  </LazyDefaultModal>
  <!-- ================================================ -->
  <!-- ===================Success Modal==================== -->
  <!-- ================================================ -->
  <LazyConfirmationModal
    v-model="successModalOpen"
    @close="successModalOpen=false"
  >
    <h5 class=" text-2xl text-white text-center mt-4">
      Items Sent to Printer
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
import { Inventory } from '~/types';
// End of Imports
interface EncodingData {
  name: string
  description: string
  totalInventory: number
  quantity: number
  threshold: number
  encodingList: Inventory[],
  counterList: { [key: string]: number }
}
const data = reactive<EncodingData>({
  name: "",
  description: "",
  totalInventory: 0,
  quantity: 0,
  threshold: 0,
  encodingList: [],
  counterList: {}
})

const editItemsOpen = ref(false)
const searchInput = useDebouncedRef("", 200)
const successModalOpen = ref(false)
const sentToPrinterClicked = ref(false)
const inventoryStore = useInventoryStore()
const runtimeConfig = useRuntimeConfig()
const route = useRoute()

onBeforeMount(() => {
  data.encodingList = useGetLocalStorageJSON(runtimeConfig.app.encodingQueue + "." + route.params.warehouseId) as Inventory[] || []
})
await useAsyncData('', () => inventoryStore.getInventoryItems(route.params.warehouseId as string, {
  page: 0,
  size: 20
}))

const tableDetails = computed(() => {
  return searchInput.value == "" ? inventoryStore.inventoryList : inventoryStore.inventorySearch
})

watch(searchInput, async (current) => {
  inventoryStore.searchInventoryItem(current, route.params.warehouseId as string, { page: 0, size: 20 })
})

const addItemToEncodingQueue = (rowData: Inventory, index: number) => {
  if (rowData.quantity <= 0) {
    useToast().error("Invalid item quantity")
  } else {
    data.encodingList.push(rowData)
    data.counterList[index] = 1
    useSetLocalStorage(runtimeConfig.app.encodingQueue+"." + route.params.warehouseId, data.encodingList)
    useToast().success(`${rowData.name} added to queue`)
  }
}

const sendToPrinter = () => {
  //console.log(inventoryStore.editItem([data.encodingList]))
  const epcs = inventoryStore.encItem([data.encodingList])
  //var epcs = []

  /*if(i_clicked == true){
    epcs = inventoryStore.encItem([data.encodingList])
  }
  if(em_clicked == true){
    pressEmp()
  }
  if(eq_clicked == true){
    pressEq()
  }*/

  epcs.then((result) => {
    console.log("THE EPC!!!")
    console.log(result)

    //const zplString = '^XA^RS8^RFW,H^FD123456789ABC123456789ABC^FS^RFR,H,0,12,1^FN1^FS^XZ'

    let zplString = ''
    const keys = Object.keys(result)
    for (let l = 0; l < keys.length; l++) {
      //console.log("FOR LOOP")
      //console.log(result[keys[l]])

      const sub_epcs = result[keys[l]][1][0]
      for (let k = 0; k < sub_epcs.length; k++) {
        zplString = zplString + '^XA^FO50,50^A0N,50,50^FD' + keys[l] + '^FS^FO50,150^A0N,50,50^FD' + result[keys[l]][0] + '^FS^RS8^RFW,H^FD' + sub_epcs[k] + '^FS^RFR,H,0,12,1^FN1^FS^XZ'
      }
    }
    console.log(zplString)

    successModalOpen.value = true
    sentToPrinterClicked.value = true

    const printer_data = new FormData()

    printer_data.append("sn", "DBN231050752")
    const fileBlob = new Blob([zplString], {type: 'text/plain'})
    printer_data.append("zpl_file", fileBlob, "ZplFile.txt")
    const xhr = new XMLHttpRequest()
    xhr.open("POST", "https://api.zebra.com/v2/devices/printers/send")
    xhr.setRequestHeader("apikey", "SW5fV2HzowqkaKdxTKmNhAw0MGYsSSPr")
    xhr.setRequestHeader("tenant", "83c99b121eda1c7f6a30e5b65a210b91")
    xhr.send(printer_data)
  }).catch((err) => {
    useToast().error("No more avaiable EPCs to utilize")
  });
}

const clearQueue = () => {
  data.encodingList = []; 
  useSetLocalStorage(runtimeConfig.app.encodingQueue+"." + route.params.warehouseId, [])
}
</script>
  
