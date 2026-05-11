<template>
  <section v-if="currentStack" id="stack">
    <div class="container-regular">
      <h2 v-if="section.title" class="h2 mb-s">{{ section.title }}</h2>

      <div class="card card--fx mt-m">
        <div class="grid gap-l items-start md:grid-cols-[1.2fr_0.8fr]">
          <!-- Left: summary + list -->
          <div>
            <PortableText v-if="currentStack.summary" :value="currentStack.summary" />

            <ul
              v-if="currentStack.list?.length"
              class="mt-xs pl-l list-disc list-outside space-y-2xs"
            >
              <li v-for="(item, index) in currentStack.list" :key="`${item}-${index}`">
                {{ item }}
              </li>
            </ul>
          </div>

          <!-- Right: stack switcher buttons -->
          <div class="flex flex-col" role="group" :aria-label="switcherLabel">
            <p v-if="section.tryStack" class="text-muted">{{ section.tryStack }}</p>

            <div class="flex flex-wrap gap-s mt-xs">
              <template v-for="(stack, index) in section.stacks" :key="`${stack.host}-${index}`">
                <Button
                  v-if="stack.host && stack.label"
                  :href="`https://${stack.host}`"
                  target="_self"
                  rel="noopener noreferrer"
                >
                  {{ stack.label }}
                </Button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { StackSection, StringsDoc } from '../types'
import { selectStackVariant } from '../utils/stackHelpers'
import Button from './ui/Button.vue'
import PortableText from './ui/PortableText.vue'

const props = defineProps<{
  section: StackSection
  strings?: StringsDoc | null
}>()

const currentStack = computed(() => selectStackVariant(props.section.stacks, 'Vue'))
const switcherLabel = computed(() => props.strings?.stackSwitcherLabel ?? 'Stack demos')
</script>
