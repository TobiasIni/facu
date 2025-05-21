"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, CalendarIcon, Clock } from "lucide-react"
import { createClient } from "@/utils/supabase/client"

interface Event {
  id: number
  title: string
  date: Date
  time: string
  location: string
  tickets_url: string | null
  sold_out: boolean
}

interface EventFromDB {
  id: number
  title: string
  date: string
  time: string
  location: string
  tickets_url: string | null
  sold_out: boolean
}

export default function CalendarSection() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('eventos')
        .select('*')
        .order('date', { ascending: true })

      if (error) {
        console.error('Error fetching events:', error)
        return
      }

      if (data) {
        // Convertir las fechas de string a Date
        const formattedEvents: Event[] = data.map((event: any) => ({
          id: event.id,
          title: event.title,
          date: new Date(event.date),
          time: event.time,
          location: event.location,
          tickets_url: event.tickets_url,
          sold_out: event.sold_out
        }))
        setEvents(formattedEvents)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

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

  if (loading) {
    return <div className="text-center p-8">Cargando eventos...</div>
  }

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
                    {!event.sold_out && event.tickets_url && (
                      <Button className="mt-2 w-full" asChild>
                        <a href={event.tickets_url} target="_blank" rel="noopener noreferrer">
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
