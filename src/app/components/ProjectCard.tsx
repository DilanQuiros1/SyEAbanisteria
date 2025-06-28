'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import styles from '../page.module.css';
import { Project, ProjectImage } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  selectedImages: {[key: number]: number};
  onImageChange: (projectId: number, imageId: number) => void;
}

export default function ProjectCard({ project, selectedImages, onImageChange }: ProjectCardProps) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set());
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const getCurrentMainImage = (project: Project): ProjectImage => {
    const selectedImageId = selectedImages[project.id] || 1;
    return project.images.find((img) => img.id === selectedImageId) || project.images[0];
  };

  const currentMainImage = getCurrentMainImage(project);

  // Precargar imágenes del proyecto
  useEffect(() => {
    console.log(loadedImages);
    const preloadImages = async () => {
      const newLoadingImages = new Set<string>();
      const newLoadedImages = new Set<string>();
      const newImageErrors = new Set<string>();

      // Marcar todas las imágenes como cargando
      project.images.forEach(img => {
        newLoadingImages.add(img.url);
      });
      setLoadingImages(newLoadingImages);

      // Cargar imágenes en paralelo
      const loadPromises = project.images.map(async (image) => {
        try {
          const img = new Image();
          await new Promise((resolve, reject) => {
            img.onload = () => {
              newLoadedImages.add(image.url);
              newLoadingImages.delete(image.url);
              resolve(image.url);
            };
            img.onerror = () => {
              newImageErrors.add(image.url);
              newLoadingImages.delete(image.url);
              reject(new Error(`Failed to load: ${image.url}`));
            };
            img.src = image.url;
          });
        } catch (error) {
          console.warn(`Error loading image: ${image.url}`, error);
        }
      });

      await Promise.allSettled(loadPromises);
      
      setLoadedImages(newLoadedImages);
      setLoadingImages(newLoadingImages);
      setImageErrors(newImageErrors);
    };

    preloadImages();
  }, [project.images]);

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

  // Transiciones optimizadas para imagen principal
  const mainImageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 1.05,
      filter: 'blur(1px)'
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      filter: 'blur(0px)'
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      filter: 'blur(1px)'
    }
  };

  const thumbnailVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1
    }
  };

  // Componente de estado de carga
  const LoadingState = ({ message }: { message: string }) => (
    <div className={styles.imageLoadingState}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className={styles.loadingSpinner}
      />
      <p className={styles.loadingMessage}>{message}</p>
    </div>
  );

  // Componente de error de imagen
  const ErrorState = ({ message }: { message: string }) => (
    <div className={styles.imageErrorState}>
      <span className={styles.errorIcon}>⚠️</span>
      <p className={styles.errorMessage}>{message}</p>
    </div>
  );

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
            {/* Imagen principal con AnimatePresence para transiciones suaves */}
            <div className={styles.mainImage}>
              <AnimatePresence mode="wait">
                <motion.div 
                  key={`${project.id}-${currentMainImage.id}`}
                  variants={mainImageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{
                    duration: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  {loadingImages.has(currentMainImage.url) ? (
                    <LoadingState message="Cargando imagen de alta calidad..." />
                  ) : imageErrors.has(currentMainImage.url) ? (
                    <ErrorState message="Imagen no disponible" />
                  ) : (
                    <img 
                      src={currentMainImage.url} 
                      alt={currentMainImage.name}
                      className={styles.mainImage}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
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
                  {loadingImages.has(image.url) ? (
                    <div className={styles.thumbnailLoading}>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className={styles.thumbnailSpinner}
                      />
                    </div>
                  ) : imageErrors.has(image.url) ? (
                    <div className={styles.thumbnailError}>
                      <span>⚠️</span>
                    </div>
                  ) : (
                    <img 
                      src={image.url} 
                      alt={image.name}
                      className={styles.thumbnailImage}
                    />
                  )}
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
          onClick={() => {
            const message = `Hola, me interesa obtener una cotización para un proyecto similar a "${project.title}"`;
            const whatsappUrl = `https://wa.me/50683352042?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
          }}
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