'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">
              ONA SparK
            </h3>
            <p className="text-gray-400 mb-6">
              Solution innovante pour la gestion intelligente de l'assainissement, transformant les données en insights stratégiques.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Liens Rapides</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link 
                  href="#services" 
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link 
                  href="#about" 
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  À Propos
                </Link>
              </li>
              <li>
                <Link 
                  href="#contact" 
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Nos Services</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Gestion des Données
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Analyse des Incidents
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Cartographie
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Qualité de l'Eau
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-semibold mb-6">
              Restez Informé
            </h4>
            <p className="text-gray-400 mb-4">
              Abonnez-vous à notre newsletter pour les dernières mises à jour
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Votre email" 
                className="w-full px-4 py-2 rounded-l-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors duration-300"
              >
                S'abonner
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500">
            {new Date().getFullYear()} ONA SparK. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
