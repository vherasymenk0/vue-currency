<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps<{
  totalItems: number,
  perPage: number,
  currentPage: number
}>()

const totalPages = computed(() => Math.ceil(props.totalItems / props.perPage))
const pageMock = -1
const route = useRoute()
const router = useRouter()

const handlePageChange = (page: number) => {
  const query = page === 1 ? { ...route.query, page: undefined } : { ...route.query, page }
  router.replace({ query })
}

const getPagination = computed(() => {
  const countSiblings = 1
  const leftSiblingIndex = props.currentPage - countSiblings
  const rightSiblingIndex = props.currentPage + countSiblings
  
  const range =
    Array.from({ length: totalPages.value }, (_, idx) => idx + 1)
         .filter((page) => {
           const isFirstPage = page === 1
           const isLastPage = page === totalPages.value
           return isFirstPage || isLastPage || (page >= leftSiblingIndex && page <= rightSiblingIndex)
         })
  
  return range.reduce((acc, idx) => {
    if (acc.length) {
      const diffBetweenFirstAndLast = idx - acc[acc.length - 1]
      if (diffBetweenFirstAndLast > countSiblings) acc.push(pageMock)
    }
    
    acc.push(idx)
    return acc
  }, [] as number[])
})
</script>

<template>
  <ul class="flex justify-center mt-6" v-if="totalPages > 1">
    <li v-for="page in getPagination" :key="page" class="mx-1 flex items-center">
      <button
        v-if="page !== pageMock"
        @click="handlePageChange(page)"
        :disabled="props.currentPage === page"
        class="btn"
      >
        {{ page }}
      </button>
      <span v-else class="mx-2">{{ '...' }}</span>
    </li>
  </ul>
</template>

<style scoped>
.btn {
  @apply text-base md:text-lg enabled:hover:bg-green-200 px-2.5 py-0.5 md:px-3 md:py-1 mx-1 border transition-all rounded-md;
  
  &:disabled {
    @apply text-white bg-green-600 cursor-default;
  }
}
</style>
