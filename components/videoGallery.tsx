"use client"

import { useState, useEffect } from "react"
import { Play } from "lucide-react"
import Script from "next/script"
import { motion } from "framer-motion"

const videoData = [
  {
    id: 1,
    title: "Camara Oculta Beso",
    thumbnail: "/tiktokLogo.png",
    videoId: "7328424776668679429",
  },
  {
    id: 2,
    title: "Fail Gimnasio",
    thumbnail: "/tiktokLogo.png",
    videoId: "7503684316237516087",
  },
  {
    id: 3,
    title: "Milipili Backstage",
    thumbnail: "/tiktokLogo.png",
    videoId: "7505202432725503287",
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
      className="w-4/4 mx-auto"
    >
      <Script src="https://www.tiktok.com/embed.js" strategy="lazyOnload" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6">
        {videoData.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div
              className="relative w-full max-w-[400px] mx-auto cursor-pointer"
              style={{ aspectRatio: "9/16" }}
              onClick={() => setActiveVideo(video.id)}
            >
              {activeVideo === video.id ? (
                <div className="w-full h-full">
                  <blockquote
                    className="tiktok-embed w-full h-full"
                    cite={`https://www.tiktok.com/@facureino/video/7328424776668679429`}
                    data-video-id={video.videoId}
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
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <h3 className="mt-4 text-lg font-medium text-center">{video.title}</h3>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
} 