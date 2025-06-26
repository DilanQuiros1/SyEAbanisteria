'use client';

import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import ServiceCard from './ServiceCard';
import styles from '../page.module.css';
import { Service } from '../data/services';

interface ServicesSectionProps {
  services: Service[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="servicios" className={`section ${styles.servicesSection}`}>
      <div className="container">
        <AnimatedSection>
          <h2 className="section-title">Nuestros Servicios</h2>
          <p className="section-subtitle">
            Ofrecemos soluciones completas en ebanistería para transformar tu hogar
          </p>
          <motion.div 
            className={styles.servicesIntro}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p>
              Cada servicio está diseñado con pasión y atención al detalle, 
              utilizando los mejores materiales y técnicas artesanales para 
              crear piezas únicas que perduran en el tiempo.
            </p>
          </motion.div>
        </AnimatedSection>
        
        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 