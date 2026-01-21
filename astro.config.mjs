// @ts-check
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.padresparapalmas.com.br',
  integrations: [sitemap(), react()],
  vite: {
    plugins: [tailwindcss()]
  }
})
