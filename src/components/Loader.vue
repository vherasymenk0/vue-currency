<template>
  <div class="loader-container">
    <div class="loader" />
  </div>
</template>
<style scoped>
.loader-container {
  @apply flex justify-center items-center fixed top-0 left-0 w-full h-full bg-white bg-opacity-80 z-[9999];
}

.loader {
  @apply border-12 border-solid border-gray-200 border-t-blue-500 rounded-full w-20 h-20;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
