'use client';

import { motion } from 'framer-motion';
import styles from '../page.module.css';
import { Project, ProjectImage } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
  selectedImages: {[key: number]: number};
  onImageChange: (projectId: number, imageId: number) => void;
}

export default function ProjectCard({ project, index, selectedImages, onImageChange }: ProjectCardProps) {
  const getCurrentMainImage = (project: Project): ProjectImage => {
    const selectedImageId = selectedImages[project.id] || 1;
    return project.images.find((img) => img.id === selectedImageId) || project.images[0];
  };

  const currentMainImage = getCurrentMainImage(project);

  return (
    <motion.div 
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
                  onClick={() => onImageChange(project.id, image.id)}
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
} 