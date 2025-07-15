"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Mic, Star, Zap, Calendar, BookOpen, ArrowRight, Sparkles, Coffee } from "lucide-react"

interface Post {
  id: string
  title: string
  excerpt: string
  featured_image: string
  created_at: string
  slug: string
}

export default function BlogPage() {
  // Por ahora mostramos la UI sin posts reales
  const posts: Post[] = [];
  const error = null;

  return (
    // Contenedor principal con estética de comedy club nocturno
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Efectos de luces de neón de fondo */}
      <div className="fixed inset-0 opacity-20 z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-yellow-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-30 container mx-auto px-4 py-16">
        {/* Header del Blog con estilo comedy club */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Decoraciones flotantes */}
          <motion.div
            className="absolute top-8 left-8 text-red-500/30"
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
            <BookOpen className="w-16 h-16" />
          </motion.div>
          
          <motion.div
            className="absolute top-12 right-12 text-yellow-400/30"
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
            <Sparkles className="w-12 h-12" />
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-300 to-red-400 leading-tight mb-6 drop-shadow-2xl"
              style={{
                fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
                textShadow: "0 0 30px rgba(239, 68, 68, 0.5), 0 0 60px rgba(239, 68, 68, 0.3)"
              }}>
            <Mic className="inline-block mr-4 h-16 w-16 md:h-20 md:w-20 text-yellow-400" />
            BLOG DE FACUREINO
          </h1>
          
          <motion.p
            className="text-xl md:text-2xl text-yellow-300 font-bold mb-8 drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            📝 Mis historias
          </motion.p>
        </motion.div>

        {/* Estado sin posts con estilo comedy club */}
        {!posts || posts.length === 0 ? (
          <motion.div
            className="text-center p-16 rounded-2xl max-w-4xl mx-auto relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* Fondo con efectos */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-red-950/50 to-black/80 backdrop-blur-lg border-2 border-red-500/30 rounded-2xl"></div>
            <div className="absolute inset-0 bg-gradient-radial from-yellow-400/10 via-transparent to-transparent"></div>
            
            {/* Contenido */}
            <div className="relative z-10">
              <motion.div
                className="flex justify-center mb-6"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Coffee className="w-20 h-20 text-yellow-400" />
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-yellow-400 mb-6">
                ¡Todavía no hay nada!
              </h2>
              
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="px-8 py-4 text-lg font-black rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white border-2 border-yellow-400/50 hover:border-yellow-300 transition-all duration-300 transform hover:-translate-y-1"
                  asChild
                >
                  <Link href="/">
                    <ArrowRight className="mr-2 h-5 w-5" />
                    VOLVER AL SHOW
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          /* Grid de posts con estilo comedy club */
          <motion.div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {posts.map((post: Post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <Card className="overflow-hidden flex flex-col h-full bg-gradient-to-br from-slate-900/90 via-black/80 to-slate-900/90 border-2 border-red-500/30 hover:border-yellow-400/60 transition-all duration-500 backdrop-blur-sm relative">
                  {/* Efectos de luz en hover */}
                  <div className="absolute inset-0 bg-gradient-radial from-red-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={post.featured_image || "/placeholder.svg?height=400&width=600"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    {/* Badge decorativo */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-red-600/80 to-yellow-600/80 text-white px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm">
                      🎭 NUEVO
                    </div>
                  </div>
                  
                  <CardHeader className="pb-2 relative z-10">
                    <CardTitle className="line-clamp-2 text-white group-hover:text-yellow-300 transition-colors duration-300 text-xl font-bold">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="flex-grow relative z-10">
                    <p className="text-white/80 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between items-center relative z-10">
                    <span className="text-sm text-yellow-400/80 font-semibold flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Hace poco
                    </span>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white border border-yellow-400/50 hover:border-yellow-300 transition-all duration-300"
                        asChild
                      >
                        <Link href={`/blog/${post.slug}`} className="flex items-center">
                          <ArrowRight className="w-4 h-4 mr-2" />
                          Leer más
                        </Link>
                      </Button>
                    </motion.div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
