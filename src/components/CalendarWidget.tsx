import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CalendarEvent {
  id: string;
  title: string;
  course: string;
  date: string;
  time: string;
  type: "exam" | "assignment" | "class";
}

const events: CalendarEvent[] = [
  {
    id: "1",
    title: "Examen Parcial",
    course: "Estructuras de Datos",
    date: "15 Oct",
    time: "10:00",
    type: "exam"
  },
  {
    id: "2",
    title: "Entrega Proyecto Final",
    course: "Desarrollo Web",
    date: "18 Oct",
    time: "23:59",
    type: "assignment"
  },
  {
    id: "3",
    title: "Presentación Grupal",
    course: "Inteligencia Artificial",
    date: "20 Oct",
    time: "14:00",
    type: "assignment"
  },
  {
    id: "4",
    title: "Examen Final",
    course: "Bases de Datos",
    date: "25 Oct",
    time: "16:00",
    type: "exam"
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

export function CalendarWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Próximas Evaluaciones
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="flex gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <div className="text-center min-w-[60px]">
                <p className="text-2xl font-bold text-primary">{event.date.split(' ')[0]}</p>
                <p className="text-xs text-muted-foreground uppercase">{event.date.split(' ')[1]}</p>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">{event.title}</p>
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
  );
}
