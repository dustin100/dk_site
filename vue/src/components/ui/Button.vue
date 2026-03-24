<template>
  <a v-if="href && !disabled" :href="href" :class="classes">
    <slot />
  </a>
  <button v-else type="button" :disabled="disabled" :class="classes">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    href?: string
    variant?: 'default' | 'primary'
    disabled?: boolean
  }>(),
  {
    variant: 'default',
    disabled: false,
  }
)

const base =
  'inline-flex items-center gap-xs px-s py-xs rounded-[12px] ' +
  'border-line border bg-secondary text-text no-underline ' +
  'leading-0 ' +
  'transition duration-200 ease-out ' +
  'hover:-translate-y-[1px] ' +
  'hover:bg-accent hover:border-accent hover:text-primary ' +
  'hover:shadow-card ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-primary'

const primary = 'border shadow-card bg-accent text-primary hover:bg-accent'
const disabledClasses = 'opacity-40 pointer-events-none'

const classes = computed(() =>
  [base, props.variant === 'primary' ? primary : '', props.disabled ? disabledClasses : '']
    .filter(Boolean)
    .join(' ')
)
</script>
