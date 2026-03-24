<template>
  <section id="skills">
    <div class="container-regular">
      <h2 v-if="section.title" class="h2 mb-s">{{ section.title }}</h2>

      <div class="card card--fx mt-m">
        <p v-if="section.intro" class="text-muted mb-s">{{ section.intro }}</p>

        <ul v-if="section.tags?.length" class="flex flex-wrap gap-xs m-0 p-0 list-none">
          <li v-for="label in section.tags" :key="label" class="m-0">
            <span class="inline-flex items-center border border-line rounded-full px-s py-2xs bg-secondary text-sm leading-baseline tracking-1">
              {{ label }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { SkillsSection } from '../types'

defineProps<{
  section: SkillsSection
}>()
</script>
