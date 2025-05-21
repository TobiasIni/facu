"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function NuevoEventoPage() {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    tickets_url: "",
    sold_out: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // Validar que los campos requeridos no estén vacíos
      if (!formData.title || !formData.date || !formData.time || !formData.location) {
        throw new Error("Por favor completa todos los campos requeridos")
      }

      // Formatear la fecha y hora para la base de datos
      const dateTime = new Date(`${formData.date}T${formData.time}`)
      
      // Verificar que la fecha sea válida
      if (isNaN(dateTime.getTime())) {
        throw new Error("La fecha o hora ingresada no es válida")
      }

      const { data, error: supabaseError } = await supabase
        .from("eventos")
        .insert([
          {
            title: formData.title,
            date: dateTime.toISOString(),
            time: formData.time,
            location: formData.location,
            tickets_url: formData.tickets_url || null,
            sold_out: formData.sold_out,
          },
        ])
        .select()

      if (supabaseError) {
        console.error("Error de Supabase:", supabaseError)
        throw new Error(supabaseError.message)
      }

      if (!data) {
        throw new Error("No se pudo crear el evento")
      }

      setSuccess(true)
      // Limpiar el formulario
      setFormData({
        title: "",
        date: "",
        time: "",
        location: "",
        tickets_url: "",
        sold_out: false,
      })

      // Redirigir después de 2 segundos
      setTimeout(() => {
        router.push("/admin/dashboard")
        router.refresh()
      }, 2000)
    } catch (error: any) {
      console.error("Error completo:", error)
      setError(error.message || "Error al crear el evento")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" asChild className="mr-4">
          <Link href="/admin/dashboard" className="flex items-center">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Volver al dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Crear Nuevo Evento</h1>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Información del Evento</CardTitle>
          <CardDescription>Completa el formulario para crear un nuevo evento en el calendario</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Título del evento</Label>
              <Input 
                id="title" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                required 
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Fecha</Label>
                <Input 
                  id="date" 
                  name="date" 
                  type="date" 
                  value={formData.date} 
                  onChange={handleChange} 
                  required 
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Hora</Label>
                <Input 
                  id="time" 
                  name="time" 
                  type="time" 
                  value={formData.time} 
                  onChange={handleChange} 
                  required 
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Ubicación</Label>
              <Input 
                id="location" 
                name="location" 
                value={formData.location} 
                onChange={handleChange} 
                required 
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tickets_url">URL para comprar entradas</Label>
              <Input 
                id="tickets_url" 
                name="tickets_url" 
                value={formData.tickets_url} 
                onChange={handleChange} 
                disabled={loading}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="sold_out"
                name="sold_out"
                checked={formData.sold_out}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, sold_out: checked === true }))}
                disabled={loading}
              />
              <Label htmlFor="sold_out">Entradas agotadas</Label>
            </div>

            {error && (
              <div className="p-3 text-sm bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-md">
                {error}
              </div>
            )}

            {success && (
              <div className="p-3 text-sm bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-md">
                Evento creado correctamente. Redirigiendo...
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creando evento..." : "Crear evento"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
