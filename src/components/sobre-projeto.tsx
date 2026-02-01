import { twMerge } from 'tailwind-merge'

import logoColorida from '../assets/images/logo-colorida-st.png'
import foto1 from '../assets/images/galeria/foto1.jpeg'
import foto2 from '../assets/images/galeria/foto2.jpeg'
import foto3 from '../assets/images/galeria/foto3.jpeg'
import foto4 from '../assets/images/galeria/foto4.jpeg'
import foto5 from '../assets/images/galeria/foto5.jpeg'
import foto6 from '../assets/images/galeria/foto6.jpeg'
import { Gallery } from './gallery'
import type { ComponentProps } from 'react'

export interface SobreProjetoProps extends ComponentProps<'section'> {
  sectionLabel?: string
  title?: string
  titleHighlight?: string
  paragraphs?: Array<string>
  buttonText?: string
  buttonLink?: string
  image?: string
}

const galleryItems = [
  {
    image: foto1,
    alt: 'Quilombo Rio Preto - Comunidade Imaculada Conceição',
    description: 'Quilombo Rio Preto - Comunidade Imaculada Conceição',
    location: 'Lagoa do Tocantins'
  },
  {
    image: foto2,
    alt: 'Quilombo Rio Preto - Comunidade Imaculada Conceição',
    description: 'Quilombo Rio Preto - Comunidade Imaculada Conceição',
    location: 'Lagoa do Tocantins'
  },
  {
    image: foto3,
    alt: 'Formação Humana',
    description:
      'Oportunidades de aprendizado e crescimento pessoal, preparando o terreno para uma vocação sólida.',
    location: 'Auditório Paroquial'
  },
  {
    image: foto4,
    alt: 'Serviço ao Próximo',
    description:
      'Ações concretas de caridade e missão, onde o chamado se manifesta no amor aos irmãos.',
    location: 'Comunidade local'
  },
  {
    image: foto5,
    alt: 'Vida Sacramental',
    description: 'A Eucaristia como fonte e ápice da vida cristã e do chamado sacerdotal.',
    location: 'Catedral Divino Espírito Santo'
  },
  {
    image: foto6,
    alt: 'Acompanhamento',
    description:
      'Orientação espiritual e vocacional, luzes para os passos de quem deseja seguir a Cristo.',
    location: 'Jardins do Seminário'
  }
]

export function SobreProjeto({
  className,
  sectionLabel = 'Sobre o Projeto',
  title = 'Um movimento impulsionado pelo',
  titleHighlight = 'desejo de cultivar vocações',
  paragraphs = [
    'Mais que uma ação pastoral ou um programa, o Projeto Padres para a Igreja de Palmas se configura como um movimento em desenvolvimento, impulsionado pelo desejo de cultivar novas vocações para o sacerdócio.',
    'Nascido do coração da Arquidiocese de Palmas, este projeto busca despertar nos jovens o chamado ao ministério presbiteral, fortalecendo a cultura vocacional em nossa Igreja local.'
  ],
  buttonText = 'Saiba mais',
  buttonLink = '#pilares',
  image = logoColorida,
  ...props
}: SobreProjetoProps) {
  return (
    <section
      id="sobre"
      data-slot="sobre-projeto"
      className={twMerge('bg-bg-azul relative overflow-hidden py-20 lg:py-28', className)}
      {...props}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <div className="relative flex items-center justify-center">
            <img
              src={image}
              alt="Logo Projeto Padres para Palmas"
              className="h-auto w-3/4 max-w-md object-contain sm:w-full"
            />
          </div>

          {/* Content */}
          <div>
            <span className="text-verde mb-4 inline-block text-sm font-semibold tracking-wider uppercase">
              {sectionLabel}
            </span>
            <h2 className="text-grafite mb-6 text-3xl leading-tight font-light sm:text-4xl">
              {title} <span className="font-semibold">{titleHighlight}</span>
            </h2>
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-grafite/80 mb-6 text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}
            <a
              href={buttonLink}
              className="bg-azul hover:bg-azul/90 inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white transition-all duration-300">
              {buttonText}
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="text-verde mb-4 inline-block text-sm font-semibold tracking-wider uppercase">
            Galeria
          </span>
          <h3 className="text-grafite text-3xl font-light">
            Registros da <span className="font-semibold">Experiência Vocacional Missionária</span>
          </h3>
        </div>

        <Gallery items={galleryItems} />
      </div>
    </section>
  )
}
