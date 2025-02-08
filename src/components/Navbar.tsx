'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FontAwesomeIcon 
} from '@fortawesome/react-fontawesome';
import { 
  faChartLine, 
  faBuilding, 
  faUser, 
  faBook, 
  faSignOutAlt,
  faShieldAlt,
  faChevronDown,
  faUsers,
  faCog,
  faBars,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsAdminOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) => pathname === path ? 'bg-white text-[var(--ona-primary)]' : 'hover:bg-white/20';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsAdminOpen(false);
  };

  const NavLinks = () => (
    <>
      <Link
        href="/dashboard"
        className={`${isActive('/dashboard')} px-5 py-2 rounded-full text-base font-medium transition-all duration-200 flex items-center space-x-2.5`}
        onClick={() => {
          setIsMobileMenuOpen(false);
          setIsAdminOpen(false);
        }}
      >
        <FontAwesomeIcon icon={faChartLine} className="h-4 w-4" />
        <span>Tableau de bord</span>
      </Link>
      <Link
        href="/departements"
        className={`${isActive('/departements')} px-5 py-2 rounded-full text-base font-medium transition-all duration-200 flex items-center space-x-2.5`}
        onClick={() => {
          setIsMobileMenuOpen(false);
          setIsAdminOpen(false);
        }}
      >
        <FontAwesomeIcon icon={faBuilding} className="h-4 w-4" />
        <span>Départements</span>
      </Link>
      <Link
        href="/profile"
        className={`${isActive('/profile')} px-5 py-2 rounded-full text-base font-medium transition-all duration-200 flex items-center space-x-2.5`}
        onClick={() => {
          setIsMobileMenuOpen(false);
          setIsAdminOpen(false);
        }}
      >
        <FontAwesomeIcon icon={faUser} className="h-4 w-4" />
        <span>Mon Profil</span>
      </Link>
      {session?.user?.role === 'Admin' && (
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsAdminOpen(!isAdminOpen)}
            className={`${pathname.startsWith('/admin') ? 'bg-white text-[var(--ona-primary)]' : 'hover:bg-white/20'} px-5 py-2 rounded-full text-base font-medium transition-all duration-200 flex items-center space-x-2.5 w-full justify-between`}
          >
            <div className="flex items-center space-x-2.5">
              <FontAwesomeIcon icon={faShieldAlt} className="h-4 w-4" />
              <span>Administration</span>
            </div>
            <FontAwesomeIcon 
              icon={faChevronDown} 
              className={`h-3 w-3 transition-transform duration-200 ${isAdminOpen ? 'rotate-180' : ''}`}
            />
          </button>

          <AnimatePresence>
            {isAdminOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="py-1 space-y-2">
                  <Link
                    href="/admin/users"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 rounded-lg"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsAdminOpen(false);
                    }}
                  >
                    <FontAwesomeIcon icon={faUsers} className="h-4 w-4" />
                    <span>Gestion Utilisateurs</span>
                  </Link>
                  <Link
                    href="/admin/settings"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 rounded-lg"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsAdminOpen(false);
                    }}
                  >
                    <FontAwesomeIcon icon={faCog} className="h-4 w-4" />
                    <span>Paramètres</span>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
      <Link
        href="/documentation"
        className={`${isActive('/documentation')} px-5 py-2 rounded-full text-base font-medium transition-all duration-200 flex items-center space-x-2.5`}
        onClick={() => {
          setIsMobileMenuOpen(false);
          setIsAdminOpen(false);
        }}
      >
        <FontAwesomeIcon icon={faBook} className="h-4 w-4" />
        <span>Documentation</span>
      </Link>
    </>
  );

  if (!session) {
    return null;
  }

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 
      text-white 
      shadow-md 
      transition-all duration-300"
      style={{ 
        background: 'linear-gradient(135deg, var(--ona-primary) 0%, var(--ona-secondary) 100%)', 
        height: '64px' 
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center h-full">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center -my-4">
          <Link href="/dashboard" className="flex items-center">
            <div className="relative w-20 h-20">
              <Image
                src="/images/onalogos/ona_logo.png"
                alt="ONA Logo"
                fill
                className="object-contain brightness-0 invert"
                priority
                quality={100}
                sizes="(max-width: 768px) 80px, 96px"
              />
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <NavLinks />

          {/* User info and logout */}
          <div className="flex items-center pl-6 border-l border-white/20">
            <span className="text-sm font-medium mr-4 flex items-center">
              <FontAwesomeIcon icon={faUser} className="h-4 w-4 mr-2" />
              {session.user.name || session.user.email}
            </span>
            <motion.button
              onClick={() => signOut({ callbackUrl: '/login' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                bg-white/20 
                hover:bg-white/30 
                text-white 
                p-2 
                rounded-full 
                transition-all 
                duration-300 
                flex 
                items-center 
                justify-center
              "
              title="Déconnexion"
            >
              <FontAwesomeIcon 
                icon={faSignOutAlt} 
                className="h-5 w-5" 
              />
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              setIsAdminOpen(false);
            }}
            className="
              bg-white/20 
              hover:bg-white/30 
              text-white 
              p-2 
              rounded-full 
              transition-all 
              duration-300 
              flex 
              items-center 
              justify-center
            "
          >
            <FontAwesomeIcon 
              icon={isMobileMenuOpen ? faTimes : faBars} 
              className="h-5 w-5" 
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              ref={mobileMenuRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="
                fixed 
                top-16 
                left-0 
                right-0 
                bg-white 
                shadow-lg 
                z-40 
                md:hidden
                text-gray-800
              "
            >
              <div className="flex flex-col space-y-2 p-4">
                <NavLinks />
                
                {/* Mobile User Info and Logout */}
                <div className="pt-4 mt-4 border-t border-gray-200 flex flex-col space-y-2">
                  <div className="flex items-center mb-2">
                    <FontAwesomeIcon icon={faUser} className="h-4 w-4 mr-2 text-gray-600" />
                    <span className="text-sm font-medium text-gray-800">
                      {session.user.name || session.user.email}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      signOut({ callbackUrl: '/login' });
                      setIsMobileMenuOpen(false);
                    }}
                    className="
                      bg-[var(--ona-primary)] 
                      text-white 
                      px-4 
                      py-2 
                      rounded-full 
                      flex 
                      items-center 
                      justify-center 
                      space-x-2
                      transition-all 
                      duration-300
                      hover:bg-opacity-90
                    "
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="h-4 w-4" />
                    <span>Déconnexion</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
