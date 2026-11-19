import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://drivnmedia.info',
  output: 'static',
  vite: { plugins: [tailwindcss()] },
});
