<template>
  <div
    class="border-2 border-vvn-white-15 rounded-lg row relative justify-start"
    :class="{ active: toggleDetails }"
  >
    <div
      class="grid row__summary py-3 h-20 align-middle items-center"
      :style="templateColumns"
    >
      <slot
        name="row-data"
        v-bind="data"
      />
    </div>
    <div class="row__details overflow-hidden relative">
      <slot name="details" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  data: { type: Object, required: true },
  toggleDetails: { type: Boolean, required: false, default: false },
  templateColumns: {
    type: Object,
    required: false,
    default: () => ({ 'grid-template-columns': 'repeat(5, minmax(0, 1fr))' }),
  },
})

const scrollHeight = ref('0px')

onMounted(() => {
  const element: Element = document.getElementsByClassName('row__details')[0]
  //scrollHeight.value = element.scrollHeight + 'px'
  scrollHeight.value = '100' + 'px'
})
</script>
<style lang="scss" scoped>
.row {
  box-shadow: 20px 4px 50px rgba(0, 0, 0, 0.26);
  background-color: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(25px);
  .row__summary {
    & > :first-child {
      padding-left: 1.125rem;
    }
    & > :last-child {
      padding-right: 1.125rem;
    }
  }

  &.active {
    .row__details {
      height: v-bind(scrollHeight);
    }
  }

  .row__details {
    height: 0;
    transition: height 0.5s;
  }
}
</style>
