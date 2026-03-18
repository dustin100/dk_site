import { sanityClient } from './sanity/sanityClient';
import { HOME_QUERY } from './queries';
import type { HomeQueryResult } from './types';

export async function fetchHomeData(): Promise<HomeQueryResult> {
  return sanityClient.fetch<HomeQueryResult>(HOME_QUERY);
}
