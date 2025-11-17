import { Sidebar } from "@/components/Sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Clock, Trash2 } from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: Date;
  time: string;
  type: "exam" | "assignment" | "project";
}

const initialEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Tarea de Desarrollo Web",
    description: "Proyecto Final: Aplicación Web Completa",
    date: new Date(2025, 10, 18),
    time: "23:59",
    type: "assignment"
  },
  {
    id: "2",
    title: "Certamen de Desarrollo Web",
    description: "HTML, CSS, JavaScript y React",
    date: new Date(2025, 10, 20),
    time: "14:00",
    type: "exam"
  },
  {
    id: "3",
    title: "Certamen de Estructuras de Datos",
    description: "Listas enlazadas y complejidad algorítmica",
    date: new Date(2025, 10, 25),
    time: "10:00",
    type: "exam"
  },
  {
    id: "4",
    title: "Proyecto de Bases de Datos",
    description: "Diseño de Base de Datos - Sistema de Biblioteca",
    date: new Date(2025, 10, 28),
    time: "23:59",
    type: "project"
  },
  {
    id: "5",
    title: "Tarea de Algoritmos y Complejidad",
    description: "Ejercicios de Divide y Vencerás",
    date: new Date(2025, 10, 22),
    time: "23:59",
    type: "assignment"
  },
  {
    id: "6",
    title: "Presentación Grupal - IA",
    description: "Proyecto de Machine Learning",
    date: new Date(2025, 10, 27),
    time: "14:00",
    type: "project"
  }
];

const typeColors: Record<string, string> = {
  exam: "bg-red-500 text-white",
  assignment: "bg-blue-500 text-white",
  project: "bg-orange-500 text-white"
};

