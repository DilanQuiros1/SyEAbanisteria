'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from '../page.module.css';

export default function HeroSection() {
  return (
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
  );
} 