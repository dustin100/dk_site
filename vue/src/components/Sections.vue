<template>
  <template v-for="(section, index) in sections" :key="`${section._type}-${index}`">
    <Hero v-if="section._type === 'heroSection'" :section="(section as HeroSection)" />
    <About v-else-if="section._type === 'aboutSection'" :section="(section as AboutSection)" />
    <WorkLogosGrid
      v-else-if="section._type === 'workLogosGridSection'"
      :section="(section as WorkLogosGridSection)"
      :strings="strings"
    />
    <!-- Skills, Stack, Contact — coming soon -->
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSanityData } from '../composables/useSanityData'
import Hero from './Hero.vue'
import About from './About.vue'
import WorkLogosGrid from './WorkLogosGrid.vue'
import type { HeroSection, AboutSection, WorkLogosGridSection } from '../types'

type KnownSection = HeroSection | AboutSection | WorkLogosGridSection | { _type: string }

const { data } = useSanityData()

const sections = computed<KnownSection[]>(() => (data.value?.home?.sections as KnownSection[]) ?? [])
const strings = computed(() => data.value?.strings ?? null)
</script>
