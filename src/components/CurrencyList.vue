<script setup lang="ts">
import { Currency } from '@/types/currency.ts'

defineProps<{ currencies: Currency[] }>()
</script>

<template>
  <div class="max-w-4xl mx-auto py-8 px-4">
    <div class="h-96 lg:h-128 overflow-y-auto p-4 border border-gray-200 rounded-lg shadow bg-white">
      <div v-if="currencies.length === 0">Немає валют</div>
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
</template>
