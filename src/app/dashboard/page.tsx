'use client'

import React from 'react'
import type { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Clock,
  MapPin,
  Building, 
  FileText, 
  Users, 
  LayoutGrid 
} from 'lucide-react'
import Link from 'next/link'

const AnimatedBalls = () => {
  const ballVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.5,
      rotate: -30,
      x: 100,
      y: -50 
    },
    animate: (i: number) => ({
      opacity: 0.8,
      scale: 1,
      rotate: 0,
      x: 0,
      y: 0,
      transition: {
        delay: i * 0.2,
        type: "spring",
        stiffness: 100,
        damping: 10,
      }
    }),
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 300,
      }
    }
  }

  const ballColors = [
    "bg-[#c5d301]/50 backdrop-blur-md",
    "bg-[#1e7ec2]/50 backdrop-blur-md",
    "bg-[#cae7f0]/50 backdrop-blur-md"
  ]

  return (
    <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
      {ballColors.map((color, index) => (
        <motion.div
          key={index}
          className={`absolute w-72 h-72 rounded-full ${color}`}
          style={{
            top: `${-50 + index * 180}px`,
            right: `${-150 + index * 180}px`,
          }}
          variants={ballVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          custom={index}
        />
      ))}
    </div>
  )
}

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
    <div className="relative bg-gradient-to-br from-[#4a90e2] to-[#1a237e] text-white overflow-hidden shadow-2xl">
      {/* Animated Balls */}
      <AnimatedBalls />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/10 rounded-full animate-pulse animation-delay-2000"></div>
      </div>
      
      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-10"></div>
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(0deg,transparent_24%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_26%,transparent_27%,transparent_74%,rgba(255,255,255,0.05)_75%,rgba(255,255,255,0.05)_76%,transparent_77%,transparent)] bg-[length:4rem_4rem]"></div>
      </div>

      <div className="relative px-4 py-16 md:px-8 md:py-20 max-w-7xl mx-auto flex items-center justify-between min-h-[350px]">
        <div className="flex-1 text-center md:text-left relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 drop-shadow-lg">
              Bonjour, {userName}
            </h2>
            
            <div className="flex items-center justify-center md:justify-start space-x-4 text-white/80">
              <Clock className="w-6 h-6 opacity-70" />
              <p className="text-xl font-black tracking-wide">
                {currentDate}
              </p>
            </div>
            
            {department && (
              <div className="mt-4 flex items-center justify-center md:justify-start space-x-3">
                <MapPin className="w-6 h-6 opacity-70" />
                <span className="text-lg font-black text-white/90">
                  {department}
                </span>
              </div>
            )}
          </motion.div>
        </div>
        
        <div className="hidden md:block -mr-16">
          <Image 
            src="/images/onalogos/sparkLogofull.png" 
            alt="ONA Spark Logo" 
            width={350} 
            height={120} 
            className="max-w-[350px] opacity-90"
          />
        </div>
      </div>
    </div>
  )
}

const QuickAccessCard = ({ 
  icon: Icon, 
  title, 
  description, 
  href 
}: { 
  icon: React.ComponentType<{ className?: string }>, 
  title: string, 
  description: string, 
  href: string 
}) => (
  <Link 
    href={href} 
    className="group block p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:border-blue-500"
  >
    <div className="flex items-center mb-4">
      <Icon className="w-10 h-10 text-blue-600 group-hover:text-blue-700 transition-colors duration-300 mr-4" />
      <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
        {title}
      </h3>
    </div>
    <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
      {description}
    </p>
  </Link>
)

export default function DashboardPage() {
  const { data: session } = useSession()

  if (!session) {
    return null
  }

  return (
    <div>
      <DashboardBanner 
        userName={session.user?.name || 'Utilisateur'} 
        role={session.user?.role || 'Membre'} 
        department={session.user?.department || 'ONA'} 
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Accès Rapide</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <QuickAccessCard 
            icon={Building}
            title="Gestion des Unités"
            description="Gérez et suivez vos unités organisationnelles"
            href="/dashboard/admin/unites"
          />
          <QuickAccessCard 
            icon={FileText}
            title="Rapports d'Incidents"
            description="Consultez et gérez les rapports d'incidents"
            href="/departements/exploitation/rapports/incidents/liste"
          />
          <QuickAccessCard 
            icon={Users}
            title="Gestion des Utilisateurs"
            description="Administrez les comptes utilisateurs"
            href="/dashboard/users"
          />
          <QuickAccessCard 
            icon={LayoutGrid}
            title="Tableau de Bord"
            description="Vue d'ensemble de vos activités"
            href="/dashboard"
          />
        </div>
      </div>
    </div>
  )
}
