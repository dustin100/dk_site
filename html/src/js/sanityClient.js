import { createClient } from 'https://esm.sh/@sanity/client@6';

export const client = createClient({
  projectId: '123o4l0p',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  perspective: 'published',
});
