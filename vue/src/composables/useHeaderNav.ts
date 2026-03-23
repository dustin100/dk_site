import { ref, watch, onUnmounted } from 'vue'

export function useHeaderNav() {
  const isOpen = ref(false)

  watch(isOpen, (val) => {
    document.body.classList.toggle('nav-open', val)
  })

  onUnmounted(() => {
    document.body.classList.remove('nav-open')
  })

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen.value) {
      isOpen.value = false
    }
  }
  window.addEventListener('keydown', onKeyDown)
  onUnmounted(() => window.removeEventListener('keydown', onKeyDown))

  const handleToggle = () => {
    isOpen.value = !isOpen.value
  }

  const closeMenu = () => {
    isOpen.value = false
  }

  return { isOpen, handleToggle, closeMenu }
}
