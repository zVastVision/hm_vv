<template>
  <VueFinalModal
    class="flex justify-center items-center backdrop-blur-sm"
    :content-class="{'border border-vvn-white-10 rounded-xl bg-vvn-black-10': true, 'w-[80%] p-8': !small, 'w-[40%] p-4': small} "
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
    @update:model-value="val => emit('update:modelValue', val)"
  >
    <div class="flex justify-end w-full">
      <button
        @click="emit('close')"
      >
        <img
          src="/images/svg/x-mark.svg"
          alt="close"
        >
      </button>
    </div>
    <slot />
  </VueFinalModal>
</template>
<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

const props = withDefaults(defineProps<{small: boolean}>(), {
  small: false
})
const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'close'): void
}>()
</script>