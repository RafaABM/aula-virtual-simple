import { Sidebar } from "@/components/Sidebar";
import { CourseCard } from "@/components/CourseCard";
import { CalendarWidget } from "@/components/CalendarWidget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, BookOpen, CheckCircle2, Clock } from "lucide-react";
import { courses } from "@/data/courses";

const Index = () => {
  const totalPendingTasks = courses.reduce((acc, course) => acc + course.pendingTasks, 0);
  const totalCourses = courses.length;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 ml-64">
        <header className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-8 py-6">
            <h1 className="text-3xl font-bold text-foreground">Campus Virtual</h1>
            <p className="text-muted-foreground mt-1">Bienvenido, Juan Pérez</p>
          </div>
        </header>

        <div className="p-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Asignaturas Activas
                </CardTitle>
                <BookOpen className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{totalCourses}</div>
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
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Courses Section */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Mis Asignaturas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))}
              </div>
            </div>

            {/* Calendar Section */}
            <div className="lg:col-span-1">
              <CalendarWidget />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
