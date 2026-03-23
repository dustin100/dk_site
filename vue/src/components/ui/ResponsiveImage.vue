<template>
  <img
    v-if="photo"
    :src="src800"
    :srcset="`${src400} 400w, ${src800} 800w, ${src1200} 1200w`"
    :sizes="sizes"
    :alt="photo.alt ?? ''"
    :width="width"
    :height="height"
    :loading="loading"
    decoding="async"
    class="w-full h-auto object-cover"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { urlFor } from '../../sanityImage'
import type { SanityImage } from '../../types'

const props = withDefaults(
  defineProps<{
    photo?: SanityImage
    width?: number
    height?: number
    loading?: 'lazy' | 'eager'
    sizes?: string
  }>(),
  {
    width: 1700,
    height: 1125,
    loading: 'lazy',
    sizes: '(min-width: 1024px) 33vw, 100vw',
  }
)

const base = computed(() =>
  props.photo ? urlFor(props.photo).fit('crop').auto('format').quality(80) : null
)

const src400 = computed(() => base.value?.width(400).url() ?? '')
const src800 = computed(() => base.value?.width(800).url() ?? '')
const src1200 = computed(() => base.value?.width(1200).url() ?? '')
</script>
