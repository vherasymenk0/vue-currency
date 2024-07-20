<script setup lang="ts">
import MainLayout from '@/layout/MainLayout.vue'
import CurrencyList from '@/components/CurrencyList.vue'
import { useModifiedCurrencies } from '@/hooks/useModifiedCurrencies.ts'

const { isLoading, data, remove } = useModifiedCurrencies()
</script>

<template>
  <MainLayout>
    <template #title>Змінені курси</template>
    <template #content>
      <CurrencyList
        :currencies="data"
        :is-loading="isLoading"
        with-date
        can-delete
        @delete="remove"
      />
    </template>
  </MainLayout>
</template>
