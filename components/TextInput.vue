<template>
  <div class="w-full">
    <div
      class="container w-full h-12 text-vvn-gray p-2 flex rounded-lg border-vvn-white-15 border disabled:bg-neutral-600"
      :class="{'outline-active': outlineActive}"
    >
      <input
        :type="inputType"
        :value="inputValue"
        :name="name"
        :disabled="disabled"
        class="w-full h-full bg-transparent flex-1"
        @input="onInput($event)"
        @blur="handleBlur(); outlineActive=false"
        @focus="outlineActive=true"
      >
      <button 
        v-if="type == 'password'"
        type="button"
        @click="togglePassword = !togglePassword"
      >
        <!-- eye opened -->
        <svg
          v-if="!togglePassword"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          class=" fill-vvn-gray"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.8508 9.3175C19.1192 7.7175 16.25 2.5 10 2.5C3.75002 2.5 0.880848 7.7175 0.149181 9.3175C0.0509633 9.53192 0.00012207 9.76499 0.00012207 10.0008C0.00012207 10.2367 0.0509633 10.4697 0.149181 10.6842C0.880848 12.2825 3.75002 17.5 10 17.5C16.25 17.5 19.1192 12.2825 19.8508 10.6825C19.9489 10.4683 19.9996 10.2355 19.9996 10C19.9996 9.76446 19.9489 9.53168 19.8508 9.3175ZM10 15.8333C4.74418 15.8333 2.29168 11.3617 1.66668 10.0092C2.29168 8.63833 4.74418 4.16667 10 4.16667C15.2433 4.16667 17.6967 8.61917 18.3333 10C17.6967 11.3808 15.2433 15.8333 10 15.8333Z"
          />
          <path
            d="M10 5.83334C9.17595 5.83334 8.37037 6.07771 7.68517 6.53555C6.99996 6.99339 6.46591 7.64414 6.15054 8.4055C5.83518 9.16686 5.75267 10.0046 5.91344 10.8129C6.07421 11.6211 6.47105 12.3636 7.05376 12.9463C7.63648 13.529 8.37891 13.9258 9.18717 14.0866C9.99542 14.2474 10.8332 14.1649 11.5946 13.8495C12.3559 13.5341 13.0067 13.0001 13.4645 12.3149C13.9223 11.6297 14.1667 10.8241 14.1667 10C14.1654 8.89535 13.726 7.83631 12.9449 7.05519C12.1637 6.27408 11.1047 5.83467 10 5.83334ZM10 12.5C9.50559 12.5 9.02224 12.3534 8.61112 12.0787C8.19999 11.804 7.87956 11.4135 7.69034 10.9567C7.50112 10.4999 7.45162 9.99724 7.54808 9.51228C7.64454 9.02733 7.88264 8.58187 8.23228 8.23224C8.58191 7.88261 9.02736 7.64451 9.51232 7.54805C9.99727 7.45158 10.4999 7.50109 10.9568 7.69031C11.4136 7.87953 11.804 8.19996 12.0787 8.61108C12.3534 9.02221 12.5 9.50556 12.5 10C12.5 10.6631 12.2367 11.2989 11.7678 11.7678C11.299 12.2366 10.6631 12.5 10 12.5Z"
          />
        </svg>
        <!-- eye closed -->
        <svg
          v-else
          width="20"
          height="20"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          class=" fill-vvn-gray"
        >
          <path
            d="M19.8508 9.31751C19.0457 7.57144 17.8665 6.02378 16.3967 4.78418L18.9233 2.25751L17.7442 1.07751L15 3.81918C13.4812 2.94061 11.7546 2.4851 10 2.50001C3.75002 2.50001 0.880848 7.71751 0.149181 9.31751C0.0509633 9.53193 0.00012207 9.76501 0.00012207 10.0008C0.00012207 10.2367 0.0509633 10.4698 0.149181 10.6842C0.954295 12.4303 2.13353 13.9779 3.60335 15.2175L1.07751 17.7442L2.25585 18.9225L5.00001 16.1808C6.51888 17.0594 8.24542 17.5149 10 17.5C16.25 17.5 19.1192 12.2825 19.8508 10.6825C19.9489 10.4683 19.9996 10.2356 19.9996 10C19.9996 9.76447 19.9489 9.53169 19.8508 9.31751ZM1.66668 10.0092C2.29168 8.63835 4.74418 4.16668 10 4.16668C11.308 4.15904 12.5989 4.46418 13.765 5.05668L12.2942 6.52751C11.4941 5.99635 10.5349 5.75834 9.57938 5.85389C8.62381 5.94943 7.73074 6.37263 7.05168 7.05168C6.37263 7.73074 5.94943 8.62381 5.85389 9.57937C5.75835 10.5349 5.99635 11.4941 6.52752 12.2942L4.79502 14.0267C3.46199 12.9412 2.39241 11.5676 1.66668 10.0092ZM12.5 10C12.5 10.6631 12.2366 11.2989 11.7678 11.7678C11.2989 12.2366 10.6631 12.5 10 12.5C9.62878 12.4986 9.26268 12.4131 8.92918 12.25L12.25 8.92918C12.4131 9.26268 12.4986 9.62878 12.5 10ZM7.50002 10C7.50002 9.33697 7.76341 8.70109 8.23225 8.23225C8.70109 7.76341 9.33697 7.50001 10 7.50001C10.3713 7.50145 10.7374 7.58692 11.0708 7.75001L7.75002 11.0708C7.58692 10.7373 7.50145 10.3713 7.50002 10ZM10 15.8333C8.69202 15.841 7.40114 15.5358 6.23501 14.9433L7.70585 13.4725C8.5059 14.0037 9.46509 14.2417 10.4207 14.1461C11.3762 14.0506 12.2693 13.6274 12.9483 12.9483C13.6274 12.2693 14.0506 11.3762 14.1461 10.4207C14.2417 9.46509 14.0037 8.5059 13.4725 7.70585L15.2042 5.97418C16.5398 7.06069 17.61 8.43756 18.3333 10C17.6967 11.3808 15.2433 15.8333 10 15.8333Z"
          />
        </svg>
      </button>
    </div>
    
    <small
      v-show="errorMessage || meta.valid"
      class="text-red-700"
    >{{ errorMessage }}</small>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  modelValue: string|number,
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
const togglePassword = ref(false)

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField<string|number>(props.name, props.rules, {
  initialValue: props.modelValue,
  valueProp: props.modelValue
});

const onInput = (event: Event) => {
  handleChange(event, true)
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

const inputType = computed(() => {
  if (props.type == "password" && togglePassword.value) {
    return "text"
  }
  return props.type
})
</script>
<style lang="scss" scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input {
  outline: none;
}
/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

.container.outline-active {
  transition: all 0.5s;
  border-color: $color-green;
}
</style>