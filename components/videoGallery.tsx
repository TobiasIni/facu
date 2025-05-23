"use client"

import { useState } from "react"
import { Play } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Video {
  id: number
  title: string
  thumbnail: string
  videoId: string
  authorHandle: string
}

// Datos de ejemplo para los videos
const videoData: Video[] = [
  {
    id: 1,
    title: "Cámara Oculta Beso",
    thumbnail: "tiktokLogo.png",
    videoId: "7437319683134524728",
    authorHandle: "facureino",
  },
  {
    id: 2,
    title: "Fail en el Gimnasio",
    thumbnail: "tiktokLogo.png",
    videoId: "7503684316237516087",
    authorHandle: "facureino",
  },
  {
    id: 3,
    title: "Milipili Backstage",
    thumbnail: "tiktokLogo.png",
    videoId: "7505202432725503287",
    authorHandle: "facureino",
  },
]

export default function VideoGallery() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null)

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

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="container mx-auto py-16 px-4"
    >
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600 drop-shadow-lg">
        Mis Videos en TikTok
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {videoData.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="group relative overflow-hidden rounded-xl shadow-lg border border-primary/20 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-r from-primary/5 to-accent/5 hover:from-primary/10 hover:to-accent/10">
              <CardHeader className="p-0">
                <div
                  className="relative w-full overflow-hidden cursor-pointer bg-gradient-to-br from-pink-400 to-purple-500 transition-all duration-300"
                  style={{ aspectRatio: "9/16" }}
                  onClick={() => setActiveVideoId(activeVideoId === video.videoId ? null : video.videoId)}
                >
                  <AnimatePresence mode="wait">
                    {activeVideoId === video.videoId ? (
                      <motion.div
                        key="tiktok-embed-player"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex items-center justify-center bg-black"
                        style={{ width: '100%', height: '100%' }}
                      >
                        {renderTikTokEmbed(video.videoId, video.authorHandle)}
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
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                            className="w-20 h-20 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-xl"
                          >
                            <Play className="w-10 h-10 text-white fill-current translate-x-0.5" />
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </CardHeader>
              <CardContent className="p-4 text-center">
                <CardTitle className="text-xl font-bold text-foreground mb-1 line-clamp-1">
                  {video.title}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Por <span className="font-semibold text-primary">@{video.authorHandle}</span>
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}