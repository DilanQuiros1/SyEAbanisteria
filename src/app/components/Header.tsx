'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from '../page.module.css';

export default function Header() {
  const { scrollY } = useScroll();
  const [isFiltersMenuVisible, setIsFiltersMenuVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
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

  // Cerrar menú móvil al hacer clic en un enlace
  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

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
          <div className={styles.logoContainer}>
            <Image
              src="/images/Logo/logo.png"
              alt="Taller de ebanistería Muebles S y E"
              width={100}
              height={100}
            />
            <motion.div 
              className={styles.logo}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h1>Muebles S y E</h1>
            </motion.div>
          </div>
          
          {/* Menú hamburguesa para móvil */}
          <motion.button
            className={styles.mobileMenuButton}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.active : ''}`}></span>
            <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.active : ''}`}></span>
            <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.active : ''}`}></span>
          </motion.button>

          {/* Menú de navegación */}
          <ul className={`${styles.navLinks} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
            <motion.li whileHover={{ y: -2 }}>
              <a href="#inicio" className="nav-link" onClick={handleNavLinkClick}>Inicio</a>
            </motion.li>
            <motion.li whileHover={{ y: -2 }}>
              <a href="#servicios" className="nav-link" onClick={handleNavLinkClick}>Servicios</a>
            </motion.li>
            <motion.li whileHover={{ y: -2 }}>
              <a href="#galeria" className="nav-link" onClick={handleNavLinkClick}>Galería</a>
            </motion.li>
            <motion.li whileHover={{ y: -2 }}>
              <a href="#contacto" className="nav-link" onClick={handleNavLinkClick}>Contacto</a>
            </motion.li>
          </ul>
        </nav>
      </div>
    </motion.header>
  );
} 