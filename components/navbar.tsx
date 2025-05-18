"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { ModeToggle } from "./mode-toggle"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-bold text-xl">
            Artista StandUp
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/#calendario" className="text-sm font-medium transition-colors hover:text-primary">
            Calendario
          </Link>
          <Link href="/blog" className="text-sm font-medium transition-colors hover:text-primary">
            Blog
          </Link>
          <Link href="/contacto" className="text-sm font-medium transition-colors hover:text-primary">
            Contacto
          </Link>
          <ModeToggle />
        </nav>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b md:hidden">
            <div className="container py-4 flex flex-col gap-4">
              <Link
                href="/#calendario"
                className="text-sm font-medium p-2 hover:bg-muted rounded-md"
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
              <div className="p-2">
                <ModeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
