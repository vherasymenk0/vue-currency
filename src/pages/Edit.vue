<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCurrencyStore } from '@/store'
import { Currency } from '@/types/currency.ts'
import Pagination from '@/components/Pagination.vue'
import MainLayout from '@/layout/MainLayout.vue'
import CurrencyList from '@/components/CurrencyList.vue'

const route = useRoute()
const router = useRouter()
const store = useCurrencyStore()
const currency = ref<Currency | null>(null)

onMounted(() => {
  const currencyCode = route.params.cc
  const storedCurrency = localStorage.getItem(`currency_${currencyCode}`)
  currency.value = storedCurrency ? JSON.parse(storedCurrency) : store.state.currencies.find(c => c.cc === currencyCode)
})

const saveChanges = () => {
  if (currency.value) {
    localStorage.setItem(`currency_${currency.value.cc}`, JSON.stringify(currency.value))
    store.modifyCurrency(currency.value)
    router.push('/modified')
  }
}

</script>
<template>
  <MainLayout>
    <template #title>Редагувати курс валюти</template>
    <template #content>
      <div v-if="currency">
        <input type="text" v-model="currency.rate" class="mb-4 p-2 border" />
        <button @click="saveChanges" class="p-2 bg-blue-500 text-white">Зберегти</button>
      </div>
    </template>
  </MainLayout>
</template>
