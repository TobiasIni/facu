"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { createClient } from "@/utils/supabase/client"
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, Youtube, Mic, Star, Zap, Send, MessageCircle, Sparkles, Coffee } from "lucide-react"
import { motion } from "framer-motion"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean
    message: string
  } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const supabase = createClient()

      // Verificar que las variables de entorno estén configuradas
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        throw new Error("Configuración de Supabase incompleta")
      }

      // Insertar en la base de datos
      const { data, error: dbError } = await supabase
        .from("contactos")
        .insert([
          {
            nombre: formData.name,
            email: formData.email,
            asunto: formData.subject,
            mensaje: formData.message,
          },
        ])
        .select()
        .single()

      if (dbError) {
        console.error("Error de base de datos:", dbError)
        if (dbError.code === 'PGRST301') {
          throw new Error("Error de conexión con la base de datos. Por favor, verifica tu conexión a internet.")
        }
        throw new Error(dbError.message || "Error al guardar en la base de datos")
      }

      if (!data) {
        throw new Error("No se pudo guardar el mensaje")
      }

      // Enviar email usando la API route
      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!emailResponse.ok) {
        const errorData = await emailResponse.json();
        throw new Error(errorData.error || 'Error al enviar el email');
      }

      setSubmitStatus({
        success: true,
        message: "¡Gracias por contactarme! Te responderé a la brevedad.",
      })

      // Limpiar el formulario
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      console.error("Error al procesar el formulario:", error)
      setSubmitStatus({
        success: false,
        message: error instanceof Error ? error.message : "Hubo un error al enviar tu mensaje. Por favor, intenta nuevamente.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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
        {/* Header del Contacto con estilo comedy club */}
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
            <MessageCircle className="w-16 h-16" />
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
            <Zap className="inline-block mr-4 h-16 w-16 md:h-20 md:w-20 text-yellow-400" />
            ¡CHARLEMOS!
          </h1>
          
          <motion.p
            className="text-xl md:text-2xl text-yellow-300 font-bold mb-8 drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            💬 ¿Querés que haga reír a tu público?
          </motion.p>
        </motion.div>

        {/* Grid de contenido */}
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Formulario con estilo comedy club */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-slate-900/80 via-red-950/50 to-black/80 backdrop-blur-lg border-2 border-red-500/30 overflow-hidden">
              {/* Efectos de fondo */}
              <div className="absolute inset-0 bg-gradient-radial from-yellow-400/10 via-transparent to-transparent"></div>
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
              
              <div className="relative z-10">
                <motion.h2 
                  className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-yellow-400 mb-8 flex items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Send className="mr-3 h-8 w-8 text-yellow-400" />
                  ENVÍAME UN MENSAJE
                </motion.h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <Label htmlFor="name" className="text-yellow-300 font-semibold">Nombre</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required
                      className="bg-black/50 border-red-500/30 focus:border-yellow-400 text-white placeholder:text-gray-400 backdrop-blur-sm"
                      placeholder="Tu nombre completo"
                    />
                  </motion.div>

                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <Label htmlFor="email" className="text-yellow-300 font-semibold">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required
                      className="bg-black/50 border-red-500/30 focus:border-yellow-400 text-white placeholder:text-gray-400 backdrop-blur-sm"
                      placeholder="tu@email.com"
                    />
                  </motion.div>

                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    <Label htmlFor="subject" className="text-yellow-300 font-semibold">Asunto</Label>
                    <Input 
                      id="subject" 
                      name="subject" 
                      value={formData.subject} 
                      onChange={handleChange} 
                      required
                      className="bg-black/50 border-red-500/30 focus:border-yellow-400 text-white placeholder:text-gray-400 backdrop-blur-sm"
                      placeholder="¿De qué querés hablar?"
                    />
                  </motion.div>

                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <Label htmlFor="message" className="text-yellow-300 font-semibold">Mensaje</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="bg-black/50 border-red-500/30 focus:border-yellow-400 text-white placeholder:text-gray-400 backdrop-blur-sm resize-none"
                      placeholder="Contame todo... ¡sin censura! 😄"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type="submit" 
                      className="w-full py-4 text-lg font-black bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white border-2 border-yellow-400/50 hover:border-yellow-300 transition-all duration-300 transform hover:-translate-y-1" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Coffee className="mr-2 h-5 w-5 animate-spin" />
                          ENVIANDO...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          ¡ENVIAR MENSAJE!
                        </>
                      )}
                    </Button>
                  </motion.div>

                  {submitStatus && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`p-4 rounded-lg border-2 backdrop-blur-sm ${
                        submitStatus.success 
                          ? "bg-green-900/50 border-green-500/50 text-green-300" 
                          : "bg-red-900/50 border-red-500/50 text-red-300"
                      }`}
                    >
                      <div className="flex items-center">
                        {submitStatus.success ? (
                          <Star className="w-5 h-5 mr-2" />
                        ) : (
                          <Zap className="w-5 h-5 mr-2" />
                        )}
                        {submitStatus.message}
                      </div>
                    </motion.div>
                  )}
                </form>
              </div>
            </div>
          </motion.div>

          {/* Información de contacto con estilo comedy club */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-slate-900/80 via-yellow-950/30 to-black/80 backdrop-blur-lg border-2 border-yellow-500/30 overflow-hidden">
              {/* Efectos de fondo */}
              <div className="absolute inset-0 bg-gradient-radial from-red-400/10 via-transparent to-transparent"></div>
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
              
              <div className="relative z-10">
                <motion.h2 
                  className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-400 mb-8 flex items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Mic className="mr-3 h-8 w-8 text-red-400" />
                  INFO DE CONTACTO
                </motion.h2>

                <div className="space-y-8">
                  <motion.div 
                    className="flex items-start group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="p-3 rounded-full bg-gradient-to-r from-red-600/20 to-red-700/20 border border-red-500/30 group-hover:border-red-400 mr-4 transition-all duration-300">
                      <Mail className="h-6 w-6 text-red-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-yellow-300 text-lg">Email</h3>
                      <p className="text-white/90">Facureinocontact@gmail.com</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-start group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="p-3 rounded-full bg-gradient-to-r from-yellow-600/20 to-yellow-700/20 border border-yellow-500/30 group-hover:border-yellow-400 mr-4 transition-all duration-300">
                      <Phone className="h-6 w-6 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-yellow-300 text-lg">Teléfono</h3>
                      <p className="text-white/90">+54 9 11 3385-8879</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-start group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="p-3 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 group-hover:border-blue-400 mr-4 transition-all duration-300">
                      <MapPin className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-yellow-300 text-lg">Ubicacion</h3>
                      <p className="text-white/90">Argentina</p>
                    </div>
                  </motion.div>
                </div>

                {/* Redes sociales dramáticas */}
                <motion.div 
                  className="mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-yellow-400 mb-6 flex items-center">
                    <Star className="mr-2 h-6 w-6 text-yellow-400" />
                    ¡SEGUÍME EN REDES!
                  </h3>
                  <div className="flex space-x-6">
                    <motion.div whileHover={{ scale: 1.3, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                      <Button variant="outline" size="icon" asChild className="bg-gradient-to-r from-pink-600/20 to-purple-600/20 border border-pink-500/30 hover:border-pink-400 transition-all duration-300">
                        <a href="https://www.instagram.com/facureino/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                          <Instagram className="text-pink-400 hover:text-pink-300 transition-colors h-6 w-6" />
                        </a>
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.3, rotate: -5 }} whileTap={{ scale: 0.9 }}>
                      <Button variant="outline" size="icon" asChild className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 hover:border-blue-400 transition-all duration-300">
                        <a href="https://x.com/facureinooo" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                          <Twitter className="text-blue-400 hover:text-blue-300 transition-colors h-6 w-6" />
                        </a>
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.3, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                      <Button variant="outline" size="icon" asChild className="bg-gradient-to-r from-blue-800/20 to-blue-900/20 border border-blue-600/30 hover:border-blue-500 transition-all duration-300">
                        <a href="https://facebook.com/facundoreinoso" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                          <Facebook className="text-blue-500 hover:text-blue-400 transition-colors h-6 w-6" />
                        </a>
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
