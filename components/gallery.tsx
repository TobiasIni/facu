"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"

// Datos de ejemplo para la galería
const galleryImages = [
  {
    id: 1,
    src: "/show1.jpg",
    alt: "Show en Teatro Taburete",
    title: "Show en Teatro Taburete",
  },
  {
    id: 2,
    src: "/show2.jpg",
    alt: "Festival de Comedia 2023",
    title: "Festival de Comedia 2023",
  },
  {
    id: 3,
    src: "/show3.jpg",
    alt: "Gira Internacional",
    title: "Gira Internacional",
  },
  {
    id: 4,
    src: "/show4.jpg",
    alt: "Backstage",
    title: "Backstage",
  },
  {
    id: 5,
    src: "/show5.jpg",
    alt: "Entrevista TV",
    title: "Entrevista TV",
  },
  {
    id: 6,
    src: "/show6.jpg",
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

  const goToPrevious = useCallback(() => {
    if (currentImage !== null) {
      setCurrentImage((prevImage) => prevImage === null ? 0 : (prevImage - 1 + galleryImages.length) % galleryImages.length)
    }
  }, [currentImage])

  const goToNext = useCallback(() => {
    if (currentImage !== null) {
      setCurrentImage((prevImage) => prevImage === null ? 0 : (prevImage + 1) % galleryImages.length)
    }
  }, [currentImage])

  // Desplazamiento automático
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (currentImage !== null) {
      interval = setInterval(() => {
        goToNext()
      }, 3000); // Cambia de imagen cada 3 segundos (ajusta este valor si quieres)
    }
    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [currentImage, goToNext])

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