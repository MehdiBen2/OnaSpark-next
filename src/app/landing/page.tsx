'use client';

import Image from 'next/image';
import Link from 'next/link';
import ImageCarousel from '@/components/landing/ImageCarousel';
import ServicesSection from '@/components/landing/ServicesSection';
import AboutSection from '@/components/landing/AboutSection';
import ContactSection from '@/components/landing/ContactSection';
import Footer from '@/components/landing/Footer';
import LandingNavbar from '@/components/landing/LandingNavbar';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [currentTitle, setCurrentTitle] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const titles = [
    'Office National de l\'Assainissement',
    'L\'eau lave tous, L\'ONA épure l\'eau'
  ];

  useEffect(() => {
    setIsClient(true);
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 3000);

    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const titleVariants = {
    initial: { 
      opacity: 0, 
      y: 20 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { 
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Navbar */}
      <LandingNavbar />

      {/* Go to Top Button */}
      {isVisible && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 
            bg-blue-600 text-white 
            w-12 h-12 rounded-full 
            flex items-center justify-center 
            shadow-lg hover:bg-blue-700 
            transition-all duration-300 
            animate-bounce"
          aria-label="Retour en haut"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            className="w-6 h-6"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" 
            />
          </svg>
        </button>
      )}

      {/* Hero Section */}
      <section className="min-h-screen w-full relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <ImageCarousel />
          <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white text-center px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            {/* Content Section */}
            <div className="text-white space-y-8 text-center md:text-left">
              {/* Animated Title */}
              {isClient && (
                <AnimatePresence mode="wait">
                  <motion.h1 
                    key={currentTitle}
                    variants={titleVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="text-6xl font-bold leading-tight 
                      bg-clip-text text-transparent 
                      bg-gradient-to-r 
                      from-white 
                      via-blue-100 
                      to-blue-200"
                  >
                    {titles[currentTitle]}
                  </motion.h1>
                </AnimatePresence>
              )}
              {!isClient && (
                <h1 className="text-6xl font-bold leading-tight 
                  bg-clip-text text-transparent 
                  bg-gradient-to-r 
                  from-white 
                  via-blue-100 
                  to-blue-200">
                  {titles[0]}
                </h1>
              )}

              {/* Subtitle */}
              <p className="text-xl text-blue-50 max-w-xl mx-auto md:mx-0 leading-relaxed">
                Plateforme interne dédiée aux employés de l'ONA, offrant un accès centralisé aux informations, archives et outils essentiels pour une gestion efficace et transparente.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center md:justify-start items-center">
                <Link 
                  href="/login" 
                  className="w-full sm:w-auto px-10 py-4 text-lg 
                    bg-white text-blue-900 
                    rounded-full 
                    hover:bg-blue-50 
                    transition-all duration-300 
                    inline-flex items-center 
                    justify-center
                    shadow-xl 
                    hover:shadow-2xl 
                    hover:-translate-y-1 
                    focus:outline-none 
                    focus:ring-4 
                    focus:ring-blue-200 
                    focus:ring-opacity-50"
                >
                  <span className="mr-3 font-semibold">Accéder à la Plateforme</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </Link>
                
                <button 
                  onClick={() => {
                    const aboutSection = document.getElementById('about');
                    aboutSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-10 py-4 text-lg 
                    border-2 border-white 
                    text-white 
                    rounded-full 
                    hover:bg-white/20 
                    transition-all duration-300 
                    inline-flex items-center 
                    justify-center
                    shadow-xl 
                    hover:shadow-2xl 
                    hover:-translate-y-1 
                    focus:outline-none 
                    focus:ring-4 
                    focus:ring-white 
                    focus:ring-opacity-50"
                >
                  <span className="font-semibold">Découvrir Plus</span>
                </button>
              </div>
            </div>

            {/* Logo Section */}
            <div className="hidden md:flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md"
              >
                <Image 
                  src="/images/onalogos/ona_logoFull.png" 
                  alt="ONA Logo" 
                  width={500} 
                  height={500} 
                  className="w-full h-auto object-contain brightness-0 invert"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <div id="services" className="relative z-20 bg-blue-50 w-full">
        <ServicesSection />
      </div>

      {/* About Section */}
      <div id="about" className="relative z-20 bg-blue-50 w-full">
        <AboutSection />
      </div>

      {/* Contact Section */}
      <div id="contact" className="relative z-20 bg-blue-50 w-full">
        <ContactSection />
      </div>

      {/* Footer */}
      <div className="relative z-20 w-full">
        <Footer />
      </div>
    </div>
  );
}