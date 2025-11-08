export interface Course {
  id: string;
  code: string;
  title: string;
  description: string;
  professor: string;
  nextClass?: string;
  pendingTasks: number;
  color: string;
  units: Unit[];
}

export interface Unit {
  id: string;
  number: number;
  title: string;
  materials: Material[];
}

export interface Material {
  id: string;
  type: "file" | "link" | "video" | "assignment" | "forum" | "quiz";
  title: string;
  description?: string;
  url?: string;
  dueDate?: string;
}

export interface Grade {
  id: string;
  name: string;
  grade: number;
  weight: number;
  date: string;
}

export interface CourseGrades {
  courseId: string;
  grades: Grade[];
  average: number;
}

export const coursesGrades: CourseGrades[] = [
  {
    courseId: "ed-101",
    average: 5.8,
    grades: [
      { id: "1", name: "Tarea 1", grade: 6.2, weight: 15, date: "10 Sep 2024" },
      { id: "2", name: "Certamen 1", grade: 5.5, weight: 30, date: "25 Sep 2024" },
      { id: "3", name: "Tarea 2", grade: 6.0, weight: 15, date: "05 Oct 2024" }
    ]
  },
  {
    courseId: "dw-401",
    average: 6.3,
    grades: [
      { id: "1", name: "Proyecto 1", grade: 6.5, weight: 25, date: "15 Sep 2024" },
      { id: "2", name: "Certamen 1", grade: 6.0, weight: 30, date: "28 Sep 2024" },
      { id: "3", name: "Tarea 1", grade: 6.5, weight: 15, date: "08 Oct 2024" }
    ]
  },
  {
    courseId: "ia-501",
    average: 5.5,
    grades: [
      { id: "1", name: "Tarea 1", grade: 5.8, weight: 20, date: "12 Sep 2024" },
      { id: "2", name: "Certamen 1", grade: 5.2, weight: 35, date: "30 Sep 2024" }
    ]
  },
  {
    courseId: "bd-301",
    average: 6.1,
    grades: [
      { id: "1", name: "Tarea 1", grade: 6.3, weight: 15, date: "08 Sep 2024" },
      { id: "2", name: "Certamen 1", grade: 6.0, weight: 30, date: "22 Sep 2024" },
      { id: "3", name: "Proyecto SQL", grade: 6.2, weight: 20, date: "01 Oct 2024" }
    ]
  }
];

