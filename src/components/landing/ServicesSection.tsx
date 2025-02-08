'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  DatabaseCheck, 
  GraphUp, 
  Map, 
  LightningCharge, 
  ShieldExclamation, 
  Droplet 
} from 'react-bootstrap-icons';

const services = [
  {
    icon: DatabaseCheck,
    title: 'Gestion des Données',
    description: 'Centralisez et gérez efficacement toutes vos données d\'entreprise',
    gradient: 'from-blue-500 to-blue-700'
  },
  {
    icon: GraphUp,
    title: 'Analyses et Rapports',
    description: 'Générez des rapports détaillés et des analyses approfondies',
    gradient: 'from-green-500 to-green-700'
  },
  {
    icon: Map,
    title: 'Vue des Incidents sur Carte',
    description: 'Visualisez et localisez les incidents signalés sur une carte interactive',
    gradient: 'from-purple-500 to-purple-700'
  },
  {
    icon: LightningCharge,
    title: 'Agent Ona Spark',
    description: 'Assistant intelligent pour la gestion et l\'analyse des ressources en eau',
    gradient: 'from-orange-500 to-orange-700'
  },
  {
    icon: ShieldExclamation,
    title: 'Analyse Détaillée des Incidents',
    description: 'Explication approfondie et contextuelle des incidents et accidents',
    gradient: 'from-red-500 to-red-700'
  },
  {
    icon: Droplet,
    title: 'Analyse Qualité d\'Eau Épurée',
    description: 'Évaluation détaillée et en temps réel de la qualité des eaux traitées',
    gradient: 'from-cyan-500 to-cyan-700'
  }
];

export default function ServicesSection() {
  return (
    <div id="services" className="container mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Nos Services
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Découvrez comment ONA Spark transforme la gestion de l'assainissement grâce à des solutions innovantes et des technologies de pointe.
        </p>
      </div>

      <section 
        className="relative py-20 overflow-hidden bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("/images/backrounds/ona2.png")',
          backgroundBlendMode: 'soft-light'
        }}
      >
        <div className="absolute inset-0 bg-blue-50/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-5 text-gray-800">
              Ona SparK vous permet
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Gérez efficacement l'assainissement, prévenez les incidents, centralisez vos données et générez des bilans précis pour une gestion optimale des infrastructures.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1 
                }}
                viewport={{ once: true }}
                className="group h-full"
              >
                <div className="bg-white 
                  rounded-2xl 
                  p-6 
                  shadow-lg 
                  hover:shadow-2xl 
                  transition-all 
                  duration-300 
                  transform 
                  hover:-translate-y-3 
                  border 
                  border-gray-100 
                  relative 
                  overflow-hidden
                  h-full
                  flex
                  flex-col"
                >
                  <div className="absolute -top-10 -right-10 
                    w-24 h-24 
                    bg-gradient-to-br 
                    opacity-10 
                    group-hover:opacity-20 
                    transition-all 
                    duration-300 
                    rounded-full 
                    z-0"
                    style={{
                      backgroundImage: `linear-gradient(${service.gradient})`
                    }}
                  ></div>

                  <div className="relative z-10 flex flex-col items-center text-center flex-grow">
                    <div className={`
                      w-16 h-16 
                      mb-5 
                      rounded-full 
                      flex 
                      items-center 
                      justify-center 
                      bg-gradient-to-br 
                      ${service.gradient} 
                      text-white 
                      shadow-md`}
                    >
                      <service.icon size={32} />
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
