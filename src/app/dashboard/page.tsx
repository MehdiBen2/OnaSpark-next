'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { 
  FileText, 
  Bell, 
  BarChart2, 
  Users, 
  Clipboard, 
  Settings,
  TrendingUp,
  Award
} from 'lucide-react'

const QuickAccessCard = ({ 
  icon: Icon, 
  title, 
  description, 
  href, 
  color,
  stats 
}: {
  icon: React.ElementType, 
  title: string, 
  description: string, 
  href: string, 
  color: string,
  stats?: string
}) => (
  <Link 
    href={href} 
    className={`
      group relative overflow-hidden rounded-xl border 
      transition-all duration-300 ease-in-out
      hover:shadow-xl hover:scale-[1.02]
      bg-white p-6 flex flex-col justify-between
      ${color}
    `}
  >
    <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
      <Icon className="w-full h-full text-gray-200" />
    </div>
    
    <div className="flex justify-between items-start mb-4">
      <div className={`
        p-3 rounded-lg mb-4 
        bg-opacity-20 group-hover:bg-opacity-30 
        transition-all duration-300
        ${color}
      `}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      
      {stats && (
        <div className="text-2xl font-bold text-gray-800 opacity-70">
          {stats}
        </div>
      )}
    </div>
    
    <div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 text-sm">
        {description}
      </p>
    </div>
    
    <div className="mt-4 flex justify-between items-center">
      <span className="text-sm text-gray-500 group-hover:text-blue-600 transition-colors">
        Accéder
      </span>
      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-blue-600">
        →
      </span>
    </div>
  </Link>
)

const DashboardBanner = ({ userName, role, department }: { 
  userName: string, 
  role: string, 
  department: string 
}) => {
  const currentDate = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white overflow-hidden shadow-xl">
      <div className="absolute inset-0 opacity-10">
        <TrendingUp className="w-full h-full text-white/20 transform rotate-45" />
      </div>
      
      <div className="relative px-4 py-12 md:px-8 md:py-16 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between min-h-[300px]">
        <div className="flex-1 mb-4 md:mb-0 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
            <Award className="w-10 h-10 text-yellow-300" />
            <span className="text-base font-medium bg-white/20 px-4 py-2 rounded-full">
              {role}
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Bonjour, {userName}
          </h2>
          
          <p className="text-white/80 text-xl">
            {department} | {currentDate}
          </p>
        </div>
        
        <div className="flex space-x-6">
          <div className="bg-white/10 rounded-xl p-6 text-center">
            <span className="block text-3xl font-bold text-yellow-300 mb-2">24</span>
            <span className="text-sm text-white/70">Rapports</span>
          </div>
          
          <div className="bg-white/10 rounded-xl p-6 text-center">
            <span className="block text-3xl font-bold text-green-300 mb-2">5</span>
            <span className="text-sm text-white/70">Notifications</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const quickAccessCards = [
  {
    icon: FileText,
    title: 'Rapports',
    description: 'Gérer et créer des rapports',
    href: '/reports',
    color: 'text-blue-600 bg-blue-50',
    stats: '24'
  },
  {
    icon: Bell,
    title: 'Notifications',
    description: 'Alertes et communications',
    href: '/notifications',
    color: 'text-green-600 bg-green-50',
    stats: '5'
  },
  {
    icon: BarChart2,
    title: 'Statistiques',
    description: 'Analyse des données',
    href: '/stats',
    color: 'text-purple-600 bg-purple-50'
  },
  {
    icon: Users,
    title: 'Équipe',
    description: 'Gestion des collaborateurs',
    href: '/team',
    color: 'text-orange-600 bg-orange-50',
    stats: '12'
  },
  {
    icon: Clipboard,
    title: 'Projets',
    description: 'Suivi des projets en cours',
    href: '/projects',
    color: 'text-red-600 bg-red-50',
    stats: '7'
  },
  {
    icon: Settings,
    title: 'Paramètres',
    description: 'Configuration du système',
    href: '/settings',
    color: 'text-gray-600 bg-gray-50'
  }
]

export default function DashboardPage() {
  const { data: session } = useSession()

  if (!session) {
    return null
  }

  return (
    <div>
      <DashboardBanner 
        userName={session.user?.name || 'Utilisateur'}
        role={session.user?.role || 'Utilisateur'}
        department={session.user?.department || 'ONA'}
      />
      
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickAccessCards.map((card, index) => (
              <QuickAccessCard key={index} {...card} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
