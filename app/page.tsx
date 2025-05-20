import Gallery from "@/components/gallery"
import CalendarSection from "@/components/calendar-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold">Facu Reino</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Comediante de StandUp homosexual,chupavergas,gay,gay gay gay
          </p>
          <div className="pt-4">
            <Button asChild size="lg">
              <Link href="/contacto">Contáctame</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12" id="galeria">
        <h2 className="text-3xl font-bold mb-8 text-center">Galería</h2>
        <Gallery />
      </section>

      {/* Calendar Section */}
      <section className="py-12" id="calendario">
        <h2 className="text-3xl font-bold mb-8 text-center">Próximos Shows</h2>
        <CalendarSection />
      </section>
    </div>
  )
}
