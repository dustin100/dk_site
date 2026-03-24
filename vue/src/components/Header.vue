<template>
  <header class="sticky top-0 z-40 border-b border-line bg-primary backdrop-blur-md backdrop-saturate-150">
    <div class="container-regular flex items-center justify-between gap-m py-s">
      <Brand :site-name="siteName" :version-badge="versionBadge" />

      <div class="flex items-center gap-m">
        <DesktopNav :label="mainNavLabel" :items="navItems" />
        <Hamburger
          ref="hamburgerRef"
          :is-open="isOpen"
          :label-open="menuToggleOpen"
          :label-close="menuToggleClose"
          @click="handleToggle"
        />
      </div>
    </div>

    <!-- Mobile nav -->
    <div class="md:hidden">
      <!-- Overlay -->
      <button
        type="button"
        aria-hidden="true"
        :class="[
          'fixed inset-0 z-30 bg-primary/60 backdrop-blur-sm transition-opacity duration-200',
          isOpen ? 'opacity-70 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ]"
        @click="closeMenu"
      />

      <MobileDrawer
        ref="drawerRef"
        :is-open="isOpen"
        :main-nav-label="mainNavLabel"
        :menu-toggle-close-label="menuToggleClose"
        :items="navItems"
        @close="closeMenu"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, computed } from 'vue'
import { useHeaderNav } from '../composables/useHeaderNav'
import { useSanityData } from '../composables/useSanityData'
import Brand from './ui/Brand.vue'
import Hamburger from './ui/Hamburger.vue'
import DesktopNav from './DesktopNav.vue'
import MobileDrawer from './MobileDrawer.vue'

const { data } = useSanityData()

const siteName = computed(() => data.value?.settings?.siteName)
const versionBadge = computed(() => data.value?.settings?.versionBadge)
const navItems = computed(() => data.value?.settings?.nav ?? [])
const mainNavLabel = computed(() => data.value?.strings?.['mainNavLabel'] ?? 'Primary navigation')
const menuToggleOpen = computed(() => data.value?.strings?.['menuToggleOpen'] ?? 'Open menu')
const menuToggleClose = computed(() => data.value?.strings?.['menuToggleClose'] ?? 'Close menu')

const { isOpen, handleToggle, closeMenu } = useHeaderNav()

const hamburgerRef = ref<InstanceType<typeof Hamburger> | null>(null)
const drawerRef = ref<InstanceType<typeof MobileDrawer> | null>(null)

watch(isOpen, async (val) => {
  await nextTick()
  if (val) {
    drawerRef.value?.focusFirst()
  } else {
    hamburgerRef.value?.focus({ preventScroll: true })
  }
})
</script>
