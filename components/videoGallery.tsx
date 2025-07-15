"use client"

import { useState, useEffect } from "react"
import { Play, Zap, Star, Mic, Coffee, Smile } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/utils/supabase/client"

interface Video {
  id: number
  title: string
  video_id: string
  author_handle: string
  created_at?: string
}

export default function VideoGallery() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null)
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('tiktok_videos')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3)

      if (error) {
        console.error('Error fetching videos:', error)
        setVideos([])
      } else {
        setVideos((data as unknown as Video[]) || [])
      }
    } catch (error) {
      console.error('Error fetching videos:', error)
      setVideos([])
    } finally {
      setLoading(false)
    }
  }

  // Función para renderizar el bloque de video de TikTok
  const renderTikTokEmbed = (videoId: string, authorHandle: string) => {
    return (
      <iframe
        src={`https://www.tiktok.com/embed/v2/${videoId}`}
        className="w-full h-full"
        style={{ 
          width: '100%',
          height: '100%',
          border: 'none',
          overflow: 'hidden',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        scrolling="no"
      />
    )
  }

  // Componente reutilizable para las tarjetas de video
  const VideoCard = ({ video, index, isMobile = false }: { video: Video, index: number, isMobile?: boolean }) => (
    <motion.div
      key={`${isMobile ? 'mobile' : 'desktop'}-${video.id}`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={isMobile ? "w-[280px] min-w-[280px] flex-shrink-0" : "w-[350px] flex-shrink-0"}
    >
      <Card className="group relative overflow-hidden rounded-xl shadow-2xl border-2 border-red-500/30 hover:border-yellow-400/60 transform transition-all duration-500 hover:shadow-red-500/20 hover:-translate-y-2 hover:scale-102 bg-gradient-to-br from-slate-800 via-slate-900 to-black h-full">
        {/* Efecto de spotlight en la tarjeta */}
        <div className="absolute inset-0 bg-gradient-radial from-yellow-400/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
        
        <CardHeader className="p-0 relative">
          <div
            className="relative w-full overflow-hidden cursor-pointer bg-gradient-to-br from-red-600/20 via-slate-900 to-yellow-600/20 transition-all duration-500 group-hover:from-red-500/30 group-hover:to-yellow-500/30"
            style={{ 
              aspectRatio: isMobile ? "9/16" : "4/5", 
              height: isMobile ? "650px" : "450px",
              maxHeight: isMobile ? "60vh" : "650px"
            }}
            onClick={() => setActiveVideoId(activeVideoId === video.video_id ? null : video.video_id)}
          >
            <AnimatePresence mode="wait">
              {activeVideoId === video.video_id ? (
                <motion.div
                  key="tiktok-embed-player"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center bg-black"
                  style={{ width: '100%', height: '100%' }}
                >
                  {renderTikTokEmbed(video.video_id, video.author_handle)}
                </motion.div>
              ) : (
                <motion.div
                  key="thumbnail-preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <img
                    src="/tiktokLogo.png"
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                      className={`relative ${isMobile ? 'w-20 h-20' : 'w-20 h-20'} bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 backdrop-blur-sm rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-500 shadow-2xl border-2 border-yellow-400/50 group-hover:border-yellow-300`}
                    >
                      <Play className={`${isMobile ? 'w-8 h-8' : 'w-8 h-8'} text-white fill-current translate-x-0.5`} />
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardHeader>
        <CardContent className={`${isMobile ? 'p-4' : 'p-4'} text-center bg-gradient-to-t from-slate-900 via-slate-800 to-slate-900 relative`}>
          {/* Efecto sutil de brillo */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-yellow-500/5 group-hover:from-red-500/10 group-hover:to-yellow-500/10 transition-all duration-500"></div>
          
          <CardTitle className={`${isMobile ? 'text-lg mb-2' : 'text-lg mb-2'} font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-400 line-clamp-1 group-hover:from-yellow-300 group-hover:to-red-300 transition-all duration-300 relative z-10`}>
            {video.title}
          </CardTitle>
          <CardDescription className={`${isMobile ? 'text-sm' : 'text-sm'} text-muted-foreground`}>
            Por <span className="font-semibold text-yellow-400">@{video.author_handle}</span>
          </CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="container mx-auto py-4 md:py-8 px-4 relative"
    >
      {/* Efectos de luces de comedy club */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-40 h-40 bg-red-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/6 w-48 h-48 bg-yellow-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>
      
      {/* Decoraciones flotantes */}
      <motion.div
        className="absolute top-10 right-10 text-red-500/20"
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
        <Star className="w-16 h-16" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-20 left-10 text-yellow-400/20"
        animate={{ 
          rotate: [0, -15, 15, 0],
          x: [0, 5, -5, 0] 
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <Mic className="w-12 h-12" />
      </motion.div>

      <div className="relative z-10">
        {loading ? (
          <div className="text-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 mx-auto mb-4"
            >
              <Star className="w-16 h-16 text-yellow-400" />
            </motion.div>
            <p className="text-xl text-white/80">Cargando videos épicos...</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-12">
            <Mic className="w-24 h-24 mx-auto mb-4 text-yellow-400/50" />
            <h3 className="text-2xl font-bold text-white/80 mb-2">¡Próximamente!</h3>
            <p className="text-white/60">Los videos más divertidos están en camino... 🎬</p>
          </div>
        ) : (
          <div>
            {/* Carrusel horizontal para móvil */}
            <div className="md:hidden overflow-x-auto pb-4 scrollbar-hide">
              <div className="flex gap-6 px-6 w-max">
                {videos.map((video: Video, index: number) => (
                  <VideoCard key={`mobile-${video.id}`} video={video} index={index} isMobile={true} />
                ))}
              </div>
            </div>
            
            {/* Fila horizontal para desktop */}
            <div className="hidden md:flex md:justify-center md:items-start gap-8 max-w-7xl mx-auto px-4">
              {videos.map((video: Video, index: number) => (
                <VideoCard key={`desktop-${video.id}`} video={video} index={index} isMobile={false} />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.section>
  )
}