import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  server: { host: '0.0.0.0' },
  plugins: [tsConfigPaths(), react()],
});
