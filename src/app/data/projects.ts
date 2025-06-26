export interface ProjectImage {
  id: number;
  name: string;
  url: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  icon: string;
  images: ProjectImage[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Cocina Moderna Minimalista",
    description: "Cocina contemporánea con líneas limpias, acabados en madera de nogal y encimera de cuarzo. Diseño funcional que maximiza el espacio disponible.",
    category: "cocinas",
    icon: "🍳",
    images: [
      { id: 2, name: "Vista Lateral", url: "/images/proyectos/cocina/cocina2.jpg" },
      { id: 3, name: "Detalle Encimera", url: "/images/proyectos/cocina/cocina3.jpg" },
      { id: 4, name: "Vista Completa", url: "/images/proyectos/cocina/cocina4.jpg" }
    ]
  },
  {
    id: 2,
    title: "Puerta Principal Artesanal",
    description: "Puerta de entrada principal con diseño clásico, tallado a mano y acabados en madera de caoba. Incluye detalles ornamentales únicos.",
    category: "puertas",
    icon: "🚪",
    images: [
      { id: 2, name: "Detalle Tallado", url: "/images/proyectos/puertas/puerta2.jpg" },
      { id: 3, name: "Vista Lateral", url: "/images/proyectos/puertas/puerta3.jpg" },
      { id: 4, name: "Acabado Final", url: "/images/proyectos/puertas/puerta4.jpg" }
    ]
  },
  {
    id: 3,
    title: "Mueble de TV Elegante",
    description: "Mueble para televisión con diseño moderno, estantes integrados y acabados en madera de roble. Perfecto para salas contemporáneas.",
    category: "muebles",
    icon: "🪑",
    images: [
      { id: 1, name: "Vista Principal", url: "/images/proyectos/muebles/muebles1.jpg" },
      { id: 2, name: "Detalle Estantes", url: "/images/proyectos/muebles/muebles2.jpg" },
      { id: 3, name: "Vista Lateral", url: "/images/proyectos/muebles/muebles3.jpg" },
    ]
  },
  {
    id: 4,
    title: "Cocina Rústica Campestre",
    description: "Cocina con estilo rústico, muebles de madera maciza y detalles artesanales. Ambiente cálido y acogedor para familias.",
    category: "cocinas",
    icon: "🍳",
    images: [
      { id: 1, name: "Vista General", url: "/images/proyectos/muebles/muebles1.jpg"},
      { id: 2, name: "Detalle Muebles", url: "/images/proyectos/muebles/muebles2.jpg" },
      { id: 3, name: "Vista Isla", url: "/images/proyectos/muebles/muebles3.jpg"},
    ]
  },
  {
    id: 6,
    title: "Biblioteca Personalizada",
    description: "Biblioteca a medida con estantes ajustables, escalera integrada y acabados en madera noble. Funcionalidad y elegancia.",
    category: "muebles",
    icon: "🪑",
    images: [
      { id: 1, name: "Vista General", url: "/images/proyectos/biblioteca/biblioteca1.jpg" },
      { id: 2, name: "Detalle Estantes", url: "/images/proyectos/biblioteca/biblioteca2.jpg" },
      { id: 3, name: "Vista Escalera", url: "/images/proyectos/biblioteca/biblioteca3.jpg" },
    ]
  }
]; 