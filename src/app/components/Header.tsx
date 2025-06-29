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

  // Detectar cuando el menú de filtros está visible con transición más suave
  useEffect(() => {
    const handleScroll = () => {
      const gallerySection = document.getElementById('galeria');
      if (gallerySection) {
        const rect = gallerySection.getBoundingClientRect();
        const isVisible = rect.top <= 100 && rect.bottom >= 100;
        
        // Transición más suave con delay
        if (isVisible !== isFiltersMenuVisible) {
          setTimeout(() => {
            setIsFiltersMenuVisible(isVisible);
          }, 100);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Verificar estado inicial

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFiltersMenuVisible]);

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
        y: isFiltersMenuVisible ? -100 : 0,
        scale: isFiltersMenuVisible ? 0.95 : 1
      }}
      transition={{ 
        duration: 0.6, 
        ease: [0.25, 0.46, 0.45, 0.94],
        opacity: { duration: 0.4 },
        y: { duration: 0.5 },
        scale: { duration: 0.3 }
      }}
    >
      <div className="container">
        <nav className={styles.nav}>
          <motion.div 
            className={styles.logoContainer}
            animate={{
              opacity: isFiltersMenuVisible ? 0 : 1,
              x: isFiltersMenuVisible ? -20 : 0
            }}
            transition={{ 
              duration: 0.4, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: isFiltersMenuVisible ? 0 : 0.1
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src="/images/Logo/Logo.png"
                alt="Taller de ebanistería Muebles S y E"
                width={100}
                height={100}
              />
            </motion.div>
            <motion.div 
              className={styles.logo}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h1>Muebles S y E</h1>
            </motion.div>
          </motion.div>
          
          {/* Menú hamburguesa para móvil */}
          <motion.button
            className={styles.mobileMenuButton}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
            animate={{
              opacity: isFiltersMenuVisible ? 0 : 1,
              scale: isFiltersMenuVisible ? 0.8 : 1
            }}
            transition={{ 
              duration: 0.3, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: isFiltersMenuVisible ? 0 : 0.2
            }}
          >
            <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.active : ''}`}></span>
            <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.active : ''}`}></span>
            <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.active : ''}`}></span>
          </motion.button>

          {/* Menú de navegación */}
          <motion.ul 
            className={`${styles.navLinks} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}
            animate={{
              opacity: isFiltersMenuVisible ? 0 : 1,
              y: isFiltersMenuVisible ? -10 : 0
            }}
            transition={{ 
              duration: 0.4, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: isFiltersMenuVisible ? 0 : 0.3
            }}
          >
            {[
              { href: '#inicio', text: 'Inicio' },
              { href: '#servicios', text: 'Servicios' },
              { href: '#galeria', text: 'Galería' },
              { href: '#contacto', text: 'Contacto' }
            ].map((link, index) => (
              <motion.li 
                key={link.href}
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.3, 
                  delay: 0.4 + index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                <a href={link.href} className="nav-link" onClick={handleNavLinkClick}>
                  {link.text}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </nav>
      </div>
    </motion.header>
  );
} 