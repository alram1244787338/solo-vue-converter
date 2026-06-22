<script setup>
defineProps({
  category: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['click'])
</script>

<template>
  <div class="category-card" @click="emit('click', category.id)">
    <span class="category-icon">{{ category.icon }}</span>
    <h3 class="category-name">{{ category.name }}</h3>
  </div>
</template>

<style scoped>
.category-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
}

.category-icon {
  font-size: 48px;
  line-height: 1;
}

.category-name {
  font-size: var(--font-size-xl);
  color: var(--color-text);
  margin: 0;
}
</style>
