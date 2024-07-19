<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps<{ totalItems: number, page }>()

const itemsPerPage = 10
const totalPages = computed(() => Math.ceil(props.totalItems / itemsPerPage))
const route = useRoute()
const router = useRouter()

const handle = (page: number) => {
  let query = {}
  if (page !== 1) query = { ...route.query, page }
  router.replace({ query })
}
</script>

<template>
  <ul class="flex justify-center mt-4" v-if="totalPages > 1">
    <li v-for="page in totalPages" :key="page">
      <button @click="handle(page)" :disabled='props.page === page' class="btn">
        {{ page }}
      </button>
    </li>
  </ul>
</template>

<style scoped>
.btn {
  @apply enabled:hover:bg-blue-200 px-4 py-2 mx-1 border transition-all rounded-md;
  
  &:disabled {
    @apply text-white bg-blue-400 cursor-default;
  }
}
</style>
