<template>
  <div class="flex p-5 items-end justify-between">
    <div class="grid grid-cols-4 gap-2 w-8/12">

      <div class="table_details_card">
        <p class="table_details_card__heading text-vvn-green">
          Total Inventory
        </p>
        <p class="table_details_card__body--regular">
          {{ data.quantity }}
        </p>
      </div>
      <div class="table_details_card">
        <p class="table_details_card__heading text-vvn-green">
          Inactive Inventory
        </p>
        <p class="table_details_card__body--regular">
          {{ data.quantity - data.liveTags }}
        </p>
      </div>
      <div class="table_details_card">
        <p class="table_details_card__heading text-vvn-green">
          Active Inventory
        </p>
        <p class="table_details_card__body--regular">
          {{ data.liveTags }}
        </p>
      </div>
      <div class="table_details_card">
        <p class="table_details_card__heading text-vvn-green">
          Threshold
        </p>
        <p class="table_details_card__body--regular">
          {{ data.threshold }}
        </p>
      </div>
    </div>
    <div class="flex gap-5">
      <a
        class="btn btn--secondary flex"
        :href="`inventory/${data.id}`"
      >
        More Info
      </a>
      <button
        class="btn btn--primary"
        @click="addToEncodingQueue"
      >
        Add To Encoding Queue
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Inventory } from '~/types';
interface Props {
  data: Inventory
}
const props = defineProps<Props>();
const runtimeConfig = useRuntimeConfig()
const route = useRoute()

const addToEncodingQueue = () => {
  const encodingQueue: Inventory[] = (useGetLocalStorageJSON(runtimeConfig.app.encodingQueue + "." + route.params.warehouseId) as Inventory[]) || []
  const exists = encodingQueue.find((i: Inventory) => i.id === props.data.id)
  if (exists) {
    useToast().error("Item already exists in encoding queue")
  } else {
    encodingQueue.push({ ...props.data, quantity: 1 })
    useSetLocalStorage(runtimeConfig.app.encodingQueue + "." + route.params.warehouseId, encodingQueue)
    useToast().success("Added to encoding queue")
  }
}
</script>
