import { defineConfig } from 'vite';

export default defineConfig({
  esbuild: {
    jsx: 'transform',
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
  },
  build: {
    lib: {
      entry: 'src/index.tsx',
      formats: ['iife'],
      name: 'WebFrameBundle',
      fileName: () => 'bundle.js',
    },
    sourcemap: false,
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      external: [],
      output: {
        globals: {},
        exports: 'named' 
      },
    },
  },
});
