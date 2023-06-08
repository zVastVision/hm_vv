<template>
  <div class="flex p-5 items-end justify-between">
    <div class="grid grid-cols-4 gap-2 w-8/12">
      <div class="table_details_card">
        <p class="table_details_card__heading text-vvn-blue">
          Email
        </p>
        <p class="table_details_card__body--regular line-clamp-1">
          {{ data.email }}
        </p>
      </div>
      <div class="table_details_card">
        <p class="table_details_card__heading text-vvn-blue">
          Phone
        </p>
        <p class="table_details_card__body--regular line-clamp-1">
          {{ data.phone }}
        </p>
      </div>
    </div>
    <div class="flex gap-5">
      <a
        class="btn btn--secondary flex"
        :href="`employees/${data.id}`"
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
import { Inventory, Employee } from '~/types';
interface Props {
  data: Employee
}
const props = defineProps<Props>();
const runtimeConfig = useRuntimeConfig()

const addToEncodingQueue = () => {
  const encodingEmpQueue: Employee[] = useGetLocalStorageJSON(runtimeConfig.encodingEmpQueue) as Employee[]
  const exists = encodingEmpQueue.find((i: Employee) => i.id === props.data.id)
  if (exists) {
    useToast().error("Item already exists in encoding queue")
  } else {
    encodingEmpQueue.push({ ...props.data, quantity: 1 })
    useSetLocalStorage(runtimeConfig.encodingEmpQueue, encodingEmpQueue)
    useToast().success("Employee Added to encoding queue")
  }
}
</script>
