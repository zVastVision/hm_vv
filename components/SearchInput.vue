<template>
  <div class=" rounded-2xl border border-vvn-white-15 h-10 py-1 px-3 flex items-center">
    <div
      v-if="showSecondaryIcon"
      id="boxIcon"
      class="flex items-center"
    >
      <img
        src="/images/svg/closed-box.svg"
        alt="inventory"
      >
      <div class=" border-r-2 border-x-vvn-gray-50 h-3 mx-1" />
    </div>
    <input
      type="text"
      class=" border-0 bg-transparent h-full w-full outline-none text-white flex-1 text-xs"
      placeholder="Search"
      @input="emitValues"
    >
    <img
      src="/images/svg/search.svg"
      class="h-6"
      alt="search icon"
    >
  </div>
</template>
<script lang="ts" setup>
interface Props {
  modelValue: string,
  showSecondaryIcon?: boolean,
}
withDefaults(defineProps<Props>(), {});
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "input"): void;
}>()

function emitValues(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
  emit("input")
}
</script>