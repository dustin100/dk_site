<template>
  <button
    ref="buttonEl"
    type="button"
    :aria-label="isOpen ? labelClose : labelOpen"
    aria-controls="primary-nav"
    :aria-expanded="isOpen ? 'true' : 'false'"
    class="inline-flex items-center gap-xs rounded-xl border-0 bg-transparent px-s py-xs text-accent md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
    @click="emit('click')"
  >
    <span aria-hidden="true" class="relative inline-block h-[2px] w-[24px]">
      <!-- middle bar -->
      <span
        :class="[
          'absolute left-0 top-0 block h-[2px] w-full rounded-full bg-current transition-all duration-200',
          isOpen ? 'opacity-0' : 'opacity-100',
        ]"
      />
      <!-- top bar -->
      <span
        :class="[
          'absolute left-0 block h-[2px] w-full rounded-full bg-current transition-all duration-200',
          isOpen ? 'top-0 rotate-45' : '-top-[7px]',
        ]"
      />
      <!-- bottom bar -->
      <span
        :class="[
          'absolute left-0 block h-[2px] w-full rounded-full bg-current transition-all duration-200',
          isOpen ? 'top-0 -rotate-45' : 'top-[7px]',
        ]"
      />
    </span>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  isOpen: boolean
  labelOpen: string
  labelClose: string
}>()

const emit = defineEmits<{
  click: []
}>()

const buttonEl = ref<HTMLButtonElement | null>(null)

defineExpose({
  focus(options?: FocusOptions) {
    try {
      buttonEl.value?.focus(options)
    } catch {
      buttonEl.value?.focus()
    }
  },
})
</script>
