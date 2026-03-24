<template>
  <template v-for="(section, index) in sections" :key="`${section._type}-${index}`">
    <Hero v-if="section._type === 'heroSection'" :section="(section as HeroSection)" />
    <About v-else-if="section._type === 'aboutSection'" :section="(section as AboutSection)" />
    <WorkLogosGrid
      v-else-if="section._type === 'workLogosGridSection'"
      :section="(section as WorkLogosGridSection)"
      :strings="strings"
    />
    <Skills v-else-if="section._type === 'skillsSection'" :section="(section as SkillsSection)" />
    <Stack
      v-else-if="section._type === 'stackSection'"
      :section="(section as StackSection)"
      :strings="strings"
    />
    <Contact v-else-if="section._type === 'contactSection'" :section="(section as ContactSection)" />
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSanityData } from '../composables/useSanityData'
import Hero from './Hero.vue'
import About from './About.vue'
import WorkLogosGrid from './WorkLogosGrid.vue'
import Skills from './Skills.vue'
import Stack from './Stack.vue'
import Contact from './Contact.vue'
import type {
  HeroSection,
  AboutSection,
  WorkLogosGridSection,
  SkillsSection,
  StackSection,
  ContactSection,
} from '../types'

type KnownSection =
  | HeroSection
  | AboutSection
  | WorkLogosGridSection
  | SkillsSection
  | StackSection
  | ContactSection
  | { _type: string }

const { data } = useSanityData()

const sections = computed<KnownSection[]>(() => (data.value?.home?.sections as KnownSection[]) ?? [])
const strings = computed(() => data.value?.strings ?? null)
</script>
