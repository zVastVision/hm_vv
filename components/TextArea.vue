<template>
  <div class="w-full">
    <textarea
      :type="type"
      :value="inputValue"
      :name="name"
      :disabled="disabled"
      class="w-full bg-transparent text-vvn-gray p-2 rounded-lg border-vvn-white-15 border h-32 disabled:bg-neutral-600"
      :class="{ 'outline-active': outlineActive }"
      @input="onInput($event)"
      @blur="handleBlur(); outlineActive = false"
      @focus="outlineActive = true"
    />
    <small
      v-show="errorMessage || meta.valid"
      class="text-red-700"
    >{{ errorMessage }}</small>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  modelValue: string | number,
  name: string,
  type?: string,
  rules?: string,
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  rules: undefined,
  disabled: false
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>()

const outlineActive = ref(false)

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField<string | number>(props.name, props.rules, {
  initialValue: props.modelValue,
  valueProp: props.modelValue
});

const onInput = (event: Event) => {
  handleChange(event, true)
  emit('update:modelValue', (event.target as HTMLInputElement).value)
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

textarea {
  outline: none;
  transition: all 0.5s;

  &.outline-active {
    border-color: $color-green;
  }
}
</style>