"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Gallery from "@/components/gallery"
import VideoGallery from "@/components/videoGallery"
import CalendarSection from "@/components/calendar-section"
import { motion } from "framer-motion"
import { Mic, Zap, Calendar, Play, Smile, Star, Coffee, PartyPopper } from "lucide-react" // Íconos para comedia stand-up

export default function Home() {
  return (
    // Contenedor principal con estética de comedy club nocturno y video de fondo
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Video de fondo para toda la página */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
        Tu navegador no soporta videos HTML5.
      </video>
      
      {/* Overlay principal para toda la página */}
      <div className="fixed inset-0 z-10 bg-gradient-radial from-transparent via-black/60 to-black/90"></div>
      <div className="fixed inset-0 z-15 bg-gradient-to-t from-black/80 via-transparent to-black/70"></div>
      
      {/* Efectos de luces de neón de fondo */}
      <div className="fixed inset-0 opacity-20 z-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-yellow-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      {/* Hero Section - Comedy Club Vibes */}
      <motion.section
        className="relative flex flex-col items-center justify-center h-screen text-center overflow-hidden p-4 md:p-8 z-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Spotlight central solo para el hero */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-yellow-200/10 via-yellow-400/5 to-transparent z-20 animate-pulse"></div>

        <motion.div
          className="relative z-40 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          {/* Micrófono decorativo flotante */}
          <motion.div
            className="absolute -top-20 -left-20 text-red-500/30"
            animate={{ 
              rotate: [0, 10, -10, 0],
              y: [0, -10, 0] 
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Mic className="w-16 h-16" />
          </motion.div>
          
          {/* Logo con efecto de neón */}
          <motion.div
            className="relative mb-8"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl animate-pulse"></div>
            <motion.img
              src="/LogoFacu2.0.jpeg"
              alt="Facureino - Stand Up Comedian"
              className="relative w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-red-500/50 shadow-2xl hover:border-yellow-400/70 transition-all duration-500"
              initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 100 }}
            />
          </motion.div>

          {/* Título con efecto de neón y tipografía audaz */}
          <motion.h1
            className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-300 to-red-400 leading-tight mb-6 drop-shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{
              fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
              textShadow: "0 0 30px rgba(239, 68, 68, 0.5), 0 0 60px rgba(239, 68, 68, 0.3)"
            }}
          >
            FACUREINO
          </motion.h1>

          {/* Subtítulo con humor y estilo casual */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <p className="text-2xl md:text-3xl text-yellow-300 font-bold mb-2 drop-shadow-lg">
              ¿Qué te cuesta ser feliz, pelele? 🎭
            </p>
          </motion.div>

          {/* Botones de acción con estilo comedy club */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          > 
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-4 text-lg font-bold rounded-lg border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-300 transform hover:-translate-y-1"
              asChild
            >
              <Link href="#calendar-section" className="flex items-center transition-all duration-300 hover:scale-105">
                <Mic className="mr-2 h-5 w-5" />
                PRÓXIMAS FECHAS
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* --- */}

      {/* Gallery Section - Behind the Scenes */}
      <motion.section
        id="gallery-section"
        className="py-4 md:py-16 relative z-30"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-4 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
          </motion.div>
          <Gallery />
        </div>
      </motion.section>

      {/* Video Gallery Section - Live Shows */}
      <motion.section
        id="video-gallery-section"
        className="py-4 md:py-16 relative overflow-hidden z-30"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-4 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-400 mb-4 flex items-center justify-center">
              <Play className="h-10 w-10 md:h-12 md:w-12 mr-4 text-red-400" />
              TikTok
            </h2>
          </motion.div>
          <VideoGallery />
        </div>
      </motion.section>

      {/* Calendar Section - Show Dates */}
      <motion.section
        id="calendar-section"
        className="py-8 md:py-24 relative z-30"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-6 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-400 to-yellow-400 mb-6 flex items-center justify-center drop-shadow-2xl">
              <Calendar className="h-10 w-10 md:h-12 md:w-12 mr-4 text-yellow-400" />
              ¿CUÁNDO ES EL SHOW?
            </h2>
          </motion.div>
          <CalendarSection />
        </div>
      </motion.section>

    </div>
  )
}