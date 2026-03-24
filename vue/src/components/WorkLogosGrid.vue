<template>
  <section v-if="section.logos?.length" id="work">
    <div class="container-regular">
      <h2 v-if="section.title" class="h2 mb-s">{{ section.title }}</h2>

      <div class="card card--fx">
        <p v-if="section.strapline" class="text-muted max-w-160 mb-l">
          {{ section.strapline }}
        </p>

        <ul
          :aria-label="ariaLabel"
          class="grid list-none m-0 p-0 gap-xl items-center justify-items-center grid-cols-[repeat(auto-fit,minmax(120px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(180px,1fr))]"
        >
          <template v-for="(logo, index) in section.logos" :key="`${logo.name ?? 'logo'}-${index}`">
            <li v-if="logo.src" class="m-0">
              <a
                :href="logo.url || '#'"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-center w-full max-w-[180px] rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] opacity-80 transition-[opacity,transform,border-color,box-shadow] duration-150 ease-out hover:opacity-100 hover:-translate-y-px hover:border-line hover:shadow-card focus-visible:opacity-100 focus-visible:-translate-y-px focus-visible:border-line focus-visible:shadow-card"
              >
                <img
                  :src="logo.src"
                  :alt="logo.alt ?? logo.name ?? ''"
                  width="180"
                  height="120"
                  loading="lazy"
                  decoding="async"
                  class="block max-w-full h-auto"
                />
              </a>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { WorkLogosGridSection, StringsDoc } from '../types'

const props = defineProps<{
  section: WorkLogosGridSection
  strings?: StringsDoc | null
}>()

const ariaLabel = props.strings?.workLogosLabel ?? 'Brand logos'
</script>
