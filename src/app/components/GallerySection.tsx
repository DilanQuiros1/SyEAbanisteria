'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import ProjectCard from './ProjectCard';
import styles from '../page.module.css';
import { Project } from '../data/projects';

interface GallerySectionProps {
  projects: Project[];
}

export default function GallerySection({ projects }: GallerySectionProps) {
  const [activeTab, setActiveTab] = useState('todos');
  const [selectedImages, setSelectedImages] = useState<{[key: number]: number}>({});
  const [isInGallery, setIsInGallery] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const filteredProjects = activeTab === 'todos' 
    ? projects 
    : projects.filter(project => project.category === activeTab);

  const changeMainImage = (projectId: number, imageId: number) => {
    setSelectedImages(prev => ({
      ...prev,
      [projectId]: imageId
    }));
  };

  // Función mejorada para cambiar tab con transiciones suaves
  const handleTabChange = async (newTab: string) => {
    if (newTab === activeTab) return; // Evitar cambios innecesarios
    
    setIsLoading(true);
    
    // Pequeña pausa para mostrar el estado de carga
    await new Promise(resolve => setTimeout(resolve, 150));
    
    setActiveTab(newTab);
    
    // Scroll suave al inicio de la sección de galería
    const gallerySection = document.getElementById('galeria');
    if (gallerySection) {
      gallerySection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    
    // Quitar el estado de carga después de un breve delay
    setTimeout(() => setIsLoading(false), 300);
  };

  // Detectar cuando estamos en la sección de galería
  useEffect(() => {
    const handleScroll = () => {
      const gallerySection = document.getElementById('galeria');
      if (gallerySection) {
        const rect = gallerySection.getBoundingClientRect();
        const isVisible = rect.top <= 100 && rect.bottom >= 100;
        setIsInGallery(isVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Verificar estado inicial

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Configuración de animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1
    },
    exit: { 
      opacity: 0, 
      y: -20,
      scale: 0.95
    }
  };

  return (
    <>
      {/* Menú de filtros fijo - similar al header */}
      {isInGallery && (
        <motion.div 
          className={styles.fixedFiltersMenu}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="container">
            <div className={styles.galleryFilters}>
              <motion.button 
                className={`${styles.filterBtn} ${activeTab === 'todos' ? styles.active : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleTabChange('todos');
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 4px 15px rgba(139, 69, 19, 0.2)'
                }}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
                transition={{ duration: 0.2 }}
              >
                {isLoading && activeTab === 'todos' ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    style={{ width: 16, height: 16, border: '2px solid currentColor', borderTop: 'transparent', borderRadius: '50%' }}
                  />
                ) : (
                  'Todos'
                )}
              </motion.button>
              <motion.button 
                className={`${styles.filterBtn} ${activeTab === 'cocinas' ? styles.active : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleTabChange('cocinas');
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 4px 15px rgba(139, 69, 19, 0.2)'
                }}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
                transition={{ duration: 0.2 }}
              >
                {isLoading && activeTab === 'cocinas' ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    style={{ width: 16, height: 16, border: '2px solid currentColor', borderTop: 'transparent', borderRadius: '50%' }}
                  />
                ) : (
                  'Cocinas'
                )}
              </motion.button>
              <motion.button 
                className={`${styles.filterBtn} ${activeTab === 'puertas' ? styles.active : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleTabChange('puertas');
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 4px 15px rgba(139, 69, 19, 0.2)'
                }}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
                transition={{ duration: 0.2 }}
              >
                {isLoading && activeTab === 'puertas' ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    style={{ width: 16, height: 16, border: '2px solid currentColor', borderTop: 'transparent', borderRadius: '50%' }}
                  />
                ) : (
                  'Puertas'
                )}
              </motion.button>
              <motion.button 
                className={`${styles.filterBtn} ${activeTab === 'muebles' ? styles.active : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleTabChange('muebles');
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 4px 15px rgba(139, 69, 19, 0.2)'
                }}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
                transition={{ duration: 0.2 }}
              >
                {isLoading && activeTab === 'muebles' ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    style={{ width: 16, height: 16, border: '2px solid currentColor', borderTop: 'transparent', borderRadius: '50%' }}
                  />
                ) : (
                  'Muebles'
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      <section id="galeria" className="section" style={{ marginTop: isInGallery ? '80px' : '0' }}>
        <div className="container">
          <AnimatedSection>
            <h2 className="section-title">Nuestros Proyectos</h2>
            <p className="section-subtitle">
              Descubre la calidad y creatividad de nuestros trabajos
            </p>
          </AnimatedSection>
          
          {/* Contenedor de proyectos con AnimatePresence para transiciones suaves */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              className={styles.projectsShowcase}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              {isLoading ? (
                // Estado de carga
                <motion.div
                  className={styles.loadingContainer}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '200px',
                    width: '100%'
                  }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    style={{
                      width: 40,
                      height: 40,
                      border: '3px solid rgba(139, 69, 19, 0.2)',
                      borderTop: '3px solid var(--primary-color)',
                      borderRadius: '50%'
                    }}
                  />
                </motion.div>
              ) : (
                // Proyectos filtrados
                filteredProjects.map((project) => (
                  <motion.div
                    key={`${activeTab}-${project.id}`}
                    variants={itemVariants}
                    layout
                    transition={{
                      duration: 0.5,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  >
                    <ProjectCard 
                      project={project}
                      selectedImages={selectedImages}
                      onImageChange={changeMainImage}
                    />
                  </motion.div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
          
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
    </>
  );
} 