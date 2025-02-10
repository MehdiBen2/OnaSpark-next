'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChartBar, 
  Building, 
  User, 
  Book, 
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '@/components/ui/alert-dialog'

// Define explicit type for session
type Session = {
  user: {
    displayName?: string
    name?: string
    email: string
  }
}

// Explicitly typed Navbar component
const Navbar: React.FC = function Navbar() {
  const pathname = usePathname()
  const [session, setSession] = useState<Session | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)

  // Debugging log
  console.log('Navbar component initialized', { 
    pathname, 
    session, 
    isMobileMenuOpen 
  })

  // Fetch session on component mount
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { getSession } = await import('next-auth/react')
        const sessionData = await getSession()
        
        // More detailed debugging
        console.log('Session fetch result:', {
          sessionData,
          type: typeof sessionData
        })

        setSession(sessionData as Session | null)
      } catch (error) {
        console.error('Failed to fetch session', error)
        setSession(null)
      }
    }

    fetchSession()
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isActive = (path: string) => {
    // Exact match for dashboard
    if (path === '/dashboard' && pathname === path) return 'bg-white text-[var(--ona-primary)]'
    
    // Nested route match for departements
    if (path === '/departements' && pathname.startsWith('/departements')) {
      return 'bg-white text-[var(--ona-primary)]'
    }
    
    // Exact match for other routes
    return pathname === path ? 'bg-white text-[var(--ona-primary)]' : 'hover:bg-white/20'
  }

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
        <ChartBar className="h-4 w-4" />
        <span>Tableau de bord</span>
      </Link>
      
      <Link
        href="/departements"
        className={`${isActive('/departements')} px-5 py-2 rounded-full text-base font-medium transition-all duration-200 flex items-center space-x-2.5`}
        onClick={() => {
          setIsMobileMenuOpen(false)
        }}
      >
        <Building className="h-4 w-4" />
        <span>Départements</span>
      </Link>
      
      <Link
        href="/profile"
        className={`${isActive('/profile')} px-5 py-2 rounded-full text-base font-medium transition-all duration-200 flex items-center space-x-2.5`}
        onClick={() => {
          setIsMobileMenuOpen(false)
        }}
      >
        <User className="h-4 w-4" />
        <span>Mon Profil</span>
      </Link>
      
      <Link
        href="/documentation"
        className={`${isActive('/documentation')} px-5 py-2 rounded-full text-base font-medium transition-all duration-200 flex items-center space-x-2.5`}
        onClick={() => {
          setIsMobileMenuOpen(false)
        }}
      >
        <Book className="h-4 w-4" />
        <span>Documentation</span>
      </Link>
    </>
  )

  // Early return if no session
  if (!session) {
    console.log('No session available, returning null')
    return null
  }

  // Render the full navbar
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 20,
        duration: 0.5
      }}
      className="fixed top-0 left-0 right-0 z-50 
      text-white 
      shadow-md 
      transition-all duration-300 
      flex justify-center"
      style={{ 
        background: 'linear-gradient(135deg, var(--ona-primary) 0%, var(--ona-secondary) 100%)', 
        height: '64px' 
      }}
    >
      <div className="w-full max-w-7xl px-4 py-2 flex justify-between items-center h-full">
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
              <User className="h-4 w-4 mr-2" />
              {session.user.displayName || session.user.name || session.user.email}
            </span>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button 
                  className="px-3 py-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200 flex items-center justify-center"
                  aria-label="Déconnexion"
                  title="Déconnexion"
                >
                  <LogOut className="h-5 w-5 text-white" />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Êtes-vous sûr de vouloir vous déconnecter ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Vous allez être redirigé vers la page de connexion. Toute session non enregistrée sera perdue.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={() => signOut({ callbackUrl: '/login' })}>
                    Se déconnecter
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button 
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
              className="md:hidden absolute top-16 left-0 right-0 bg-[var(--ona-primary)] shadow-lg"
            >
              <div className="px-4 pt-2 pb-4 space-y-2">
                <NavLinks />
                <div className="pt-4 mt-4 border-t border-white/20">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button 
                        className="w-full px-3 py-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors duration-200 flex items-center justify-center"
                        aria-label="Déconnexion"
                        title="Déconnexion"
                      >
                        <LogOut className="h-5 w-5 text-white" />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Êtes-vous sûr de vouloir vous déconnecter ?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Vous allez être redirigé vers la page de connexion. Toute session non enregistrée sera perdue.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={() => signOut({ callbackUrl: '/login' })}>
                          Se déconnecter
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

// Explicitly export the component
export default Navbar
