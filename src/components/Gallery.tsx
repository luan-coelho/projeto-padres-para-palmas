import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../lib/utils'

// Define the shape of the image object passed from Astro
export interface GalleryItem {
  image: {
    src: string
    width: number
    height: number
    format: string
  }
  alt: string
  description: string
  location: string
}

interface GalleryProps {
  items: GalleryItem[]
}

export function Gallery({ items }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  // Handle initial open
  const openGallery = (index: number) => {
    setSelectedIndex(index)
    setIsOpen(true)
  }

  // Navigation functions
  const nextImage = useCallback(() => {
    setSelectedIndex(prev => (prev + 1) % items.length)
  }, [items.length])

  const prevImage = useCallback(() => {
    setSelectedIndex(prev => (prev - 1 + items.length) % items.length)
  }, [items.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === 'ArrowRight') {
        nextImage()
      } else if (e.key === 'ArrowLeft') {
        prevImage()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, nextImage, prevImage])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const currentItem = items[selectedIndex]

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => openGallery(index)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                openGallery(index)
              }
            }}
            role="button"
            tabIndex={0}
            className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl bg-gray-100 shadow-sm transition-all duration-300 hover:shadow-md">
            <img
              src={item.image.src}
              alt={item.alt}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <p className="truncate text-sm font-medium text-white">{item.alt}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Portal */}
      {isOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 sm:p-6">
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black/90 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Modal Content */}
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
            <div
              className="relative z-50 flex h-[95vh] w-full max-w-6xl animate-in flex-col overflow-hidden bg-background shadow-2xl duration-200 zoom-in-95 fade-in sm:h-[90vh] sm:rounded-2xl"
              onClick={e => e.stopPropagation()}>
              <div className="flex h-full flex-col overflow-y-auto sm:overflow-hidden">
                {/* Image Section */}
                <div className="group relative flex min-h-[35vh] flex-1 items-center justify-center overflow-hidden bg-black sm:min-h-0">
                  <img
                    src={currentItem.image.src}
                    alt={currentItem.alt}
                    className="h-auto max-h-full w-auto max-w-full object-contain p-4"
                  />

                  {/* Custom Close Button */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 z-50 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
                    aria-label="Fechar galeria">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6">
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>

                  {/* Navigation Arrows */}
                  <button
                    onClick={e => {
                      e.stopPropagation()
                      prevImage()
                    }}
                    className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 focus:ring-2 focus:ring-white focus:outline-none"
                    aria-label="Previous image">
                    <ChevronLeft className="h-8 w-8" />
                  </button>
                  <button
                    onClick={e => {
                      e.stopPropagation()
                      nextImage()
                    }}
                    className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 focus:ring-2 focus:ring-white focus:outline-none"
                    aria-label="Next image">
                    <ChevronRight className="h-8 w-8" />
                  </button>
                </div>

                {/* Details Section */}
                <div className="relative z-10 shrink-0 bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <div className="space-y-1 text-left">
                        <h2 className="text-xl font-medium text-grafite">{currentItem.alt}</h2>
                        <p className="line-clamp-none text-left text-sm leading-relaxed text-gray-600 sm:line-clamp-2">
                          {currentItem.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-3 border-t border-gray-100 pt-2 text-gray-500 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-4">
                      <div className="hidden rounded-full bg-gray-50 p-2 sm:block">
                        <svg
                          className="h-4 w-4"
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
                      <div>
                        <p className="text-[10px] font-semibold tracking-wide text-gray-400 uppercase">
                          Localização
                        </p>
                        <p className="text-xs font-medium text-gray-700">{currentItem.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Thumbnails Footer */}
                <div className="scrollbar-thin scrollbar-thumb-gray-700 flex h-20 min-h-[5rem] shrink-0 items-center justify-start gap-2 overflow-x-auto border-t border-gray-800 bg-gray-900 p-2 md:justify-center">
                  {items.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedIndex(index)}
                      className={cn(
                        'relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-md transition-all duration-300',
                        selectedIndex === index
                          ? 'scale-105 opacity-100 ring-2 ring-white'
                          : 'opacity-50 hover:scale-105 hover:opacity-100'
                      )}>
                      <img
                        src={item.image.src}
                        alt={`Thumbnail ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}
