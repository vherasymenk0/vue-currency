<script setup lang="ts">
import { onMounted, computed, reactive, ref } from 'vue'
import axios from 'axios'
import CurrencyList from '@/components/CurrencyList.vue'
import { useRoute } from 'vue-router'
import { Currency } from '@/types/currency.ts'
import MainLayout from '@/layout/MainLayout.vue'
import Loader from '@/components/Loader.vue'

const route = useRoute()
const isLoading = ref(false)
const currentPage = computed(() => Number(route.query?.page) || 1)
const currentDate = new Intl.DateTimeFormat('uk', {
  dateStyle: 'full',
  timeZone: 'Europe/Kyiv'
}).format(new Date)

const data = reactive<Currency[]>([])
const pageData = computed(() => {
  const start = (currentPage.value - 1) * 10
  const end = start + 10
  return data.slice(start, end)
})

onMounted(async () => {
  isLoading.value = true
  const response = await axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
  data.push(...response.data)
  isLoading.value = false
})
</script>

<template>
  <MainLayout>
    <template #title>Курси валют НБУ станом на {{ currentDate }}</template>
    <template #content>
      <CurrencyList
        :currencies="pageData"
        :current-page="currentPage"
        :total-items="data.length"
        :isLoading="isLoading"
      />
    </template>
  </MainLayout>
</template>
