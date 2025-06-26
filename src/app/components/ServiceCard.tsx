'use client';

import { motion } from 'framer-motion';
import AnimatedCard from './AnimatedCard';
import styles from '../page.module.css';
import { Service } from '../data/services';

interface ServiceCardProps {
  service: Service;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <AnimatedCard 
      className={styles.serviceCard}
      delay={index * 0.1}
    >
      <div className={styles.serviceImageContainer}>
        <div className={styles.serviceImage}>
          <img 
            src={service.image} 
            alt={service.title}
            className={styles.serviceImage}
          />
        </div>
        <div className={styles.serviceOverlay}>
          <span className={styles.serviceIcon}>{service.icon}</span>
        </div>
      </div>
      
      <div className={styles.serviceContent}>
        <h3>{service.title}</h3>
        <p className={styles.serviceDescription}>{service.description}</p>
        
        <div className={styles.serviceFeatures}>
          {service.features.map((feature, featureIndex) => (
            <motion.div 
              key={featureIndex}
              className={styles.serviceFeature}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + featureIndex * 0.1 }}
            >
              <span className={styles.featureIcon}>✓</span>
              <span>{feature}</span>
            </motion.div>
          ))}
        </div>
        
        <motion.button 
          className={styles.serviceButton}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Cotizar
        </motion.button>
      </div>
    </AnimatedCard>
  );
} 