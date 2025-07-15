"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, CalendarIcon, Clock, ArrowRight, Mic, Star, Zap } from "lucide-react" // Íconos para estética comedy club
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
      <div className="flex justify-center items-center h-64 bg-gradient-to-br from-slate-900 to-black rounded-xl relative overflow-hidden">
        {/* Efecto de luces mientras carga */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-500/30 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-yellow-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>
        <div className="relative z-10 flex items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-500/30 border-t-yellow-400"></div>
          <p className="ml-4 text-lg text-yellow-400 font-bold">Preparando el show...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row gap-12 p-6 md:p-10 bg-gradient-to-br from-slate-900 via-black to-slate-900 rounded-2xl shadow-2xl relative overflow-hidden">
      {/* Efectos de luces de comedy club */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-40 h-40 bg-red-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-yellow-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      {/* Calendario - Comedy Club Style */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 min-w-[300px] relative z-10"
      >
        <Card className="overflow-hidden shadow-2xl rounded-xl bg-gradient-to-br from-slate-800 via-slate-900 to-black border-2 border-red-500/30">
          <CardHeader className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white p-6 relative overflow-hidden">
            {/* Efecto de neón en el header */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-red-400/10"></div>
            <CardTitle className="text-2xl font-black flex items-center relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-white">
              <Mic className="mr-3 h-8 w-8 text-yellow-400 animate-bounce" /> 
              PRÓXIMOS SHOWS
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 bg-slate-900">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              className="w-full text-white [&_.rdp-day_with_event]:relative [&_.rdp-day_with_event]:after:absolute [&_.rdp-day_with_event]:after:bottom-1 [&_.rdp-day_with_event]:after:left-1/2 [&_.rdp-day_with_event]:after:-translate-x-1/2 [&_.rdp-day_with_event]:after:h-2 [&_.rdp-day_with_event]:after:w-2 [&_.rdp-day_with_event]:after:rounded-full [&_.rdp-day_with_event]:after:bg-yellow-400 [&_.rdp-day_with_event]:after:animate-pulse"
              classNames={{
                month: "space-y-4 p-4",
                caption_label: "hidden",
                nav: "flex items-center justify-between",
                nav_button: "h-8 w-8 p-0 opacity-70 hover:opacity-100 transition-all duration-200 rounded-full bg-red-600/20 hover:bg-red-600/40 text-yellow-400 hover:text-yellow-300",
                nav_button_previous: "absolute left-2",
                nav_button_next: "absolute right-2",
                head_row: "flex justify-around mt-4",
                head_cell: "text-yellow-400 rounded-md w-9 font-bold text-[0.8rem]",
                row: "flex w-full mt-2 justify-around",
                cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-range-start)]:rounded-l-md [&:has([aria-selected])]:bg-red-600/30 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: "h-9 w-9 p-0 font-semibold aria-selected:opacity-100 transition-all duration-200 text-gray-300 hover:text-white hover:bg-red-600/20 rounded-md",
                day_selected: "bg-red-600 text-yellow-300 hover:bg-red-700 hover:text-yellow-200 focus:bg-red-600 focus:text-yellow-300 shadow-lg shadow-red-600/50",
                day_today: "bg-yellow-500/20 text-yellow-300 border border-yellow-400/50",
                day_outside: "text-gray-600 opacity-50",
                day_disabled: "text-gray-700 opacity-30",
                day_range_middle: "aria-selected:bg-red-600/30 aria-selected:text-yellow-300",
                day_hidden: "invisible"
              }}
              modifiers={{
                day_with_event: isDayWithEvent,
              }}
              components={{
                Caption: ({ displayMonth }) => (
                  <div className="flex justify-center pt-1 relative items-center bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg p-3 mb-4 border border-red-500/20">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        const newMonth = new Date(currentMonth)
                        newMonth.setMonth(newMonth.getMonth() - 1)
                        setCurrentMonth(newMonth)
                      }}
                      className="absolute left-2 h-8 w-8 p-0 opacity-70 hover:opacity-100 bg-red-600/20 hover:bg-red-600/40 text-yellow-400 rounded-full"
                    >
                      &lt;
                    </Button>
                    <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-400 text-center">
                      {displayMonth.toLocaleDateString("es-ES", {
                        month: "long",
                        year: "numeric",
                      }).toUpperCase()}
                    </h2>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        const newMonth = new Date(currentMonth)
                        newMonth.setMonth(newMonth.getMonth() + 1)
                        setCurrentMonth(newMonth)
                      }}
                      className="absolute right-2 h-8 w-8 p-0 opacity-70 hover:opacity-100 bg-red-600/20 hover:bg-red-600/40 text-yellow-400 rounded-full"
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

      {/* Lista de Eventos - Comedy Show Style */}
      <div className="flex-1 min-w-[300px] relative z-10">
        {/* Decoración de micrófono flotante */}
        <motion.div
          className="absolute -top-8 -right-8 text-red-500/20"
          animate={{ 
            rotate: [0, 5, -5, 0],
            y: [0, -5, 0] 
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Star className="w-12 h-12" />
        </motion.div>
        
        <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-xl p-6 border-2 border-yellow-400/30 relative overflow-hidden">
          {/* Efecto de neón en el fondo */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-yellow-500/5"></div>
          
          <h3 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-400 mb-6 relative z-10">
            <Zap className="inline-block mr-3 h-8 w-8 text-yellow-400 animate-pulse" />
            {date ? (
              <>
                SHOW DEL {date.toLocaleDateString("es-ES", { day: "numeric" })} DE {date.toLocaleDateString("es-ES", { month: "long" }).toUpperCase()}
              </>
            ) : (
              "ELEGÍ TU FECHA"
            )}
          </h3>
          {!date && (
            <p className="text-yellow-300 text-lg mb-6 italic relative z-10">
              Clickeá en el calendario para ver qué shows hay disponibles 🎭
            </p>
          )}

          <AnimatePresence mode="wait">
            {selectedDateEvents.length > 0 ? (
              <motion.div
                key={date?.toDateString() || "no-date"} // Key para que AnimatePresence detecte cambios
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-5 relative z-10"
              >
              {selectedDateEvents.map((event) => (
                <Card
                  key={event.id}
                  className="group relative overflow-hidden rounded-xl shadow-2xl hover:shadow-red-500/20 transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] bg-gradient-to-br from-slate-800 via-slate-900 to-black border-2 border-red-500/30 hover:border-yellow-400/50"
                >
                  {/* Efecto de spotlight en la tarjeta */}
                  <div className="absolute inset-0 bg-gradient-radial from-yellow-400/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <CardHeader className="p-6 pb-4 bg-gradient-to-r from-red-700/20 via-slate-800 to-red-700/20 relative overflow-hidden">
                    {/* Efecto de neón en el header */}
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-red-400/5 group-hover:from-yellow-400/10 group-hover:to-red-400/10 transition-all duration-500"></div>
                    
                    <div className="flex justify-between items-center mb-4 relative z-10">
                      <CardTitle className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-white line-clamp-1 group-hover:from-yellow-300 group-hover:to-yellow-100 transition-all duration-300">
                        {event.title}
                      </CardTitle>
                      {event.sold_out ? (
                        <Badge className="px-4 py-2 text-sm font-black rounded-full shadow-lg bg-red-600 text-white border border-red-400">
                          SOLD OUT
                        </Badge>
                      ) : (
                        <Badge className="px-4 py-2 text-sm font-black rounded-full shadow-lg bg-green-600 text-white border border-green-400 animate-pulse">
                          ¡DISPONIBLE!
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center text-base text-gray-300 gap-x-6 gap-y-2 relative z-10">
                      <div className="flex items-center group-hover:text-yellow-300 transition-colors duration-300">
                        <Clock className="mr-2 h-5 w-5 text-yellow-400" />
                        <span className="font-bold">{event.time}</span>
                      </div>
                      <div className="flex items-center group-hover:text-yellow-300 transition-colors duration-300">
                        <MapPin className="mr-2 h-5 w-5 text-red-400" />
                        <span className="font-bold">{event.location}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 pt-4 bg-slate-900/50 relative">
                    {!event.sold_out && event.tickets_url && (
                      <Button
                        className="mt-6 w-full text-lg font-black py-4 transition-all duration-500 ease-in-out transform hover:scale-105 active:scale-95
                                   bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white
                                   shadow-xl hover:shadow-2xl hover:shadow-red-500/30 border-2 border-red-400/50 hover:border-yellow-400
                                   rounded-lg relative overflow-hidden group"
                        asChild
                      >
                        <a href={event.tickets_url} target="_blank" rel="noopener noreferrer">
                          <span className="relative z-10 flex items-center justify-center">
                            🎟️ ¡CONSEGUIR ENTRADAS! 
                            <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                          </span>
                          {/* Efecto de brillo al hacer hover */}
                          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-red-400/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700"></div>
                        </a>
                      </Button>
                    )}
                    {event.sold_out && (
                      <Button
                        className="mt-6 w-full text-lg font-black py-4 cursor-not-allowed rounded-lg
                                   bg-gradient-to-r from-gray-700 to-gray-800 text-gray-400 border-2 border-gray-600/50
                                   shadow-xl relative overflow-hidden"
                        disabled
                      >
                        <span className="flex items-center justify-center">
                          😭 ENTRADAS AGOTADAS
                        </span>
                        {/* Patrón de "agotado" */}
                        <div className="absolute inset-0 bg-repeat opacity-10" 
                             style={{backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)"}}></div>
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
                className="text-center p-12 border-2 border-dashed border-red-500/30 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 text-white flex flex-col items-center justify-center min-h-[250px] relative overflow-hidden"
              >
                {/* Efecto de spotlight tenue */}
                <div className="absolute inset-0 bg-gradient-radial from-yellow-400/5 via-transparent to-transparent"></div>
                
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <Mic className="h-16 w-16 mb-6 text-red-400/60" />
                </motion.div>
                
                <h4 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-yellow-400 mb-4 relative z-10">
                  ¡NO HAY SHOW ESE DÍA!
                </h4>
                <p className="text-base text-yellow-400 italic relative z-10">
                  Las fechas remarcadas con color son los días que hay shows
                </p>
                
                {/* Decoración adicional */}
                <div className="absolute bottom-4 left-4 text-red-500/20">
                  <Star className="w-8 h-8" />
                </div>
                <div className="absolute top-4 right-4 text-yellow-400/20">
                  <Zap className="w-6 h-6" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}