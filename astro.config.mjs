// @ts-check
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel'
import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.padresparapalmas.com.br',
  integrations: [sitemap(), react()],
  vite: {
    plugins: [tailwindcss()]
  },
  adapter: vercel({
    webAnalytics: {
      enabled: true // set to false when using @vercel/analytics@1.4.0
    }
  })
})
