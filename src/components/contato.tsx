import { twMerge } from 'tailwind-merge'
import { CONTACT_INFO } from '../consts'
import type { ComponentProps } from 'react'

export interface ContatoProps extends ComponentProps<'section'> {
  sectionLabel?: string
  title?: string
  titleHighlight?: string
}

export function Contato({
  className,
  sectionLabel = 'Entre em contato',
  title = 'Onde',
  titleHighlight = 'Estamos',
  ...props
}: ContatoProps) {
  return (
    <section
      id="contato"
      data-slot="contato"
      className={twMerge('relative bg-white py-20 lg:py-28', className)}
      {...props}>
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <span className="text-azul mb-4 inline-block text-sm font-semibold tracking-wider uppercase">
          {sectionLabel}
        </span>
        <h2 className="text-grafite mb-12 text-3xl font-light sm:text-4xl lg:text-5xl">
          {title} <span className="font-semibold">{titleHighlight}</span>
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Endereço */}
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <div className="bg-verde/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
              <svg
                className="text-verde h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <h3 className="text-grafite mb-3 text-xl font-semibold">Endereço</h3>
            <p className="text-grafite/70">
              {CONTACT_INFO.address}
              <br />
              {CONTACT_INFO.city}
            </p>
          </div>

          {/* E-mail */}
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <div className="bg-azul/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
              <svg
                className="text-azul h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 className="text-grafite mb-3 text-xl font-semibold">E-mail</h3>
            <a href={`mailto:${CONTACT_INFO.email}`} className="text-azul hover:underline">
              {CONTACT_INFO.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
