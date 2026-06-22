<script setup>
import { ref } from 'vue'
import AppLayout from './components/AppLayout.vue'
import HomePage from './components/HomePage.vue'
import ConverterPage from './components/ConverterPage.vue'

const currentView = ref('home')
const currentCategory = ref('')

function handleSelectCategory(categoryId) {
  currentCategory.value = categoryId
  currentView.value = 'converter'
}

function handleBack() {
  currentView.value = 'home'
  currentCategory.value = ''
}
</script>

<template>
  <AppLayout>
    <HomePage
      v-if="currentView === 'home'"
      @select="handleSelectCategory"
    />
    <ConverterPage
      v-else-if="currentView === 'converter'"
      :category-id="currentCategory"
      @back="handleBack"
    />
  </AppLayout>
</template>
