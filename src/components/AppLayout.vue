<script setup>
</script>

<template>
  <div class="app-layout">
    <header class="app-header">
      <div class="header-container">
        <h1 class="app-title">单位换算器</h1>
        <p class="app-subtitle">Unit Converter</p>
      </div>
    </header>

    <main class="app-main">
      <div class="main-container">
        <slot></slot>
      </div>
    </main>

    <footer class="app-footer">
      <div class="footer-container">
        <p>&copy; 2026 单位换算器</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-lg) var(--spacing-xl);
  text-align: center;
}

.app-title {
  color: var(--color-primary);
  margin-bottom: var(--spacing-xs);
}

.app-subtitle {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  margin: 0;
}

.app-main {
  flex: 1;
  padding: var(--spacing-2xl) 0;
}

.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-xl);
}

.app-footer {
  background-color: var(--color-surface);
  border-top: 1px solid var(--color-border);
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-lg) var(--spacing-xl);
  text-align: center;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}
</style>
