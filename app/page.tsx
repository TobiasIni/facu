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
            Que te cuesta ser feliz pelele
          </p>
          <div className="pt-4">
            <Button asChild size="lg">
              <Link href="/contacto">Contactame</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 bg-[#000000] -mx-4" id="galeria">
        <div className="container mx-auto">
          <img src="/BannerShows.png" alt="Facureino" className="w-3/4 mx-auto mb-4" />
          <Gallery />
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-12 bg-[#000000] -mx-4" id="calendario">
        <h2 className="text-3xl font-bold mb-8 text-center">Próximos Shows</h2>
        <CalendarSection />
      </section>
    </div>
  )
}
