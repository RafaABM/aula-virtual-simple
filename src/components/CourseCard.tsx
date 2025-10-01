import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, FileText } from "lucide-react";
import { Link } from "react-router-dom";

interface CourseCardProps {
  id: string;
  code: string;
  title: string;
  description: string;
  professor: string;
  nextClass?: string;
  pendingTasks: number;
  color: string;
}

export function CourseCard({ id, code, title, description, professor, nextClass, pendingTasks, color }: CourseCardProps) {
  return (
    <Link to={`/asignatura/${id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-l-4" style={{ borderLeftColor: color }}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <Badge variant="secondary" className="mb-2 text-xs">{code}</Badge>
              <CardTitle className="text-lg mb-1">{title}</CardTitle>
              <CardDescription className="text-sm">{description}</CardDescription>
            </div>
            <BookOpen className="h-8 w-8 text-muted-foreground" style={{ color }} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Profesor:</span> {professor}
            </p>
            {nextClass && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Próxima clase: {nextClass}</span>
              </div>
            )}
            {pendingTasks > 0 && (
              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-accent" />
                <span className="text-accent font-medium">{pendingTasks} tarea{pendingTasks > 1 ? 's' : ''} pendiente{pendingTasks > 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
