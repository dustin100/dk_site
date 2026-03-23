<template>
  <section id="hero">
    <div class="container-regular">
      <div class="grid grid-cols-1 items-center gap-m md:grid-cols-[1.2fr_0.8fr] md:gap-l">
        <!-- Intro -->
        <div>
          <div
            v-if="section.kicker"
            class="badge--mono text-muted text-xs leading-baseline uppercase tracking-2"
          >
            {{ section.kicker }}
          </div>

          <h1 class="h1 mt-xs mb-m">{{ section.title ?? '' }}</h1>

          <p
            v-if="section.subtitle"
            class="text-muted text-base md:text-lg leading-2 max-w-[60ch] mb-l"
          >
            {{ section.subtitle }}
          </p>

          <div class="flex flex-wrap gap-s">
            <Button
              v-for="cta in section.ctas"
              :key="`${cta.label}-${cta.href}`"
              :href="cta.href"
              :variant="cta.style === 'default' ? 'default' : 'primary'"
            >
              {{ cta.label }}
            </Button>
          </div>
        </div>

        <!-- Media -->
        <div
          class="flex self-stretch justify-start mt-l md:mt-0 md:justify-end"
          :aria-hidden="section.photo ? undefined : 'true'"
        >
          <figure
            v-if="section.photo"
            class="relative overflow-hidden p-[1px] rounded-3xl bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.18),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(0,255,255,0.18),transparent_55%),rgba(0,0,0,0.7)] shadow-card max-w-105 w-full"
          >
            <ResponsiveImage
              :photo="section.photo"
              :width="1700"
              :height="1125"
              loading="eager"
              class="block h-full max-h-105 w-full rounded-[23px] object-cover object-top"
              sizes="(min-width: 768px) 420px, 100vw"
            />
          </figure>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { HeroSection } from '../types'
import Button from './ui/Button.vue'
import ResponsiveImage from './ui/ResponsiveImage.vue'

defineProps<{
  section: HeroSection
}>()
</script>
