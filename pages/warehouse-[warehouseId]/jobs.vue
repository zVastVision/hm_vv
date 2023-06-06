<template>
  <div class="mt-6 mb-4">
    <WarehouseHeaderWidget>Job Management</WarehouseHeaderWidget>
  </div>
  <SearchInput class="w-[19rem] mb-4" />
  <TheTable
    :rows="['Job Name', 'Status', 'Customer', 'Date', '']"
    :template-columns="{ 'grid-template-columns': '24% 24% 24% 24% 4%' }"
  >
    <TableRow
      v-for="job in jobs.data"
      :key="job.id"
      :data="job"
      class="mb-3"
      :toggle-details="job.opened"
      :template-columns="{ 'grid-template-columns': '24% 24% 24% 24% 4%' }"
    >
      <template #row-data="rowData">
        <div>
          <h1>Job Name {{ rowData.title }}</h1>
          <p>Address</p>
        </div>
        <div>Not Started</div>
        <div>John Doe</div>
        <div>28/3/23</div>
        <div>
          <button @click="toggleItem(job.id)">
            btn
          </button>
        </div>
      </template>

      <template #details>
        <div class="grid grid-flow grid-cols-4 h-auto">
          <div class="col-span-3 p-4 m-6 bg-black-card rounded-xl">
            <!-- TODO: vue flow? -->
          </div>
          <!-- Notifications Bar -->
          <div class="col-span-1 row-span-2 m-4">
            <h1 class="text-vvn-gray">
              Notifications
            </h1>
            <div class="flex flex-col">
              <div
                class="bg-black-card rounded-xl border-2 border-[#444444] p-4 mt-2"
              >
                <h1 class="text-vvn-green font-bold">
                  Scanner 1 Active
                </h1>
                <p class="text-vvn-gray text-sm">
                  28/3/23 EST 10:30 AM
                </p>
              </div>
            </div>
          </div>

          <!-- Asset Cards -->
          <div class="m-4 bg-black-card rounded-xl">
            <h1 class="p-4 text-vvn-gray">
              Employees
            </h1>
            <div class="m-2 bg-black-inner-card rounded-md">
              <h1 class="font-bold pl-4 pt-4">
                Jordan Zotts
              </h1>
              <p class="text-vvn-gray text-sm pl-4 py-2">
                jordan@vastvision.io
              </p>
            </div>
            <div class="m-2 bg-black-inner-card rounded-md">
              <h1 class="font-bold pl-4 pt-4">
                Jordan Zotts
              </h1>
              <p class="text-vvn-gray text-sm pl-4 py-2">
                jordan@vastvision.io
              </p>
            </div>
          </div>

          <div class="m-4 bg-black-card rounded-xl">
            <h1 class="p-4 text-vvn-gray">
              Equipment
            </h1>
            <div class="m-2 bg-black-inner-card rounded-md">
              <h1 class="font-bold pl-4 pt-4">
                Truck #1
              </h1>
              <p class="text-vvn-gray text-sm pl-4 py-2">
                12 feet moving truck
              </p>
            </div>
          </div>

          <div class="m-4 bg-black-card rounded-xl">
            <h1 class="p-4 text-vvn-gray">
              Registered Inventory
            </h1>
            <div class="m-2 bg-black-inner-card rounded-md">
              <h1 class="font-bold pl-4 pt-4">
                Conference Table
              </h1>
              <p class="text-vvn-gray text-sm pl-4 py-2">
                From Conference room #1A
              </p>
            </div>
          </div>
        </div>
      </template>
    </TableRow>
  </TheTable>
</template>

<script setup lang="ts">
const jobs = ref({
  data: [
    { title: 'test', opened: false, id: 0 },
    { title: 'test2', opened: false, id: 1 },
  ],
})

// closes all items not toggled
const toggleItem = (i: number) => {
  for (let idx = 0; idx < jobs.value.data.length; idx++) {
    console.log(jobs.value.data[i])
    if (idx == i) {
      jobs.value.data[i].opened = !jobs.value.data[i].opened
    } else {
      jobs.value.data[idx].opened = false
    }
  }
}
</script>

<style scoped></style>
