import { Sidebar } from "@/components/Sidebar";
import { CourseCard } from "@/components/CourseCard";
import { courses } from "@/data/courses";

const Courses = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 ml-64">
        <header className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-8 py-6">
            <h1 className="text-3xl font-bold text-foreground">Mis Asignaturas</h1>
            <p className="text-muted-foreground mt-1">Semestre Otoño 2024</p>
          </div>
        </header>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Courses;
