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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const getCurrentMainImage = (project: Project): ProjectImage => {
    const selectedImageId = selectedImages[project.id] || 1;
    return project.images.find((img) => img.id === selectedImageId) || project.images[0];
  };

  const currentMainImage = getCurrentMainImage(project);

  // Manejar carga de imagen principal
  const handleImageLoad = () => {
    // La imagen se cargó, pero mantenemos el spinner por 1.1 segundos
    console.log('Imagen cargada:', currentMainImage.url);
  };

  const handleImageError = () => {
    // Error de imagen, pero mantenemos el spinner por 1.1 segundos
    console.log('Error cargando imagen:', currentMainImage.url);
    setImageErrors(prev => new Set(prev).add(currentMainImage.url));
  };

  // Mostrar spinner por 1.1 segundos cada vez que cambia la imagen
  useEffect(() => {
    setIsImageLoading(true);
    
    // Timer fijo de 1.1 segundos
    const timer = setTimeout(() => {
      setIsImageLoading(false);
    }, 1100);

    return () => clearTimeout(timer);
  }, [currentMainImage.url]);

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

  // Navegación entre imágenes
  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % project.images.length;
    setCurrentImageIndex(nextIndex);
    onImageChange(project.id, project.images[nextIndex].id);
  };

  const prevImage = () => {
    const prevIndex = currentImageIndex === 0 ? project.images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    onImageChange(project.id, project.images[prevIndex].id);
  };

  // Navegación con teclado
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (project.images.length <= 1) return;
      
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          prevImage();
          break;
        case 'ArrowRight':
          event.preventDefault();
          nextImage();
          break;
        case 'Home':
          event.preventDefault();
          setCurrentImageIndex(0);
          onImageChange(project.id, project.images[0].id);
          break;
        case 'End':
          event.preventDefault();
          const lastIndex = project.images.length - 1;
          setCurrentImageIndex(lastIndex);
          onImageChange(project.id, project.images[lastIndex].id);
          break;
      }
    };

    // Solo agregar listener si hay más de una imagen
    if (project.images.length > 1) {
      document.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentImageIndex, project.images, project.id, onImageChange]);

  // Gestos táctiles
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      prevImage();
    }
  };

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

  // Componente de estado de carga mejorado
  const LoadingState = ({ message }: { message: string }) => (
    <div className={styles.imageLoadingOverlay}>
      <div className={styles.loadingContent}>
        <motion.div
          className={styles.loadingSpinner}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.p 
          className={styles.loadingMessage}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {message}
        </motion.p>
        <motion.div 
          className={styles.loadingProgress}
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
      </div>
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
          {/* Imagen principal con controles de navegación */}
          <div 
            className={styles.mainImageContainer}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div 
                key={`${project.id}-${currentMainImage.id}`}
                variants={mainImageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{
                  duration: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className={styles.mainImageWrapper}
              >
                <img 
                  src={currentMainImage.url} 
                  alt={currentMainImage.name}
                  className={styles.mainImage}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
                
                {/* Overlay de carga */}
                <AnimatePresence>
                  {isImageLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <LoadingState message="Cargando imagen de alta calidad..." />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Overlay de error */}
                <AnimatePresence>
                  {imageErrors.has(currentMainImage.url) && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ErrorState message="Imagen no disponible" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>

            {/* Controles de navegación */}
            {project.images.length > 1 && (
              <>
                <motion.button
                  className={styles.navButton}
                  onClick={prevImage}
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(139, 69, 19, 0.9)' }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                  style={{ left: '20px' }}
                  aria-label="Imagen anterior"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </motion.button>

                <motion.button
                  className={styles.navButton}
                  onClick={nextImage}
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(139, 69, 19, 0.9)' }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                  style={{ right: '20px' }}
                  aria-label="Siguiente imagen"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </motion.button>

                {/* Indicadores de imagen */}
                <motion.div 
                  className={styles.imageIndicators}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.3 }}
                >
                  {project.images.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`${styles.indicator} ${index === currentImageIndex ? styles.active : ''}`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                      onClick={() => {
                        setCurrentImageIndex(index);
                        onImageChange(project.id, project.images[index].id);
                      }}
                    />
                  ))}
                </motion.div>

                {/* Contador de imágenes */}
                <motion.div 
                  className={styles.imageCounter}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.3 }}
                >
                  {currentImageIndex + 1} / {project.images.length}
                </motion.div>
              </>
            )}
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