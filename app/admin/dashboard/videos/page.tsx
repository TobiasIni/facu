"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/utils/supabase/client"
import { Trash2, Edit, Plus, Save, X, Video, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

interface TikTokVideo {
  id?: number
  title: string
  video_id: string
  author_handle: string
  created_at?: string
}

export default function VideosAdminPage() {
  const [videos, setVideos] = useState<TikTokVideo[]>([])
  const [editingVideo, setEditingVideo] = useState<TikTokVideo | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const supabase = createClient()

  const newVideoTemplate: TikTokVideo = {
    title: "",
    video_id: "",
    author_handle: "facureino"
  }

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('tiktok_videos')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3)

      if (error) throw error
      setVideos(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar videos')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (video: TikTokVideo) => {
    try {
      setError(null)
      setSuccess(null)

      // Validaciones
      if (!video.title.trim()) {
        setError('El título es obligatorio')
        return
      }
      if (!video.video_id.trim()) {
        setError('El ID del video es obligatorio')
        return
      }

      if (video.id) {
        // Actualizar video existente
        const { error } = await supabase
          .from('tiktok_videos')
          .update({
            title: video.title.trim(),
            video_id: video.video_id.trim(),
            author_handle: video.author_handle.trim()
          })
          .eq('id', video.id)

        if (error) throw error
        setSuccess('Video actualizado correctamente')
      } else {
        // Crear nuevo video
        if (videos.length >= 3) {
          setError('Máximo 3 videos permitidos')
          return
        }

        const { error } = await supabase
          .from('tiktok_videos')
          .insert([{
            title: video.title.trim(),
            video_id: video.video_id.trim(),
            author_handle: video.author_handle.trim()
          }])

        if (error) throw error
        setSuccess('Video creado correctamente')
      }

      setEditingVideo(null)
      setIsCreating(false)
      await fetchVideos()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar video')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este video?')) return

    try {
      setError(null)
      const { error } = await supabase
        .from('tiktok_videos')
        .delete()
        .eq('id', id)

      if (error) throw error
      setSuccess('Video eliminado correctamente')
      await fetchVideos()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar video')
    }
  }

  const VideoForm = ({ video, onSave, onCancel }: {
    video: TikTokVideo
    onSave: (video: TikTokVideo) => void
    onCancel: () => void
  }) => {
    const [formData, setFormData] = useState<TikTokVideo>(video)

    return (
      <Card className="border-red-500/30 bg-gradient-to-br from-slate-900/90 to-black/80">
        <CardHeader>
          <CardTitle className="text-yellow-400 flex items-center">
            <Video className="mr-2" />
            {video.id ? 'Editar Video' : 'Nuevo Video'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-yellow-300">Título del Video</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ej: Cámara Oculta Beso 💋"
              className="bg-black/50 border-red-500/30 focus:border-yellow-400 text-white"
            />
          </div>

          <div>
            <Label htmlFor="video_id" className="text-yellow-300">ID del Video de TikTok</Label>
            <Input
              id="video_id"
              value={formData.video_id}
              onChange={(e) => setFormData({ ...formData, video_id: e.target.value })}
              placeholder="Ej: 7437319683134524728"
              className="bg-black/50 border-red-500/30 focus:border-yellow-400 text-white"
            />
            <p className="text-xs text-gray-400 mt-1">
              Copia el ID del video desde la URL de TikTok
            </p>
          </div>

          <div>
            <Label htmlFor="author_handle" className="text-yellow-300">Handle del Autor</Label>
            <Input
              id="author_handle"
              value={formData.author_handle}
              onChange={(e) => setFormData({ ...formData, author_handle: e.target.value })}
              placeholder="facureino"
              className="bg-black/50 border-red-500/30 focus:border-yellow-400 text-white"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              onClick={() => onSave(formData)}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600"
            >
              <Save className="mr-2 h-4 w-4" />
              Guardar
            </Button>
            <Button
              onClick={onCancel}
              variant="outline"
              className="border-red-500/30 hover:bg-red-500/20"
            >
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-950/20 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <Video className="w-16 h-16 mx-auto mb-4 text-yellow-400 animate-pulse" />
          <p className="text-xl">Cargando videos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-950/20 to-black text-white relative overflow-hidden">
      {/* Efectos de luces de neón de fondo */}
      <div className="fixed inset-0 opacity-20 z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-yellow-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-30 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-yellow-400 mb-2">
            🎬 GESTIÓN DE VIDEOS TIKTOK
          </h1>
          <p className="text-white/80">Administra los videos que aparecen en tu galería (máximo 3)</p>
        </motion.div>

        {/* Mensajes de error y éxito */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-900/50 border border-red-500/50 rounded-lg flex items-center text-red-300"
          >
            <AlertCircle className="mr-2 h-5 w-5" />
            {error}
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-900/50 border border-green-500/50 rounded-lg flex items-center text-green-300"
          >
            <Save className="mr-2 h-5 w-5" />
            {success}
          </motion.div>
        )}

        {/* Botón para crear nuevo video */}
        {!isCreating && !editingVideo && videos.length < 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6"
          >
            <Button
              onClick={() => setIsCreating(true)}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 border border-yellow-400/50"
            >
              <Plus className="mr-2 h-4 w-4" />
              Agregar Video ({videos.length}/3)
            </Button>
          </motion.div>
        )}

        {/* Formulario para crear nuevo video */}
        {isCreating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <VideoForm
              video={newVideoTemplate}
              onSave={handleSave}
              onCancel={() => setIsCreating(false)}
            />
          </motion.div>
        )}

        {/* Lista de videos */}
        <div className="grid gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {editingVideo?.id === video.id ? (
                <VideoForm
                  video={editingVideo}
                  onSave={handleSave}
                  onCancel={() => setEditingVideo(null)}
                />
              ) : (
                <Card className="border-yellow-500/30 bg-gradient-to-br from-slate-900/90 to-black/80 hover:border-yellow-400/60 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      <div className="flex items-center">
                        <Video className="mr-2 text-yellow-400" />
                        {video.title}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setEditingVideo(video)}
                          size="sm"
                          variant="outline"
                          className="border-yellow-500/30 hover:bg-yellow-500/20 text-yellow-400"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => video.id && handleDelete(video.id)}
                          size="sm"
                          variant="outline"
                          className="border-red-500/30 hover:bg-red-500/20 text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-yellow-300 font-semibold">ID del Video:</p>
                        <p className="text-white/80 font-mono">{video.video_id}</p>
                      </div>
                      <div>
                        <p className="text-yellow-300 font-semibold">Handle:</p>
                        <p className="text-white/80">@{video.author_handle}</p>
                      </div>
                      <div>
                        <p className="text-yellow-300 font-semibold">Creado:</p>
                        <p className="text-white/80">
                          {video.created_at ? new Date(video.created_at).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          ))}
        </div>

        {videos.length === 0 && !isCreating && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <Video className="w-24 h-24 mx-auto mb-4 text-yellow-400/50" />
            <h3 className="text-2xl font-bold text-white/80 mb-2">No hay videos</h3>
            <p className="text-white/60 mb-6">Agrega tu primer video de TikTok para empezar</p>
            <Button
              onClick={() => setIsCreating(true)}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600"
            >
              <Plus className="mr-2 h-4 w-4" />
              Agregar Primer Video
            </Button>
          </motion.div>
        )}

        {videos.length >= 3 && !editingVideo && !isCreating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-8 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg"
          >
            <p className="text-yellow-400 font-semibold">
              ⚠️ Has alcanzado el límite máximo de 3 videos
            </p>
            <p className="text-white/70 text-sm mt-1">
              Elimina un video existente para agregar uno nuevo
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
} 