export const courses: Course[] = [
  {
    id: "ed-101",
    code: "CS-301",
    title: "Estructuras de Datos",
    description: "Estudio de estructuras de datos fundamentales y algoritmos",
    professor: "Dr. María García",
    nextClass: "Lun 14 Oct, 10:00",
    pendingTasks: 2,
    color: "#3b82f6",
    units: [
      {
        id: "u1",
        number: 1,
        title: "Introducción y Complejidad",
        materials: [
          {
            id: "m1",
            type: "file",
            title: "Presentación: Introducción a las Estructuras de Datos",
            description: "Slides de la clase introductoria"
          },
          {
            id: "m2",
            type: "file",
            title: "Apuntes: Notación Big O",
            description: "Documento explicativo sobre complejidad algorítmica"
          },
          {
            id: "m3",
            type: "video",
            title: "Video: Análisis de Complejidad",
            url: "#"
          },
          {
            id: "m4",
            type: "assignment",
            title: "Tarea 1: Ejercicios de Complejidad",
            dueDate: "20 Oct 2024",
            description: "Resolver 10 ejercicios sobre análisis de complejidad"
          }
        ]
      },
      {
        id: "u2",
        number: 2,
        title: "Listas Enlazadas",
        materials: [
          {
            id: "m5",
            type: "file",
            title: "Presentación: Listas Enlazadas",
            description: "Implementación y operaciones básicas"
          },
          {
            id: "m6",
            type: "file",
            title: "Código de Ejemplo: Lista Simple",
            description: "Implementación en Python"
          },
          {
            id: "m7",
            type: "assignment",
            title: "Práctica: Implementar Lista Doblemente Enlazada",
            dueDate: "27 Oct 2024"
          }
        ]
      }
    ]
  },
  {
    id: "ac-201",
    code: "CS-302",
    title: "Algoritmos y Complejidad",
    description: "Diseño y análisis de algoritmos eficientes",
    professor: "Dr. Carlos Rodríguez",
    nextClass: "Mar 15 Oct, 14:00",
    pendingTasks: 1,
    color: "#8b5cf6",
    units: [
      {
        id: "u1",
        number: 1,
        title: "Paradigmas de Diseño",
        materials: [
          {
            id: "m1",
            type: "file",
            title: "Presentación: Divide y Vencerás",
            description: "Estrategia de diseño de algoritmos"
          },
          {
            id: "m2",
            type: "video",
            title: "Video: Algoritmo de Ordenamiento Merge Sort"
          },
          {
            id: "m3",
            type: "forum",
            title: "Foro: Discusión sobre Complejidad Temporal"
          }
        ]
      }
    ]
  },
  {
    id: "bd-301",
    code: "CS-303",
    title: "Bases de Datos",
    description: "Diseño e implementación de bases de datos relacionales",
    professor: "Dra. Ana Martínez",
    nextClass: "Mié 16 Oct, 16:00",
    pendingTasks: 3,
    color: "#10b981",
    units: [
      {
        id: "u1",
        number: 1,
        title: "Modelo Relacional",
        materials: [
          {
            id: "m1",
            type: "file",
            title: "Apuntes: Introducción a Bases de Datos",
            description: "Conceptos fundamentales"
          },
          {
            id: "m2",
            type: "file",
            title: "Presentación: Modelo Entidad-Relación",
            description: "Diagramas ER y normalización"
          },
          {
            id: "m3",
            type: "assignment",
            title: "Proyecto: Diseño de Base de Datos",
            dueDate: "25 Oct 2024",
            description: "Diseñar el esquema para un sistema de biblioteca"
          }
        ]
      },
      {
        id: "u2",
        number: 2,
        title: "SQL y Consultas",
        materials: [
          {
            id: "m4",
            type: "file",
            title: "Manual: Sintaxis SQL Básica"
          },
          {
            id: "m5",
            type: "quiz",
            title: "Quiz: Consultas SELECT",
            dueDate: "22 Oct 2024"
          }
        ]
      }
    ]
  },
  {
    id: "dw-401",
    code: "CS-304",
    title: "Desarrollo Web",
    description: "Creación de aplicaciones web modernas",
    professor: "Ing. Luis Fernández",
    nextClass: "Jue 17 Oct, 10:00",
    pendingTasks: 2,
    color: "#f59e0b",
    units: [
      {
        id: "u1",
        number: 1,
        title: "HTML y CSS Avanzado",
        materials: [
          {
            id: "m1",
            type: "file",
            title: "Presentación: HTML5 Semántico"
          },
          {
            id: "m2",
            type: "file",
            title: "Guía: CSS Grid y Flexbox"
          },
          {
            id: "m3",
            type: "video",
            title: "Video: Responsive Design"
          }
        ]
      },
      {
        id: "u2",
        number: 2,
        title: "JavaScript y React",
        materials: [
          {
            id: "m4",
            type: "file",
            title: "Apuntes: Fundamentos de React"
          },
          {
            id: "m5",
            type: "assignment",
            title: "Proyecto Final: Aplicación Web Completa",
            dueDate: "18 Oct 2024",
            description: "Desarrollar una SPA con React"
          }
        ]
      }
    ]
  },
  {
    id: "ia-501",
    code: "CS-305",
    title: "Inteligencia Artificial",
    description: "Fundamentos de IA y aprendizaje automático",
    professor: "Dr. Roberto Silva",
    nextClass: "Vie 18 Oct, 14:00",
    pendingTasks: 1,
    color: "#ec4899",
    units: [
      {
        id: "u1",
        number: 1,
        title: "Búsqueda y Optimización",
        materials: [
          {
            id: "m1",
            type: "file",
            title: "Presentación: Algoritmos de Búsqueda"
          },
          {
            id: "m2",
            type: "file",
            title: "Paper: A* Algorithm"
          },
          {
            id: "m3",
            type: "forum",
            title: "Foro: Aplicaciones de IA"
          }
        ]
      },
      {
        id: "u2",
        number: 2,
        title: "Machine Learning",
        materials: [
          {
            id: "m4",
            type: "video",
            title: "Video: Redes Neuronales"
          },
          {
            id: "m5",
            type: "assignment",
            title: "Presentación Grupal: Proyecto de ML",
            dueDate: "20 Oct 2024"
          }
        ]
      }
    ]
  }
];
