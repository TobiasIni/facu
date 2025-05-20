"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Instagram, Menu, X, Youtube } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#ff9bf3] backdrop-blur supports-[backdrop-filter]:bg-[#ff9bf3]/60">
      <div className="container flex h-20 items-center justify-between">
        {/* Logo + Title */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logoFacu.jpg" alt="Facureino" width={84} height={65} />
          <span className="font-bold text-2xl">Facu reino</span>
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-8">
        <div className="flex items-center gap-8">
          <Link href="/#calendario" className="text-base font-medium transition-colors hover:text-primary">
            Calendario
          </Link>
          <Link href="/blog" className="text-base font-medium transition-colors hover:text-primary">
            Blog
          </Link>
          <Link href="/contacto" className="text-base font-medium transition-colors hover:text-primary">
            Contacto
          </Link>
          </div>
          <div className="flex items-center space-x-6 ml-8">
              <Link href="https://www.instagram.com/facureino/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-7 w-7 hover:text-primary transition-colors" />
              </Link>
              <Link href="https://x.com/facureinooo" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <X className="h-7 w-7 hover:text-primary transition-colors" />
              </Link>
              <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <Youtube className="h-7 w-7 hover:text-primary transition-colors" />
              </Link>
            </div>
        </nav>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b md:hidden">
            <div className="container py-4 flex flex-col gap-4">
              <Link
                href="/#calendario"
                className="text-sm font-small p-2 hover:bg-muted rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Calendario
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium p-2 hover:bg-muted rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/contacto"
                className="text-sm font-medium p-2 hover:bg-muted rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
