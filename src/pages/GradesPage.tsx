import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface Grade {
  id: string;
  name: string;
  grade: number;
  weight: number;
  date: string;
}

interface CourseGrades {
  courseId: string;
  courseName: string;
  courseCode: string;
  color: string;
  grades: Grade[];
  average: number;
}

const coursesGrades: CourseGrades[] = [
  {
    courseId: "ing-software",
    courseName: "Estructuras de Datos",
    courseCode: "INF-240",
    color: "#3b82f6",
    average: 5.8,
    grades: [
      { id: "1", name: "Tarea 1", grade: 6.2, weight: 15, date: "10 Sep 2024" },
      { id: "2", name: "Certamen 1", grade: 5.5, weight: 30, date: "25 Sep 2024" },
      { id: "3", name: "Tarea 2", grade: 6.0, weight: 15, date: "05 Oct 2024" }
    ]
  },
  {
    courseId: "desarrollo-web",
    courseName: "Desarrollo Web",
    courseCode: "INF-322",
    color: "#8b5cf6",
    average: 6.3,
    grades: [
      { id: "1", name: "Proyecto 1", grade: 6.5, weight: 25, date: "15 Sep 2024" },
      { id: "2", name: "Certamen 1", grade: 6.0, weight: 30, date: "28 Sep 2024" },
      { id: "3", name: "Tarea 1", grade: 6.5, weight: 15, date: "08 Oct 2024" }
    ]
  },
  {
    courseId: "ia",
    courseName: "Inteligencia Artificial",
    courseCode: "INF-352",
    color: "#ec4899",
    average: 5.5,
    grades: [
      { id: "1", name: "Tarea 1", grade: 5.8, weight: 20, date: "12 Sep 2024" },
      { id: "2", name: "Certamen 1", grade: 5.2, weight: 35, date: "30 Sep 2024" }
    ]
  },
  {
    courseId: "bd",
    courseName: "Bases de Datos",
    courseCode: "INF-239",
    color: "#10b981",
    average: 6.1,
    grades: [
      { id: "1", name: "Tarea 1", grade: 6.3, weight: 15, date: "08 Sep 2024" },
      { id: "2", name: "Certamen 1", grade: 6.0, weight: 30, date: "22 Sep 2024" },
      { id: "3", name: "Proyecto SQL", grade: 6.2, weight: 20, date: "01 Oct 2024" }
    ]
  }
];

const getGradeStatus = (average: number) => {
  if (average >= 6.0) return { icon: TrendingUp, color: "text-success", label: "Aprobado" };
  if (average >= 4.0) return { icon: Minus, color: "text-warning", label: "En riesgo" };
  return { icon: TrendingDown, color: "text-destructive", label: "Reprobado" };
};

const GradesPage = () => {
  const totalAverage = (
    coursesGrades.reduce((sum, course) => sum + course.average, 0) / coursesGrades.length
  ).toFixed(1);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 ml-64">
        <header className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Calificaciones</h1>
                <p className="text-muted-foreground text-sm">Tus notas y promedios</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Promedio General</p>
                <p className="text-3xl font-bold text-primary">{totalAverage}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6">
          <div className="grid gap-4">
            {coursesGrades.map((course) => {
              const status = getGradeStatus(course.average);
              const StatusIcon = status.icon;
              
              return (
                <Card key={course.courseId}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="h-12 w-12 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: course.color + '20' }}
                        >
                          <span className="font-bold text-lg" style={{ color: course.color }}>
                            {course.average.toFixed(1)}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-lg">{course.courseName}</CardTitle>
                            <Badge variant="outline">{course.courseCode}</Badge>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <StatusIcon className={`h-4 w-4 ${status.color}`} />
                            <span className={`text-sm ${status.color}`}>{status.label}</span>
                          </div>
                        </div>
                      </div>
                      <Link to={`/asignatura/${course.courseId}`}>
                        <Button variant="ghost" size="sm">
                          Ver detalles
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {course.grades.map((grade) => (
                        <div
                          key={grade.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                        >
                          <div className="flex-1">
                            <p className="font-medium text-sm">{grade.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Ponderación: {grade.weight}% • {grade.date}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold" style={{ color: course.color }}>
                              {grade.grade.toFixed(1)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GradesPage;
