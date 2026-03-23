<template>
  <div class="flex items-center gap-s">
    <span
      v-if="versionBadge"
      class="badge badge--mono text-xs text-accent border border-line px-xs py-3xs rounded-full leading-[100%] uppercase tracking-2"
    >
      {{ versionBadge }}
    </span>
    <div class="font-bold tracking-1 text-text whitespace-nowrap">
      {{ siteName ?? 'Site' }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  siteName?: string
  versionBadge?: string
}>()
</script>
