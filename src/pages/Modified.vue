<script setup lang="ts">
import CurrencyList from '../components/CurrencyList.vue'
import { computed } from 'vue'
import { useCurrencyStore } from '@/store'
import MainLayout from '@/layout/MainLayout.vue'

const store = useCurrencyStore()
const modifiedCurrencies = computed(() => store.state.modifiedCurrencies)

</script>
<template>
  <MainLayout>
    <template #title>Змінені курси</template>
    <template #content>
      <CurrencyList :currencies="modifiedCurrencies" />
    </template>
  </MainLayout>
</template>
