import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'
import heroBgDesktop from '../assets/images/barco-com-jesus-desktop.png'
import heroBgMobile from '../assets/images/barco-com-jesus-mobile-v6.png'
import logoBrancaSt from '../assets/images/logo-branca-st.png'
import type { VariantProps } from 'tailwind-variants'
import type { ComponentProps } from 'react'

export const heroVariants = tv({
  base: 'relative flex min-h-screen items-center justify-center'
})

export interface HeroProps extends ComponentProps<'section'>, VariantProps<typeof heroVariants> {
  title?: string
  subtitle?: string
  citation?: string
  buttonText?: string
  buttonLink?: string
  logoImage?: string
}

export function Hero({
  className,
  title = 'Projeto Padres para a',
  subtitle = 'Igreja de Palmas',
  citation = '"Farei de ti pescador de homens" (Mt 4,19)',
  buttonText = 'Conheça o Projeto',
  buttonLink = '#sobre',
  logoImage = logoBrancaSt,
  ...props
}: HeroProps) {
  return (
    <section data-slot="hero" className={twMerge(heroVariants(), className)} {...props}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBgDesktop}
          alt="Hero Background"
          className="hidden h-full w-full object-cover sm:block"
        />
        <img
          src={heroBgMobile}
          alt="Hero Background"
          className="block h-full w-full object-cover sm:hidden"
        />
        <div className="hero-overlay absolute inset-0"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center text-white">
        {/* Logo Grande no Hero */}
        <img
          src={logoImage}
          alt="Projeto Padres para a Igreja de Palmas"
          className="mx-auto mb-8 h-32 w-auto sm:h-40 lg:h-48"
        />

        <h1 className="mb-6 text-4xl leading-tight font-light sm:text-5xl lg:text-6xl">
          {title}
          <br />
          <span className="font-semibold">{subtitle}</span>
        </h1>
        <p className="mb-10 text-xl font-light text-white/90 italic sm:text-2xl">{citation}</p>
        <a
          href={buttonLink}
          className="bg-azul hover:bg-azul/90 inline-block transform rounded-full px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105">
          {buttonText}
        </a>
      </div>
    </section>
  )
}
