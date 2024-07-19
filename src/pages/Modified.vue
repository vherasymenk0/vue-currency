<script setup lang="ts">
import MainLayout from '@/layout/MainLayout.vue'
import CurrencyList from '@/components/CurrencyList.vue'

const modifiedCurrencies = []

</script>
<template>
  <MainLayout>
    <template #title>Змінені курси</template>
    <template #content>
      <CurrencyList :currencies="modifiedCurrencies" />
    </template>
  </MainLayout>
</template>
