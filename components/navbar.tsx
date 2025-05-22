"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Instagram, Twitter, Youtube, Menu, X } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/LogoFacu2.0.jpeg" alt="Facureino" width={60} height={60} className="rounded-full" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link
            href="/"
            className={cn(
              "transition-colors hover:text-white",
              pathname === "/" ? "text-pink-700" : "text-pink-400"
            )}
          >
            Inicio
          </Link>
          <Link
            href="/blog"
            className={cn(
              "transition-colors hover:text-white",
              pathname === "/blog" ? "text-pink-700" : "text-pink-400"
            )}
          >
            Blog
          </Link>
          <Link
            href="/contacto"
            className={cn(
              "transition-colors hover:text-white",
              pathname === "/contacto" ? "text-pink-700" : "text-pink-400"
            )}
          >
            Contacto
          </Link>
        </nav>

        {/* Desktop Social Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="https://www.instagram.com/facureino/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-400 hover:text-white transition-colors"
          >
            <Instagram className="h-6 w-6" />
          </Link>
          <Link
            href="https://x.com/facureinooo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-400 hover:text-white transition-colors"
          >
            <Twitter className="h-6 w-6" />
          </Link>
          <Link
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-400 hover:text-white transition-colors"
          >
            <Youtube className="h-6 w-6" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-pink-400 hover:text-white transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-black/95 border-t border-gray-800"
          >
            <nav className="container py-4 space-y-4">
              <Link
                href="/"
                className={cn(
                  "block py-2 text-sm font-medium transition-colors hover:text-white",
                  pathname === "/" ? "text-pink-700" : "text-pink-400"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href="/blog"
                className={cn(
                  "block py-2 text-sm font-medium transition-colors hover:text-white",
                  pathname === "/blog" ? "text-pink-700" : "text-pink-400"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/contacto"
                className={cn(
                  "block py-2 text-sm font-medium transition-colors hover:text-white",
                  pathname === "/contacto" ? "text-pink-700" : "text-pink-400"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
              <div className="flex items-center space-x-6 pt-4 border-t border-gray-800">
                <Link
                  href="https://www.instagram.com/facureino/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-400 hover:text-white transition-colors"
                >
                  <Instagram className="h-6 w-6" />
                </Link>
                <Link
                  href="https://x.com/facureinooo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-400 hover:text-white transition-colors"
                >
                  <Twitter className="h-6 w-6" />
                </Link>
                <Link
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-400 hover:text-white transition-colors"
                >
                  <Youtube className="h-6 w-6" />
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
