<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import axios from 'axios'
import CurrencyList from '@/components/CurrencyList.vue'
import MainLayout from '@/layout/MainLayout.vue'

const selectedDate = ref('')
const currencies = ref([])

watchEffect(() => {
  console.log('selectedDate -->', selectedDate.value)
})

const fetchData = async () => {
  const response = await axios.get(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${selectedDate.value.replace(/-/g, '')}&json`)
  currencies.value = response.data
}

</script>
<template>
  <MainLayout>
    <template #title>Пошук курсу</template>
    <template #content>
      <input type="date" v-model="selectedDate" @change="fetchData" class="mb-4 p-2 border" />
      <CurrencyList :currencies="currencies" />
    </template>
  </MainLayout>
</template>
