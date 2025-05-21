"use client"

import { useState, useEffect } from "react"
import { Play } from "lucide-react"
import Script from "next/script"
import { motion } from "framer-motion"

const videoData = [
  {
    id: 1,
    title: "Show en Teatro Taburete",
    thumbnail: "/show1.jpg",
    videoId: "7493667845079977222",
  },
  {
    id: 2,
    title: "Festival de Comedia 2023",
    thumbnail: "/show2.jpg",
    videoId: "7493667845079977222",
  },
  {
    id: 3,
    title: "Gira Internacional",
    thumbnail: "/show3.jpg",
    videoId: "7493667845079977222",
  },
]

export default function VideoGallery() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null)

  useEffect(() => {
    // Recargar el script de TikTok cuando cambie el video activo
    if (activeVideo !== null) {
      const script = document.createElement('script')
      script.src = 'https://www.tiktok.com/embed.js'
      script.async = true
      document.body.appendChild(script)
      return () => {
        document.body.removeChild(script)
      }
    }
  }, [activeVideo])

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-3/4 mx-auto"
    >
      <Script src="https://www.tiktok.com/embed.js" strategy="lazyOnload" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {videoData.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="relative rounded-lg border-4 border-pink-400/30 shadow-[0_0_15px_rgba(236,72,153,0.3)] overflow-hidden"
            style={{ aspectRatio: '9/16', marginTop: '-10px' }}
          >
            {activeVideo === video.id ? (
              <blockquote
                className="tiktok-embed"
                cite={`https://www.tiktok.com/@facureino/video/7328424776668679429`}
                data-video-id={video.videoId}
                style={{ maxWidth: '100%', minWidth: '100%', height: '100%' }}
              >
                <section>
                  <a
                    target="_blank"
                    title="@facureino"
                    href="https://www.tiktok.com/@facureino?refer=embed"
                  >
                    @facureino
                  </a>
                </section>
              </blockquote>
            ) : (
              <div
                className="relative w-full h-full cursor-pointer group"
                onClick={() => setActiveVideo(video.id)}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-16 h-16 text-white" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-bold">{video.title}</h3>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
} 