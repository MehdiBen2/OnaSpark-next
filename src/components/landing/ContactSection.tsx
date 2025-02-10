'use client';

import { Phone, Mail, MapPin } from 'lucide-react';

export default function ContactSection() {
  return (
    <section 
      id="contact" 
      className="relative py-32 overflow-hidden"
      style={{ 
        backgroundImage: 'url("/images/backrounds/ona2.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              Contactez-nous
            </h2>
            <p className="text-lg max-w-2xl mx-auto text-gray-600">
              Nous sommes là pour répondre à vos questions et vous aider.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Email Contact */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 text-center hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                  <Mail size={32} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Email
              </h3>
              <p className="text-gray-600">
                Onahelper@gmail.com
              </p>
            </div>

            {/* Phone Contact */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 text-center hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                  <Phone size={32} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Téléphone
              </h3>
              <p className="text-gray-600">
                +213 (0) 123 456 789
              </p>
            </div>

            {/* Address */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 text-center hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                  <MapPin size={32} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Adresse
              </h3>
              <p className="text-gray-600">
                Rue des Frères Bouadja, El Harrach, Alger
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
