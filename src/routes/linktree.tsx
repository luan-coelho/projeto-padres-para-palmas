import { Link, createFileRoute } from '@tanstack/react-router'
import { Globe, HardDrive, Instagram } from 'lucide-react'
import logoColoridaSt from '../assets/images/logo-colorida-st.png'
import { SITE_TITLE } from '../consts'

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

export const Route = createFileRoute('/linktree')({
  head: () => ({
    meta: [
      {
        title: `Links | ${SITE_TITLE}`
      }
    ],
    links: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap'
      }
    ]
  }),
  component: LinkTree
})

export function LinkTree() {
  return (
    <div
      data-slot="link-tree"
      className="m-0 flex min-h-screen items-center justify-center bg-[#9c5a41] p-4 font-['Poppins',sans-serif]">
      <div className="w-full max-w-[480px]">
        <div className="px-6 py-10 text-center">
          {/* Profile Section */}
          <div className="mb-10">
            <div className="mx-auto mb-6 flex h-[120px] w-[120px] items-center justify-center overflow-hidden rounded-full bg-white p-2 shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
              <img
                src={logoColoridaSt}
                alt="Logo Projeto Padres"
                className="h-full w-full object-contain"
              />
            </div>
            <h1 className="mb-3 text-[1.4rem] leading-tight font-bold tracking-wide text-[#ffcc29]">
              Projeto Padres para a Igreja de Palmas
            </h1>
            <p className="mx-auto max-w-[380px] text-[0.9rem] leading-relaxed font-normal text-white opacity-95">
              O projeto Padres para a Igreja de Palmas é uma iniciativa vocacional que tem como
              objetivo promover a cultura vocacional na Arquidiocese de Palmas.
            </p>
          </div>

          {/* Links List */}
          <div className="mb-10 flex flex-col gap-4">
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
                    className={linkClass}>
                    <Icon className="size-5 transition-transform duration-300 group-hover:scale-110" />
                    <span>{link.text}</span>
                  </a>
                )
              }

              return (
                <Link key={index} to={link.href} className={linkClass}>
                  <Icon className="size-5 transition-transform duration-300 group-hover:scale-110" />
                  <span>{link.text}</span>
                </Link>
              )
            })}
          </div>

          {/* Footer Social (Optional - matched Astro content which didn't strictly have footer buttons but had styles for them) */}
          <div className="flex justify-center gap-5">
            {/* Add social icons here if needed, based on styles present in original file */}
          </div>
        </div>
      </div>
    </div>
  )
}
