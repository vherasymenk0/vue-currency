<script setup lang="ts">
defineEmits<{ (e: 'delete'): void }>()
</script>

<template>
  <button
    @click="$emit('delete')"
    class="ml-2 p-2 text-gray-600 hover:text-red-700 transition duration-300"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.5em"
      height="1.5em"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"
      />
    </svg>
  </button>
</template>
