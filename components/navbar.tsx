"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Instagram, Twitter, Youtube } from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logoFacu.jpg" alt="Facureino" width={84} height={70} />
          <span className="font-bold text-white">Facu Reino</span>
        </Link>

        <nav className="flex items-center space-x-8 text-sm font-medium">
          <Link
            href="/"
            className={cn(
              "transition-colors hover:text-white",
              pathname === "/" ? "text-white" : "text-gray-400"
            )}
          >
            Inicio
          </Link>
          <Link
            href="/blog"
            className={cn(
              "transition-colors hover:text-white",
              pathname === "/blog" ? "text-white" : "text-gray-400"
            )}
          >
            Blog
          </Link>
          <Link
            href="/contacto"
            className={cn(
              "transition-colors hover:text-white",
              pathname === "/contacto" ? "text-white" : "text-gray-400"
            )}
          >
            Contacto
          </Link>
        </nav>

        <div className="flex items-center space-x-6">
          <Link
            href="https://www.instagram.com/facureino/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Instagram className="h-6 w-6" />
          </Link>
          <Link
            href="https://x.com/facureinooo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Twitter className="h-6 w-6" />
          </Link>
          <Link
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Youtube className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </header>
  )
}
