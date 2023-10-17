import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import {uglify} from 'rollup-plugin-uglify';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: 'chart'
    },
    target: 'es2015',
    rollupOptions: {
      external: ['d3'],
    },
  },
  plugins: [
    uglify(),
    viteStaticCopy({
      targets: [
        {
          src: './src/index.d.ts',
          dest: './'
        }
      ]
    })
  ],
  css: {
    postcss: {
      plugins: [autoprefixer]
    }
  }
})