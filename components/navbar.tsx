"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Instagram, Twitter, Youtube, Menu, X, Mic, Zap, Star } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-red-500/30 bg-gradient-to-r from-black via-slate-900 to-black backdrop-blur supports-[backdrop-filter]:bg-black/90 relative overflow-hidden">
      {/* Efectos de luces de neón en el fondo */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-red-500/30 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-24 h-24 bg-yellow-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="container flex h-20 items-center justify-between relative z-10">
        <Link href="/" className="flex items-center space-x-3 group">
          {/* Logo con efecto de neón */}
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/30 rounded-full blur-lg group-hover:bg-yellow-400/40 transition-all duration-300"></div>
            <Image 
              src="/LogoFacu2.0.jpeg" 
              alt="Facureino" 
              width={60} 
              height={60} 
              className="rounded-full relative z-10 border-2 border-red-500/50 group-hover:border-yellow-400/70 transition-all duration-300 group-hover:scale-105" 
            />
          </div>
          
          {/* Texto del logo */}
          <motion.div
            className="hidden sm:block"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-yellow-400 group-hover:from-yellow-300 group-hover:to-red-300 transition-all duration-300">
              FACUREINO
            </h1>
          </motion.div>
        </Link>

        {/* Desktop Navigation - Comedy Club Style */}
        <nav className="hidden md:flex items-center space-x-6 text-base font-bold">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className={cn(
                "relative px-4 py-2 rounded-lg transition-all duration-300 group",
                pathname === "/" 
                  ? "text-yellow-300 bg-red-600/20 border border-red-500/50" 
                  : "text-gray-300 hover:text-yellow-400 hover:bg-red-600/10"
              )}
            >
              <span className="relative z-10 flex items-center">
                <Star className="w-4 h-4 mr-2" />
                INICIO
              </span>
              {pathname === "/" && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-yellow-600/30 rounded-lg"
                  layoutId="navbar-active"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/blog"
              className={cn(
                "relative px-4 py-2 rounded-lg transition-all duration-300 group",
                pathname === "/blog" 
                  ? "text-yellow-300 bg-red-600/20 border border-red-500/50" 
                  : "text-gray-300 hover:text-yellow-400 hover:bg-red-600/10"
              )}
            >
              <span className="relative z-10 flex items-center">
                <Mic className="w-4 h-4 mr-2" />
                BLOG
              </span>
              {pathname === "/blog" && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-yellow-600/30 rounded-lg"
                  layoutId="navbar-active"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/contacto"
              className={cn(
                "relative px-4 py-2 rounded-lg transition-all duration-300 group",
                pathname === "/contacto" 
                  ? "text-yellow-300 bg-red-600/20 border border-red-500/50" 
                  : "text-gray-300 hover:text-yellow-400 hover:bg-red-600/10"
              )}
            >
              <span className="relative z-10 flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                CONTACTO
              </span>
              {pathname === "/contacto" && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-yellow-600/30 rounded-lg"
                  layoutId="navbar-active"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          </motion.div>
        </nav>

        {/* Desktop Social Links - Clean Neon Style */}
        <div className="hidden md:flex items-center space-x-4 mr-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              href="https://www.instagram.com/facureino/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-2.5 rounded-full bg-black/50 border border-pink-500/40 hover:border-pink-400/80 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/25"
            >
              <Instagram className="h-5 w-5 text-pink-400 group-hover:text-pink-300 transition-colors duration-300 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 to-pink-500/0 group-hover:from-pink-500/20 group-hover:to-purple-500/20 rounded-full transition-all duration-300"></div>
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              href="https://x.com/facureinooo"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-2.5 rounded-full bg-black/50 border border-blue-500/40 hover:border-blue-400/80 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
            >
              <Twitter className="h-5 w-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/20 group-hover:to-cyan-500/20 rounded-full transition-all duration-300"></div>
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-2.5 rounded-full bg-black/50 border border-red-500/40 hover:border-red-400/80 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25"
            >
              <Youtube className="h-5 w-5 text-red-400 group-hover:text-red-300 transition-colors duration-300 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 to-red-500/0 group-hover:from-red-500/20 group-hover:to-red-600/20 rounded-full transition-all duration-300"></div>
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button - Neon Style */}
        <motion.button
          className="md:hidden relative p-2 rounded-lg bg-gradient-to-r from-red-600/20 to-yellow-600/20 border border-red-500/30 hover:border-yellow-400 transition-all duration-300 group"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{ rotate: isMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMenuOpen ? 
              <X className="h-6 w-6 text-yellow-400 group-hover:text-yellow-300" /> : 
              <Menu className="h-6 w-6 text-red-400 group-hover:text-red-300" />
            }
          </motion.div>
          <div className="absolute inset-0 bg-red-500/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </motion.button>
      </div>

      {/* Mobile Menu - Comedy Club Style */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-gradient-to-b from-black via-slate-900 to-black border-t-2 border-red-500/30 relative overflow-hidden"
          >
            {/* Efectos de luces en el menú móvil */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-red-500/30 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-yellow-500/20 rounded-full blur-lg animate-pulse delay-1000"></div>
            </div>
            
            <nav className="container py-6 space-y-6 relative z-10">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Link
                  href="/"
                  className={cn(
                    "flex items-center py-3 px-4 text-lg font-bold rounded-lg transition-all duration-300 group",
                    pathname === "/" 
                      ? "text-yellow-300 bg-gradient-to-r from-red-600/30 to-yellow-600/30 border border-red-500/50" 
                      : "text-gray-300 hover:text-yellow-400 hover:bg-red-600/20"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Star className="w-5 h-5 mr-3" />
                  INICIO
                  {pathname === "/" && <motion.div className="ml-auto w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />}
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  href="/blog"
                  className={cn(
                    "flex items-center py-3 px-4 text-lg font-bold rounded-lg transition-all duration-300 group",
                    pathname === "/blog" 
                      ? "text-yellow-300 bg-gradient-to-r from-red-600/30 to-yellow-600/30 border border-red-500/50" 
                      : "text-gray-300 hover:text-yellow-400 hover:bg-red-600/20"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Mic className="w-5 h-5 mr-3" />
                  BLOG
                  {pathname === "/blog" && <motion.div className="ml-auto w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />}
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  href="/contacto"
                  className={cn(
                    "flex items-center py-3 px-4 text-lg font-bold rounded-lg transition-all duration-300 group",
                    pathname === "/contacto" 
                      ? "text-yellow-300 bg-gradient-to-r from-red-600/30 to-yellow-600/30 border border-red-500/50" 
                      : "text-gray-300 hover:text-yellow-400 hover:bg-red-600/20"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Zap className="w-5 h-5 mr-3" />
                  CONTACTO
                  {pathname === "/contacto" && <motion.div className="ml-auto w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />}
                </Link>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-center space-x-8 pt-6 border-t-2 border-red-500/30"
              >
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                  <Link
                    href="https://www.instagram.com/facureino/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-3 rounded-full bg-black/50 border border-pink-500/40 hover:border-pink-400/80 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/25"
                  >
                    <Instagram className="h-6 w-6 text-pink-400 group-hover:text-pink-300 transition-colors duration-300 relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 to-pink-500/0 group-hover:from-pink-500/20 group-hover:to-purple-500/20 rounded-full transition-all duration-300"></div>
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.1, rotate: -5 }} whileTap={{ scale: 0.9 }}>
                  <Link
                    href="https://x.com/facureinooo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-3 rounded-full bg-black/50 border border-blue-500/40 hover:border-blue-400/80 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                  >
                    <Twitter className="h-6 w-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300 relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/20 group-hover:to-cyan-500/20 rounded-full transition-all duration-300"></div>
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                  <Link
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-3 rounded-full bg-black/50 border border-red-500/40 hover:border-red-400/80 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25"
                  >
                    <Youtube className="h-6 w-6 text-red-400 group-hover:text-red-300 transition-colors duration-300 relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 to-red-500/0 group-hover:from-red-500/20 group-hover:to-red-600/20 rounded-full transition-all duration-300"></div>
                  </Link>
                </motion.div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
