import Link from "next/link"
import { Instagram, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-gray-400 md:text-left">
            © 2024 Facu Reino. Todos los derechos reservados.
          </p>
        </div>
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
    </footer>
  )
}
