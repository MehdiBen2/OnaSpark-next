'use client'

import React from 'react'
import Link from 'next/link'
import { 
  Building2, 
  Wrench, 
  Recycle, 
  Wallet, 
  Users, 
  Shield 
} from 'lucide-react'
import { ROUTES } from '@/config/routes'

export const departementLinks = [
  {
    title: 'Moyens Généraux',
    icon: Building2,
    href: '/departement/moyens-generaux'
  },
  {
    title: 'Exploitation et Maintenance',
    icon: Wrench,
    href: ROUTES.departementExploitation
  },
  {
    title: 'REUSE',
    icon: Recycle,
    href: '/departement/reuse'
  },
  {
    title: 'Finance',
    icon: Wallet,
    href: '/departement/finance'
  },
  {
    title: 'DRH',
    icon: Users,
    href: '/departement/drh'
  },
  {
    title: 'HSE',
    icon: Shield,
    href: '/departement/hse'
  }
]

export const DepartementNavigation = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            {departementLinks.map((link) => (
              <Link 
                key={link.title}
                href={link.href}
                className="inline-flex items-center border-b-2 border-transparent px-4 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                <link.icon className="mr-2 h-5 w-5 text-gray-400" />
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
