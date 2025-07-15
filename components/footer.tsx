"use client"

import Link from "next/link"
import { Instagram, Twitter, Youtube, Mic, Star, Zap } from "lucide-react"
import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer className="relative z-50 border-t-2 border-red-500/70 bg-gradient-to-t from-black via-black/95 to-black/80 backdrop-blur-lg overflow-hidden">
      {/* Efectos de luces de neón de fondo */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-red-500/60 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-yellow-500/50 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-60 h-20 bg-gradient-to-r from-red-500/30 via-yellow-500/30 to-red-500/30 blur-2xl"></div>
      </div>
      
      {/* Decoraciones flotantes */}
      <motion.div
        className="absolute top-4 left-8 text-red-500/40"
        animate={{ 
          rotate: [0, 10, -10, 0],
          y: [0, -5, 0] 
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Mic className="w-8 h-8" />
      </motion.div>
      
      <motion.div
        className="absolute top-6 right-8 text-yellow-400/40"
        animate={{ 
          rotate: [0, -15, 15, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <Star className="w-6 h-6" />
      </motion.div>

      <div className="container relative z-60 flex flex-col items-center justify-between gap-6 py-12 md:h-32 md:flex-row md:py-0">
        {/* Copyright con estilo comedy club */}
        <motion.div 
          className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-yellow-400" />
            <p className="text-center text-sm leading-loose font-bold bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent md:text-left">
              © 2025 FACUREINO 
            </p>
          </div>
          <motion.p 
            className="text-xs text-white/70 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            "Todos los derechos reservados"
          </motion.p>
        </motion.div>

                 {/* Social Media con efectos dramáticos */}
         <motion.div 
           className="flex items-center space-x-8 relative z-70"
           initial={{ opacity: 0, x: 20 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.6, delay: 0.2 }}
           viewport={{ once: true }}
         >
                     <motion.div whileHover={{ scale: 1.3, rotate: 5 }} whileTap={{ scale: 0.9 }}>
             <Link
               href="https://www.instagram.com/facureino/"
               target="_blank"
               rel="noopener noreferrer"
               className="group relative p-3 rounded-full bg-gradient-to-r from-pink-600/30 to-purple-600/30 border border-pink-500/50 hover:border-pink-400 transition-all duration-300 z-80"
             >
              <Instagram className="h-6 w-6 text-pink-400 group-hover:text-pink-300 transition-colors duration-300" />
              <div className="absolute inset-0 bg-pink-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </motion.div>

                     <motion.div whileHover={{ scale: 1.3, rotate: -5 }} whileTap={{ scale: 0.9 }}>
             <Link
               href="https://x.com/facureinooo"
               target="_blank"
               rel="noopener noreferrer"
               className="group relative p-3 rounded-full bg-gradient-to-r from-blue-600/30 to-cyan-600/30 border border-blue-500/50 hover:border-blue-400 transition-all duration-300 z-80"
             >
              <Twitter className="h-6 w-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </motion.div>

                     <motion.div whileHover={{ scale: 1.3, rotate: 5 }} whileTap={{ scale: 0.9 }}>
             <Link
               href="https://youtube.com"
               target="_blank"
               rel="noopener noreferrer"
               className="group relative p-3 rounded-full bg-gradient-to-r from-red-600/30 to-red-700/30 border border-red-500/50 hover:border-red-400 transition-all duration-300 z-80"
             >
              <Youtube className="h-6 w-6 text-red-400 group-hover:text-red-300 transition-colors duration-300" />
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Línea decorativa estilo neón */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/80 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent blur-sm"></div>
    </footer>
  )
}
