'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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

  const filteredProjects = activeTab === 'todos' 
    ? projects 
    : projects.filter(project => project.category === activeTab);

  const changeMainImage = (projectId: number, imageId: number) => {
    setSelectedImages(prev => ({
      ...prev,
      [projectId]: imageId
    }));
  };

  return (
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
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id}
              project={project}
              index={index}
              selectedImages={selectedImages}
              onImageChange={changeMainImage}
            />
          ))}
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
  );
} 