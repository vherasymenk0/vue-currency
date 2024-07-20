<script setup lang="ts">
import MainLayout from '@/layout/MainLayout.vue'
import CurrencyList from '@/components/CurrencyList.vue'
import { useModifiedCurrencies } from '@/hooks/useModifiedCurrencies.ts'

const { data, remove } = useModifiedCurrencies()
</script>

<template>
  <MainLayout>
    <template #title>Змінені курси</template>
    <template #content>
      <CurrencyList
        :currencies="data"
        with-date
        can-delete
        @delete="remove"
      />
    </template>
  </MainLayout>
</template>
