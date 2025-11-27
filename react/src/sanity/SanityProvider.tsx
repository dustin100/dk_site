import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { fetchHomeData } from '../api';
import type { HomeQueryResult } from '../types';

interface SanityDataContextValue {
  data: HomeQueryResult;
}

// eslint-disable-next-line react-refresh/only-export-components
export const SanityDataContext = createContext<SanityDataContextValue | undefined>(
  undefined,
);

export function SanityProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<HomeQueryResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const result = await fetchHomeData();
        if (cancelled) return;

        console.log('[Sanity] fetched data:', result);
        setData(result);
        setIsLoading(false);
      } catch (err) {
        if (cancelled) return;

        console.error('[Sanity] fetch error:', err);
        setError(err);
        setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary text-text-16">
        <p className="text-sm font-mono">Loading…</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary text-red-500">
        <p className="text-sm font-mono">
          Could not load content from Sanity.
        </p>
      </div>
    );
  }

  return (
    <SanityDataContext.Provider value={{ data }}>
      {children}
    </SanityDataContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSanityData(): HomeQueryResult {
  const ctx = useContext(SanityDataContext);
  if (!ctx) {
    throw new Error('useSanityData must be used within a SanityProvider');
  }
  return ctx.data;
}
