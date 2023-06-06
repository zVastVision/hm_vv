<template>
  <VueFinalModal
    class="flex justify-center items-center backdrop-blur-sm"
    content-class="success-modal-content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
    @update:model-value="(val: unknown) => emit('update:modelValue', val)"
    @closed="$emit('close')"
  >
    <div class=" h-16 w-16 mx-auto mt-2 bg-vvn-green checkmark rounded-full flex justify-center items-center">
      <slot name="icon">
        <img
          src="/images/svg/check.svg"
          alt=""
        >
      </slot>
    </div>

    <slot />
  </VueFinalModal>
</template>
<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

const emit = defineEmits<{
    (e: 'update:modelValue', modelValue: boolean): void
    (e: 'confirm'): void
    (e: 'close'): void
}>()
</script>
<style lang="scss">
.success-modal-content {
    background-image: url("/images/svg/bg.svg");
    background-size: cover;
    height: 218px;
    width: 420px;
    position: relative;
}
</style>
