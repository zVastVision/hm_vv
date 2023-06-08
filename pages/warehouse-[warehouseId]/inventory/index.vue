<template>
  <div class="mt-6 mb-4">
    <WarehouseHeaderWidget>Inventory</WarehouseHeaderWidget>
    <div class="flex justify-between">
      <div>
        <SearchInput
          v-show="tableDetails.length != 0"
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
            @click="actionsDropDownActive=true"
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
            class="actions-dropdown dropdown w-48 bg-vvn-gray text-white text-center rounded-lg absolute z-30 mt-2"
            :class="{ active: actionsDropDownActive }"
          >
            <li
              class="py-2 w-full"
              @click="editItem"
            >
              Quick Edit
            </li>
            <hr>
            <li
              class="py-2"
              @click="deleteConfirmationModalActive = true"
            >
              Delete
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
              <a href="inventory/new">Item</a>
            </li>
            <hr>
            <li class=" py-2">
              <a href="inventory/create-kit">Kit</a>
            </li>
            <hr>
            <li class=" py-2">
              <a href="inventory/csv">Upload csv</a>
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
        src="/images/svg/no-content.svg"
        alt=""
      >
      <p class="text-vvn-gray-90 text-center text-lg mt-6">
        No inventory created
      </p>
    </div>
  </div>
  <!-- ================================================ -->
  <!-- ===================Inventory List==================== -->
  <!-- ================================================ -->
  <TheTable
    v-else
    :rows="['', 'Item Name', 'Status', 'Total Inventory', 'Active Inventory', '']"
    :template-columns="{ 'grid-template-columns': '5% 30% 25% 15% 15% 10%' }"
  >
    <TableRow
      v-for="(p, index) in tableDetails"
      :key="index"
      :data="p"
      class=" mb-3"
      :toggle-details="true && data.toggledItem == p.id"
      :template-columns="{ 'grid-template-columns': '5% 30% 25% 15% 15% 10%' }"
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
        <td class=" text-base">
          {{ rowData.liveTags }}
        </td>
        <td class="flex justify-end">
          <button
            class=" mr-11"
            @click="toggleItem(rowData.id)"
          >
            <img
              class="caret"
              :class="{active: rowData.id == data.toggledItem}"
              src="/images/svg/caret-down.svg"
              alt="down"
            >
          </button>
        </td>
      </template>
      <template #details>
        <InventoryDetails :data="p" />
      </template>
    </TableRow>
  </TheTable>

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
const store = useInventoryStore()
const searchInput = useDebouncedRef("", 200)
const route = useRoute()
const router = useRouter()
const deleteConfirmationModalActive = ref(false)
const actionsDropDownActive = ref(false)

interface State {
  dropdownActive: boolean
  selected: string[]
  toggledItem: string
}
const data = reactive<State>({
  dropdownActive: false,
  selected: [],
  toggledItem: ""
})

const tableDetails = computed(() => {
  return searchInput.value == "" ? store.inventoryList : store.inventorySearch
})

watch(searchInput, async (current) => {
  store.searchInventoryItem(current, route.params.warehouseId as string, { page: 0, size: 100 })
})

await useAsyncData('', () => store.getInventoryItems(route.params.warehouseId as string, {}))
await useAsyncData('', () => store.subFunc(route.params.warehouseId as string, {}))

const deleteItems = () => {
  store.deleteItems(data.selected)
    .then(() => {
      store.getInventoryItems(route.params.warehouseId as string, {})
      data.selected = []
      deleteConfirmationModalActive.value = false
      useToast().success('Inventory Deleted')
    })
}

const editItem = () => {
  router.push({path: "inventory/" + data.selected[0], query: {edit: 'true'}})
}

const toggleItem = (id: string) => {
  if (data.toggledItem == id) data.toggledItem = ""
  else data.toggledItem = id
}
const closeActionsDropDown = () => setTimeout((() => actionsDropDownActive.value=false), 200)
const closeAddNewDropdown = () => setTimeout(() => data.dropdownActive = false, 200)
</script>
<style lang="scss" scoped>
.dropdown {
  height: 0;
  overflow: hidden;
  transition: all 0.3s ease-out;

  &.actions-dropdown.active {
    height: 80px;
  }
  &.active {
    height: 124px;
  }
}

.caret {
  transition: transform 0.2s ease-in;
  &.active {
    transform: rotate(-180deg)
  }
}
</style>
