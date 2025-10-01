import { Home, BookOpen, Calendar, Settings, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Inicio", icon: Home, path: "/" },
  { title: "Mis Asignaturas", icon: BookOpen, path: "/" },
  { title: "Calendario", icon: Calendar, path: "/" },
  { title: "Perfil", icon: User, path: "/perfil" },
  { title: "Configuración", icon: Settings, path: "/configuracion" },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border">
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-xl font-bold text-sidebar-foreground">Campus Virtual</h1>
          <p className="text-sm text-sidebar-foreground/70 mt-1">Universidad Ejemplo</p>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                      "text-sidebar-foreground hover:bg-sidebar-accent",
                      isActive && "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                    )
                  }
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="h-10 w-10 rounded-full bg-sidebar-primary flex items-center justify-center">
              <span className="text-sidebar-primary-foreground font-semibold">JD</span>
            </div>
            <div>
              <p className="text-sm font-medium text-sidebar-foreground">Juan Pérez</p>
              <p className="text-xs text-sidebar-foreground/70">Estudiante</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
