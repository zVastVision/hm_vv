<template>
  <div class="grid grid-flow-row text-white bg-transparent rounded-md">
    <div
      class="grid text-vvn-gray-50"
      :style="templateColumns"
    >
      <p
        v-for="(item, index) in rows"
        :key="index"
        class=" mb-3"
      >
        {{ item }}
      </p>
    </div>
    <slot />
  </div>
</template>
<script setup lang="ts">
defineProps({
  templateColumns: {
    type: Object,
    required: false,
    default: () => ({ 'grid-template-columns': 'repeat(5, minmax(0, 1fr))' }),
  },
  rows: { type: Array, required: true },
})
</script>
