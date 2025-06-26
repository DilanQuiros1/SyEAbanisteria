'use client';

import AnimatedSection from './AnimatedSection';
import styles from '../page.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <AnimatedSection className={styles.footerSection} delay={0.1}>
            <h3>Muebles S y E</h3>
            <p>Donde la madera cobra vida en tus espacios</p>
          </AnimatedSection>
          
          <AnimatedSection className={styles.footerSection} delay={0.2}>
            <h4>Servicios</h4>
            <ul>
              <li>Muebles de Cocina</li>
              <li>Puertas</li>
              <li>Muebles Personalizados</li>
              <li>Proyectos Especiales</li>
            </ul>
          </AnimatedSection>
          
          <AnimatedSection className={styles.footerSection} delay={0.3}>
            <h4>Contacto</h4>
            <p>📞 +506 8888-8888</p>
            <p>📧 info@artemadera.com</p>
          </AnimatedSection>
        </div>
        
        <AnimatedSection className={styles.footerBottom} delay={0.4}>
          <p>&copy; 2024 Muebles S y E. Todos los derechos reservados.</p>
        </AnimatedSection>
      </div>
    </footer>
  );
} 