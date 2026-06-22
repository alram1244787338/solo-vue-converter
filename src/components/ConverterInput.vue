<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  units: {
    type: Array,
    default: () => []
  },
  selectedUnit: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '请输入数值'
  }
})

const emit = defineEmits(['update:modelValue', 'update:selectedUnit'])

const displayValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const selectedUnitComputed = computed({
  get: () => props.selectedUnit,
  set: (val) => emit('update:selectedUnit', val)
})
</script>

<template>
  <div class="converter-input">
    <label v-if="label" class="input-label">{{ label }}</label>
    <div class="input-wrapper">
      <input
        v-model="displayValue"
        type="number"
        class="value-input"
        :placeholder="placeholder"
        step="any"
      />
      <select v-model="selectedUnitComputed" class="unit-select">
        <option v-for="unit in units" :key="unit.id" :value="unit.id">
          {{ unit.name }} ({{ unit.symbol }})
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.converter-input {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.input-label {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text);
}

.input-wrapper {
  display: flex;
  gap: var(--spacing-sm);
}

.value-input {
  flex: 1;
  min-width: 0;
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-lg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface);
  color: var(--color-text);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.value-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
}

.value-input::-webkit-inner-spin-button,
.value-input::-webkit-outer-spin-button {
  opacity: 1;
}

.unit-select {
  padding: var(--spacing-sm) var(--spacing-md);
  padding-right: var(--spacing-xl);
  font-size: var(--font-size-base);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface);
  color: var(--color-text);
  cursor: pointer;
  transition: border-color 0.2s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--spacing-sm) center;
}

.unit-select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
}
</style>
