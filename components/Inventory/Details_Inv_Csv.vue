<template>
  <div class="flex p-5 items-end justify-between">
    <div class="grid grid-cols-4 gap-2 w-8/12">
      <div class="table_details_card">
        <p class="table_details_card__heading text-vvn-blue">
          Name
        </p>
        <p class="table_details_card__body--regular line-clamp-1">
          {{ data.name }}
        </p>
      </div>
      <div class="table_details_card">
        <p class="table_details_card__heading text-vvn-blue">
          Customer
        </p>
        <p class="table_details_card__body--regular line-clamp-1">
          {{ data.product_id }}
        </p>
      </div>
      <div />
      <div />
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
          Threshold
        </p>
        <p class="table_details_card__body--regular">
          {{ data.threshold }}
        </p>
      </div>
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

const addToEncodingQueue = () => {
  const encodingInvQueue: Inventory[] = useGetLocalStorageJSON(runtimeConfig.encodingInvQueue) as Inventory[]
  //const encodingQueue: InventoryItem[] = useGetLocalStorageJSON(runtimeConfig.encodingQueue) as InventoryItem[]
  const exists = encodingInvQueue.find((i: InventoryItem) => i.id === props.data.id)
  if (exists) {
    useToast().error("Item already exists in encoding queue")
  } else {
    console.log(props.data)
    encodingInvQueue.push({ ...props.data, quantity: 1 })
    console.log(encodingInvQueue)
    useSetLocalStorage(runtimeConfig.encodingInvQueue, encodingInvQueue)
    useToast().success("Inventory Added to encoding queue")
  }
}
</script>
