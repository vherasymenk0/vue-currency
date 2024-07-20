<script setup lang="ts">
import { ref, computed } from 'vue'
import { CurrencyModel } from '@/types/currency.ts'
import Pagination from '@/components/Pagination.vue'
import Loader from '@/components/Loader.vue'
import { useRoute } from 'vue-router'
import { getCurrencySlug } from '@/helpers'
import CurrencyListEmpty from '@/components/CurrencyListEmpty.vue'
import DeleteCurrencyButton from '@/components/DeleteCurrencyButton.vue'
import CurrencySearch from '@/components/CurrencySearch.vue'

const props = defineProps<{
  currencies: CurrencyModel[]
  isLoading?: boolean
  withDate?: boolean
  canDelete?: boolean
}>()

defineEmits<{ (e: 'delete', id: number): void }>()

const route = useRoute()
const currentPage = computed(() => Number(route.query?.page) || 1)
const perPage = 10
const searchQuery = ref('')

const filteredCurrencies = computed(() => {
  if (!searchQuery.value) {
    return props.currencies
  }
  return props.currencies.filter(currency =>
    currency.txt.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    currency.cc.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const pageData = computed(() => {
  const start = (currentPage.value - 1) * perPage
  const end = start + perPage
  return filteredCurrencies.value.slice(start, end)
})
</script>

<template>
  <Loader v-if="isLoading" />
  <template v-else>
    <div class="max-w-3xl mx-auto px-4">
      <CurrencySearch :value="searchQuery" @update:value="val => searchQuery = val" />
      <div class="h-96 lg:h-128 overflow-y-auto p-4 border border-gray-200 rounded-lg shadow bg-white">
        <CurrencyListEmpty v-if="filteredCurrencies.length === 0" />
        <div v-else>
          <div
            v-for="currency in pageData"
            :key="currency.cc"
            class="flex justify-between items-center border border-gray-300 rounded-lg shadow p-3 md:p-4 mb-4 bg-white hover:bg-customGray transition duration-300 ease-in-out"
          >
            <router-link
              :to="`/edit/${getCurrencySlug(currency.cc, currency.exchangedate)}`"
              class="flex flex-grow text-green-600 font-semibold text-sm md:text-lg justify-between items-center"
            >
              <div>
                <div class="flex gap-2">
                  <h2 class="text-green-700 font-semibold">{{ currency.txt }}</h2>
                  <p v-if="!!withDate" class="text-gray-400 hidden md:flex">({{ currency.exchangedate }})</p>
                </div>
                <p class="text-gray-600">Курс: {{ currency.rate }} UAH</p>
                <p v-if="!!withDate" class="text-gray-400 block md:hidden mt-1">({{ currency.exchangedate }})</p>
              </div>
              <span>{{ currency.cc }}</span>
            </router-link>
            <div v-if="!!canDelete" class="flex items-center ml-4">
              <DeleteCurrencyButton @delete="$emit('delete', currency.r030)" />
            </div>
          </div>
        </div>
      </div>
      <Pagination :totalItems="filteredCurrencies.length" :currentPage="currentPage" :per-page="perPage" />
    </div>
  </template>
</template>
