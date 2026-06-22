<script setup>
import CategoryCard from './CategoryCard.vue'
import { CATEGORIES } from '../constants/units.js'

defineEmits(['select'])
</script>

<template>
  <div class="home-page">
    <div class="welcome-box">
      <h2>单位换算器</h2>
      <p class="welcome-text">选择下方分类开始换算</p>
    </div>

    <div class="category-grid">
      <CategoryCard
        v-for="category in CATEGORIES"
        :key="category.id"
        :category="category"
        @click="$emit('select', $event)"
      />
    </div>

    <div class="placeholder-box history-placeholder">
      <h3>历史记录</h3>
      <p class="placeholder-text">暂无换算记录</p>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.welcome-box {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  text-align: center;
  box-shadow: var(--shadow-sm);
}

.welcome-box h2 {
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.welcome-text {
  color: var(--color-text-muted);
  font-size: var(--font-size-lg);
  margin: 0;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
}

.history-placeholder h3 {
  margin-bottom: var(--spacing-md);
}

.placeholder-text {
  color: var(--color-text-muted);
}
</style>
