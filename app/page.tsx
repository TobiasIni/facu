"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Gallery from "@/components/gallery"
import VideoGallery from "@/components/videoGallery"
import CalendarSection from "@/components/calendar-section"
import { motion } from "framer-motion"
import { Sparkles, Megaphone, CalendarCheck2, PlaySquare } from "lucide-react" // Importamos nuevos iconos

export default function Home() {
  return (
    // Contenedor principal con un fondo sutil y un padding general
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background text-foreground">
      {/* Hero Section */}
      <motion.section
        className="relative flex flex-col items-center justify-center h-screen text-center overflow-hidden p-4 md:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Fondo con imagen o gradiente artístico (ajusta la imagen o los colores del gradiente) */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-background.jpg')", opacity: 0.2 }} // Reemplaza con una imagen de fondo de alta calidad
        ></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div> {/* Gradiente sobre la imagen para blend */}

        <motion.div
          className="relative z-10 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          {/* Logo o Imagen Central */}
          <motion.img
            src="/LogoFacu2.0.jpeg"
            alt="Facureino Logo"
            className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-primary/50 shadow-2xl mb-6 transform hover:scale-105 transition-transform duration-300"
            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 100 }}
          />

          {/* Título y Subtítulo Impactantes */}
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4 drop-shadow-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            FACUREINO
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-white/90 max-w-2xl mb-8 drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            Que te cuesta ser feliz pelele?
            <br />
          </motion.p>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <Button
              size="lg"
              className="px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300
                         bg-gradient-to-r from-primary to-accent text-primary-foreground hover:from-primary/90 hover:to-accent/90 transform hover:-translate-y-1 active:scale-95 active:shadow-inner"
              asChild
            >
              <Link 
                href="#gallery-section" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('gallery-section')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
              >
                Explorar Ahora <Sparkles className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* --- */}

      {/* Gallery Section */}
      <motion.section
        id="gallery-section" // ID para la navegación
        className="py-8 md:py-12 bg-gradient-to-br from-background to-muted/10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="container mx-auto px-4">
          <Gallery />
        </div>
      </motion.section>

      {/* --- */}

      {/* Video Gallery Section */}
      <motion.section
        id="video-gallery-section" // ID para la navegación
        className="py-16 md:py-24 bg-gradient-to-br from-muted/10 to-background"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="container mx-auto px-4">
          <VideoGallery />
        </div>
      </motion.section>

      {/* --- */}

      {/* Calendar Section */}
      <motion.section
        id="calendar-section" // ID para la navegación
        className="py-16 md:py-24 bg-gradient-to-br from-background to-muted/10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-cyan-600 drop-shadow-lg flex items-center justify-center">
            <CalendarCheck2 className="h-10 w-10 md:h-12 md:w-12 mr-4 text-teal-500" /> Próximos Eventos
          </h2>
          <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            No te pierdas ningún show. Consulta las fechas y asegura tu lugar.
          </p>
          <CalendarSection />
        </div>
      </motion.section>

      {/* --- */}

      {/* Footer (Opcional, pero recomendado para una estética completa) */}
      <footer className="py-8 bg-card text-card-foreground text-center text-sm border-t border-border mt-16">
        <p>&copy; {new Date().getFullYear()} Facureino. Todos los derechos reservados.</p>
        <div className="flex justify-center space-x-4 mt-4">
          {/* Aquí podrías añadir enlaces a redes sociales */}
          <Link href="#" className="hover:text-primary transition-colors">Política de Privacidad</Link>
          <Link href="#" className="hover:text-primary transition-colors">Términos de Servicio</Link>
        </div>
      </footer>
    </div>
  )
}