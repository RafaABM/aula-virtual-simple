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
  const [newEvent, setNewEvent] = useState<{
    title: string;
    course: string;
    time: string;
    type: "exam" | "assignment" | "custom";
  }>({
    title: "",
    course: "",
    time: "",
    type: "custom"
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
      
      <main className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
        <header className="bg-card border-b border-border">
          <div className="px-4 py-3 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-foreground">Calendario Académico</h1>
              <p className="text-muted-foreground text-xs">Todas tus evaluaciones y eventos</p>
            </div>
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
                  Certámenes
                </Button>
                <Button
                  variant={filter === "assignment" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setFilter("assignment")}
                >
                  Tareas
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
                      <Label htmlFor="type">Tipo</Label>
                      <Select
                        value={newEvent.type}
                        onValueChange={(value: "exam" | "assignment" | "custom") => 
                          setNewEvent({ ...newEvent, type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="exam">Certamen</SelectItem>
                          <SelectItem value="assignment">Tarea</SelectItem>
                          <SelectItem value="custom">Personalizado</SelectItem>
                        </SelectContent>
                      </Select>
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
        </header>

        <div className="flex-1 overflow-auto p-4">
          <div className="h-full">
            <style>{`
              .custom-calendar .rdp-day {
                position: relative;
              }
              .custom-calendar .rdp-day.has-exam::after {
                content: '';
                position: absolute;
                bottom: 2px;
                left: 50%;
                transform: translateX(-50%);
                width: 80%;
                height: 2px;
                background-color: hsl(var(--destructive));
              }
              .custom-calendar .rdp-day.has-assignment::after {
                content: '';
                position: absolute;
                bottom: 2px;
                left: 50%;
                transform: translateX(-50%);
                width: 80%;
                height: 2px;
                background-color: hsl(var(--accent));
              }
              .custom-calendar .rdp-day.has-both::after {
                content: '';
                position: absolute;
                bottom: 2px;
                left: 50%;
                transform: translateX(-50%);
                width: 80%;
                height: 3px;
                background: linear-gradient(to right, hsl(var(--destructive)) 50%, hsl(var(--accent)) 50%);
              }
              .custom-calendar .rdp {
                --rdp-cell-size: 60px;
              }
              .custom-calendar .rdp-months {
                justify-content: center;
              }
            `}</style>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="w-full pointer-events-auto border-0 custom-calendar h-full flex items-center justify-center"
              classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center mb-4",
                caption_label: "text-lg font-bold",
                nav: "space-x-1 flex items-center",
                nav_button: "h-9 w-9 bg-transparent p-0 opacity-50 hover:opacity-100",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse",
                head_row: "flex",
                head_cell: "text-muted-foreground rounded-md w-[60px] font-normal text-sm",
                row: "flex w-full mt-2",
                cell: "h-[60px] w-[60px] text-center text-sm p-0 relative",
                day: "h-[60px] w-[60px] p-0 font-normal aria-selected:opacity-100 hover:bg-accent/20 rounded-md flex items-center justify-center",
                day_range_end: "day-range-end",
                day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                day_today: "bg-accent/30 text-accent-foreground font-bold",
                day_outside: "day-outside text-muted-foreground opacity-50",
                day_disabled: "text-muted-foreground opacity-50",
                day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                day_hidden: "invisible",
              }}
              components={{
                Day: ({ date, ...props }: any) => {
                  const dateStr = date.toDateString();
                  const dayEvents = filteredEvents.filter(e => e.date.toDateString() === dateStr);
                  const hasExam = dayEvents.some(e => e.type === "exam");
                  const hasAssignment = dayEvents.some(e => e.type === "assignment");
                  
                  let className = "";
                  if (hasExam && hasAssignment) {
                    className = "has-both";
                  } else if (hasExam) {
                    className = "has-exam";
                  } else if (hasAssignment) {
                    className = "has-assignment";
                  }

                  return (
                    <div className={className}>
                      <button {...props} className={props.className}>
                        {date.getDate()}
                      </button>
                    </div>
                  );
                },
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CalendarPage;
