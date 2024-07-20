<script setup lang="ts">
import { ROUTE_PATHS } from '@/router/route.paths.ts'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <nav class="bg-[#FDFDFE] p-4 border-b-2 border-[#6acb9a]">
    <ul class="flex gap-6">
      <li
        v-for="path in ROUTE_PATHS"
        :key="path.to"
        class=" w-max item text-black"
      >
        <router-link :to="path.to" :class="{group: route.path !== path.to}" class="relative">
          {{ path.label }}
          <span class="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-[#4D4D4F] group-hover:w-3/6"></span>
          <span class="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-[#4D4D4F] group-hover:w-3/6"></span>
        </router-link>
      
      </li>
    </ul>
  </nav>
  <main>
    <h1 class="text-xl px-4 sm:text-2xl mb-10 text-center mx-auto mt-10">
      <slot name="title" />
    </h1>
    <slot name="content" />
  </main>
</template>

<style scoped>
a {
  &:not(.group) {
    @apply cursor-default;
    @apply text-[#007b47] pointer-events-none;
  }
}
</style>
