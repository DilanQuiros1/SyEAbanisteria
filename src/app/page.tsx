'use client';

import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import GallerySection from './components/GallerySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { projects } from './data/projects';
import { services } from './data/services';

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection services={services} />
      <GallerySection projects={projects} />
      <ContactSection />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
