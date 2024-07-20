<script setup lang="ts">
defineProps<{ value: string }>()
const emit = defineEmits(['update:value'])

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:value', target.value)
}
</script>

<template>
  <input
    :value="value"
    @input="updateValue"
    type="text"
    placeholder="Пошук валюти..."
    class="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-green-600"
  />
</template>
