<script setup lang="ts">
import { Currency } from '@/types/currency.ts'
import Pagination from '@/components/Pagination.vue'
import Loader from '@/components/Loader.vue'

defineProps<{
  currencies: Currency[]
  totalItems: number
  currentPage: number
  isLoading: boolean
}>()
</script>

<template>
  <Loader v-if="isLoading" />
  <template v-else>
    <div class="max-w-4xl mx-auto py-8 px-4">
      <div class="h-96 lg:h-128 overflow-y-auto p-4 border border-gray-200 rounded-lg shadow bg-white">
        <div v-if="currencies.length === 0" class="flex flex-col items-center justify-center h-full">
          <p class="text-gray-600 text-lg">Валюти не знайдені</p>
          <p class="text-gray-500">Додайте нову валюту або перевірте пізніше.</p>
        </div>
        <router-link
          v-for="currency in currencies"
          :key="currency.cc"
          :to="`/edit/${currency.cc.toLowerCase()}`"
          class="text-green-600 font-semibold text-lg border border-gray-300 rounded-lg shadow p-4 mb-4 bg-white hover:bg-customGray transition duration-300 ease-in-out flex justify-between items-center"
          v-else
        >
          <div>
            <h2 class="text-green-700 font-semibold text-lg">{{ currency.txt }}</h2>
            <p class="text-gray-600">Курс: {{ currency.rate }} UAH</p>
          </div>
          <span class="ml-2">{{ currency.cc }}</span>
        </router-link>
      </div>
    </div>
    <Pagination :totalItems="totalItems" :page="currentPage" />
  </template>
</template>
