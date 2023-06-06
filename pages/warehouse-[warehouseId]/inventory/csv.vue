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
    :rows="['', 'Item Name', '', 'Quantity', 'Threshold']"
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
          <small class="text-xs text-vvn-gray text-ellipsis line-clamp-1">{{ rowData.description }}</small>
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
import { string } from 'zod';
import { Inventory } from "~/types"
interface EInventory extends Inventory {
  group: string
}
interface State {
  selected: [] | boolean
  inventoryList: EInventory[]
}
const store = useInventoryStore()
const route = useRoute()
const data  = reactive<State>({
  selected: [],
  inventoryList: []
})

const successModalOpen = ref(false)

const uploadFile = async (file: File) => {
  const groupList = await useGetUserGroups()
  Papa.parse<Inventory>(file, {
                header: true, 
                complete: (results) => {
                    results.data.forEach(i => {
                      const name = i.name
                      const description = i.description
                      const threshold = (Number(i.threshold))
                      const trackThreshold = !isNaN(threshold)
                      const quantity = i.quantity
                      const warehouseID= route.params.warehouseId as string
                      const newObj = JSON.parse(JSON.stringify(i))

                      delete newObj["name"]
                      delete newObj["description"]
                      delete newObj["threshold"]
                      delete newObj["quantity"]

                      const extraDetails: Record<string, string>[] = []
                      for (const key in newObj) {
                        if (newObj.hasOwnProperty(key)) {
                          extraDetails.push({
                            name: key,
                            value: newObj[key]
                          })
                        }
                      }
                        data.inventoryList.push({
                          name: name,
                          description: description,
                          trackThreshold: trackThreshold,
                          threshold: trackThreshold ? threshold : null, 
                          quantity: quantity,
                          warehouseID: warehouseID,
                          extraDetails: extraDetails,
                          group: groupList[0]
                        })
                    })
                }
            })
}

const removeItem = (index: number) => {
  data.inventoryList.splice(index, 1)
}

const createInventoryItems = () => {
  store.createBulkInventoryInstance(data.inventoryList)
  .then(() => {
    successModalOpen.value = true
    data.inventoryList = []
  })
}
</script>