<template>
  <section id="about">
    <div class="container-regular">
      <div class="grid grid-cols-1 gap-m md:grid-cols-2 md:gap-l">
        <!-- Left card: main copy -->
        <div>
          <div class="card card--fx">
            <h2 v-if="section.title" class="h2 mb-m">{{ section.title }}</h2>
            <PortableText :value="section.body" />
          </div>
        </div>

        <!-- Right card: subtitle + bullets -->
        <div>
          <div class="card card--fx">
            <h3 v-if="section.subtitle" class="h2 badge--mono mb-m">
              {{ section.subtitle }}
            </h3>

            <ul v-if="section.bullets?.length" class="card__list">
              <li v-for="(text, index) in section.bullets" :key="`${text}-${index}`">
                {{ text }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { AboutSection } from '../types'
import PortableText from './ui/PortableText.vue'

defineProps<{
  section: AboutSection
}>()
</script>
