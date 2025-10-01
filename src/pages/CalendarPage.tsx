import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CalendarEvent {
  id: string;
  title: string;
  course: string;
  date: string;
  time: string;
  type: "exam" | "assignment" | "class";
  color: string;
}

const events: CalendarEvent[] = [
  {
    id: "1",
    title: "Examen Parcial",
    course: "Estructuras de Datos",
    date: "15 Oct 2024",
    time: "10:00",
    type: "exam",
    color: "#3b82f6"
  },
  {
    id: "2",
    title: "Entrega Proyecto Final",
    course: "Desarrollo Web",
    date: "18 Oct 2024",
    time: "23:59",
    type: "assignment",
    color: "#f59e0b"
  },
  {
    id: "3",
    title: "Presentación Grupal",
    course: "Inteligencia Artificial",
    date: "20 Oct 2024",
    time: "14:00",
    type: "assignment",
    color: "#ec4899"
  },
  {
    id: "4",
    title: "Clase: Redes Neuronales",
    course: "Inteligencia Artificial",
    date: "21 Oct 2024",
    time: "14:00",
    type: "class",
    color: "#ec4899"
  },
  {
    id: "5",
    title: "Entrega Tarea 1",
    course: "Estructuras de Datos",
    date: "20 Oct 2024",
    time: "23:59",
    type: "assignment",
    color: "#3b82f6"
  },
  {
    id: "6",
    title: "Examen Final",
    course: "Bases de Datos",
    date: "25 Oct 2024",
    time: "16:00",
    type: "exam",
    color: "#10b981"
  },
  {
    id: "7",
    title: "Quiz: Consultas SELECT",
    course: "Bases de Datos",
    date: "22 Oct 2024",
    time: "18:00",
    type: "assignment",
    color: "#10b981"
  },
  {
    id: "8",
    title: "Entrega Práctica: Lista Doblemente Enlazada",
    course: "Estructuras de Datos",
    date: "27 Oct 2024",
    time: "23:59",
    type: "assignment",
    color: "#3b82f6"
  }
];

const typeColors = {
  exam: "bg-destructive text-destructive-foreground",
  assignment: "bg-accent text-accent-foreground",
  class: "bg-primary text-primary-foreground"
};

const typeLabels = {
  exam: "Examen",
  assignment: "Entrega",
  class: "Clase"
};

const CalendarPage = () => {
  const sortedEvents = [...events].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const upcomingEvents = sortedEvents.slice(0, 5);
  const exams = sortedEvents.filter(e => e.type === "exam");
  const assignments = sortedEvents.filter(e => e.type === "assignment");

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 ml-64">
        <header className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-8 py-6">
            <h1 className="text-3xl font-bold text-foreground">Calendario Académico</h1>
            <p className="text-muted-foreground mt-1">Todas tus evaluaciones y eventos</p>
          </div>
        </header>

        <div className="p-8">
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="exams">Exámenes</TabsTrigger>
              <TabsTrigger value="assignments">Entregas</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Próximos Eventos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sortedEvents.map((event) => (
                      <div 
                        key={event.id} 
                        className="flex gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors border-l-4"
                        style={{ borderLeftColor: event.color }}
                      >
                        <div className="text-center min-w-[80px]">
                          <p className="text-2xl font-bold text-primary">
                            {new Date(event.date).getDate()}
                          </p>
                          <p className="text-xs text-muted-foreground uppercase">
                            {new Date(event.date).toLocaleDateString('es-ES', { month: 'short' })}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(event.date).getFullYear()}
                          </p>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-medium text-lg">{event.title}</p>
                              <p className="text-sm text-muted-foreground">{event.course}</p>
                            </div>
                            <Badge className={typeColors[event.type]} variant="secondary">
                              {typeLabels[event.type]}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{event.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="exams" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Exámenes Programados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {exams.map((event) => (
                      <div 
                        key={event.id} 
                        className="flex gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors border-l-4"
                        style={{ borderLeftColor: event.color }}
                      >
                        <div className="text-center min-w-[80px]">
                          <p className="text-2xl font-bold text-destructive">
                            {new Date(event.date).getDate()}
                          </p>
                          <p className="text-xs text-muted-foreground uppercase">
                            {new Date(event.date).toLocaleDateString('es-ES', { month: 'short' })}
                          </p>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-medium text-lg">{event.title}</p>
                              <p className="text-sm text-muted-foreground">{event.course}</p>
                            </div>
                            <Badge className={typeColors[event.type]} variant="secondary">
                              {typeLabels[event.type]}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{event.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assignments" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Entregas y Tareas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assignments.map((event) => (
                      <div 
                        key={event.id} 
                        className="flex gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors border-l-4"
                        style={{ borderLeftColor: event.color }}
                      >
                        <div className="text-center min-w-[80px]">
                          <p className="text-2xl font-bold text-accent">
                            {new Date(event.date).getDate()}
                          </p>
                          <p className="text-xs text-muted-foreground uppercase">
                            {new Date(event.date).toLocaleDateString('es-ES', { month: 'short' })}
                          </p>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-medium text-lg">{event.title}</p>
                              <p className="text-sm text-muted-foreground">{event.course}</p>
                            </div>
                            <Badge className={typeColors[event.type]} variant="secondary">
                              {typeLabels[event.type]}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{event.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default CalendarPage;
