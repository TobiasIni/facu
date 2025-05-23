"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, CalendarIcon, Clock, ArrowRight } from "lucide-react" // Se agrega ArrowRight para el botón
import { createClient } from "@/utils/supabase/client"
import { AnimatePresence, motion } from "framer-motion" // Para animaciones

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
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
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

  const getEventsForDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return []

    return events.filter(
      (event) =>
        event.date.getDate() === selectedDate.getDate() &&
        event.date.getMonth() === selectedDate.getMonth() &&
        event.date.getFullYear() === selectedDate.getFullYear(),
    )
  }

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
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="ml-4 text-lg text-muted-foreground">Cargando eventos...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row gap-12 p-4 md:p-8 bg-background rounded-xl shadow-lg">
      {/* Calendario */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 min-w-[300px]"
      >
        <Card className="overflow-hidden shadow-2xl rounded-xl">
          <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-4">
            <CardTitle className="text-xl font-bold flex items-center">
              <CalendarIcon className="mr-2 h-6 w-6" /> Calendario de Eventos
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              className="w-full [&_.rdp-day_with_event]:relative [&_.rdp-day_with_event]:after:absolute [&_.rdp-day_with_event]:after:bottom-1 [&_.rdp-day_with_event]:after:left-1/2 [&_.rdp-day_with_event]:after:-translate-x-1/2 [&_.rdp-day_with_event]:after:h-1.5 [&_.rdp-day_with_event]:after:w-1.5 [&_.rdp-day_with_event]:after:rounded-full [&_.rdp-day_with_event]:after:bg-primary"
              classNames={{
                month: "space-y-4 p-4",
                caption_label: "hidden",
                nav: "flex items-center justify-between",
                nav_button: "h-8 w-8 p-0 opacity-70 hover:opacity-100 transition-opacity rounded-full bg-accent hover:bg-accent-foreground/10",
                nav_button_previous: "absolute left-2",
                nav_button_next: "absolute right-2",
                head_row: "flex justify-around mt-4",
                head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                row: "flex w-full mt-2 justify-around",
                cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-range-start)]:rounded-l-md [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 transition-all duration-200",
                day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                day_today: "bg-accent text-accent-foreground",
                day_outside: "text-muted-foreground opacity-50",
                day_disabled: "text-muted-foreground opacity-50",
                day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                day_hidden: "invisible"
              }}
              modifiers={{
                day_with_event: isDayWithEvent,
              }}
              components={{
                Caption: ({ displayMonth }) => (
                  <div className="flex justify-center pt-1 relative items-center">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        const newMonth = new Date(currentMonth)
                        newMonth.setMonth(newMonth.getMonth() - 1)
                        setCurrentMonth(newMonth)
                      }}
                      className="absolute left-2 h-8 w-8 p-0 opacity-70 hover:opacity-100"
                    >
                      &lt;
                    </Button>
                    <h2 className="text-lg font-semibold text-foreground">
                      {displayMonth.toLocaleDateString("es-ES", {
                        month: "long",
                        year: "numeric",
                      })}
                    </h2>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        const newMonth = new Date(currentMonth)
                        newMonth.setMonth(newMonth.getMonth() + 1)
                        setCurrentMonth(newMonth)
                      }}
                      className="absolute right-2 h-8 w-8 p-0 opacity-70 hover:opacity-100"
                    >
                      &gt;
                    </Button>
                  </div>
                ),
              }}
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Lista de Eventos */}
      <div className="flex-1 min-w-[300px]">
        <h3 className="text-2xl font-extrabold text-foreground mb-6 border-b pb-2">
          <span className="text-primary">Eventos para </span>
          {date ? (
            <span className="text-muted-foreground">
              {date.toLocaleDateString("es-ES", { weekday: 'long', day: "numeric", month: "long", year: "numeric" })}
            </span>
          ) : (
            "Selecciona una fecha"
          )}
        </h3>

        <AnimatePresence mode="wait">
          {selectedDateEvents.length > 0 ? (
            <motion.div
              key={date?.toDateString() || "no-date"} // Key para que AnimatePresence detecte cambios
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              {selectedDateEvents.map((event) => (
                <Card
                  key={event.id}
                  className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.01]"
                >
                  <CardHeader className="p-4 pb-2 bg-gradient-to-r from-card to-background relative">
                    <div className="flex justify-between items-center mb-2">
                      <CardTitle className="text-lg font-bold text-foreground line-clamp-1">
                        {event.title}
                      </CardTitle>
                      {event.sold_out ? (
                        <Badge variant="destructive" className="px-3 py-1 text-xs font-semibold rounded-full shadow-sm">Agotado</Badge>
                      ) : (
                        <Badge className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-sm">Disponible</Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-x-4 gap-y-1">
                      <div className="flex items-center">
                        <Clock className="mr-1.5 h-3.5 w-3.5 text-primary" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-1.5 h-3.5 w-3.5 text-primary" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    {!event.sold_out && event.tickets_url && (
                      <Button
                        className="mt-4 w-full text-base font-semibold py-2 transition-all duration-300 ease-in-out
                                   bg-primary hover:bg-primary/90 text-primary-foreground
                                   shadow-lg hover:shadow-xl group-hover:scale-[1.02] group-hover:bg-primary/95"
                        asChild
                      >
                        <a href={event.tickets_url} target="_blank" rel="noopener noreferrer">
                          Comprar Entradas <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </Button>
                    )}
                    {event.sold_out && (
                      <Button
                        className="mt-4 w-full text-base font-semibold py-2 cursor-not-allowed
                                   bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                        disabled
                      >
                        Entradas Agotadas
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={date?.toDateString() + "-no-events" || "no-date-no-events"} // Key único para este estado
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center p-10 border-2 border-dashed border-muted-foreground/30 rounded-xl bg-muted/20 text-muted-foreground flex flex-col items-center justify-center min-h-[200px]"
            >
              <CalendarIcon className="h-12 w-12 mb-4 text-muted-foreground/60" />
              <p className="text-lg font-medium">No hay eventos para esta fecha.</p>
              <p className="text-sm mt-2">Selecciona otro día en el calendario.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}