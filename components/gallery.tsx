"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
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
  const [currentImage, setCurrentImage] = useState(0)

  const goToPrevious = useCallback(() => {
    setCurrentImage((prevImage) => (prevImage - 1 + galleryImages.length) % galleryImages.length)
  }, [])

  const goToNext = useCallback(() => {
    setCurrentImage((prevImage) => (prevImage + 1) % galleryImages.length)
  }, [])

  // Desplazamiento automático
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext()
    }, 5000) // Cambia de imagen cada 5 segundos

    return () => clearInterval(interval)
  }, [goToNext])

  return (
    <div className="w-3/4 mx-auto">
      <div className="relative w-full h-[70vh] overflow-hidden">
        {/* Imagen actual */}
        <div className="relative w-full h-full">
          <Image
            src={galleryImages[currentImage].src}
            alt={galleryImages[currentImage].alt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30 flex items-end">
            <div className="w-full p-8 text-white">
              <h3 className="text-2xl font-bold">{galleryImages[currentImage].title}</h3>
            </div>
          </div>
        </div>

        {/* Botones de navegación */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
          onClick={goToPrevious}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
          onClick={goToNext}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>

        {/* Indicadores de posición */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImage ? "bg-white w-4" : "bg-white/50"
              }`}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}