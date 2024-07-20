<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { EditCurrency } from '@/types/currency.ts'
import MainLayout from '@/layout/MainLayout.vue'
import Loader from '@/components/Loader.vue'
import { Api } from '@/services/api.ts'
import { useModifiedCurrencies } from '@/hooks/useModifiedCurrencies.ts'
import { slugDateToDate } from '@/helpers'

const route = useRoute()
const router = useRouter()
const { data, set, update } = useModifiedCurrencies()

const isLoading = ref(false)
const currency = ref<EditCurrency | null>(null)

onMounted(async () => {
  isLoading.value = true
  const [code, date] = String(route.params.slug).split('-')
  
  if (!code || !date) {
    await router.replace('/')
    isLoading.value = false
  }
  
  try {
    const formattedDate = slugDateToDate(date)
    const formattedCode = code.toUpperCase()
    const modified =
      data.value.filter(({ exchangedate, cc }) => formattedDate === exchangedate && formattedCode === cc)[0]
    
    if (modified) {
      currency.value = {
        ...modified,
        alreadyModified: true
      }
    } else {
      const response = await Api.getRateByCode(code, date)
      currency.value = response.data[0]
    }
  } catch (e) {
    throw new Error(String(e))
  } finally {
    isLoading.value = false
  }
})

const saveChanges = () => {
  if (currency.value) {
    if (currency.value.alreadyModified) update(currency.value)
    else set(currency.value)
    router.push('/modified')
  }
}
</script>

<template>
  <MainLayout>
    <template #title v-if="currency">Редагувати {{ currency.txt }} за {{ currency.exchangedate }}</template>
    <template #content>
      <Loader v-if="isLoading" />
      <div v-else-if="currency" class="max-w-md mx-auto">
        <div
          v-if="currency.alreadyModified"
          class="flex items-center justify-center max-w-md mb-4 mx-4 p-4 bg-green-100 text-green-700 border border-green-300 rounded"
        >
          <svg xmlns="http://www.w3.org/2000/svg"
               class="h-6 w-6 mr-2"
               fill="none"
               viewBox="0 0 24 24"
               stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <span>Курс вже редаговано</span>
        </div>
        <div class="mx-4 p-8 bg-white shadow-md rounded-lg">
          <label for="rate" class="block text-green-700 text-sm font-bold mb-2">Курс (UAH):</label>
          <input
            type="text"
            id="rate"
            v-model="currency.rate"
            class="mb-4 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-green-600"
          />
          <button
            @click="saveChanges"
            class="w-full p-2 bg-green-600 text-white font-semibold rounded hover:bg-green-800 transition duration-300"
          >
            Зберегти
          </button>
        </div>
      </div>
    </template>
  </MainLayout>
</template>
