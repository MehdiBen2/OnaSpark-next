'use client';

import { motion } from 'framer-motion';
import { 
  GeoAlt, 
  Telephone, 
  Envelope 
} from 'react-bootstrap-icons';

export default function ContactSection() {
  return (
    <section 
      id="contact" 
      className="relative py-24 bg-gradient-to-br from-gray-100 to-gray-200"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 text-gray-800">
            Contactez-nous
          </h2>
          <p className="text-xl text-gray-600">
            Nous sommes là pour répondre à vos questions et vous accompagner
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Address */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 text-blue-600 p-4 rounded-full mr-4">
                <GeoAlt size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Adresse
              </h3>
            </div>
            <p className="text-gray-600">
              Carrefour Sidi Arcine<br />
              Route de Baraki<br />
              Alger
            </p>
          </motion.div>

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center mb-6">
              <div className="bg-green-100 text-green-600 p-4 rounded-full mr-4">
                <Telephone size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Téléphone
              </h3>
            </div>
            <p className="text-gray-600">
              Pas encore déployé
            </p>
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center mb-6">
              <div className="bg-purple-100 text-purple-600 p-4 rounded-full mr-4">
                <Envelope size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Email
              </h3>
            </div>
            <p className="text-gray-600">
              Onahelper@gmail.com
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
