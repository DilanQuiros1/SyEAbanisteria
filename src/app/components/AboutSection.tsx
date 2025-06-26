'use client';

import AnimatedSection from './AnimatedSection';
import Image from 'next/image';
import styles from '../page.module.css';

export default function AboutSection() {
  return (
    <AnimatedSection className="section">
      <div className="container">
        <h2 className="section-title">Sobre Nosotros</h2>
        <p className="section-subtitle">
          Más que carpinteros, somos artesanos apasionados por crear espacios únicos
        </p>
        
        <div className={styles.aboutContent}>
          <AnimatedSection className={styles.aboutText} delay={0.2}>
            <h3>Muebles S y E</h3>
            <p>
              En Muebles S y E, creemos que cada pieza de madera tiene una historia que contar. 
              Nuestro compromiso es transformar esa historia en muebles y espacios que no solo 
              satisfagan tus necesidades funcionales, sino que también reflejen tu personalidad 
              y estilo de vida.
            </p>
            
            <h3>Nuestros Valores</h3>
            <ul>
              <li><strong>Dedicación:</strong> Cada proyecto recibe nuestra atención completa</li>
              <li><strong>Precisión:</strong> Detalles perfectos en cada acabado</li>
              <li><strong>Calidad:</strong> Solo utilizamos los mejores materiales</li>
              <li><strong>Innovación:</strong> Diseños únicos y soluciones creativas</li>
            </ul>
          </AnimatedSection>
          
          <AnimatedSection className={styles.aboutImage} delay={0.4} direction="right">
            <div className={styles.aboutImageContainer}>
              <Image
                src="/images/MainImages/mainImage.jpg"
                alt="Taller de ebanistería Muebles S y E"
                width={500}
                height={400}
                className={styles.aboutImageContent}
                priority
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </AnimatedSection>
  );
} 