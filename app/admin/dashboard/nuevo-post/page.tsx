"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, Upload, X, ImageIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { v4 as uuidv4 } from "uuid"

export default function NuevoPostPage() {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featured_image: "",
    author: "Nombre del Artista",
    created_at: new Date().toISOString().split("T")[0], // Fecha actual en formato YYYY-MM-DD
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [images, setImages] = useState<{ url: string; file: File | null }[]>([])
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // Si el campo es el título, generamos automáticamente un slug
    if (name === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")

      setFormData((prev) => ({
        ...prev,
        [name]: value,
        slug: slug,
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    setUploading(true)
    setError(null)

    try {
      const newImages = Array.from(e.target.files).map((file) => ({
        url: URL.createObjectURL(file),
        file,
      }))

      setImages((prev) => [...prev, ...newImages])

      // Si es la primera imagen y no hay featured_image, la establecemos como portada
      if (images.length === 0 && !formData.featured_image && newImages.length > 0) {
        // No establecemos la URL final aquí, lo haremos al guardar
        setFormData((prev) => ({
          ...prev,
          featured_image: "pending", // Marcador temporal
        }))
      }
    } catch (error: any) {
      console.error("Error al cargar imágenes:", error)
      setError("Error al cargar imágenes. Inténtalo de nuevo.")
    } finally {
      setUploading(false)
      // Limpiar el input de archivos para permitir seleccionar el mismo archivo nuevamente
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...images]

    // Liberar la URL del objeto
    if (newImages[index].url.startsWith("blob:")) {
      URL.revokeObjectURL(newImages[index].url)
    }

    newImages.splice(index, 1)
    setImages(newImages)

    // Si eliminamos la primera imagen y era la portada, actualizamos featured_image
    if (index === 0 && formData.featured_image === "pending") {
      if (newImages.length > 0) {
        // Todavía hay imágenes, la primera será la portada
        setFormData((prev) => ({ ...prev, featured_image: "pending" }))
      } else {
        // No hay más imágenes
        setFormData((prev) => ({ ...prev, featured_image: "" }))
      }
    }
  }

  const uploadImagesToStorage = async () => {
    if (images.length === 0) return []

    const uploadedUrls = []

    for (const image of images) {
      if (!image.file) continue

      const fileExt = image.file.name.split(".").pop()
      const fileName = `${uuidv4()}.${fileExt}`
      const filePath = `blog/${fileName}`

      const { error: uploadError, data } = await supabase.storage.from("public").upload(filePath, image.file, {
        cacheControl: "3600",
        upsert: false,
      })

      if (uploadError) {
        throw new Error(`Error al subir imagen: ${uploadError.message}`)
      }

      const { data: urlData } = supabase.storage.from("public").getPublicUrl(filePath)
      uploadedUrls.push(urlData.publicUrl)
    }

    return uploadedUrls
  }

  const insertImagesIntoContent = (content: string, imageUrls: string[]) => {
    // Insertar las imágenes al final del contenido
    let newContent = content

    if (imageUrls.length > 0) {
      newContent += "\n\n"

      imageUrls.forEach((url, index) => {
        // Saltamos la primera imagen si se usa como portada
        if (index === 0 && formData.featured_image === "pending") return

        newContent += `<img src="${url}" alt="Imagen ${index + 1}" class="my-4 rounded-lg max-w-full" />\n`
      })
    }

    return newContent
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // 1. Subir imágenes a Supabase Storage
      const imageUrls = await uploadImagesToStorage()

      // 2. Determinar la imagen de portada
      let featuredImageUrl = formData.featured_image
      if (formData.featured_image === "pending" && imageUrls.length > 0) {
        featuredImageUrl = imageUrls[0]
      }

      // 3. Insertar las imágenes en el contenido
      const contentWithImages = insertImagesIntoContent(formData.content, imageUrls)

      // 4. Guardar el post en la base de datos
      const { error } = await supabase.from("posts").insert([
        {
          title: formData.title,
          slug: formData.slug,
          excerpt: formData.excerpt,
          content: contentWithImages,
          featured_image: featuredImageUrl,
          author: formData.author,
          created_at: new Date(formData.created_at).toISOString(),
        },
      ])

      if (error) throw error

      setSuccess(true)
      // Limpiar el formulario
      setFormData({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        featured_image: "",
        author: "Nombre del Artista",
        created_at: new Date().toISOString().split("T")[0],
      })
      setImages([])

      // Redirigir después de 2 segundos
      setTimeout(() => {
        router.push("/admin/dashboard")
        router.refresh()
      }, 2000)
    } catch (error: any) {
      setError(error.message || "Error al crear el post")
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
        <h1 className="text-3xl font-bold">Crear Nuevo Post</h1>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Información del Post</CardTitle>
          <CardDescription>Completa el formulario para crear un nuevo post en el blog</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">
                Slug (URL amigable)
                <span className="text-xs text-muted-foreground ml-2">Se genera automáticamente del título</span>
              </Label>
              <Input id="slug" name="slug" value={formData.slug} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="created_at">Fecha de publicación</Label>
              <Input
                id="created_at"
                name="created_at"
                type="date"
                value={formData.created_at}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Extracto</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                rows={2}
                value={formData.excerpt}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Contenido</Label>
              <Textarea
                id="content"
                name="content"
                rows={10}
                value={formData.content}
                onChange={handleChange}
                required
                placeholder="Puedes usar HTML básico para formatear el contenido"
              />
            </div>

            <div className="space-y-2">
              <Label>Imágenes</Label>
              <div className="border rounded-lg p-4">
                <div className="flex flex-wrap gap-4 mb-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="relative h-24 w-24 rounded-md overflow-hidden border">
                        <Image
                          src={image.url || "/placeholder.svg"}
                          alt={`Imagen ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Eliminar imagen"
                      >
                        <X className="h-3 w-3" />
                      </button>
                      {index === 0 && formData.featured_image === "pending" && (
                        <div className="absolute bottom-0 left-0 right-0 bg-primary text-primary-foreground text-[10px] text-center py-0.5">
                          Portada
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="h-24 w-24 border border-dashed rounded-md flex items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      className="hidden"
                      accept="image/*"
                      multiple
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex flex-col items-center text-muted-foreground"
                      disabled={uploading}
                    >
                      <Upload className="h-6 w-6 mb-1" />
                      <span className="text-xs">Subir</span>
                    </button>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>
                    <ImageIcon className="h-4 w-4 inline-block mr-1" />
                    La primera imagen se usará como portada del post.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Autor</Label>
              <Input id="author" name="author" value={formData.author} onChange={handleChange} required />
            </div>

            {error && (
              <div className="p-3 text-sm bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-md">
                {error}
              </div>
            )}

            {success && (
              <div className="p-3 text-sm bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-md">
                Post creado correctamente. Redirigiendo...
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading || uploading}>
              {loading ? "Creando post..." : "Crear post"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
