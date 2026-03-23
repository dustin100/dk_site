<template>
  <nav
    :aria-label="mainNavLabel"
    :class="[
      'fixed inset-y-0 right-0 z-40 flex h-svh w-[min(86vw,22rem)] flex-col gap-m',
      'border-l border-line bg-primary/95 px-l py-l shadow-card',
      'transition-transform duration-300',
      isOpen ? 'translate-x-0' : 'translate-x-full',
    ]"
  >
    <!-- Close button -->
    <div class="absolute top-m right-m">
      <button
        type="button"
        :aria-label="menuToggleCloseLabel"
        class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-transparent text-text shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
        @click="emit('close')"
      >
        <span aria-hidden="true" class="relative inline-block h-[2px] w-[22px]">
          <span class="absolute inset-0 block h-[2px] w-full bg-current rotate-45" />
          <span class="absolute inset-0 block h-[2px] w-full bg-current -rotate-45" />
        </span>
      </button>
    </div>

    <!-- Mobile nav links -->
    <div id="primary-nav" ref="linksRef" class="flex flex-col gap-xs">
      <Link
        v-for="item in items"
        :key="item.href ?? item.label"
        :href="item.href"
        class="px-s py-xs rounded-md text-base text-text hover:bg-secondary hover:text-accent"
        @click="emit('close')"
      >
        {{ item.label }}
      </Link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Link from './ui/Link.vue'
import type { NavItem } from '../types'

defineProps<{
  isOpen: boolean
  mainNavLabel: string
  menuToggleCloseLabel: string
  items: NavItem[]
}>()

const emit = defineEmits<{
  close: []
}>()

const linksRef = ref<HTMLElement | null>(null)

defineExpose({
  focusFirst() {
    const first = linksRef.value?.querySelector<HTMLAnchorElement>('a')
    try {
      first?.focus({ preventScroll: true })
    } catch {
      first?.focus()
    }
  },
})
</script>
