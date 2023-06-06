<template>
  <div class="flex gap-2">
    <button
      id="btnDecrease"
      type="button"
      class="btn btn--secondary"
      @click="decreaseVal"
    >
      -
    </button>
    <input
      v-model.number="data.inputVal"
      type="number"
      class=" w-9 rounded-lg bg-transparent border border-vvn-gray-50 text-center"
      @input="updateValue($event)"
    >
    <button
      id="btnIncrease"
      type="button"
      class="btn btn--secondary"
      @click="increaseVal"
    >
      +
    </button>
  </div>
</template>
<script lang="ts" setup>
import {reactive} from 'vue'
const emit = defineEmits<{
    (e: "update:modelValue", value: number): void;
    (e: "change"): void;
}>()

interface Props {
  modelValue: number,
}
const props = withDefaults(defineProps<Props>(), {});

const data  = reactive({
  inputVal: props.modelValue || 0
})
function updateValue(event: Event) {
  const value: string = (event.target as HTMLInputElement).value.trim(); //
  
  data.inputVal = parseInt(value)
  emit('update:modelValue', data.inputVal)
  emit('change')

}
function increaseVal() {
    data.inputVal += 1;
    emit('update:modelValue', data.inputVal)
    emit('change')

}

function decreaseVal() {
    data.inputVal -= 1;
    emit('update:modelValue', data.inputVal) 
    emit('change')

}
</script>
<style lang="scss" scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>