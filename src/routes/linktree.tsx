import { Link, createFileRoute } from '@tanstack/react-router'
import { Globe, HardDrive, Instagram } from 'lucide-react'
import logoColoridaSt from '../assets/images/logo-colorida-st.png'
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts'

const SITE_URL = 'https://padresparapalmas.org.br'
const PAGE_PATH = '/linktree'
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`
const PAGE_TITLE = `Links Oficiais | ${SITE_TITLE}`
const PAGE_DESCRIPTION =
  'Acesse os links oficiais do Projeto Padres para a Igreja de Palmas: Instagram, arquivos e site oficial.'

const links = [
  {
    text: 'Acesse nosso Instagram',
    href: 'https://instagram.com/padresparapalmas',
    icon: Instagram,
    isExternal: true
  },
  {
    text: 'Acesse nossos arquivos',
    href: 'https://drive.google.com/drive/folders/1QvgaL7HDwq-uUq8H3BmJjeSxKxqV1SZJ',
    icon: HardDrive,
    isExternal: true
  },
  {
    text: 'Site Oficial do Projeto',
    href: '/',
    icon: Globe,
    isExternal: false
  }
]

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Início',
      item: SITE_URL
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Links Oficiais',
      item: PAGE_URL
    }
  ]
}

export const Route = createFileRoute('/linktree')({
  head: () => ({
    meta: [
      {
        title: PAGE_TITLE
      },
      {
        name: 'description',
        content: PAGE_DESCRIPTION
      },
      {
        name: 'robots',
        content: 'index,follow'
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
        property: 'og:title',
        content: PAGE_TITLE
      },
      {
        property: 'og:description',
        content: PAGE_DESCRIPTION
      },
      {
        property: 'og:url',
        content: PAGE_URL
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        name: 'twitter:title',
        content: PAGE_TITLE
      },
      {
        name: 'twitter:description',
        content: PAGE_DESCRIPTION
      }
    ],
    links: [
      {
        rel: 'canonical',
        href: PAGE_URL
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap'
      }
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(breadcrumbJsonLd)
      }
    ]
  }),
  component: LinkTree
})

export function LinkTree() {
  return (
    <main
      data-slot="link-tree"
      className="m-0 flex min-h-screen items-center justify-center bg-[#9c5a41] p-4 font-['Poppins',sans-serif]">
      <div className="w-full max-w-120">
        <section className="px-6 py-10 text-center" aria-label="Links oficiais do projeto">
          <div className="mb-10">
            <div className="mx-auto mb-6 flex h-30 w-30 items-center justify-center overflow-hidden rounded-full bg-white p-2 shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
              <img
                src={logoColoridaSt}
                alt="Logo Projeto Padres para a Igreja de Palmas"
                className="h-full w-full object-contain"
                loading="eager"
                decoding="async"
              />
            </div>
            <h1 className="mb-3 text-[1.4rem] leading-tight font-bold tracking-wide text-[#ffcc29]">
              Projeto Padres para a Igreja de Palmas
            </h1>
            <p className="mx-auto max-w-95 text-[0.9rem] leading-relaxed font-normal text-white opacity-95">
              {SITE_DESCRIPTION}
            </p>
          </div>

          <nav className="mb-10 flex flex-col gap-4" aria-label="Lista de links">
            {links.map((link, index) => {
              const Icon = link.icon
              const isExternal = link.isExternal

              const linkClass =
                'group flex items-center justify-center gap-3 w-full p-4 bg-white border-none rounded-[50px] text-[#27adb8] text-base font-medium no-underline cursor-pointer transition-all duration-250 text-center shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#e5f6f7] hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(39,173,184,0.2)] active:translate-y-0'

              if (isExternal) {
                return (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                    aria-label={`${link.text} (abre em nova aba)`}>
                    <Icon className="size-5 transition-transform duration-300 group-hover:scale-110" />
                    <span>{link.text}</span>
                  </a>
                )
              }

              return (
                <Link key={index} to={link.href} className={linkClass} aria-label={link.text}>
                  <Icon className="size-5 transition-transform duration-300 group-hover:scale-110" />
                  <span>{link.text}</span>
                </Link>
              )
            })}
          </nav>
        </section>
      </div>
    </main>
  )
}
