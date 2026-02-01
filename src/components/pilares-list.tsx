import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from '../lib/utils'
import type { ComponentProps } from 'react'

interface Pilar {
  icon: string
  color: 'azul' | 'amarelo' | 'verde'
  title: string
  description: string
  fullTitle: string
  fullContent: string
}

const pilaresData: Array<Pilar> = [
  {
    icon: 'bible',
    color: 'azul',
    title: 'Fundamentação Bíblica',
    description: 'Alicerçados na Palavra de Deus e na tradição da Igreja',
    fullTitle: 'Pilar da fundamentação bíblica do chamado Divino',
    fullContent:
      'Para que o trabalho vocacional tenha êxito em nossas comunidades eclesiais é preciso visitarmos as fontes da revelação divina e entendermos “como Deus chama”, qual o seu projeto para o ser humano e quais as mediações Ele utiliza para atrai-los.'
  },
  {
    icon: 'youth',
    color: 'amarelo',
    title: 'Juventudes',
    description: 'Protagonismo juvenil na vivência da fé e do chamado',
    fullTitle: 'Pilar da realidade das juventudes em nossa Arquidiocese de Palmas',
    fullContent:
      'As juventudes da Arquidiocese de Palmas são um campo fértil para o trabalho vocacional... com escuta, discernimento e amor, a Igreja pode continuar sendo sinal de esperança e luz na vida de tantos jovens que desejam doar a sua vida completamente em favor do Reino de Deus.'
  },
  {
    icon: 'person',
    color: 'verde',
    title: 'Sujeitos do Chamado',
    description: 'Acompanhamento personalizado aos vocacionados',
    fullTitle: 'Pilar dos sujeitos do chamado vocacional',
    fullContent:
      'O chamado de Deus é sempre encarnando numa realidade concreta, a qual comporta sempre seus desafios. A Igreja e a família são normalmente o contexto vital onde Deus encontra espaço para provocar os que ele quer para si. Partindo dessa convicção e apoiados na revelação, elencamos quatro sujeitos do chamado vocacional: Deus, o ser humano, a família e a Igreja.'
  },
  {
    icon: 'prayer',
    color: 'azul',
    title: 'Oração',
    description: 'Fundamento espiritual e sustento das vocações',
    fullTitle: 'Pilar da oração',
    fullContent:
      'O Pilar da Oração é fundamental para a cultura vocacional, pois toda vocação nasce no coração de Deus e precisa ser sustentada pela oração da comunidade. Rezar pelas vocações é um gesto coletivo de fé, capaz de transformar os corações e o modo de ser Igreja.'
  },
  {
    icon: 'building',
    color: 'amarelo',
    title: 'PV/SAV',
    description: 'Pastoral Vocacional e Serviço de Animação Vocacional',
    fullTitle: 'Pilar da Pastoral Vocacional/Serviço de Animação Vocacional (PV/SAV)',
    fullContent:
      'A PV/SAV é o serviço organizado da Igreja que promove e anima a dimensão vocacional e ministerial nas comunidades eclesiais. É um trabalho pastoral da Igreja que visa despertar os cristãos para a vocação humana, cristã e eclesial, discernir os sinais indicadores do chamado de Deus, cultivar os germes de vocação e acompanhar o processo de ação vocacional consciente e livre.'
  },
  {
    icon: 'home',
    color: 'verde',
    title: 'Comunidade Paroquial',
    description: 'Base de acolhimento e formação dos chamados',
    fullTitle: 'Pilar da comunidade paroquial',
    fullContent:
      'A comunidade paroquial é, sem sombra de dúvidas, espaço de santificação; é terreno abundante no qual se deve lançar a semente da vocação à fé, à santidade, à uma vocação específica. Por isso, os padres não devem medir esforços para ajudar os paroquianos na descoberta, na resposta generosa e vivência alegre e fiel do chamado divino em suas vidas, pois, a descoberta e vivência da vocação é o caminho da felicidade, que por sua vez, conduz à união com a Trindade Santa.'
  },
  {
    icon: 'social',
    color: 'azul',
    title: 'Redes Sociais',
    description: 'Evangelização digital e alcance missionário',
    fullTitle: 'Pilar das redes sociais',
    fullContent:
      'A comunicação não é apenas um suporte para o anúncio vocacional, mas parte essencial da própria dinâmica evangelizadora. No contexto da cultura vocacional, ela deve ser compreendida como rede de sentido, canal de escuta, instrumento de mobilização, e espaço de testemunho.'
  }
]

const colorClasses = {
  azul: { bg: 'bg-azul/10', bgHover: 'group-hover:bg-azul', text: 'text-azul' },
  amarelo: { bg: 'bg-amarelo/10', bgHover: 'group-hover:bg-amarelo', text: 'text-amarelo' },
  verde: { bg: 'bg-verde/10', bgHover: 'group-hover:bg-verde', text: 'text-verde' }
}

const icons: Record<string, React.FC<ComponentProps<'svg'>>> = {
  bible: ({ className, ...props }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  ),
  youth: ({ className, ...props }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  ),
  person: ({ className, ...props }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  ),
  prayer: ({ className, ...props }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
      />
    </svg>
  ),
  building: ({ className, ...props }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  ),
  home: ({ className, ...props }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  ),
  social: ({ className, ...props }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
      />
    </svg>
  )
}

export function PilaresList() {
  const [selectedPilar, setSelectedPilar] = useState<Pilar | null>(null)

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedPilar) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedPilar])

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {pilaresData.map((pilar, index) => {
          const Icon = icons[pilar.icon]
          const classes = colorClasses[pilar.color]

          return (
            <div
              key={index}
              onClick={() => setSelectedPilar(pilar)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedPilar(pilar)
                }
              }}
              role="button"
              tabIndex={0}
              className="group cursor-pointer rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl">
              <div
                className={cn(
                  'mb-4 flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110',
                  classes.bg,
                  classes.bgHover
                )}>
                {Icon && (
                  <Icon
                    className={cn('h-7 w-7 transition-colors group-hover:text-white', classes.text)}
                  />
                )}
              </div>
              <h3 className="text-grafite mb-2 text-xl font-semibold">{pilar.title}</h3>
              <p className="text-grafite/70 text-sm">{pilar.description}</p>
              <span className="text-azul mt-4 inline-block text-xs font-semibold opacity-0 transition-opacity group-hover:opacity-100">
                Ver mais
              </span>
            </div>
          )
        })}
      </div>

      {selectedPilar &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
              onClick={() => setSelectedPilar(null)}
              aria-hidden="true"
            />
            <div className="animate-in zoom-in-95 fade-in relative z-50 w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl duration-200">
              <div className="p-6 sm:p-8">
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        'flex h-12 w-12 items-center justify-center rounded-xl',
                        colorClasses[selectedPilar.color].bg,
                        colorClasses[selectedPilar.color].text
                      )}>
                      {(() => {
                        const Icon = icons[selectedPilar.icon]
                        return Icon ? <Icon className="h-6 w-6" /> : null
                      })()}
                    </div>
                    <h3 className="text-grafite pr-8 text-xl font-semibold sm:text-2xl">
                      {selectedPilar.fullTitle}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedPilar(null)}
                    className="absolute top-4 right-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="prose prose-blue max-w-none">
                  <p className="text-lg leading-relaxed whitespace-pre-wrap text-gray-600">
                    {selectedPilar.fullContent}
                  </p>
                </div>
              </div>
              <div className="flex justify-end bg-gray-50 px-6 py-4">
                <button
                  onClick={() => setSelectedPilar(null)}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50">
                  Fechar
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}
