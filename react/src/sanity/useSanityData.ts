import { useContext } from 'react';
import { SanityDataContext } from './SanityProvider';
import type { HomeQueryResult } from '../types';

export function useSanityData(): HomeQueryResult {
  const ctx = useContext(SanityDataContext);
  if (!ctx) {
    throw new Error('useSanityData must be used within a SanityProvider');
  }
  return ctx.data;
}
