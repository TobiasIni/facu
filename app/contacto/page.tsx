"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { createClient } from "@/utils/supabase/client"
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, Youtube } from "lucide-react"

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
    <div className="container mx-auto px-4 py-12">

      <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Envíame un correo</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Asunto</Label>
              <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Mensaje</Label>
              <Textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar mensaje"}
            </Button>

            {submitStatus && (
              <div
                className={`p-4 rounded-md ${submitStatus.success ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"}`}
              >
                {submitStatus.message}
              </div>
            )}
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Información de contacto</h2>

          <div className="space-y-6">
            <div className="flex items-start">
              <Mail className="h-6 w-6 mr-4 mt-1" />
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-muted-foreground">Facureinocontact@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className="h-6 w-6 mr-4 mt-1" />
              <div>
                <h3 className="font-medium">Teléfono</h3>
                <p className="text-muted-foreground">+54 9 11 3385-8879</p>
              </div>
            </div>

            <div className="flex items-start">
              <MapPin className="h-6 w-6 mr-4 mt-1" />
              <div>
                <h3 className="font-medium">Representante</h3>
                <p className="text-muted-foreground">
                  Tobias Ini
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-medium mb-4">Seguíme en redes sociales</h3>
            <div className="flex space-x-4">
              <Button variant="outline" size="icon" asChild>
                <a href="https://www.instagram.com/facureino/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="text-pink-400 hover:text-white transition-colors h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://x.com/facureinooo" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter className="text-pink-400 hover:text-white transition-colors h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://facebook.com/facundoreinoso" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Facebook className="text-pink-400 hover:text-white transition-colors h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
