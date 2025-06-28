'use client';

import { motion } from 'framer-motion';
import styles from '../page.module.css';
import { Project, ProjectImage } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  selectedImages: {[key: number]: number};
  onImageChange: (projectId: number, imageId: number) => void;
}

export default function ProjectCard({ project, selectedImages, onImageChange }: ProjectCardProps) {
  const getCurrentMainImage = (project: Project): ProjectImage => {
    const selectedImageId = selectedImages[project.id] || 1;
    return project.images.find((img) => img.id === selectedImageId) || project.images[0];
  };

  const currentMainImage = getCurrentMainImage(project);

  // Configuración de animaciones mejoradas
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1
    },
    exit: { 
      opacity: 0, 
      y: -30,
      scale: 0.95
    },
    hover: {
      y: -5
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: { 
      opacity: 1, 
      scale: 1
    }
  };

  const thumbnailVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1
    }
  };

  return (
    <motion.div 
      className={styles.projectShowcase}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover="hover"
      layout
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      <motion.div 
        className={styles.projectHeader}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className={styles.projectInfo}>
          <motion.div 
            className={styles.projectCategory}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <span className={styles.categoryIcon}>{project.icon}</span>
            <span className={styles.categoryText}>
              {project.category === 'cocinas' ? 'Cocina' : 
               project.category === 'puertas' ? 'Puerta' : 'Mueble'}
            </span>
          </motion.div>
          <h3 className={styles.projectTitle}>{project.title}</h3>
          <p className={styles.projectDescription}>{project.description}</p>
          <motion.div 
            className={styles.projectRating}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className={styles.stars}>⭐⭐⭐⭐⭐</span>
            <span className={styles.ratingText}>5.0</span>
          </motion.div>
        </div>
      </motion.div>
      
      <div className={styles.projectGallery}>
        <div className={styles.galleryContainer}>
          <div className={styles.galleryImages}>
            <motion.div 
              className={styles.mainImage}
              variants={imageVariants}
              key={currentMainImage.id}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.4 }}
            >
              <img 
                src={currentMainImage.url} 
                alt={currentMainImage.name}
                className={styles.mainImage}
              />
            </motion.div>
            <motion.div 
              className={styles.thumbnailGrid}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {project.images.map((image, imageIndex) => (
                <motion.div 
                  key={image.id}
                  className={`${styles.thumbnail} ${selectedImages[project.id] === image.id ? styles.active : ''}`}
                  onClick={() => onImageChange(project.id, image.id)}
                  variants={thumbnailVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.5 + imageIndex * 0.1, duration: 0.3 }}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: '0 4px 15px rgba(139, 69, 19, 0.2)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img 
                    src={image.url} 
                    alt={image.name}
                    className={styles.thumbnailImage}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className={styles.projectFeatures}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {[
            { icon: '✨', text: 'Diseño Personalizado' },
            { icon: '🌳', text: 'Material Premium' },
            { icon: '🔧', text: 'Instalación Profesional' },
            { icon: '🎨', text: 'Acabados de Lujo' }
          ].map((feature, featureIndex) => (
            <motion.div 
              key={featureIndex}
              className={styles.featureItem}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                delay: 0.7 + featureIndex * 0.1, 
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ 
                x: 5,
                transition: { duration: 0.2 }
              }}
            >
              <span className={styles.featureIcon}>{feature.icon}</span>
              <span className={styles.featureText}>{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <motion.div 
        className={styles.projectActions}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <motion.button 
          className={styles.actionBtnPrimary}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: '0 10px 30px rgba(139, 69, 19, 0.3)',
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          Obtener Una Cotizacion
        </motion.button>
        <motion.button 
          className={styles.actionBtnSecondary}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            document.getElementById('contacto')?.scrollIntoView({ 
              behavior: 'smooth' 
            });
          }}
        >
          Solicitar Similar
        </motion.button>
      </motion.div>
    </motion.div>
  );
} 