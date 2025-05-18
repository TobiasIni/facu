"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"

// Datos de ejemplo para la galería
const galleryImages = [
  {
    id: 1,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Show en Teatro Nacional",
    title: "Show en Teatro Nacional",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Festival de Comedia 2023",
    title: "Festival de Comedia 2023",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Gira Internacional",
    title: "Gira Internacional",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Backstage",
    title: "Backstage",
  },
  {
    id: 5,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Entrevista TV",
    title: "Entrevista TV",
  },
  {
    id: 6,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Show Privado",
    title: "Show Privado",
  },
]

export default function Gallery() {
  const [currentImage, setCurrentImage] = useState<number | null>(null)

  const openLightbox = (index: number) => {
    setCurrentImage(index)
  }

  const closeLightbox = () => {
    setCurrentImage(null)
  }

  const goToPrevious = () => {
    if (currentImage !== null) {
      setCurrentImage((currentImage - 1 + galleryImages.length) % galleryImages.length)
    }
  }

  const goToNext = () => {
    if (currentImage !== null) {
      setCurrentImage((currentImage + 1) % galleryImages.length)
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {galleryImages.map((image, index) => (
          <div
            key={image.id}
            className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
              <div className="p-4 text-white">
                <h3 className="font-medium">{image.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {currentImage !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-white" onClick={closeLightbox}>
            <X className="h-6 w-6" />
          </Button>

          <Button variant="ghost" size="icon" className="absolute left-4 text-white" onClick={goToPrevious}>
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <div className="relative h-[80vh] w-[80vw]">
            <Image
              src={galleryImages[currentImage].src || "/placeholder.svg"}
              alt={galleryImages[currentImage].alt}
              fill
              className="object-contain"
            />
          </div>

          <Button variant="ghost" size="icon" className="absolute right-4 text-white" onClick={goToNext}>
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>
      )}
    </div>
  )
}
