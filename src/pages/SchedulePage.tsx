import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface ScheduleClass {
  id: string;
  course: string;
  room: string;
  professor: string;
  startTime: string;
  endTime: string;
  day: number; // 0 = Lunes, 1 = Martes, etc.
  color: string;
}

const scheduleClasses: ScheduleClass[] = [
  {
    id: "1",
    course: "Estructuras de Datos",
    room: "Lab 301",
    professor: "Dr. García",
    startTime: "08:00",
    endTime: "10:00",
    day: 0,
    color: "#3b82f6"
  },
  {
    id: "2",
    course: "Desarrollo Web",
    room: "Sala 205",
    professor: "Dra. Rodríguez",
    startTime: "10:15",
    endTime: "12:15",
    day: 0,
    color: "#8b5cf6"
  },
  {
    id: "3",
    course: "Inteligencia Artificial",
    room: "Lab 302",
    professor: "Dr. Silva",
    startTime: "14:00",
    endTime: "16:00",
    day: 1,
    color: "#ec4899"
  },
  {
    id: "4",
    course: "Bases de Datos",
    room: "Lab 201",
    professor: "Dra. Martínez",
    startTime: "16:15",
    endTime: "18:15",
    day: 1,
    color: "#10b981"
  },
  {
    id: "5",
    course: "Estructuras de Datos",
    room: "Lab 301",
    professor: "Dr. García",
    startTime: "08:00",
    endTime: "10:00",
    day: 2,
    color: "#3b82f6"
  },
  {
    id: "6",
    course: "Desarrollo Web",
    room: "Sala 205",
    professor: "Dra. Rodríguez",
    startTime: "14:00",
    endTime: "16:00",
    day: 3,
    color: "#8b5cf6"
  },
  {
    id: "7",
    course: "Inteligencia Artificial",
    room: "Lab 302",
    professor: "Dr. Silva",
    startTime: "10:15",
    endTime: "12:15",
    day: 4,
    color: "#ec4899"
  },
  {
    id: "8",
    course: "Bases de Datos",
    room: "Lab 201",
    professor: "Dra. Martínez",
    startTime: "14:00",
    endTime: "16:00",
    day: 4,
    color: "#10b981"
  }
];

const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
const timeSlots = [
  "08:00 - 10:00",
  "10:15 - 12:15",
  "14:00 - 16:00",
  "16:15 - 18:15"
];

const SchedulePage = () => {
  const getClassForDayAndTime = (day: number, timeSlot: string) => {
    return scheduleClasses.find(
      (c) => c.day === day && `${c.startTime} - ${c.endTime}` === timeSlot
    );
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 ml-64">
        <header className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-foreground">Horario de Clases</h1>
            <p className="text-muted-foreground text-sm">Tu horario semanal</p>
          </div>
        </header>

        <div className="p-6">
          <Card>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border border-border bg-muted p-3 text-left font-semibold">
                        <Clock className="h-4 w-4" />
                      </th>
                      {days.map((day) => (
                        <th
                          key={day}
                          className="border border-border bg-muted p-3 text-center font-semibold"
                        >
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map((timeSlot) => (
                      <tr key={timeSlot}>
                        <td className="border border-border bg-muted/50 p-3 text-sm font-medium whitespace-nowrap">
                          {timeSlot}
                        </td>
                        {days.map((_, dayIndex) => {
                          const classInfo = getClassForDayAndTime(dayIndex, timeSlot);
                          return (
                            <td
                              key={dayIndex}
                              className="border border-border p-2 align-top"
                            >
                              {classInfo ? (
                                <div
                                  className="p-3 rounded-lg h-full"
                                  style={{ backgroundColor: classInfo.color + '20' }}
                                >
                                  <p className="font-semibold text-sm mb-1" style={{ color: classInfo.color }}>
                                    {classInfo.course}
                                  </p>
                                  <p className="text-xs text-muted-foreground mb-1">
                                    {classInfo.room}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {classInfo.professor}
                                  </p>
                                </div>
                              ) : (
                                <div className="p-3 h-full min-h-[80px]"></div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SchedulePage;
