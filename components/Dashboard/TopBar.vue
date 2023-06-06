<template>
  <div class="flex justify-between h-14 items-center">
    <div class="flex text-white items-baseline">
      <p class="text-vvn-gray capitalize">
        {{ store.warehouse?.name }}
      </p>
      <p
        v-for="(item, index) in routeList"
        :key="index"
        class="text-vvn-green capitalize"
      >
        <span class="text-white mx-1">></span>{{ item }} 
      </p>
    </div>
    <div class="flex items-center">
      <button class="h-12 w-12 rounded-full border-vvn-white-10 flex flex-col justify-center border">
        <img
          src="/images/svg/box.svg"
          class="mx-auto"
          alt=""
        >
      </button>
      <button class="h-12 w-12 rounded-full border-vvn-white-10 flex flex-col justify-center border">
        <img
          src="/images/svg/gear.svg"
          class="mx-auto"
          alt="settings"
        >
      </button>
      <button class="h-12 w-12 rounded-full border-vvn-white-10 flex flex-col justify-center border">
        <img
          src="/images/svg/comment.svg"
          class="mx-auto"
          alt="comments"
        >
      </button>
      <button class="h-12 w-12 rounded-full border-vvn-white-10 flex flex-col justify-center border">
        <img
          src="/images/svg/bell.svg"
          class="mx-auto"
          alt="notifications"
        >
      </button>
      <img
        src="/images/jpg/profile.jpg"
        alt="profile photo"
        class="rounded-full block h-14 w-14 object-cover ml-5"
      >
      <div class=" ml-3">
        <p class="text-white">
          Mason
        </p>
        <small class="text-vvn-gray">Mason.martinez@bluehalo.com</small>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const store = useWarehouseStore()
const route = useRoute()
const routeList = computed(() => route.path.split("/").slice(2))
</script>
<style lang="scss" scoped>
button {
  box-shadow: 20px 10px 30px rgba(0, 0, 0, 0.97);
  backdrop-filter: blur(25px);
  margin-left: 0.6rem;
}
</style>