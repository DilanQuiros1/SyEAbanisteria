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
    id: 5,
    title: "Puerta Interior Panelada",
    description: "Puerta interior con paneles decorativos, diseño clásico y acabados suaves. Ideal para interiores elegantes.",
    category: "puertas",
    icon: "🚪",
    images: [
      { id: 1, name: "Vista Frontal", url: "https://res.cloudinary.com/drzxyessb/image/upload/v1750390206/interior-door-1866957_640_xy8n9q.jpg" },
      { id: 2, name: "Detalle Paneles", url: "https://res.cloudinary.com/drzxyessb/image/upload/v1750390206/interior-door-1866958_640_xy8n9q.jpg" },
      { id: 3, name: "Vista Lateral", url: "https://res.cloudinary.com/drzxyessb/image/upload/v1750390206/interior-door-1866959_640_xy8n9q.jpg" },
      { id: 4, name: "Acabado Final", url: "https://res.cloudinary.com/drzxyessb/image/upload/v1750390206/interior-door-1866960_640_xy8n9q.jpg" }
    ]
  },
  {
    id: 6,
    title: "Biblioteca Personalizada",
    description: "Biblioteca a medida con estantes ajustables, escalera integrada y acabados en madera noble. Funcionalidad y elegancia.",
    category: "muebles",
    icon: "🪑",
    images: [
      { id: 1, name: "Vista General", url: "https://res.cloudinary.com/drzxyessb/image/upload/v1750390206/bookshelf-998269_640_xy8n9q.jpg" },
      { id: 2, name: "Detalle Estantes", url: "https://res.cloudinary.com/drzxyessb/image/upload/v1750390206/bookshelf-998270_640_xy8n9q.jpg" },
      { id: 3, name: "Vista Escalera", url: "https://res.cloudinary.com/drzxyessb/image/upload/v1750390206/bookshelf-998271_640_xy8n9q.jpg" },
      { id: 4, name: "Acabados", url: "https://res.cloudinary.com/drzxyessb/image/upload/v1750390206/bookshelf-998272_640_xy8n9q.jpg" }
    ]
  }
]; 