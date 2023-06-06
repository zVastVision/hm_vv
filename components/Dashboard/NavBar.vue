<template class="bg-vvn-black">
  <aside
    class="bg-vvn-black-10 h-full w-64 fixed top-0 left-0 overflow-x-hidden py-6"
  >
    <!-- logo -->
    <a href="/">
      <img
        src="/images/svg/logo.svg"
        alt="logo"
        class="block mx-auto px-6"
      >
    </a>
    <!-- search input field -->
    <SearchInput
      v-model="searchInput"
      class="mt-8 mx-6"
    />
    <nav class="mx-auto text-white mt-[5.625rem]">
      <ul class="flex flex-col gap-4">
        <li>
          <NuxtLink :to="`/warehouse-${$route.params.warehouseId}/live-view`">
            <div class="flex items-center gap-6 pl-6 pr-2 text-lg">
              <div class="h-9 w-9 rounded-[10px] flex flex-col justify-center">
                <img
                  src="/images/svg/live-view.svg"
                  class="mx-auto"
                  alt="live-view"
                >
              </div>
              Live View
            </div>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="`/warehouse-${$route.params.warehouseId}/inventory`">
            <div class="flex items-center gap-6 pl-6 pr-2 text-lg">
              <div class="h-9 w-9 rounded-[10px] flex flex-col justify-center">
                <img
                  src="/images/svg/inventory.svg"
                  class="mx-auto"
                  alt="inventory"
                >
              </div>
              Inventory
            </div>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="`/warehouse-${$route.params.warehouseId}/employees`">
            <div class="flex items-center gap-6 pl-6 pr-2 text-lg">
              <div class="h-9 w-9 rounded-[10px] flex flex-col justify-center">
                <img
                  src="/images/svg/people.svg"
                  class="mx-auto"
                  alt="employees"
                >
              </div>
              Employees
            </div>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="`/warehouse-${$route.params.warehouseId}/tools`">
            <div class="flex items-center gap-6 pl-6 pr-2 text-lg">
              <div class="h-9 w-9 rounded-[10px] flex flex-col justify-center">
                <img
                  src="/images/svg/tools.svg"
                  class="mx-auto"
                  alt="tools"
                >
              </div>
              Tools
            </div>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="`/warehouse-${$route.params.warehouseId}/encoding`">
            <div class="flex items-center gap-6 pl-6 pr-2 text-lg">
              <div class="h-9 w-9 rounded-[10px] flex flex-col justify-center">
                <img
                  src="/images/svg/code.svg"
                  class="mx-auto"
                  alt="encoding"
                >
              </div>
              Encoding
            </div>
          </NuxtLink>
        </li>
        <!-- <li>
          <NuxtLink :to="`/warehouse-${$route.params.warehouseId}/jobs`">
            <div class="flex items-center gap-6 pl-6 pr-2 text-lg">
              <div class="h-9 w-9 rounded-[10px] flex flex-col justify-center">
                <img
                  src="/images/svg/job.svg"
                  class="mx-auto"
                  alt="job"
                >
              </div>
              Job Management
            </div>
          </NuxtLink>
        </li> -->
        <li>
          <NuxtLink to="/organization">
            <div class="flex items-center gap-6 pl-6 pr-2 text-lg">
              <div class="h-9 w-9 rounded-[10px] flex flex-col justify-center">
                <img
                  src="/images/svg/organization.svg"
                  class="mx-auto"
                  alt="organization"
                >
              </div>
              Warehouse
            </div>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>
<script setup lang="ts">
const searchInput = ref("")
</script>
<style lang="scss" scoped>
aside {
  box-shadow: 20px 4px 50px rgba(0, 0, 0, 0.26);
  backdrop-filter: blur(25px);

  ul {
    li {
      vertical-align: middle;

      a {
        width: 100%;
        height: 4rem;
        display: inline-block;
        display: flex;
        flex-direction: column;
        justify-content: center;

        div {
          div {
            background-color: $color-white-10;
          }
        }

        &.router-link-active {
          background-color: $color-white-10;

          div {
            div {
              background-color: $color-green;
            }
          }
        }
      }
    }
  }
}
</style>
