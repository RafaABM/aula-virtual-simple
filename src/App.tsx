import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import CalendarPage from "./pages/CalendarPage";
import SchedulePage from "./pages/SchedulePage";
import GradesPage from "./pages/GradesPage";
import AccesosPage from "./pages/AccesosPage";
import CourseDetail from "./pages/CourseDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/asignaturas" element={<Courses />} />
          <Route path="/calendario" element={<CalendarPage />} />
          <Route path="/horario" element={<SchedulePage />} />
          <Route path="/calificaciones" element={<GradesPage />} />
          <Route path="/accesos" element={<AccesosPage />} />
          <Route path="/asignatura/:courseId" element={<CourseDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
