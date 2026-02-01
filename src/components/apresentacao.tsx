import { twMerge } from 'tailwind-merge'
import type { ComponentProps } from 'react'

export interface ApresentacaoProps extends ComponentProps<'section'> {
  title?: string
  titleHighlight?: string
  description?: string
}

export function Apresentacao({
  className,
  title = 'Nascemos para fortalecer a',
  titleHighlight = 'cultura vocacional',
  description = 'O Projeto Padres para a Igreja de Palmas, da Arquidiocese de Palmas-TO, será lançado intensamente a partir do mês de fevereiro, com abertura programada para o dia <strong>20 de fevereiro de 2026</strong>, na Paróquia São José às 19h30, inserido no contexto dos 30 anos da Arquidiocese de Palmas.',
  ...props
}: ApresentacaoProps) {
  return (
    <section
      id="apresentacao"
      data-slot="apresentacao"
      className={twMerge('bg-white py-20 lg:py-28', className)}
      {...props}>
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-grafite mb-8 text-3xl leading-tight font-light sm:text-4xl lg:text-5xl">
          {title}
          <br />
          <span className="text-azul font-semibold">{titleHighlight}</span>
        </h2>
        <p
          className="text-grafite/80 mx-auto max-w-3xl text-lg leading-relaxed sm:text-xl"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </section>
  )
}
