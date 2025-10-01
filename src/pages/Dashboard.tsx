import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, BookOpen, Clock } from "lucide-react";
import { courses } from "@/data/courses";

const Dashboard = () => {
  const totalPendingTasks = courses.reduce((acc, course) => acc + course.pendingTasks, 0);
  const totalCourses = courses.length;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 ml-64">
        <header className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-8 py-6">
            <h1 className="text-3xl font-bold text-foreground">Inicio</h1>
            <p className="text-muted-foreground mt-1">Bienvenido, Juan Pérez</p>
          </div>
        </header>

        <div className="p-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Asignaturas Activas
                </CardTitle>
                <BookOpen className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{totalCourses}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Semestre actual
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Tareas Pendientes
                </CardTitle>
                <Clock className="h-5 w-5 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent">{totalPendingTasks}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Requieren atención
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Próximos Exámenes
                </CardTitle>
                <Bell className="h-5 w-5 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-destructive">2</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Esta semana
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 pb-4 border-b border-border last:border-0">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Nueva tarea disponible</p>
                    <p className="text-sm text-muted-foreground">Estructuras de Datos - Ejercicios de Complejidad</p>
                    <p className="text-xs text-muted-foreground mt-1">Hace 2 horas</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 pb-4 border-b border-border last:border-0">
                  <div className="h-2 w-2 rounded-full bg-accent mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Material de estudio subido</p>
                    <p className="text-sm text-muted-foreground">Desarrollo Web - Apuntes de React</p>
                    <p className="text-xs text-muted-foreground mt-1">Hace 5 horas</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 pb-4 border-b border-border last:border-0">
                  <div className="h-2 w-2 rounded-full bg-destructive mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Recordatorio de examen</p>
                    <p className="text-sm text-muted-foreground">Bases de Datos - Examen Final en 10 días</p>
                    <p className="text-xs text-muted-foreground mt-1">Hace 1 día</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
