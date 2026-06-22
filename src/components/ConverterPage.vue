<script setup>
import { computed } from 'vue'
import ConverterInput from './ConverterInput.vue'
import { useConverter } from '../composables/useConverter.js'
import { CATEGORIES } from '../constants/units.js'

const props = defineProps({
  categoryId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['back'])

const category = computed(() =>
  CATEGORIES.find((c) => c.id === props.categoryId)
)

const {
  units,
  fromUnit,
  toUnit,
  fromValue,
  toValue,
  swapUnits,
  reset
} = useConverter(props.categoryId)
</script>

<template>
  <div class="converter-page">
    <div class="page-header">
      <button class="back-btn" @click="emit('back')">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        <span>返回</span>
      </button>
      <div class="page-title-wrap">
        <span class="page-icon">{{ category?.icon }}</span>
        <h2 class="page-title">{{ category?.name }}换算</h2>
      </div>
    </div>

    <div class="converter-card">
      <ConverterInput
        label="从"
        v-model="fromValue"
        :units="units"
        v-model:selected-unit="fromUnit"
        placeholder="输入数值"
      />

      <div class="swap-row">
        <button class="swap-btn" @click="swapUnits" title="交换单位">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="17 1 21 5 17 9"></polyline>
            <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
            <polyline points="7 23 3 19 7 15"></polyline>
            <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
          </svg>
        </button>
      </div>

      <ConverterInput
        label="到"
        v-model="toValue"
        :units="units"
        v-model:selected-unit="toUnit"
        placeholder="转换结果"
      />

      <div class="action-row">
        <button class="reset-btn" @click="reset">
          清空
        </button>
      </div>
    </div>

    <div class="placeholder-box history-placeholder">
      <h3>历史记录</h3>
      <p class="placeholder-text">暂无换算记录</p>
    </div>
  </div>
</template>

<style scoped>
.converter-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.page-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-xl);
  flex-wrap: wrap;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-sm);
  color: var(--color-text);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
}

.back-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.page-title-wrap {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.page-icon {
  font-size: 28px;
}

.page-title {
  color: var(--color-primary);
  margin: 0;
}

.converter-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
}

.swap-row {
  display: flex;
  justify-content: center;
}

.swap-btn {
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--color-primary);
  color: #fff;
  transition: all 0.2s ease;
}

.swap-btn:hover {
  background-color: var(--color-primary-hover);
  transform: rotate(180deg);
}

.action-row {
  display: flex;
  justify-content: flex-end;
  padding-top: var(--spacing-sm);
  border-top: 1px solid var(--color-border);
}

.reset-btn {
  padding: var(--spacing-sm) var(--spacing-lg);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  background-color: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
}

.reset-btn:hover {
  color: var(--color-error);
  border-color: var(--color-error);
}

.history-placeholder h3 {
  margin-bottom: var(--spacing-md);
}

.placeholder-text {
  color: var(--color-text-muted);
}
</style>
