import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpen, Database, CreditCard, Utensils, MessageSquare, School } from "lucide-react";

const accesos = [
  {
    title: "Biblioteca",
    description: "Sistema de reserva de espacios",
    url: "https://usm-chile.libcal.com/",
    icon: BookOpen,
  },
  {
    title: "Biblioteca Digital",
    description: "Recursos digitales y bases de datos",
    url: "https://bibliotecadigital.usm.cl/",
    icon: Database,
  },
  {
    title: "SIGA",
    description: "Sistema de Gestión Académica",
    url: "https://siga.usm.cl/pag/home.jsp",
    icon: School,
  },
  {
    title: "Portal de Pagos",
    description: "Autoservicio de pagos y finanzas",
    url: "https://autoservicio.usm.cl/PROD/twbkwbis.P_GenMenu?name=homepage",
    icon: CreditCard,
  },
  {
    title: "Sistema de Almuerzos",
    description: "Reserva de casino",
    url: "https://casino.usm.cl/solicitud",
    icon: Utensils,
  },
  {
    title: "SIREB",
    description: "Sistema de Atención al Alumno",
    url: "https://sireb.usm.cl/",
    icon: MessageSquare,
  },
  {
    title: "USM",
    description: "Página oficial de la universidad",
    url: "https://usm.cl/",
    icon: School,
  },
];

const AccesosPage = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 ml-64">
        <header className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-foreground">Accesos Rápidos</h1>
            <p className="text-muted-foreground text-sm">Enlaces a servicios universitarios</p>
          </div>
        </header>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accesos.map((acceso) => (
              <Card key={acceso.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <acceso.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{acceso.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription>{acceso.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full"
                    onClick={() => window.open(acceso.url, '_blank')}
                  >
                    Abrir
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccesosPage;
