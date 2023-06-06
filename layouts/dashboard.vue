<template>
  <div class="bg-vvn-black h-full">
    <DashboardNavBar />
    <div class="mx-auto p-4 ml-64 bg-vvn-black-10 min-h-screen flex flex-col">
      <DashboardTopBar />
      <main class="min-h-full flex-1">
        <slot />
      </main>
    </div>
  </div>
</template>
