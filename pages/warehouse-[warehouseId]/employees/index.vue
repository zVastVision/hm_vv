<template>
  <div class="mt-6 mb-4">
    <WarehouseHeaderWidget>Employees</WarehouseHeaderWidget>
    <div class="flex justify-between">
      <div>
        <SearchInput
          v-show="tableDetails.length != 0 || searchInput.value != ''"
          v-model.trim.lazy="searchInput"
          :show-secondary-icon="true"
          class="w-[19rem] mt-4"
        />
      </div>
      <div class="flex items-end">
        <div class="relative">
        <button
          class="btn btn--secondary mr-2 flex gap-2"
          :disabled="data.selected.length < 1"
          @click="actionsDropDownActive = !actionsDropDownActive"
          @blur="closeActionsDropDown"
        >
          Actions
          <img
            class="caret"
            :class="{active: actionsDropDownActive}"
            src="/images/svg/caret-down.svg"
            alt="down"
          >
        </button>
        <ul
          v-if="data.selected.length > 1"
          class="dropdown w-48 bg-vvn-gray text-white text-center rounded-lg absolute z-30 -ml-14 mt-2"
          :class="{ active: actionsDropDownActive }"
        >
          <li
            class="py-2"
          >
            <button @click="deleteConfirmationModalActive = true">Delete</button>
          </li>
          <hr>
          <li
            class="py-2"
          >
            <button @click="addToEncodingQueue()">Add to Encoding Queue</button>
          </li>
        </ul>
        <ul
          v-else
          class="actions-dropdown dropdown w-48 bg-vvn-gray text-white text-center rounded-lg absolute z-30 -ml-14 mt-2"
          :class="{ active: actionsDropDownActive }"
        >
          <li
            class="py-2 w-full"
          >
            <a :href="`employees/${data.selected[0]}?edit=true`">Edit</a>
          </li>
          <hr>
          <li
            class="py-2"
          >
            <button @click="deleteConfirmationModalActive = true">Delete</button>
          </li>
          <hr>
          <li
            class="py-2"
          >
            <button @click="addToEncodingQueue()">Add to Encoding Queue</button>
          </li>
        </ul>
        </div>
        <div class="relative">
          <button
            class="btn btn--primary appearance-none"
            @click="data.dropdownActive = !data.dropdownActive"
            @blur="closeAddNewDropdown"
          >
            + Add New
          </button>
          <ul
            class="dropdown w-48 bg-vvn-gray text-white text-center rounded-lg absolute z-30 -ml-14 mt-2"
            :class="{ active: data.dropdownActive }"
          >
            <li class=" py-2">
              <a href="employees/new">Employee</a>
            </li>
            <hr>
            <hr>
            <li class=" py-2">
              <a href="employees/csv">Upload csv</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- ================================================ -->
  <!-- ===================Empty list view==================== -->
  <!-- ================================================ -->
  <div
    v-if="tableDetails.length == 0"
    
    class="w-full h-[30rem] flex justify-center items-center"
  >
    <div>
      <img
        src="/images/svg/lost.svg"
        alt=""
      >
      <p v-if="searchInput.value == ''" class="text-vvn-gray-90 text-center text-lg mt-6">
        No employees created
      </p>
      <p v-else class="text-vvn-gray-90 text-center text-lg mt-6">
        No employees return from search
      </p> 
    </div>
  </div>
  <!-- ================================================ -->
  <!-- ===================Inventory List==================== -->
  <!-- ================================================ -->
  <TheTable
    v-else
    :rows="['', 'Employee Name', '']"
    :template-columns="{ 'grid-template-columns': '5% 85% 10%' }"
  >
    <TableRow_Employee
      v-for="(p, index) in tableDetails"
      :key="index"
      :data="p"
      class=" mb-3"
      :toggle-details="true && data.toggledItem == p.id"
      :template-columns="{ 'grid-template-columns': '5% 85% 10%' }"
    >
      <template #row-data="rowData: Inventory">
        <td>
          <CheckBox
            v-model="data.selected"
            :value="(p.id as string)"
          />
        </td>
        <td class="pr-3">
          <p class="text-base relative">
            {{ rowData.name }}
          </p>
          <small class="text-xs text-vvn-gray line-clamp-1">{{ rowData.title }}</small>
        </td>
        <td class="flex justify-end">
          <button
            v-if="true && data.toggledItem != rowData.id"
            class=" mr-11"
            @click="data.toggledItem = rowData.id"
          >
            <img
              src="/images/svg/caret-down.svg"
              alt="down"
            >
          </button>
          <button
            v-else
            class=" mr-11"
            @click="data.toggledItem = -1"
          >
            <img
              src="/images/svg/caret-up.svg"
              alt="down"
            >
          </button>
        </td>
      </template>
      <template #details>
        <InventoryDetailsEmployee :data="p" />
      </template>
    </TableRow_Employee>
  </TheTable>
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
        </div>
        <div class="mt-4 flex">
          <div class="w-48 mr-4">
            <label
              for="portNumber"
              class=" text-vvn-gray text-base mb-2 "
            >Port Number</label>
            <TextInput
              id="portNumber"
              v-model="data.inventoryItem.portNumber"
              name="portNumber"
              :rules="'required|min:2'"
            />
          </div>
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
  <!-- ===================Confirmation Modal==================== -->
  <!-- ================================================ -->
  <LazyConfirmationModal
    v-model="deleteConfirmationModalActive"
    @close="deleteConfirmationModalActive = false"
  >
    <template #icon>
      <p class="text-xl text-white">
        ?
      </p>
    </template>
    <h4 class="text-xl text-white text-center mt-3">
      Are you sure you want<br> to delete selected items?
    </h4>
    <div class="flex justify-center gap-4 mt-4">
      <button
        class="btn btn--primary"
        style="background-color: transparent; border-color:white"
        @click="deleteConfirmationModalActive = !deleteConfirmationModalActive"
      >
        Close
      </button>
      <button
        class="btn btn--primary"
        @click="deleteItems"
      >
        Delete
      </button>
    </div>
  </LazyConfirmationModal>
