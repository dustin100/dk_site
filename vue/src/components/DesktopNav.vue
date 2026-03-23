<template>
  <nav v-if="items.length" :aria-label="label" class="hidden items-center gap-l md:flex">
    <Link v-for="item in items" :key="item.href ?? item.label" :href="item.href">
      {{ item.label }}
    </Link>
  </nav>
</template>

<script setup lang="ts">
import Link from './ui/Link.vue'
import type { NavItem } from '../types'

defineProps<{
  label: string
  items: NavItem[]
}>()
</script>
