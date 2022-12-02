<template>
  <div class="w-full h-full dark:bg-gray-dark dark:text-gray-200 flex flex-col gap-5 justify-center items-center">
    <h1 class="text-4xl font-bold">Gift Search Bar</h1>
    <input :disabled="isSearching" type="text" class="p-2 rounded-md border-2 border-gray-dark disabled:opacity-80 dark:text-gray-dark"
      v-model="searchTerm" placeholder="Start typing..." />
    <spinner v-show="isSearching" />
    <ul class="list-disc">
      <li v-for="product in searchResults?.products" :key="product.id">
        {{ product.title }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import spinner from './components/spinner.vue'
import { debounce } from 'debounce'
import findProducts from './services/findProducts';
import IProducts from './interfaces/IProducts';
import { useDark, useToggle } from '@vueuse/core';


const searchTerm = ref('')
const searchResults = ref<IProducts>()
const isSearching = ref(false)
const isDark = useDark()
useToggle(isDark)

const onSearchTermChange = debounce(async (term: string) => {
  isSearching.value = true
  searchResults.value = await findProducts(term)
  isSearching.value = false
}, 300)

watch(searchTerm, (newTerm: string) => {
  if (newTerm === '') return searchResults.value = undefined
  onSearchTermChange(newTerm)
})
</script>
