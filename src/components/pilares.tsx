import { twMerge } from 'tailwind-merge'
import { PilaresList } from './pilares-list'
import type { ComponentProps } from 'react'

export interface PilaresProps extends ComponentProps<'section'> {
  sectionLabel?: string
  title?: string
  titleHighlight?: string
}

export function Pilares({
  className,
  sectionLabel = 'Fundamentos',
  title = 'Pilares do',
  titleHighlight = 'Projeto',
  ...props
}: PilaresProps) {
  return (
    <section
      id="pilares"
      data-slot="pilares"
      className={twMerge('bg-bg-azul py-20 lg:py-28', className)}
      {...props}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="text-azul mb-4 inline-block text-sm font-semibold tracking-wider uppercase">
            {sectionLabel}
          </span>
          <h2 className="text-grafite text-3xl font-light sm:text-4xl lg:text-5xl">
            {title} <span className="font-semibold">{titleHighlight}</span>
          </h2>
        </div>

        <PilaresList />
      </div>
    </section>
  )
}
