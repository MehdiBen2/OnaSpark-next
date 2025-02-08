'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faChartLine, 
  faBuilding, 
  faUser, 
  faShieldAlt, 
  faBook,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {
  const { data: session } = useSession()
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path ? 'bg-blue-700' : ''

  if (!session) {
    return null
  }

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center -my-4">
            <Link href="/dashboard" className="flex items-center">
              <div className="relative w-24 h-24">
                <Image
                  src="/images/onalogos/ona_logo.png"
                  alt="ONA Logo"
                  fill
                  className="object-contain"
                  priority
                  quality={100}
                  sizes="(max-width: 768px) 64px, 96px"
                  style={{
                    filter: 'brightness(0) invert(1)',
                  }}
                />
              </div>
            </Link>
          </div>

          {/* Navigation and User menu */}
          <div className="flex items-center space-x-4">
            <Link
              href="/dashboard"
              className={`${isActive('/dashboard')} px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center space-x-2`}
            >
              <FontAwesomeIcon icon={faChartLine} className="h-4 w-4" />
              <span>Tableau de bord</span>
            </Link>
            <Link
              href="/departements"
              className={`${isActive('/departements')} px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center space-x-2`}
            >
              <FontAwesomeIcon icon={faBuilding} className="h-4 w-4" />
              <span>Départements</span>
            </Link>
            <Link
              href="/profile"
              className={`${isActive('/profile')} px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center space-x-2`}
            >
              <FontAwesomeIcon icon={faUser} className="h-4 w-4" />
              <span>Mon Profil</span>
            </Link>
            {session?.user?.role === 'Admin' && (
              <Link
                href="/admin"
                className={`${isActive('/admin')} px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center space-x-2`}
              >
                <FontAwesomeIcon icon={faShieldAlt} className="h-4 w-4" />
                <span>Administration</span>
              </Link>
            )}
            <Link
              href="/documentation"
              className={`${isActive('/documentation')} px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center space-x-2`}
            >
              <FontAwesomeIcon icon={faBook} className="h-4 w-4" />
              <span>Documentation</span>
            </Link>

            {/* User info and logout */}
            <div className="flex items-center pl-4 border-l border-blue-500">
              <span className="text-sm font-medium mr-4 flex items-center">
                <FontAwesomeIcon icon={faUser} className="h-4 w-4 mr-2" />
                {session.user.name || session.user.email}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="h-4 w-4" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
