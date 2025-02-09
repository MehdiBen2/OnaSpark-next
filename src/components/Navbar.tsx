'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signOut, getSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
} from '@fortawesome/free-solid-svg-icons'

export default function Navbar () {
  const pathname = usePathname()
  const [session, setSession] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef(null)

  // Fetch session on component mount
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const sessionData = await getSession()
        setSession(sessionData)
      } catch (error) {
        console.error('Failed to fetch session', error)
        setSession(null)
      }
    }

    fetchSession()
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isActive = (path) => pathname === path ? 'bg-white text-[var(--ona-primary)]' : 'hover:bg-white/20'

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const NavLinks = () => (
    <>
      <Link
        href="/dashboard"
        className={`${isActive('/dashboard')} px-5 py-2 rounded-full text-base font-medium transition-all duration-200 flex items-center space-x-2.5`}
        onClick={() => {
          setIsMobileMenuOpen(false)
        }}
      >
        <FontAwesomeIcon icon={faChartLine} className="h-4 w-4" />
        <span>Tableau de bord</span>
      </Link>
      
      <Link
        href="/departements"
        className={`${isActive('/departements')} px-5 py-2 rounded-full text-base font-medium transition-all duration-200 flex items-center space-x-2.5`}
        onClick={() => {
          setIsMobileMenuOpen(false)
        }}
      >
        <FontAwesomeIcon icon={faBuilding} className="h-4 w-4" />
        <span>Départements</span>
      </Link>
      
      <Link
        href="/profile"
        className={`${isActive('/profile')} px-5 py-2 rounded-full text-base font-medium transition-all duration-200 flex items-center space-x-2.5`}
        onClick={() => {
          setIsMobileMenuOpen(false)
        }}
      >
        <FontAwesomeIcon icon={faUser} className="h-4 w-4" />
        <span>Mon Profil</span>
      </Link>
      
      <Link
        href="/documentation"
        className={`${isActive('/documentation')} px-5 py-2 rounded-full text-base font-medium transition-all duration-200 flex items-center space-x-2.5`}
        onClick={() => {
          setIsMobileMenuOpen(false)
        }}
      >
        <FontAwesomeIcon icon={faBook} className="h-4 w-4" />
        <span>Documentation</span>
      </Link>
    </>
  )

  if (!session) {
    return null
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
              {session.user.displayName || session.user.name || session.user.email}
            </span>
            <button 
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors duration-200 flex items-center space-x-2"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="h-4 w-4" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button 
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
          >
            <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} className="h-6 w-6" />
          </button>
        </div>
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
            className="md:hidden absolute top-16 left-0 right-0 bg-[var(--ona-primary)] shadow-lg"
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
              <NavLinks />
              <div className="pt-4 mt-4 border-t border-white/20">
                <button 
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  className="w-full px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors duration-200 flex items-center space-x-2"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="h-4 w-4" />
                  <span>Déconnexion</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
