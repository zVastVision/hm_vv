<template>
  <h1 class="text-white text-4xl font-bold">
    <slot />
  </h1>
  <h2 class="text-vvn-gray capitalize">
    {{ store.warehouse?.name || "" }}
    <!-- TODO: dynamically set city name -->
  </h2>
</template>
  <script lang="ts" setup>
  const store = useWarehouseStore()
  const route = useRoute()
  useAsyncData(async () => {
      await store.findById(route.params.warehouseId as string)
  })
  </script>