import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from '@tanstack/react-router'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

import { SITE_DESCRIPTION, SITE_TITLE } from '../consts'
import logoColorida from '../assets/images/logo-colorida.png'
import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

const SITE_URL = 'https://padresparapalmas.org.br'
const SITE_LOCALE = 'pt_BR'
const OG_IMAGE_URL = new URL(logoColorida, SITE_URL).toString()

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_TITLE,
  url: SITE_URL,
  logo: OG_IMAGE_URL,
  sameAs: ['https://www.instagram.com/padresparapalmas']
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_TITLE,
  url: SITE_URL,
  inLanguage: 'pt-BR',
  description: SITE_DESCRIPTION,
  publisher: {
    '@type': 'Organization',
    name: SITE_TITLE
  }
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        title: SITE_TITLE
      },
      {
        name: 'description',
        content: SITE_DESCRIPTION
      },
      {
        name: 'robots',
        content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
      },
      {
        name: 'googlebot',
        content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
      },
      {
        name: 'theme-color',
        content: '#9c5a41'
      },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        property: 'og:site_name',
        content: SITE_TITLE
      },
      {
        property: 'og:locale',
        content: SITE_LOCALE
      },
      {
        property: 'og:url',
        content: SITE_URL
      },
      {
        property: 'og:title',
        content: SITE_TITLE
      },
      {
        property: 'og:description',
        content: SITE_DESCRIPTION
      },
      {
        property: 'og:image',
        content: OG_IMAGE_URL
      },
      {
        property: 'og:image:alt',
        content: `${SITE_TITLE} - identidade visual`
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        name: 'twitter:title',
        content: SITE_TITLE
      },
      {
        name: 'twitter:description',
        content: SITE_DESCRIPTION
      },
      {
        name: 'twitter:image',
        content: OG_IMAGE_URL
      }
    ],
    links: [
      {
        rel: 'canonical',
        href: SITE_URL
      },
      {
        rel: 'stylesheet',
        href: appCss
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com'
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon_io/favicon-32x32.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/favicon_io/apple-touch-icon.png'
      },
      {
        rel: 'manifest',
        href: '/manifest.json'
      }
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(organizationJsonLd)
      },
      {
        type: 'application/ld+json',
        children: JSON.stringify(websiteJsonLd)
      }
    ]
  }),
  component: RootComponent
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body className="font-body text-grafite bg-white antialiased">
        {children}
        <Scripts />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
