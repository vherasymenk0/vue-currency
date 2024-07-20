<script setup lang="ts">
import { ref } from 'vue'
import CurrencyList from '@/components/CurrencyList.vue'
import MainLayout from '@/layout/MainLayout.vue'
import { Api } from '@/services/api.ts'
import { CurrencyModel } from '@/types/currency.ts'

const selectedDate = ref('')
const currencies = ref<CurrencyModel[]>([])

const fetchData = async () => {
  const date = selectedDate.value.replace(/-/g, '')
  const response = await Api.getRateByDate(date)
  currencies.value = response.data
}

</script>

<template>
  <MainLayout>
    <template #title>Пошук курсу за датою</template>
    <template #content>
      <div class="flex justify-center w-auto mx-4">
        <div class="md:w-96 w-72 mx-auto">
          <label for="date" class="block text-center text-green-700 text-sm font-bold mb-2">Оберіть дату:</label>
          <input
            type="date"
            id="date"
            v-model="selectedDate"
            @change="fetchData"
            class="mb-4 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-green-600"
          />
        </div>
      </div>
      <CurrencyList :currencies="currencies" />
    </template>
  </MainLayout>
</template>
