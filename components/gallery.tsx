"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Image as ImageIcon, Star, Zap, Mic, Camera, Sparkles } from "lucide-react" // Íconos para comedy club
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion" // Importa AnimatePresence

// Los momentos más épicos del comedy show 🎭
const galleryImages = [
  {
    id: 1,
    src: "/show1.jpg",
    alt: "Destruyendo el Teatro Taburete",
    title: "TEATRO TABURETE",
    description: "Donde las risas no tienen límites 🎪"
  },
  {
    id: 2,
    src: "/show2.jpg",
    alt: "Show épico en Teatro Taburete",
    title: "NOCHE DE LOCURA",
    description: "El público no podía parar de reír 😂"
  },
  {
    id: 3,
    src: "/show3.jpg",
    alt: "Gira Internacional épica",
    title: "GIRA INTERNACIONAL",
    description: "Conquistando escenarios mundiales 🌍"
  },
  {
    id: 4,
    src: "/show4.jpg",
    alt: "Detrás de escena",
    title: "BACKSTAGE SECRETS",
    description: "La magia antes del show ✨"
  },
  {
    id: 5,
    src: "/show5.jpg",
    alt: "Entrevista televisiva",
    title: "EN LA TELE",
    description: "Haciendo reír hasta en las entrevistas 📺"
  },
  {
    id: 6,
    src: "/show6.jpg",
    alt: "Show exclusivo",
    title: "SHOW PRIVADO VIP",
    description: "Para los que saben de buen humor 🎯"
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
      className="container mx-auto py-16 px-4 relative"
    >
      {/* Efectos de luces de comedy club */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/8 w-48 h-48 bg-red-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/8 w-40 h-40 bg-yellow-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>
      
      {/* Decoraciones flotantes */}
      <motion.div
        className="absolute top-8 right-8 text-red-500/20"
        animate={{ 
          rotate: [0, 15, -15, 0],
          y: [0, -8, 0] 
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Camera className="w-14 h-14" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-16 left-8 text-yellow-400/20"
        animate={{ 
          rotate: [0, -10, 10, 0],
          x: [0, 3, -3, 0] 
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }}
      >
        <Sparkles className="w-10 h-10" />
      </motion.div>

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-300 to-red-400 leading-tight mb-6 drop-shadow-2xl">
            <Star className="inline-block mr-4 h-12 w-12 md:h-16 md:w-16 text-yellow-400 animate-spin" />
            Fotos de mis shows
          </h2>
        </motion.div>

        {/* Contenedor principal de la galería */}
        <div className="relative">
          <div className="relative w-full max-w-5xl mx-auto h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden rounded-2xl shadow-2xl shadow-red-500/20 border-4 border-red-500/40 hover:border-yellow-400/60 transition-all duration-500 bg-gradient-to-br from-slate-900 via-black to-slate-900">
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
            {/* Overlay dramático con efectos de comedy club */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-red-900/20 to-transparent flex flex-col justify-end p-8 text-white">
              {/* Efecto de spotlight sutil */}
              <div className="absolute inset-0 bg-gradient-radial from-yellow-400/10 via-transparent to-transparent opacity-60"></div>
              
              <motion.h3
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
                className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-400 mb-3 drop-shadow-2xl relative z-10"
              >
                {galleryImages[currentImage].title}
              </motion.h3>
              
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-lg md:text-xl text-white/95 drop-shadow-lg font-bold relative z-10 italic"
              >
                {galleryImages[currentImage].description}
              </motion.p>
              
              {/* Badge decorativo */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                className="mt-4 relative z-10"
              >
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Botones de navegación sutiles */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
        </motion.div>

        {/* Indicadores de posición estilo comedy club */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-20">
          {galleryImages.map((_, index) => (
            <motion.button
              key={index}
              className={`relative rounded-full transition-all duration-500 shadow-lg ${
                index === currentImage 
                  ? "w-8 h-4 bg-gradient-to-r from-red-500 to-yellow-400 border-2 border-yellow-300" 
                  : "w-4 h-4 bg-gradient-to-r from-red-600/60 to-red-700/60 hover:from-red-500/80 hover:to-yellow-500/80 border-2 border-red-400/50 hover:border-yellow-400/70"
              }`}
              onClick={() => setCurrentImage(index)}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.8 }}
              aria-label={`Ir a la imagen ${index + 1}`}
            >
              {/* Efecto de pulso para el indicador activo */}
              {index === currentImage && (
                <motion.div
                  className="absolute inset-0 bg-yellow-400/40 rounded-full animate-ping"
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              
              {/* Efecto de brillo al hacer hover */}
              <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          ))}
        </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}