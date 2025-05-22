"use client"

import { useState, useEffect, useRef } from "react"
import { Play, ChevronLeft, ChevronRight } from "lucide-react"
import Script from "next/script"
import { motion, AnimatePresence } from "framer-motion"

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
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % videoData.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + videoData.length) % videoData.length)
  }

  const renderVideoCard = (video: typeof videoData[0], index: number) => (
    <motion.div
      key={video.id}
      initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        rotateY: 0,
        x: `${(index - currentIndex) * 100}%`
      }}
      exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
      transition={{ duration: 0.5 }}
      className="flex-shrink-0 w-full md:w-auto"
    >
      <div className="flex flex-col items-center">
        <div
          className="relative w-full max-w-[400px] mx-auto cursor-pointer"
          style={{ aspectRatio: "9/16" }}
          onClick={() => setActiveVideo(video.id)}
        >
          {activeVideo === video.id ? (
            <div className="w-full h-full">
              <blockquote
                className="tiktok-embed w-full h-full"
                cite={`https://www.tiktok.com/@facureino/video/${video.videoId}`}
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
      </div>
    </motion.div>
  )

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full mx-auto mt-16"
    >
      <Script src="https://www.tiktok.com/embed.js" strategy="lazyOnload" />
      
      {/* Mobile Carousel */}
      <div className="md:hidden relative">
        <div className="overflow-hidden rounded-lg border-4 border-pink-400/30 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
          <AnimatePresence mode="wait">
            {renderVideoCard(videoData[currentIndex], 0)}
          </AnimatePresence>
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        <div className="flex justify-center gap-2 mt-4">
          {videoData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? 'bg-pink-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6">
        {videoData.map((video, index) => (
          <div key={video.id} className="rounded-lg border-4 border-pink-400/30 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
            {renderVideoCard(video, index)}
          </div>
        ))}
      </div>
    </motion.div>
  )
} 