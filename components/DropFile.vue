<template>
  <div
    class="dropzone text-vvn-gray-90 flex items-center h-[60vh] w-full"
    :class="{ active: data.isDragging }"
    @dragover="dragover"
    @dragleave="dragleave"
    @drop="drop"
  >
    <input
      id="fileInput"
      ref="file"
      type="file"
      multiple
      name="file"
      class="hidden-input"
      accept=".csv"
      @change="onChange"
    >

    <label
      for="fileInput"
      class="file-label mx-auto"
    >
      <div>
        <img
          src="/images/svg/upload.svg"
          alt="upload file"
          class="mx-auto"
        >
      </div>
      <p class=" text-center mt-6 text-lg">
        Drag or <span class=" underline">click</span> to upload
      </p>
    </label>
  </div>
</template>
  
<script setup lang="ts">
const emit = defineEmits<{
    (e: "change", value: File): void;
}>()
const data = reactive<{ isDragging: boolean }>({
    isDragging: false
});

function onChange(event: Event) {
    const file: File = ((event.target as HTMLInputElement).files as FileList)[0]
    emit('change', file)
}
function dragover(e: Event) {
    e.preventDefault();
    data.isDragging = true;
}
function dragleave() {
    data.isDragging = false;
}
function drop(e: DragEvent) {
    e.preventDefault();
    const file = (e.dataTransfer as DataTransfer).files[0]
    if (file.type != "text/csv") {
        useToast().error("Please upload a csv file")
    }
    data.isDragging = false;
    emit("change", file)
}

</script>
<style lang="scss" scoped>
input {
    opacity: 0;
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
}

.dropzone.active {
    background-color: $color-white-10;
    transition: all 0.5s;
}
</style>