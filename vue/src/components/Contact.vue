<template>
  <section id="contact">
    <div class="container-regular">
      <div class="grid grid-cols-1 gap-m items-start md:grid-cols-2">
        <div class="card card--fx">
          <h2 v-if="section.title" class="h2 mb-m">{{ section.title }}</h2>

          <PortableText :value="section.body" />

          <div v-if="hasCtas" class="mt-m flex flex-wrap gap-s">
            <Button :href="emailHref" variant="primary" :disabled="!emailHref">
              {{ section.emailLabel || 'Email me' }}
            </Button>

            <template v-for="(cta, index) in section.ctas" :key="`${cta.label}-${index}`">
              <Button
                v-if="cta.href && cta.label"
                :href="cta.href"
                :variant="cta.style === 'primary' ? 'primary' : 'default'"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ cta.label }}
              </Button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ContactSection } from '../types'
import Button from './ui/Button.vue'
import PortableText from './ui/PortableText.vue'

const props = defineProps<{
  section: ContactSection
}>()

const emailHref = computed(() =>
  props.section.emailAddress ? `mailto:${props.section.emailAddress}` : undefined
)

const hasCtas = computed(() => Boolean(props.section.emailLabel || props.section.emailAddress || props.section.ctas?.length))
</script>
