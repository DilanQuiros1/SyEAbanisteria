'use client';

import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import styles from '../page.module.css';

export default function ContactSection() {
  return (
    <section id="contacto" className={`section ${styles.contactSection}`}>
      <div className="container">
        <AnimatedSection>
          <h2 className="section-title">Contáctanos</h2>
          <p className="section-subtitle">
            ¿Listo para transformar tu espacio? Conversemos sobre tu proyecto
          </p>
        </AnimatedSection>
        
        <div className={styles.contactContent}>
          <AnimatedSection className={styles.contactInfo} delay={0.2}>
            <h3>Información de Contacto</h3>
            <motion.div 
              className={styles.contactItem}
              whileHover={{ x: 10 }}
              onClick={() => {
                window.location.href = 'tel:+50683352042';
              }}
              style={{ cursor: 'pointer' }}
            >
              <span className={styles.contactIcon}>📞</span>
              <div>
                <h4>Teléfono</h4>
                <p>+506 8335-2042</p>
              </div>
            </motion.div>
            
            <motion.div 
              className={styles.contactItem}
              whileHover={{ x: 10 }}
              onClick={() => {
                const message = `Hola, me interesa obtener una cotización para un proyecto!"`;
                const whatsappUrl = `https://wa.me/50683352042?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
              }}
            >
              <span className={styles.contactIcon}>📧</span>
              <div>
                <h4>Whatsapp</h4>
                <p>+506 8335-2042</p>
              </div>
            </motion.div>
            
            <motion.div 
              className={styles.contactItem}
              whileHover={{ x: 10 }}
            >
              <span className={styles.contactIcon}>📍</span>
              <div>
                <h4>Ubicación</h4>
                <p>Perez Zeledon, Costa Rica</p>
              </div>
            </motion.div>
            
            <motion.div 
              className={styles.contactItem}
              whileHover={{ x: 10 }}
            >
              <span className={styles.contactIcon}>⏰</span>
              <div>
                <h4>Horarios</h4>
                <p>Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                <p>Sábados: 9:00 AM - 2:00 PM</p>
              </div>
            </motion.div>
          </AnimatedSection>
          
          <AnimatedSection className={styles.contactForm} delay={0.4} direction="right">
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className={styles.formGroup}>
                <input type="text" placeholder="Nombre completo" required />
              </div>
              
              <div className={styles.formGroup}>
                <input type="email" placeholder="Email" required />
              </div>
              
              <div className={styles.formGroup}>
                <input type="tel" placeholder="Teléfono" />
              </div>
              
              <div className={styles.formGroup}>
                <select required>
                  <option value="">Selecciona el tipo de proyecto</option>
                  <option value="cocina">Cocina</option>
                  <option value="puertas">Puertas</option>
                  <option value="muebles">Muebles</option>
                  <option value="personalizado">Proyecto Personalizado</option>
                </select>
              </div>
              
              <div className={styles.formGroup}>
                <textarea 
                  placeholder="Cuéntanos sobre tu proyecto..."
                  rows={5}
                  required
                ></textarea>
              </div>
              
              <motion.button 
                type="submit" 
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Enviar Mensaje
              </motion.button>
            </motion.form>
          </AnimatedSection>
        </div>

        {/* Sección del Mapa */}
        <AnimatedSection delay={0.6}>
          <motion.div 
            className={styles.mapSection}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h3 className={styles.mapTitle}>Nuestra Ubicación</h3>
            <p className={styles.mapSubtitle}>
              Visítanos en Pérez Zeledón, Costa Rica. Estamos aquí para ayudarte con tu proyecto de ebanistería.
            </p>
            
            <motion.div 
              className={styles.mapContainer}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <iframe
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Perez+Zeledon,Costa+Rica"
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: '20px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Muebles S y E en Pérez Zeledón, Costa Rica"
              ></iframe>
            </motion.div>

            {/* Información del negocio fuera del mapa */}
            <motion.div 
              className={styles.mapInfoSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <div className={styles.mapInfoCard}>
                <span className={styles.mapIcon}>📍</span>
                <div className={styles.mapInfoContent}>
                  <h4>Muebles S y E</h4>
                  <p>Pérez Zeledón, Costa Rica</p>
                  <p className={styles.mapDescription}>
                    Taller de ebanistería especializado en cocinas, puertas y muebles personalizados
                  </p>
                  <motion.button 
                    className={styles.mapButton}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      window.open('https://maps.google.com/?q=Perez+Zeledon+Costa+Rica', '_blank');
                    }}
                  >
                    Ver en Google Maps
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
} 