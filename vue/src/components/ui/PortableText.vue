<template>
  <div v-if="value" class="portable-text">
    <PortableText :value="(value as any)" />
  </div>
</template>

<script setup lang="ts">
import { PortableText } from '@portabletext/vue'

defineProps<{
  value?: unknown
}>()
</script>

<style scoped>
.portable-text :deep(p) {
  font-size: var(--text-base);
  margin-bottom: var(--spacing-m);
  color: var(--color-text);
}

.portable-text :deep(ul) {
  list-style-type: disc;
  list-style-position: outside;
  margin-left: var(--spacing-l);
  margin-bottom: var(--spacing-m);
}

.portable-text :deep(li) {
  margin-bottom: var(--spacing-2xs);
}
</style>
