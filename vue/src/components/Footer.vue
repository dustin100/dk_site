<template>
  <footer class="py-l">
    <div class="container-regular grid grid-cols-1 gap-2xs">
      <p v-if="builtWithText" class="text-muted text-base leading-0 tracking-1 m-0">
        {{ builtWithText }}
      </p>
      <p class="text-accent text-sm m-0">© {{ year }} {{ siteName }}</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSanityData } from '../composables/useSanityData'
import { getBuiltWithFromSections } from '../utils/stackHelpers'
import type { HomeSection } from '../types'

const { data } = useSanityData()

const siteName = computed(() => data.value?.settings?.siteName ?? '')
const builtWithText = computed(() =>
  getBuiltWithFromSections(data.value?.home?.sections as HomeSection[] | null)
)
const year = new Date().getFullYear()
</script>
