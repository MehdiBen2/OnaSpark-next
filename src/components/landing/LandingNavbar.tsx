'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { User, Menu, X } from 'lucide-react';

export default function LandingNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Accueil', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'À Propos', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Image
              src="/images/onalogos/ona_logo.png"
              alt="ONA Logo"
              width={90}
              height={90}
              className="-my-6"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-12 ml-auto mr-16">
            {navItems.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                className="text-black hover:text-[var(--ona-secondary)] transition-colors duration-300 text-base font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          {/* Login Button */}
          <div className="hidden md:block">
            <Link 
              href="/login"
              className="inline-flex items-center px-5 py-2 
                border border-transparent 
                text-base font-medium rounded-full 
                text-white
                transition-all duration-300
                space-x-2
                hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, var(--ona-primary), var(--ona-secondary))',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                backgroundSize: '200% auto',
                backgroundPosition: '0 center',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundPosition = '100% center';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundPosition = '0 center';
              }}
            >
              <span>Connexion</span>
              <User className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-transparent p-2 inline-flex items-center justify-center text-[var(--ona-primary)] hover:text-[var(--ona-secondary)] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--ona-primary)]"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger Icon */}
              <Menu className="h-8 w-8" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/90 backdrop-blur-md shadow-md">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={toggleMenu}
                className="text-black hover:bg-white/50 block px-4 py-3 rounded-md text-lg font-medium"
              >
                {item.name}
              </a>
            ))}
            <Link 
              href="/login"
              className="text-white block px-4 py-3 rounded-md text-lg font-medium flex items-center space-x-2"
              style={{
                background: 'linear-gradient(135deg, var(--ona-primary), var(--ona-secondary))',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <span>Connexion</span>
              <User className="h-5 w-5" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
