import { useState, useEffect } from 'react'
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
    const nextImage = () => {
        setSelectedIndex(prev => (prev + 1) % items.length)
    }

    const prevImage = () => {
        setSelectedIndex(prev => (prev - 1 + items.length) % items.length)
    }

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
    }, [isOpen])

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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {items.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => openGallery(index)}
                        className="cursor-pointer overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group relative aspect-[4/3] bg-gray-100">
                        <img
                            src={item.image.src}
                            alt={item.alt}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                            <p className="text-white text-sm font-medium truncate">{item.alt}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox Portal */}
            {isOpen &&
                createPortal(
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300">
                        {/* Overlay */}
                        <div
                            className="fixed inset-0 bg-black/90 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                            aria-hidden="true"
                        />

                        {/* Modal Content */}
                        <div
                            className="relative w-full max-w-6xl h-[95vh] sm:h-[90vh] bg-background shadow-2xl overflow-hidden flex flex-col sm:rounded-2xl z-50 animate-in fade-in zoom-in-95 duration-200"
                            onClick={e => e.stopPropagation()}>
                            <div className="flex flex-col h-full overflow-y-auto sm:overflow-hidden">
                                {/* Image Section */}
                                <div className="flex-1 relative bg-black flex items-center justify-center min-h-[35vh] sm:min-h-0 overflow-hidden group">
                                    <img
                                        src={currentItem.image.src}
                                        alt={currentItem.alt}
                                        className="max-w-full max-h-full w-auto h-auto object-contain p-4"
                                    />

                                    {/* Custom Close Button */}
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
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
                                            className="w-6 h-6">
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
                                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                                        aria-label="Previous image">
                                        <ChevronLeft className="w-8 h-8" />
                                    </button>
                                    <button
                                        onClick={e => {
                                            e.stopPropagation()
                                            nextImage()
                                        }}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                                        aria-label="Next image">
                                        <ChevronRight className="w-8 h-8" />
                                    </button>
                                </div>

                                {/* Details Section */}
                                <div className="bg-white p-4 shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-10 relative">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="text-left space-y-1">
                                                <h2 className="text-xl font-medium text-grafite">
                                                    {currentItem.alt}
                                                </h2>
                                                <p className="text-sm text-gray-600 leading-relaxed text-left line-clamp-none sm:line-clamp-2">
                                                    {currentItem.description}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 text-gray-500 shrink-0 border-t sm:border-t-0 sm:border-l sm:pl-4 pt-2 sm:pt-0 border-gray-100">
                                            <div className="p-2 bg-gray-50 rounded-full hidden sm:block">
                                                <svg
                                                    className="w-4 h-4"
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
                                                <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">
                                                    Localização
                                                </p>
                                                <p className="text-xs font-medium text-gray-700">
                                                    {currentItem.location}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Thumbnails Footer */}
                                <div className="h-20 min-h-[5rem] bg-gray-900 border-t border-gray-800 p-2 flex items-center justify-start md:justify-center gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 shrink-0">
                                    {items.map((item, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedIndex(index)}
                                            className={cn(
                                                'relative flex-shrink-0 h-14 w-20 rounded-md overflow-hidden transition-all duration-300',
                                                selectedIndex === index
                                                    ? 'ring-2 ring-white opacity-100 scale-105'
                                                    : 'opacity-50 hover:opacity-100 hover:scale-105'
                                            )}>
                                            <img
                                                src={item.image.src}
                                                alt={`Thumbnail ${index + 1}`}
                                                className="w-full h-full object-cover"
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
