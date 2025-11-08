import { useParams, Link, useSearchParams } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { courses, coursesGrades } from "@/data/courses";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Download, 
  Video, 
  Link as LinkIcon, 
  MessageSquare, 
  ClipboardList,
  ArrowLeft,
  Calendar,
  User,
  TrendingUp,
  TrendingDown,
  Minus
} from "lucide-react";
import { cn } from "@/lib/utils";

const materialIcons = {
  file: FileText,
  link: LinkIcon,
  video: Video,
  assignment: ClipboardList,
  forum: MessageSquare,
  quiz: ClipboardList
};

const materialColors = {
  file: "text-blue-600",
  link: "text-purple-600",
  video: "text-red-600",
  assignment: "text-orange-600",
  forum: "text-green-600",
  quiz: "text-pink-600"
};

const getGradeStatus = (average: number) => {
  if (average >= 6.0) return { icon: TrendingUp, color: "text-success", label: "Aprobado" };
  if (average >= 4.0) return { icon: Minus, color: "text-warning", label: "En riesgo" };
  return { icon: TrendingDown, color: "text-destructive", label: "Reprobado" };
};

const CourseDetail = () => {
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const course = courses.find(c => c.id === courseId);
  const courseGrade = coursesGrades.find(cg => cg.courseId === courseId);
  const defaultTab = searchParams.get('tab') || 'material';

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Asignatura no encontrada</h1>
          <Link to="/">
            <Button>Volver al inicio</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 ml-64">
        {/* Course Header */}
        <header className="bg-card border-b border-border">
          <div className="px-8 py-6">
            <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Volver a Mis Asignaturas
            </Link>
            
            <div className="flex items-start justify-between">
              <div>
                <Badge variant="secondary" className="mb-2">{course.code}</Badge>
                <h1 className="text-3xl font-bold text-foreground">{course.title}</h1>
                <p className="text-muted-foreground mt-2">{course.description}</p>
                
                <div className="flex items-center gap-6 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{course.professor}</span>
                  </div>
                  {course.nextClass && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{course.nextClass}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="h-16 w-16 rounded-lg flex items-center justify-center" 
                   style={{ backgroundColor: course.color + '20' }}>
                <FileText className="h-8 w-8" style={{ color: course.color }} />
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full max-w-2xl grid-cols-5">
              <TabsTrigger value="material">Material</TabsTrigger>
              <TabsTrigger value="tareas">Tareas</TabsTrigger>
              <TabsTrigger value="calificaciones">Calificaciones</TabsTrigger>
              <TabsTrigger value="foros">Foros</TabsTrigger>
              <TabsTrigger value="encuestas">Encuestas</TabsTrigger>
            </TabsList>

            <TabsContent value="material" className="mt-8">
              <div className="space-y-8">
                {course.units.map((unit) => (
                  <Card key={unit.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">
                          {unit.number}
                        </div>
                        <span>Unidad {unit.number}: {unit.title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {unit.materials.map((material) => {
                          const Icon = materialIcons[material.type];
                          const colorClass = materialColors[material.type];
                          
                          return (
                            <div 
                              key={material.id}
                              className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex flex-col items-center gap-2">
                                <div className={cn(colorClass)}>
                                  <Icon className="h-5 w-5" />
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-foreground">{material.title}</h4>
                                {material.description && (
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {material.description}
                                  </p>
                                )}
                                {material.dueDate && (
                                  <div className="flex items-center gap-2 mt-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">
                                      Fecha de entrega: {material.dueDate}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tareas" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Tareas y Proyectos</CardTitle>
                  <CardDescription>Lista de todas las entregas de la asignatura</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {course.units.flatMap(unit => 
                      unit.materials.filter(m => m.type === "assignment")
                    ).map(assignment => (
                      <div key={assignment.id} className="flex items-start justify-between p-4 border border-border rounded-lg">
                        <div className="flex items-start gap-3">
                          <ClipboardList className="h-5 w-5 text-orange-600 mt-1" />
                          <div>
                            <h4 className="font-medium">{assignment.title}</h4>
                            {assignment.description && (
                              <p className="text-sm text-muted-foreground mt-1">{assignment.description}</p>
                            )}
                            {assignment.dueDate && (
                              <p className="text-sm text-muted-foreground mt-2">
                                Vence: {assignment.dueDate}
                              </p>
                            )}
                          </div>
                        </div>
                        <Badge variant="secondary">Pendiente</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="calificaciones" className="mt-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Calificaciones</CardTitle>
                      <CardDescription>Tus notas en esta asignatura</CardDescription>
                    </div>
                    {courseGrade && (
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Promedio</p>
                        <p className="text-3xl font-bold" style={{ color: course.color }}>
                          {courseGrade.average.toFixed(1)}
                        </p>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {courseGrade ? (
                    <div className="space-y-3">
                      {courseGrade.grades.map((grade) => {
                        const status = getGradeStatus(grade.grade);
                        const StatusIcon = status.icon;
                        
                        return (
                          <div
                            key={grade.id}
                            className="flex items-center justify-between p-4 rounded-lg border border-border"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <p className="font-medium">{grade.name}</p>
                                <StatusIcon className={`h-4 w-4 ${status.color}`} />
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                Ponderación: {grade.weight}% • {grade.date}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold" style={{ color: course.color }}>
                                {grade.grade.toFixed(1)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Las calificaciones se publicarán próximamente.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="foros" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Foros de Discusión</CardTitle>
                  <CardDescription>Participa en las discusiones del curso</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {course.units.flatMap(unit => 
                      unit.materials.filter(m => m.type === "forum")
                    ).map(forum => (
                      <div key={forum.id} className="flex items-start gap-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                        <MessageSquare className="h-5 w-5 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-medium">{forum.title}</h4>
                          {forum.description && (
                            <p className="text-sm text-muted-foreground mt-1">{forum.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="encuestas" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Encuestas</CardTitle>
                  <CardDescription>Cuestionarios y evaluaciones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {course.units.flatMap(unit => 
                      unit.materials.filter(m => m.type === "quiz")
                    ).map(quiz => (
                      <div key={quiz.id} className="flex items-start justify-between p-4 border border-border rounded-lg">
                        <div className="flex items-start gap-3">
                          <ClipboardList className="h-5 w-5 text-pink-600 mt-1" />
                          <div>
                            <h4 className="font-medium">{quiz.title}</h4>
                            {quiz.dueDate && (
                              <p className="text-sm text-muted-foreground mt-1">
                                Disponible hasta: {quiz.dueDate}
                              </p>
                            )}
                          </div>
                        </div>
                        <Button>Iniciar</Button>
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

export default CourseDetail;
