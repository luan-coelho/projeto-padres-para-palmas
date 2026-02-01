import { Link } from '@tanstack/react-router'
import { Instagram, Menu, X } from 'lucide-react'
import type { ComponentProps } from 'react'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import logoColorida from '../assets/images/logo-colorida.png'
import { NAV_LINKS, SOCIAL_LINKS } from '../consts'

export interface HeaderProps extends ComponentProps<'header'> {}

export function Header({ className, ...props }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  // Header background logic
  const headerClass = twMerge(
    'fixed top-0 right-0 left-0 z-50 transition-all duration-300',
    isScrolled ? 'bg-white shadow-md' : 'bg-transparent',
    className
  )

  // Navigation Links color logic
  const navLinkClass = twMerge(
    'nav-link font-medium transition-colors hover:text-amarelo',
    isScrolled ? 'text-grafite' : 'text-white'
  )

  // Mobile Menu Button color logic
  const mobileMenuBtnClass = twMerge(
    'relative z-50 p-2 transition-colors focus:outline-none md:hidden',
    isMenuOpen ? 'text-white' : isScrolled ? 'text-grafite' : 'text-white'
  )

  return (
    <header id="header" className={headerClass} {...props}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo (oculto no topo, aparece no scroll) */}
          <Link to="/" className="group relative z-50 flex flex-shrink-0 items-center gap-3">
            <img
              src={logoColorida}
              alt="Projeto Padres"
              className={twMerge(
                'h-12 w-auto transition-opacity duration-300',
                isScrolled ? 'opacity-100' : 'opacity-0'
              )}
              id="header-logo"
            />
            <div
              id="header-title"
              className={twMerge(
                'text-grafite origin-left leading-tight transition-opacity duration-300',
                isScrolled ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
              )}>
              <span className="font-display block text-xs font-light sm:text-sm">
                Projeto Padres para a
              </span>
              <span className="font-display block text-xs font-bold tracking-wider uppercase sm:text-sm">
                Igreja de Palmas
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 md:flex">
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href} className={navLinkClass}>
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-btn"
            className={mobileMenuBtnClass}
            aria-label="Abrir menu"
            onClick={toggleMenu}
            type="button">
            <div className="relative flex h-6 w-6 items-center justify-center">
              <Menu
                className={twMerge(
                  'absolute h-6 w-6 transform transition-all duration-300',
                  isMenuOpen ? 'scale-50 -rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
                )}
              />
              <X
                className={twMerge(
                  'absolute h-6 w-6 transform transition-all duration-300',
                  isMenuOpen ? 'scale-100 rotate-90 opacity-100' : 'scale-50 rotate-0 opacity-0'
                )}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        className={twMerge(
          'bg-grafite/95 fixed inset-0 z-40 flex flex-col items-center justify-center backdrop-blur-xl transition-transform duration-500 ease-in-out md:hidden',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}>
        <nav className="flex flex-col items-center space-y-8">
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className={twMerge(
                'nav-item-mobile font-display hover:text-amarelo transform text-3xl text-white transition-all duration-300',
                isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => setIsMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Divisor */}
        <div className="my-10 h-1 w-16 rounded-full bg-white/10"></div>

        {/* Social Links */}
        <div className="flex items-center space-x-8">
          {SOCIAL_LINKS.instagram && SOCIAL_LINKS.instagram !== '#' && (
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amarelo transform text-white/70 transition-colors hover:scale-110">
              <span className="sr-only">Instagram</span>
              <Instagram className="h-8 w-8" />
            </a>
          )}
        </div>
      </div>
    </header>
  )
}
