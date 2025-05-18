"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, CalendarIcon, Clock } from "lucide-react"

// Datos de ejemplo para los eventos
const events = [
  {
    id: 1,
    title: "Show en Teatro Nacional",
    date: new Date(2025, 4, 20), // 20 de Mayo de 2025
    time: "20:00",
    location: "Teatro Nacional, Madrid",
    tickets: "https://example.com/tickets/1",
    sold_out: false,
  },
  {
    id: 2,
    title: "Festival de Comedia",
    date: new Date(2025, 4, 25), // 25 de Mayo de 2025
    time: "19:30",
    location: "Auditorio Municipal, Barcelona",
    tickets: "https://example.com/tickets/2",
    sold_out: false,
  },
  {
    id: 3,
    title: "Show Especial",
    date: new Date(2025, 5, 5), // 5 de Junio de 2025
    time: "21:00",
    location: "Club de Comedia, Valencia",
    tickets: "https://example.com/tickets/3",
    sold_out: true,
  },
  {
    id: 4,
    title: "Gira Internacional",
    date: new Date(2025, 5, 15), // 15 de Junio de 2025
    time: "20:30",
    location: "Teatro Metropólitan, Ciudad de México",
    tickets: "https://example.com/tickets/4",
    sold_out: false,
  },
]

export default function CalendarSection() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Función para obtener los eventos del día seleccionado
  const getEventsForDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return []

    return events.filter(
      (event) =>
        event.date.getDate() === selectedDate.getDate() &&
        event.date.getMonth() === selectedDate.getMonth() &&
        event.date.getFullYear() === selectedDate.getFullYear(),
    )
  }

  // Función para resaltar fechas con eventos en el calendario
  const isDayWithEvent = (day: Date) => {
    return events.some(
      (event) =>
        event.date.getDate() === day.getDate() &&
        event.date.getMonth() === day.getMonth() &&
        event.date.getFullYear() === day.getFullYear(),
    )
  }

  const selectedDateEvents = getEventsForDate(date)

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border shadow"
          modifiers={{
            event: isDayWithEvent,
          }}
          modifiersClassNames={{
            event: "bg-primary/20 font-bold text-primary",
          }}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-medium">
          {date ? (
            <>Eventos para {date.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}</>
          ) : (
            "Selecciona una fecha"
          )}
        </h3>

        {selectedDateEvents.length > 0 ? (
          <div className="space-y-4">
            {selectedDateEvents.map((event) => (
              <Card key={event.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{event.title}</CardTitle>
                    {event.sold_out ? <Badge variant="destructive">Agotado</Badge> : <Badge>Disponible</Badge>}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {event.date.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="mr-2 h-4 w-4" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="mr-2 h-4 w-4" />
                      {event.location}
                    </div>
                    {!event.sold_out && (
                      <Button className="mt-2 w-full" asChild>
                        <a href={event.tickets} target="_blank" rel="noopener noreferrer">
                          Comprar Entradas
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 border rounded-lg bg-muted/50">
            <p>No hay eventos programados para esta fecha.</p>
          </div>
        )}
      </div>
    </div>
  )
}
