import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  server: { host: '0.0.0.0' },
  plugins: [
    tsConfigPaths(),
    remix({
      ssr: false,
    }),
  ],
});
