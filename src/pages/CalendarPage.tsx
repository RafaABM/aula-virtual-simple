import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, Clock, Plus, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
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

interface CalendarEvent {
  id: string;
  title: string;
  course: string;
  date: Date;
  time: string;
  type: "exam" | "assignment" | "custom";
  color: string;
}

const initialEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Examen Parcial",
    course: "Estructuras de Datos",
    date: new Date(2024, 9, 15),
    time: "10:00",
    type: "exam",
    color: "#ef4444"
  },
  {
    id: "2",
    title: "Entrega Proyecto Final",
    course: "Desarrollo Web",
    date: new Date(2024, 9, 18),
    time: "23:59",
    type: "assignment",
    color: "#f59e0b"
  },
  {
    id: "3",
    title: "Presentación Grupal",
    course: "Inteligencia Artificial",
    date: new Date(2024, 9, 20),
    time: "14:00",
    type: "assignment",
    color: "#ec4899"
  },
  {
    id: "4",
    title: "Entrega Tarea 1",
    course: "Estructuras de Datos",
    date: new Date(2024, 9, 20),
    time: "23:59",
    type: "assignment",
    color: "#f59e0b"
  },
  {
    id: "5",
    title: "Examen Final",
    course: "Bases de Datos",
    date: new Date(2024, 9, 25),
    time: "16:00",
    type: "exam",
    color: "#ef4444"
  },
  {
    id: "6",
    title: "Quiz: Consultas SELECT",
    course: "Bases de Datos",
    date: new Date(2024, 9, 22),
    time: "18:00",
    type: "assignment",
    color: "#f59e0b"
  },
  {
    id: "7",
    title: "Entrega Práctica: Lista Doblemente Enlazada",
    course: "Estructuras de Datos",
    date: new Date(2024, 9, 27),
    time: "23:59",
    type: "assignment",
    color: "#f59e0b"
  }
];

const typeColors = {
  exam: "bg-destructive text-destructive-foreground",
  assignment: "bg-accent text-accent-foreground",
  custom: "bg-primary text-primary-foreground"
};

const typeLabels = {
  exam: "Examen",
  assignment: "Entrega",
  custom: "Personalizado"
};

type FilterType = "all" | "exam" | "assignment";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [filter, setFilter] = useState<FilterType>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    course: "",
    time: "",
    type: "custom" as const
  });

  const filteredEvents = events.filter(event => {
    if (filter === "all") return true;
    return event.type === filter;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => 
    a.date.getTime() - b.date.getTime()
  );

  const selectedDateEvents = selectedDate 
    ? sortedEvents.filter(event => {
        return event.date.toDateString() === selectedDate.toDateString();
      })
    : [];
  
  const eventDates = new Set(filteredEvents.map(e => e.date.toDateString()));

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.time || !selectedDate) return;

    const event: CalendarEvent = {
      id: Date.now().toString(),
      title: newEvent.title,
      course: newEvent.course || "Sin asignatura",
      date: selectedDate,
      time: newEvent.time,
      type: newEvent.type,
      color: "#3b82f6"
    };

    setEvents([...events, event]);
    setNewEvent({ title: "", course: "", time: "", type: "custom" });
    setIsDialogOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 ml-64">
        <header className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-foreground">Calendario Académico</h1>
            <p className="text-muted-foreground text-sm">Todas tus evaluaciones y eventos</p>
          </div>
        </header>

        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Calendario */}
            <div className="lg:w-2/3">
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5" />
                      Calendario
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1 bg-muted p-1 rounded-lg">
                        <Button
                          variant={filter === "all" ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setFilter("all")}
                        >
                          Todos
                        </Button>
                        <Button
                          variant={filter === "exam" ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setFilter("exam")}
                        >
                          Exámenes
                        </Button>
                        <Button
                          variant={filter === "assignment" ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setFilter("assignment")}
                        >
                          Entregas
                        </Button>
                      </div>
                      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                          <Button size="sm">
                            <Plus className="h-4 w-4 mr-1" />
                            Agregar
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Agregar Evento</DialogTitle>
                            <DialogDescription>
                              Crea un evento personalizado en tu calendario
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
                              <Label htmlFor="course">Asignatura (opcional)</Label>
                              <Input
                                id="course"
                                value={newEvent.course}
                                onChange={(e) => setNewEvent({ ...newEvent, course: e.target.value })}
                                placeholder="Nombre de la asignatura"
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
                              <Label>Fecha seleccionada</Label>
                              <p className="text-sm text-muted-foreground">
                                {selectedDate?.toLocaleDateString('es-ES', { 
                                  day: 'numeric', 
                                  month: 'long', 
                                  year: 'numeric' 
                                })}
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
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="w-full pointer-events-auto border-0"
                    modifiers={{
                      hasEvent: (date) => eventDates.has(date.toDateString())
                    }}
                    modifiersClassNames={{
                      hasEvent: "bg-primary/20 font-bold"
                    }}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Eventos del día */}
            <div className="lg:w-1/3">
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">
                    {selectedDate 
                      ? selectedDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })
                      : 'Selecciona una fecha'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedDateEvents.length > 0 ? (
                    <div className="space-y-3 max-h-[500px] overflow-y-auto">
                      {selectedDateEvents.map((event) => (
                        <div 
                          key={event.id} 
                          className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors border-l-4"
                          style={{ borderLeftColor: event.color }}
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <p className="font-medium text-sm">{event.title}</p>
                            <Badge className={typeColors[event.type]} variant="secondary">
                              {typeLabels[event.type]}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{event.course}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{event.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      No hay eventos para esta fecha
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CalendarPage;
