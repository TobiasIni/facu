import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2">
            <img src="/logoFacu.jpg" alt="Facu Reino" className="w-20 h-30 rectangle-full" />
            </div>
            <p className="text-muted-foreground font-bold">
              Que se yo, te amo
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Seguime en mis redes</h3>
            <div className="flex space-x-4">
              <Link href="https://www.instagram.com/facureino/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-6 w-6 hover:text-primary transition-colors" />
              </Link>
              <Link href="https://x.com/facureinooo" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-6 w-6 hover:text-primary transition-colors" />
              </Link>
              <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <Youtube className="h-6 w-6 hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Facu Reino. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
