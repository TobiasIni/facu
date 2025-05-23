"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Gallery from "@/components/gallery"
import VideoGallery from "@/components/videoGallery"
import CalendarSection from "@/components/calendar-section"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <motion.section 
        className="py-12 md:py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="text-center space-y-4">
          <motion.img 
            src="/LogoFacu2.0.jpeg" 
            alt="Facureino" 
            className="w-2/4 mx-auto mb-4 rounded-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.div 
            className="pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
          </motion.div>
        </div>
      </motion.section>
              <img src="/BannerShows.png" alt="Facureino" className="w-2/4 mx-auto mb-4 rounded-full" />

      {/* Gallery Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <Gallery />
      </motion.section>

      {/* Video Gallery Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <VideoGallery />
      </motion.section>

      {/* Calendar Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="flex justify-center">
          <div className="h-20"></div>
        </div>
        <CalendarSection />
      </motion.section>
    </div>
  )
}
