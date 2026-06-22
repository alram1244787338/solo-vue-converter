<script setup>
import { ref } from 'vue'

const categories = ref([
  { id: 'length', name: '长度', icon: '📏' },
  { id: 'weight', name: '重量', icon: '⚖️' },
  { id: 'temperature', name: '温度', icon: '🌡️' },
  { id: 'currency', name: '货币', icon: '💱' }
])
</script>

<template>
  <div class="home-placeholder">
    <div class="placeholder-box main-placeholder">
      <h2>单位换算器</h2>
      <p class="placeholder-text">功能开发中，敬请期待...</p>
    </div>

    <div class="category-grid">
      <div
        v-for="category in categories"
        :key="category.id"
        class="category-card placeholder-box"
      >
        <span class="category-icon">{{ category.icon }}</span>
        <h3 class="category-name">{{ category.name }}</h3>
        <p class="category-status">待开发</p>
      </div>
    </div>

    <div class="placeholder-box history-placeholder">
      <h3>历史记录</h3>
      <p class="placeholder-text">暂无换算记录</p>
    </div>
  </div>
</template>

<style scoped>
.home-placeholder {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.main-placeholder {
  padding: var(--spacing-2xl);
}

.main-placeholder h2 {
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
}

.placeholder-text {
  color: var(--color-text-muted);
  font-size: var(--font-size-lg);
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
}

.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.category-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.category-icon {
  font-size: 48px;
  margin-bottom: var(--spacing-sm);
}

.category-name {
  color: var(--color-text);
  margin: 0;
}

.category-status {
  font-size: var(--font-size-sm);
  color: var(--color-warning);
  margin: 0;
}

.history-placeholder h3 {
  margin-bottom: var(--spacing-md);
}
</style>