const typeLabels: Record<string, string> = {
  exam: "Certamen",
  assignment: "Tarea",
  project: "Proyecto"
};

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<{
    title: string;
    description: string;
    time: string;
    type: "exam" | "assignment" | "project";
  }>({
    title: "",
    description: "",
    time: "",
    type: "exam"
  });

  const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", 
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days: (Date | null)[] = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevMonthDay = new Date(year, month, -startingDayOfWeek + i + 1);
      days.push(prevMonthDay);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i));
    }
    
    return days;
  };

  const days = getDaysInMonth(currentDate);

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  const getEventsForDate = (date: Date | null) => {
    if (!date) return [];
    return events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  const getFutureEvents = () => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return events
      .filter(event => event.date >= now)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.time) return;
    
    const dateToUse = selectedDate || new Date();
    const event: CalendarEvent = {
      id: Date.now().toString(),
      title: newEvent.title,
      description: newEvent.description,
      date: dateToUse,
      time: newEvent.time,
      type: newEvent.type
    };

    setEvents([...events, event]);
    setNewEvent({ title: "", description: "", time: "", type: "exam" });
    setIsDialogOpen(false);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const isCurrentMonth = (date: Date | null) => {
    if (!date) return false;
    return date.getMonth() === currentDate.getMonth();
  };

  const isSelected = (date: Date | null) => {
    if (!date || !selectedDate) return false;
    return date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear();
  };

  const futureEvents = getFutureEvents();
  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
        {/* Header con navegación y botón agregar */}
        <header className="bg-card border-b border-border p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <CalendarIcon className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={goToToday}>
                Hoy
              </Button>
              <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={goToNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="ml-2">
                    <Plus className="h-4 w-4 mr-1" />
                    Agregar Evento
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Agregar Evento</DialogTitle>
                    <DialogDescription>
                      Crea un nuevo evento en tu calendario académico
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Título</Label>
                      <Input
                        id="title"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        placeholder="Nombre del evento"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Descripción (opcional)</Label>
                      <Input
                        id="description"
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                        placeholder="Descripción del evento"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="time">Hora</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="type">Tipo</Label>
                      <Select
                        value={newEvent.type}
                        onValueChange={(value: "exam" | "assignment" | "project") => 
                          setNewEvent({ ...newEvent, type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="exam">Certamen</SelectItem>
                          <SelectItem value="assignment">Tarea</SelectItem>
                          <SelectItem value="project">Proyecto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label>Fecha seleccionada</Label>
                      <p className="text-sm text-muted-foreground">
                        {selectedDate 
                          ? selectedDate.toLocaleDateString('es-ES', { 
                              day: 'numeric', 
                              month: 'long', 
                              year: 'numeric' 
                            })
                          : "Selecciona una fecha en el calendario"
                        }
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddEvent}>Agregar Evento</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </header>

        {/* Contenedor principal: Calendario + Panel lateral */}
        <div className="flex-1 flex overflow-hidden">
          {/* Calendario - 70% */}
          <div className="flex-[7] p-4 overflow-auto">
            <div className="h-full flex flex-col">
              {/* Días de la semana */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map((day) => (
                  <div key={day} className="text-center font-semibold text-sm text-muted-foreground p-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Grid de días */}
              <div className="grid grid-cols-7 gap-1 flex-1">
                {days.map((date, index) => {
                  const dayEvents = date ? getEventsForDate(date) : [];
                  const isCurrentMonthDay = isCurrentMonth(date);
                  const isTodayDay = isToday(date);
                  const isSelectedDay = isSelected(date);

                  return (
                    <div
                      key={index}
                      onClick={() => date && setSelectedDate(date)}
                      className={`
                        border border-border rounded-lg p-2 cursor-pointer transition-all min-h-[120px] flex flex-col
                        ${!isCurrentMonthDay ? 'bg-muted/30 text-muted-foreground' : 'bg-card hover:bg-accent/20'}
                        ${isTodayDay ? 'ring-2 ring-primary' : ''}
                        ${isSelectedDay ? 'ring-2 ring-blue-500 bg-blue-50/50' : ''}
                      `}
                    >
                      <div className={`text-sm font-medium mb-1 ${isTodayDay ? 'text-primary font-bold' : ''}`}>
                        {date?.getDate()}
                      </div>
                      
                      {/* Eventos del día */}
                      <div className="flex flex-col gap-1 overflow-hidden">
                        {dayEvents.slice(0, 3).map((event) => (
                          <Badge
                            key={event.id}
                            className={`${typeColors[event.type]} text-xs px-1 py-0 truncate`}
                          >
                            {event.title}
                          </Badge>
                        ))}
                        {dayEvents.length > 3 && (
                          <span className="text-xs text-muted-foreground">
                            +{dayEvents.length - 3} más
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Panel lateral - 30% */}
          <div className="flex-[3] border-l border-border bg-card overflow-auto">
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Próximos Eventos
              </h2>

              {/* Eventos del día seleccionado */}
              {selectedDate && selectedDateEvents.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    {selectedDate.toLocaleDateString('es-ES', { 
                      weekday: 'long',
                      day: 'numeric', 
                      month: 'long' 
                    })}
                  </h3>
                  <div className="space-y-2">
                    {selectedDateEvents.map((event) => (
                      <div
                        key={event.id}
                        className="p-3 border border-border rounded-lg bg-background hover:bg-accent/20 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className={typeColors[event.type]}>
                                {typeLabels[event.type]}
                              </Badge>
                            </div>
                            <h4 className="font-medium text-sm mb-1">{event.title}</h4>
                            {event.description && (
                              <p className="text-xs text-muted-foreground mb-1">
                                {event.description}
                              </p>
                            )}
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {event.time}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleDeleteEvent(event.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Todos los eventos futuros */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Todos los eventos
                </h3>
                <div className="space-y-2">
                  {futureEvents.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No hay eventos próximos
                    </p>
                  ) : (
                    futureEvents.map((event) => (
                      <div
                        key={event.id}
                        className="p-3 border border-border rounded-lg bg-background hover:bg-accent/20 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className={typeColors[event.type]}>
                                {typeLabels[event.type]}
                              </Badge>
                            </div>
                            <h4 className="font-medium text-sm mb-1">{event.title}</h4>
                            {event.description && (
                              <p className="text-xs text-muted-foreground mb-1">
                                {event.description}
                              </p>
                            )}
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <CalendarIcon className="h-3 w-3" />
                                {event.date.toLocaleDateString('es-ES', {
                                  day: 'numeric',
                                  month: 'short'
                                })}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {event.time}
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleDeleteEvent(event.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CalendarPage;
