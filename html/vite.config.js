import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    root: 'src',
    build: {
      outDir: '../dist',
      emptyOutDir: true,
    },
    server: {
      open: true,
    },
    define: {
      __SANITY_PROJECT_ID__: JSON.stringify(env.SANITY_PROJECT_ID),
      __SANITY_DATASET__: JSON.stringify(env.SANITY_DATASET),
      __SANITY_API_VERSION__: JSON.stringify(env.SANITY_API_VERSION),
      __SANITY_USE_CDN__: JSON.stringify(env.SANITY_USE_CDN),
      __SANITY_PERSPECTIVE__: JSON.stringify(env.SANITY_PERSPECTIVE || 'published'),
    },
  };
});
