<template>
  <div v-if="isLoading" class="min-h-screen flex items-center justify-center">
    <p class="text-sm font-mono text-muted">Loading…</p>
  </div>

  <div v-else-if="error" class="min-h-screen flex items-center justify-center">
    <p class="text-sm font-mono text-red-500">Could not load content from Sanity.</p>
  </div>

  <div v-else>
    <Header />
  </div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted } from 'vue'
import { client } from './sanityClient'
import { HOME_QUERY } from './queries'
import { SANITY_DATA_KEY } from './composables/useSanityData'
import Header from './components/Header.vue'

const data = ref(null)
const isLoading = ref(true)
const error = ref<unknown>(null)

provide(SANITY_DATA_KEY, { data, isLoading, error })

onMounted(async () => {
  try {
    data.value = await client.fetch(HOME_QUERY)
  } catch (err) {
    console.error('[Sanity] fetch error:', err)
    error.value = err
  } finally {
    isLoading.value = false
  }
})
</script>
