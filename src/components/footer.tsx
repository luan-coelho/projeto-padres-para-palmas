import { twMerge } from 'tailwind-merge'
import { Instagram } from 'lucide-react'
import { SOCIAL_LINKS, USEFUL_LINKS } from '../consts'
import logoBranca from '../assets/images/logo-branca.png'
import type { ComponentProps } from 'react'

export interface FooterProps extends ComponentProps<'footer'> {}

export function Footer({ className, ...props }: FooterProps) {
  const today = new Date()

  return (
    <footer
      data-slot="footer"
      className={twMerge('bg-grafite py-16 text-white', className)}
      {...props}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Logo e Frase */}
          <div className="text-center md:text-left">
            <img
              src={logoBranca}
              alt="Projeto Padres"
              className="mx-auto mb-4 h-16 w-auto md:mx-0"
            />
            <p className="text-white/80 italic">"Farei de ti pescador de homens" (Mt 4,19)</p>
          </div>

          {/* Links Úteis */}
          <div className="text-center">
            <h4 className="mb-4 text-lg font-semibold">Links Úteis</h4>
            <ul className="space-y-2">
              {USEFUL_LINKS.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amarelo text-white/70 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes Sociais */}
          <div className="text-center md:text-right">
            <h4 className="mb-4 text-lg font-semibold">Redes Sociais</h4>
            <div className="flex justify-center space-x-4 md:justify-end">
              {/* Instagram */}
              {SOCIAL_LINKS.instagram && SOCIAL_LINKS.instagram !== '#' && (
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:bg-azul flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors"
                  aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-white/50">
            © {today.getFullYear()} Projeto Padres para a Igreja de Palmas. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