</template>

<script setup lang="ts">
import { Inventory } from "~/types"

/*interface Props {
  data: Inventory
}
const props = defineProps<Props>();*/
const runtimeConfig = useRuntimeConfig()

interface State {
  dropdownActive: boolean
  selected: string[]
  toggledItem: string
  inventoryItem: Inventory
}
const data = reactive<State>({
  dropdownActive: false,
  selected: [],
  toggledItem: "",
  inventoryItem: {
    id: "",
    name: "",
    description: "",
    totalInventory: 0,
    manufacturer: "",
  },
})

const store = useInventoryStore()
const editItemsOpen = ref(false)
const searchInput = useDebouncedRef("", 200)
const deleteConfirmationModalActive = ref(false)
const actionsDropDownActive = ref(false)

const tableDetails = computed(() => {
  return searchInput.value == "" ? store.employeeList : store.employeeSearch
  //return store.employeeList
})

watch(searchInput, async (current) => {
  //store.searchInventoryItem(current, { page: 0, size: 5 })
  store.searchEmployeeItem(current, { page: 0, size: 100 })
})
await useAsyncData('', () => store.getEmployeeItems({}))

const editItem = () => {
  /*const selectedItem = store.inventoryList.find(i => i.id == data.selected[0]) as Inventory
  data.inventoryItem.id = selectedItem.id
  data.inventoryItem.name = selectedItem.name
  data.inventoryItem.description = selectedItem.description
  data.inventoryItem.quantity = selectedItem.quantity
  data.inventoryItem.threshold = selectedItem.threshold
  editItemsOpen.value = true*/
}

const deleteItems = () => {
  store.deleteEmployees(data.selected)
    .then(() => {
      store.getEmployeeItems({})
      data.selected = []
      deleteConfirmationModalActive.value = false
      useToast().success('Employees Deleted')
    })
}

const saveEdit = async () => {
  /*store.editInventoryItem(data.inventoryItem).then(() => {    
    store.getInventoryItems({})
    editItemsOpen.value = false
    useToast().success('Item updated')
  }).catch(() => {
    useToast().error('Update failed')
  })*/
}

const addToEncodingQueue = async () => {
  const encodingEmpQueue: Employee[] = useGetLocalStorageJSON(runtimeConfig.encodingEmpQueue) as Employee[]
  //const encodingInvQueue: Inventory[] = useGetLocalStorageJSON(runtimeConfig.encodingInvQueue) as Inventory[]
  for (let s = 0; s < data.selected.length; s++) {
    //const encodingInvQueue: Inventory[] = useGetLocalStorageJSON(runtimeConfig.encodingInvQueue) as Inventory[]
    //const exists = encodingInvQueue.find((i: InventoryItem) => i.id === data.selected[s])
    const exists = encodingEmpQueue.find((i: Employee) => i.id === data.selected[s])
    if (exists) {
      useToast().error("Item already exists in encoding queue")
    } else {
      store.getEmployeeItemById(data.selected[s] as string).then(() => {
        //console.log(store.inventoryData)
        encodingEmpQueue.push({ ...store.employeeData, quantity: 1 })
        //console.log(encodingInvQueue)
        useSetLocalStorage(runtimeConfig.encodingEmpQueue, encodingEmpQueue)
        useToast().success("Employee Added to encoding queue")
      }).catch(() => {
        useToast().error('Item not found in database')
      })
    }
  }
}

const closeActionsDropDown = () => setTimeout((() => actionsDropDownActive.value=false), 100)
const closeAddNewDropdown = () => setTimeout(() => data.dropdownActive = false, 100)
</script>
<style lang="scss" scoped>
.dropdown {
  height: 0;
  overflow: hidden;
  transition: all 0.3s ease-out;

  &.actions-dropdown.active {
    height: 124px;
  }
  &.active {
    height: 80px;
  }
}

.caret {
  transition: transform 0.2s ease-in;
  &.active {
    transform: rotate(-180deg)
  }
}
</style>
