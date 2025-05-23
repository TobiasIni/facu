"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react" // Se agrega ImageIcon
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion" // Importa AnimatePresence

// Datos de ejemplo para la galería
const galleryImages = [
  {
    id: 1,
    src: "/show1.jpg",
    alt: "Show en Teatro Taburete",
    title: "Mi primer show",
    description: "Una velada inolvidable llena de comedia y carcajadas."
  },
  {
    id: 2,
    src: "/show2.jpg",
    alt: "Show en Teatro Taburete",
    title: "Mi segundo show",
    description: "Participación estelar en el evento más grande del año."
  },
  {
    id: 3,
    src: "/show3.jpg",
    alt: "Gira Internacional chupando pijas",
    title: "Gira Internacional: Llevando la Comedia al Mundo",
    description: "Momentos capturados de nuestra emocionante gira por Europa."
  },
  {
    id: 4,
    src: "/show4.jpg",
    alt: "Backstage",
    title: "Detrás de Escena: Un Vistazo al Backstage chupandole la pija a el dueño del teatro",
    description: "Preparativos y risas antes de salir al escenario."
  },
  {
    id: 5,
    src: "/show5.jpg",
    alt: "Entrevista TV",
    title: "Entrevista en Canal Nacional chupandole la pija al del canal",
    description: "Compartiendo anécdotas y próximos proyectos en vivo."
  },
  {
    id: 6,
    src: "/show6.jpg",
    alt: "Show Privado",
    title: "Exclusivo: Show Privado para Evento Especial chupandole la pija al dueño del evento",
    description: "Un ambiente íntimo y personalizado con humor de primera."
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

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentImage((prev) => {
      const newIndex = (prev + newDirection + galleryImages.length) % galleryImages.length;
      return newIndex;
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="container mx-auto py-16 px-4"
    >
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-700 drop-shadow-lg flex items-center justify-center">
        <ImageIcon className="h-10 w-10 md:h-12 md:w-12 mr-4 text-pink-500" /> Mis Shows
      </h2>
      <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
        Haciendo lo que me gusta, chupando pijas y haciendo shows.
      </p>

      <div className="relative w-full max-w-5xl mx-auto h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden rounded-xl shadow-2xl border-4 border-indigo-400/30">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentImage} // Key para que AnimatePresence detecte el cambio de imagen
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={galleryImages[currentImage].src}
              alt={galleryImages[currentImage].alt}
              fill
              className="object-cover object-center"
              priority // Para la primera imagen, optimizar la carga
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Mejora la optimización de la imagen
            />
            {/* Overlay con información y gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-8 text-white">
              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-3xl md:text-4xl font-extrabold mb-2 drop-shadow-lg"
              >
                {galleryImages[currentImage].title}
              </motion.h3>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-lg md:text-xl text-white/90 drop-shadow-md"
              >
                {galleryImages[currentImage].description}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Botones de navegación con nuevo estilo */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/30 transition-all duration-300 rounded-full w-12 h-12 flex items-center justify-center backdrop-blur-sm shadow-lg z-10"
          onClick={() => paginate(-1)}
          aria-label="Anterior imagen"
        >
          <ChevronLeft className="h-7 w-7" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/30 transition-all duration-300 rounded-full w-12 h-12 flex items-center justify-center backdrop-blur-sm shadow-lg z-10"
          onClick={() => paginate(1)}
          aria-label="Siguiente imagen"
        >
          <ChevronRight className="h-7 w-7" />
        </Button>

        {/* Indicadores de posición mejorados */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {galleryImages.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImage ? "bg-white w-6" : "bg-white/50 hover:bg-white/70"
              } shadow-sm`}
              onClick={() => setCurrentImage(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Ir a la imagen ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.section>
  )
}