<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import CurrencyList from '@/components/CurrencyList.vue'
import { CurrencyModel } from '@/types/currency.ts'
import MainLayout from '@/layout/MainLayout.vue'
import { Api } from '@/services/api.ts'

const data = reactive<CurrencyModel[]>([])
const isLoading = ref(false)
const currentDate = new Intl.DateTimeFormat('uk', {
  dateStyle: 'full',
  timeZone: 'Europe/Kyiv'
}).format(new Date)

onMounted(async () => {
  try {
    isLoading.value = true
    const response = await Api.getCurrentRates()
    data.push(...response.data)
  } catch (e: unknown) {
    throw new Error(String(e))
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <MainLayout>
    <template #title>Курси валют НБУ станом на {{ currentDate }}</template>
    <template #content>
      <CurrencyList
        :currencies="data"
        :isLoading="isLoading"
      />
    </template>
  </MainLayout>
</template>
