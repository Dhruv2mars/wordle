import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/cli.tsx'],
  outDir: 'dist',
  clean: true,
  format: ['esm'],
  sourcemap: true,
  target: 'node18',
  minify: true,
  splitting: false,
  dts: false,
  platform: 'node',
  shims: false,
});
