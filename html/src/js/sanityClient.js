import { createClient } from '@sanity/client';

const projectId = __SANITY_PROJECT_ID__;
const dataset = __SANITY_DATASET__;
const apiVersion = __SANITY_API_VERSION__;
const perspective = __SANITY_PERSPECTIVE__;
const useCdn = __SANITY_USE_CDN__ === 'true';

if (!projectId || !dataset) {
  console.warn('Missing Sanity env vars. Check .env.development / .env.production');
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective,
});
