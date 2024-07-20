<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { CurrencyModel } from '@/types/currency.ts'
import MainLayout from '@/layout/MainLayout.vue'
import Loader from '@/components/Loader.vue'
import { Api } from '@/services/api.ts'

const route = useRoute()
const router = useRouter()
const isLoading = ref(false)
const currency = ref<CurrencyModel | null>(null)

onMounted(async () => {
  isLoading.value = true
  const [code, date] = String(route.params.slug).split('-')
  
  if (!code || !date) {
    await router.replace('/')
    isLoading.value = false
  }
  
  try {
    const response = await Api.getRateByCode(code, date)
    currency.value = response.data[0]
  } catch (e) {
    throw new Error(String(e))
  } finally {
    isLoading.value = false
  }
})

const saveChanges = () => {
  if (currency.value) {
    const modified = (JSON.parse(localStorage.getItem('modified')) || []) as CurrencyModel[]
    modified.push(currency.value)
    
    localStorage.setItem(`modified`, JSON.stringify(modified))
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
