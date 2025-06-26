'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from '../page.module.css';

export default function Header() {
  const { scrollY } = useScroll();
  const [isFiltersMenuVisible, setIsFiltersMenuVisible] = useState(false);
  
  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.98)']
  );

  // Detectar cuando el menú de filtros está visible
  useEffect(() => {
    const handleScroll = () => {
      const gallerySection = document.getElementById('galeria');
      if (gallerySection) {
        const rect = gallerySection.getBoundingClientRect();
        const isVisible = rect.top <= 100 && rect.bottom >= 100;
        setIsFiltersMenuVisible(isVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Verificar estado inicial

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      className={styles.header}
      style={{ background: headerBackground }}
      animate={{
        opacity: isFiltersMenuVisible ? 0 : 1,
        y: isFiltersMenuVisible ? -100 : 0
      }}
      transition={{ duration: 0.3 }}
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
  );
} 