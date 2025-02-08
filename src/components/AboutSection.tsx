'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section 
      id="about" 
      className="relative py-32 overflow-hidden"
      style={{ 
        backgroundImage: 'url("/images/landingcarouselle/1.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0056b3]/50 via-[#00a86b]/50 to-[#004494]/50"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 shadow-xl"
        >
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="text-white">
              <h2 className="text-5xl font-bold mb-6">
                À Propos de la Plateforme
              </h2>
              <p className="text-2xl mb-8 text-white/90">
                Une solution moderne pour la gestion des données de l'ONA
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                ONA SparK offre une interface intuitive et sécurisée pour la gestion centralisée des données, permettant une collaboration efficace entre les différents services.
              </p>
            </div>

            {/* Logo */}
            <div className="flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="w-full max-w-md"
              >
                <Image 
                  src="/images/onalogos/SPARK.png" 
                  alt="SPARK Logo" 
                  width={500} 
                  height={500} 
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
