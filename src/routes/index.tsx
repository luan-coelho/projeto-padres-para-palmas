import { createFileRoute } from '@tanstack/react-router'
import { Layout } from '../components/layout'
import { Hero } from '../components/hero'
import { Apresentacao } from '../components/apresentacao'
import { Pilares } from '../components/pilares'
import { SobreProjeto } from '../components/sobre-projeto'
import { Contato } from '../components/contato'
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts'

const SITE_URL = 'https://padresparapalmas.org.br'
const PAGE_TITLE = SITE_TITLE
const PAGE_DESCRIPTION = SITE_DESCRIPTION
const PAGE_URL = SITE_URL

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  url: PAGE_URL,
  inLanguage: 'pt-BR',
  isPartOf: {
    '@type': 'WebSite',
    name: SITE_TITLE,
    url: SITE_URL
  }
}

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: 'description', content: PAGE_DESCRIPTION },
      { property: 'og:title', content: PAGE_TITLE },
      { property: 'og:description', content: PAGE_DESCRIPTION },
      { property: 'og:url', content: PAGE_URL },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:title', content: PAGE_TITLE },
      { name: 'twitter:description', content: PAGE_DESCRIPTION }
    ],
    links: [{ rel: 'canonical', href: PAGE_URL }],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(homeJsonLd)
      }
    ]
  }),
  component: Home
})

export function Home() {
  return (
    <Layout>
      <Hero />
      <SobreProjeto />
      <Apresentacao />
      <Pilares />
      <Contato />
    </Layout>
  )
}
