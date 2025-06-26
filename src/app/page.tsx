'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './page.module.css';
import AnimatedSection from './components/AnimatedSection';
import AnimatedIcon from './components/AnimatedIcon';
import AnimatedCard from './components/AnimatedCard';
import ScrollToTop from './components/ScrollToTop';
import Image from 'next/image';

export default function Home() {
  const [activeTab, setActiveTab] = useState('todos');
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const [selectedImages, setSelectedImages] = useState<{[key: number]: number}>({});
  
  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.98)']
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
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

  const filteredProjects = activeTab === 'todos' 
    ? projects 
    : projects.filter(project => project.category === activeTab);

  const services = [
    {
      id: 1,
      title: "Cocinas Personalizadas",
      description: "Diseñamos y construimos cocinas únicas que se adaptan a tu espacio y estilo de vida.",
      icon: "🍳",
      image: "/images/chairs-2181977_640.jpg",
      features: [
        "Diseño a medida",
        "Materiales premium",
        "Instalación profesional",
        "Garantía de calidad"
      ]
    },
    {
      id: 2,
      title: "Puertas de Madera",
      description: "Puertas artesanales que combinan belleza y funcionalidad para tu hogar.",
      icon: "🚪",
      image: "/images/chairs-2181977_640.jpg",
      features: [
        "Diseño personalizado",
        "Maderas seleccionadas",
        "Acabados de lujo",
        "Instalación incluida"
      ]
    },
    {
      id: 3,
      title: "Muebles a Medida",
      description: "Muebles únicos que transforman tus espacios con elegancia y funcionalidad.",
      icon: "🪑",
      image: "/images/chairs-2181977_640.jpg",
      features: [
        "Diseño exclusivo",
        "Materiales nobles",
        "Construcción artesanal",
        "Acabados perfectos"
      ]
    },
    {
      id: 4,
      title: "Cocinas Personalizadas",
      description: "Diseñamos y construimos cocinas únicas que se adaptan a tu espacio y estilo de vida.",
      icon: "🍳",
      image: "/images/chairs-2181977_640.jpg",
      features: [
        "Diseño a medida",
        "Materiales premium",
        "Instalación profesional",
        "Garantía de calidad"
      ]
    },
    {
      id: 5,
      title: "Puertas de Madera",
      description: "Puertas artesanales que combinan belleza y funcionalidad para tu hogar.",
      icon: "🚪",
      image: "/images/chairs-2181977_640.jpg",
      features: [
        "Diseño personalizado",
        "Maderas seleccionadas",
        "Acabados de lujo",
        "Instalación incluida"
      ]
    },
    {
      id: 6,
      title: "Muebles a Medida",
      description: "Muebles únicos que transforman tus espacios con elegancia y funcionalidad.",
      icon: "🪑",
      image: "/images/chairs-2181977_640.jpg",
      features: [
        "Diseño exclusivo",
        "Materiales nobles",
        "Construcción artesanal",
        "Acabados perfectos"
      ]
    }
  ];

  const changeMainImage = (projectId: number, imageId: number) => {
    setSelectedImages(prev => ({
      ...prev,
      [projectId]: imageId
    }));
  };

  const getCurrentMainImage = (project: any) => {
    const selectedImageId = selectedImages[project.id] || 1;
    return project.images.find((img: any) => img.id === selectedImageId) || project.images[0];
  };

  return (
    <main>
      {/* Header */}
      <motion.header 
        className={styles.header}
        style={{ background: headerBackground }}
      >
        <div className="container">
          <nav className={styles.nav}>
            <motion.div 
              className={styles.logo}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h1>Muebles S y E</h1>
            </motion.div>
            <ul className={styles.navLinks}>
              <motion.li whileHover={{ y: -2 }}>
                <a href="#inicio" className="nav-link">Inicio</a>
              </motion.li>
              <motion.li whileHover={{ y: -2 }}>
                <a href="#sobre-nosotros" className="nav-link">Sobre Nosotros</a>
              </motion.li>
              <motion.li whileHover={{ y: -2 }}>
                <a href="#servicios" className="nav-link">Servicios</a>
              </motion.li>
              <motion.li whileHover={{ y: -2 }}>
                <a href="#galeria" className="nav-link">Galería</a>
              </motion.li>
              <motion.li whileHover={{ y: -2 }}>
                <a href="#contacto" className="nav-link">Contacto</a>
              </motion.li>
            </ul>
          </nav>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section id="inicio" className={styles.hero}>
        {/* Elementos decorativos flotantes */}
        <div className={styles.floatingElements}>
          <motion.div 
            className={styles.floatingElement}
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            style={{
              position: 'absolute',
              top: '20%',
              left: '10%',
              fontSize: '3rem',
              opacity: 0.1,
              zIndex: 1
            }}
          >
            🪚
          </motion.div>
          <motion.div 
            className={styles.floatingElement}
            animate={{ 
              y: [0, 15, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 2
            }}
            style={{
              position: 'absolute',
              top: '60%',
              right: '15%',
              fontSize: '2.5rem',
              opacity: 0.1,
              zIndex: 1
            }}
          >
            🔨
          </motion.div>
          <motion.div 
            className={styles.floatingElement}
            animate={{ 
              y: [0, -10, 0],
              x: [0, 10, 0]
            }}
            transition={{ 
              duration: 7, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            }}
            style={{
              position: 'absolute',
              top: '30%',
              right: '25%',
              fontSize: '2rem',
              opacity: 0.1,
              zIndex: 1
            }}
          >
            📏
          </motion.div>
        </div>

        <div className={styles.heroContent}>
          <motion.div
            className={styles.heroBadge}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span>🏆 Artesanía de Excelencia</span>
          </motion.div>

          <motion.h1 
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Muebles S y E
          </motion.h1>
          <motion.p 
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Donde la madera cobra vida en tus espacios
          </motion.p>
          <motion.p 
            className={styles.heroDescription}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            En Muebles S y E, creemos que cada pieza de madera tiene una historia que contar. 
            Nuestro compromiso es transformar esa historia en muebles y espacios que no solo 
            satisfagan tus necesidades funcionales, sino que también reflejen tu personalidad 
            y estilo de vida.
          </motion.p>
          
          <motion.div 
            className={styles.heroStats}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className={styles.stat}>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>Madera de calidad</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>3+</span>
              <span className={styles.statLabel}>Años de Experiencia</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>Satisfacción</span>
            </div>
          </motion.div>

          <motion.div 
            className={styles.heroButtons}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button 
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById('galeria')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              Ver Nuestros Trabajos
            </motion.button>
            <motion.button 
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById('contacto')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              Solicitar Presupuesto
            </motion.button>
          </motion.div>
        </div>
        <motion.div 
          className={styles.heroImage}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <Image
            src="/images/chairs-2181977_640.jpg"
            alt="Trabajo de ebanistería destacado - Sillas artesanales"
            width={500}
            height={400}
            className={styles.heroImageContent}
            priority
          />
        </motion.div>
      </section>

      {/* Sobre Nosotros */}
      <AnimatedSection className="section">
        <div className="container">
          <h2 className="section-title">Sobre Nosotros</h2>
          <p className="section-subtitle">
            Más que carpinteros, somos artesanos apasionados por crear espacios únicos
          </p>
          
          <div className={styles.aboutContent}>
            <AnimatedSection className={styles.aboutText} delay={0.2}>
              <h3>Muebles S y E</h3>
              <p>
                En Muebles S y E, creemos que cada pieza de madera tiene una historia que contar. 
                Nuestro compromiso es transformar esa historia en muebles y espacios que no solo 
                satisfagan tus necesidades funcionales, sino que también reflejen tu personalidad 
                y estilo de vida.
              </p>
              
              <h3>Nuestros Valores</h3>
              <ul>
                <li><strong>Dedicación:</strong> Cada proyecto recibe nuestra atención completa</li>
                <li><strong>Precisión:</strong> Detalles perfectos en cada acabado</li>
                <li><strong>Calidad:</strong> Solo utilizamos los mejores materiales</li>
                <li><strong>Innovación:</strong> Diseños únicos y soluciones creativas</li>
              </ul>
            </AnimatedSection>
            
            <AnimatedSection className={styles.aboutImage} delay={0.4} direction="right">
              <div className={styles.imagePlaceholder}>
                <span>Foto del Taller</span>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>

      {/* Servicios */}
      <section id="servicios" className={`section ${styles.servicesSection}`}>
        <div className="container">
          <AnimatedSection>
            <h2 className="section-title">Nuestros Servicios</h2>
            <p className="section-subtitle">
              Ofrecemos soluciones completas en ebanistería para transformar tu hogar
            </p>
            <motion.div 
              className={styles.servicesIntro}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p>
                Cada servicio está diseñado con pasión y atención al detalle, 
                utilizando los mejores materiales y técnicas artesanales para 
                crear piezas únicas que perduran en el tiempo.
              </p>
            </motion.div>
          </AnimatedSection>
          
          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <AnimatedCard 
                key={service.id} 
                className={styles.serviceCard}
                delay={index * 0.1}
              >
                <div className={styles.serviceImageContainer}>
                  <div className={styles.serviceImage}>
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className={styles.serviceImage}
                    />
                  </div>
                  <div className={styles.serviceOverlay}>
                    <span className={styles.serviceIcon}>{service.icon}</span>
                  </div>
                </div>
                
                <div className={styles.serviceContent}>
                  <h3>{service.title}</h3>
                  <p className={styles.serviceDescription}>{service.description}</p>
                  
                  <div className={styles.serviceFeatures}>
                    {service.features.map((feature, featureIndex) => (
                      <motion.div 
                        key={featureIndex}
                        className={styles.serviceFeature}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + featureIndex * 0.1 }}
                      >
                        <span className={styles.featureIcon}>✓</span>
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.button 
                    className={styles.serviceButton}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cotizar
                  </motion.button>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Galería */}
      <section id="galeria" className="section">
        <div className="container">
          <AnimatedSection>
            <h2 className="section-title">Nuestros Proyectos</h2>
            <p className="section-subtitle">
              Descubre la calidad y creatividad de nuestros trabajos
            </p>
          </AnimatedSection>
          
          <AnimatedSection className={styles.galleryFilters} delay={0.2}>
            <motion.button 
              className={`${styles.filterBtn} ${activeTab === 'todos' ? styles.active : ''}`}
              onClick={() => setActiveTab('todos')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Todos
            </motion.button>
            <motion.button 
              className={`${styles.filterBtn} ${activeTab === 'cocinas' ? styles.active : ''}`}
              onClick={() => setActiveTab('cocinas')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cocinas
            </motion.button>
            <motion.button 
              className={`${styles.filterBtn} ${activeTab === 'puertas' ? styles.active : ''}`}
              onClick={() => setActiveTab('puertas')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Puertas
            </motion.button>
            <motion.button 
              className={`${styles.filterBtn} ${activeTab === 'muebles' ? styles.active : ''}`}
              onClick={() => setActiveTab('muebles')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Muebles
            </motion.button>
          </AnimatedSection>
          
          <motion.div 
            className={styles.projectsShowcase}
            layout
            transition={{ duration: 0.5 }}
          >
            {filteredProjects.map((project, index) => {
              const currentMainImage = getCurrentMainImage(project);
              
              return (
                <motion.div 
                  key={project.id} 
                  className={styles.projectShowcase}
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className={styles.projectHeader}>
                    <div className={styles.projectInfo}>
                      <div className={styles.projectCategory}>
                        <span className={styles.categoryIcon}>{project.icon}</span>
                        <span className={styles.categoryText}>
                          {project.category === 'cocinas' ? 'Cocina' : 
                           project.category === 'puertas' ? 'Puerta' : 'Mueble'}
                        </span>
                      </div>
                      <h3 className={styles.projectTitle}>{project.title}</h3>
                      <p className={styles.projectDescription}>{project.description}</p>
                      <div className={styles.projectRating}>
                        <span className={styles.stars}>⭐⭐⭐⭐⭐</span>
                        <span className={styles.ratingText}>5.0</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.projectGallery}>
                    <div className={styles.galleryContainer}>
                      <div className={styles.galleryImages}>
                        <div className={styles.mainImage}>
                          <img 
                            src={currentMainImage.url} 
                            alt={currentMainImage.name}
                            className={styles.mainImage}
                          />
                        </div>
                        <div className={styles.thumbnailGrid}>
                          {project.images.map((image) => (
                            <div 
                              key={image.id}
                              className={`${styles.thumbnail} ${selectedImages[project.id] === image.id ? styles.active : ''}`}
                              onClick={() => changeMainImage(project.id, image.id)}
                            >
                              <img 
                                src={image.url} 
                                alt={image.name}
                                className={styles.thumbnailImage}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* <div className={styles.galleryControls}>
                        <motion.button 
                          className={styles.navButton}
                          whileHover={{ scale: 1.1, backgroundColor: 'rgba(139, 69, 19, 0.9)' }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <span className={styles.navIcon}>←</span>
                        </motion.button>
                        <motion.button 
                          className={styles.navButton}
                          whileHover={{ scale: 1.1, backgroundColor: 'rgba(139, 69, 19, 0.9)' }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <span className={styles.navIcon}>→</span>
                        </motion.button>
                      </div> */}
                    </div>
                    
                    <div className={styles.projectFeatures}>
                      <div className={styles.featureItem}>
                        <span className={styles.featureIcon}>✨</span>
                        <span className={styles.featureText}>Diseño Personalizado</span>
                      </div>
                      <div className={styles.featureItem}>
                        <span className={styles.featureIcon}>🌳</span>
                        <span className={styles.featureText}>Material Premium</span>
                      </div>
                      <div className={styles.featureItem}>
                        <span className={styles.featureIcon}>🔧</span>
                        <span className={styles.featureText}>Instalación Profesional</span>
                      </div>
                      <div className={styles.featureItem}>
                        <span className={styles.featureIcon}>🎨</span>
                        <span className={styles.featureText}>Acabados de Lujo</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.projectActions}>
                    <motion.button 
                      className={styles.actionBtnPrimary}
                      whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(139, 69, 19, 0.3)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Obtener Una Cotizacion
                    </motion.button>
                    <motion.button 
                      className={styles.actionBtnSecondary}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        document.getElementById('contacto')?.scrollIntoView({ 
                          behavior: 'smooth' 
                        });
                      }}
                    >
                      Solicitar Similar
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
          
          <AnimatedSection className={styles.galleryCTA} delay={0.4}>
            <div className={styles.ctaContent}>
              <h3>¿Te gustó lo que viste?</h3>
              <p>Conversemos sobre tu proyecto personalizado</p>
              <motion.button 
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  document.getElementById('contacto')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  });
                }}
              >
                Solicitar Presupuesto Personalizado
              </motion.button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className={`section ${styles.contactSection}`}>
        <div className="container">
          <AnimatedSection>
            <h2 className="section-title">Contáctanos</h2>
            <p className="section-subtitle">
              ¿Listo para transformar tu espacio? Conversemos sobre tu proyecto
            </p>
          </AnimatedSection>
          
          <div className={styles.contactContent}>
            <AnimatedSection className={styles.contactInfo} delay={0.2}>
              <h3>Información de Contacto</h3>
              <motion.div 
                className={styles.contactItem}
                whileHover={{ x: 10 }}
              >
                <span className={styles.contactIcon}>📞</span>
                <div>
                  <h4>Teléfono</h4>
                  <p>+506 8888-8888</p>
                </div>
              </motion.div>
              
              <motion.div 
                className={styles.contactItem}
                whileHover={{ x: 10 }}
              >
                <span className={styles.contactIcon}>📧</span>
                <div>
                  <h4>Email</h4>
                  <p>info@artemadera.com</p>
                </div>
              </motion.div>
              
              <motion.div 
                className={styles.contactItem}
                whileHover={{ x: 10 }}
              >
                <span className={styles.contactIcon}>📍</span>
                <div>
                  <h4>Ubicación</h4>
                  <p>San José, Costa Rica</p>
                </div>
              </motion.div>
              
              <motion.div 
                className={styles.contactItem}
                whileHover={{ x: 10 }}
              >
                <span className={styles.contactIcon}>⏰</span>
                <div>
                  <h4>Horarios</h4>
                  <p>Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                  <p>Sábados: 9:00 AM - 2:00 PM</p>
                </div>
              </motion.div>
            </AnimatedSection>
            
            <AnimatedSection className={styles.contactForm} delay={0.4} direction="right">
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className={styles.formGroup}>
                  <input type="text" placeholder="Nombre completo" required />
                </div>
                
                <div className={styles.formGroup}>
                  <input type="email" placeholder="Email" required />
                </div>
                
                <div className={styles.formGroup}>
                  <input type="tel" placeholder="Teléfono" />
                </div>
                
                <div className={styles.formGroup}>
                  <select required>
                    <option value="">Selecciona el tipo de proyecto</option>
                    <option value="cocina">Cocina</option>
                    <option value="puertas">Puertas</option>
                    <option value="muebles">Muebles</option>
                    <option value="personalizado">Proyecto Personalizado</option>
                  </select>
                </div>
                
                <div className={styles.formGroup}>
                  <textarea 
                    placeholder="Cuéntanos sobre tu proyecto..."
                    rows={5}
                    required
                  ></textarea>
                </div>
                
                <motion.button 
                  type="submit" 
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Enviar Mensaje
                </motion.button>
              </motion.form>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerContent}>
            <AnimatedSection className={styles.footerSection} delay={0.1}>
              <h3>Muebles S y E</h3>
              <p>Donde la madera cobra vida en tus espacios</p>
            </AnimatedSection>
            
            <AnimatedSection className={styles.footerSection} delay={0.2}>
              <h4>Servicios</h4>
              <ul>
                <li>Muebles de Cocina</li>
                <li>Puertas</li>
                <li>Muebles Personalizados</li>
                <li>Proyectos Especiales</li>
              </ul>
            </AnimatedSection>
            
            <AnimatedSection className={styles.footerSection} delay={0.3}>
              <h4>Contacto</h4>
              <p>📞 +506 8888-8888</p>
              <p>📧 info@artemadera.com</p>
            </AnimatedSection>
          </div>
          
          <AnimatedSection className={styles.footerBottom} delay={0.4}>
            <p>&copy; 2024 Muebles S y E. Todos los derechos reservados.</p>
          </AnimatedSection>
        </div>
      </footer>

      <ScrollToTop />
    </main>
  );
}
