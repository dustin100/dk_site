import { inject } from 'vue'
import type { Ref } from 'vue'
import type { HomeQueryResult } from '../types'

export const SANITY_DATA_KEY = 'sanityData'

export function useSanityData() {
  const ctx = inject<{
    data: Ref<HomeQueryResult | null>
    isLoading: Ref<boolean>
    error: Ref<unknown>
  }>(SANITY_DATA_KEY)

  if (!ctx) throw new Error('useSanityData must be used inside App')

  return ctx
}
