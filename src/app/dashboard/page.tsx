'use client'

import React, { 
  useState, 
  type FC 
} from 'react'
import type { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, type Variant, AnimatePresence } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { 
  FileText, 
  Bell, 
  BarChart2, 
  Users, 
  Clipboard, 
  Settings,
  TrendingUp,
  Clock,
  MapPin,
  Plus,
  ArrowRight,
  ArrowLeft,
  Shield,
  ChevronUp,
  ChevronDown,
  Calendar,
  Mail,
  Circle
} from 'lucide-react'

type EnhancedCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  color: string;
  stats?: string;
  progress?: number;
  status?: 'active' | 'inactive' | 'pending';
}

const EnhancedCard: FC<EnhancedCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  href, 
  color,
  stats,
  progress,
  status
}) => {
  // Extract background color class from the color string
  const bgColorClass = color.split(' ')[1];

  return (
    <Link 
      href={href} 
      className={`
        group relative rounded-xl border border-gray-100 shadow-lg overflow-hidden 
        transition-all duration-300 hover:shadow-xl hover:scale-[1.02]
        ${bgColorClass}
      `}
    >
      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
        <Icon className={`w-full h-full ${color.split(' ')[0]}`} />
      </div>

      <div className="p-6 space-y-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className={`p-3 rounded-lg bg-white/80 backdrop-blur-sm transition-all group-hover:bg-white/90`}>
            <Icon className={`w-6 h-6 ${color.split(' ')[0]}`} />
          </div>

          {status && (
            <div className={`
              px-3 py-1.5 rounded-full text-xs font-medium 
              backdrop-blur-sm
              ${status === 'active' ? 'bg-green-100/80 text-green-700' :
                status === 'pending' ? 'bg-yellow-100/80 text-yellow-700' :
                'bg-red-100/80 text-red-700'
              }
            `}>
              {status === 'active' ? 'Actif' : status === 'pending' ? 'En attente' : 'Inactif'}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-600 mt-1 group-hover:text-gray-700">
            {description}
          </p>
        </div>

        {progress !== undefined && (
          <div className="pt-2">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Progression</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-white/50 rounded-full h-2 overflow-hidden">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${color.split(' ')[0]}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="px-6 py-4 bg-white/20 backdrop-blur-sm border-t border-white/10">
        <div className="flex items-center justify-between">
          {stats && (
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <span className="font-medium">Statistiques:</span>
              <span className="font-bold">{stats}</span>
            </div>
          )}
          <div className="flex items-center space-x-1 text-sm font-medium text-gray-600">
            <span>Voir plus</span>
            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </div>
        </div>
      </div>
    </Link>
  )
}

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

const QuickActionsCard = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  const sections = [
    {
      title: 'Tâches Rapides',
      icon: Clock,
      actions: [
        {
          label: 'Créer Rapport',
          icon: FileText,
          onClick: () => console.log('Create Report'),
          color: 'text-blue-600'
        },
        {
          label: 'Ajouter Projet',
          icon: Plus,
          onClick: () => console.log('Add Project'),
          color: 'text-green-600'
        },
        {
          label: 'Planifier Réunion',
          icon: Calendar,
          onClick: () => console.log('Schedule Meeting'),
          color: 'text-purple-600'
        }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      actions: [
        {
          label: 'Voir Alertes',
          icon: Shield,
          onClick: () => console.log('View Alerts'),
          color: 'text-red-600'
        },
        {
          label: 'Messages Non Lus',
          icon: Mail,
          onClick: () => console.log('Unread Messages'),
          color: 'text-yellow-600'
        }
      ]
    }
  ]

  return (
    <motion.div 
      className="relative rounded-xl bg-white/50 backdrop-blur-md border border-gray-100 shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Actions Rapides</h2>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {isExpanded && sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2">
                <section.icon className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-700">{section.title}</h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {section.actions.map((action, i) => (
                  <button
                    key={i}
                    onClick={action.onClick}
                    className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <action.icon className={`w-5 h-5 ${action.color}`} />
                    <span className="text-sm font-medium text-gray-700">{action.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Circle className="w-3 h-3 text-green-500" />
          <span>Système Opérationnel</span>
        </div>
      </div>
    </motion.div>
  )
}

const quickAccessCards = [
  {
    icon: FileText,
    title: 'Rapports',
    description: 'Documents et rapports',
    href: '/reports',
    color: 'text-[#A3CDFF] bg-[#E6F0FF]/50',
    stats: '24',
    progress: 75,
    status: 'active'
  },
  {
    icon: Bell,
    title: 'Notifications',
    description: 'Alertes et communications',
    href: '/notifications',
    color: 'text-[#FFE08A] bg-[#FFF4D5]/50',
    stats: '5',
    status: 'pending'
  },
  {
    icon: BarChart2,
    title: 'Statistiques',
    description: 'Analyse des données',
    href: '/stats',
    color: 'text-[#CAB8FF] bg-[#F0EAFF]/50',
    progress: 42
  },
  {
    icon: Users,
    title: 'Équipe',
    description: 'Gestion des collaborateurs',
    href: '/team',
    color: 'text-[#B2F2BB] bg-[#E6FCE9]/50',
    stats: '12',
    status: 'active'
  },
  {
    icon: Clipboard,
    title: 'Projets',
    description: 'Suivi des projets en cours',
    href: '/projects',
    color: 'text-[#B8C1FF] bg-[#E8EBFF]/50',
    progress: 88,
    status: 'active'
  },
  {
    icon: Settings,
    title: 'Paramètres',
    description: 'Configuration du système',
    href: '/settings',
    color: 'text-[#D1D5DB] bg-[#F3F4F6]/50',
    status: 'inactive'
  }
]

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

export default function DashboardPage() {
  const { data: session } = useSession()

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <DashboardBanner 
        userName={session.user?.name || 'Utilisateur'}
        role={session.user?.role || 'Utilisateur'}
        department={session.user?.department || 'ONA'}
      />
      
      <div className="px-6 py-8 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Quick Actions Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Tableau de Bord</h2>
                <p className="text-gray-600 mt-1">Gérez vos activités et suivez vos projets</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <Clock className="w-4 h-4 inline-block mr-2" />
                  Derniers 30 jours
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4 inline-block mr-2" />
                  Nouveau Projet
                </button>
              </div>
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Quick Actions Card - Spans 2 columns on large screens */}
              <div className="lg:col-span-2">
                <QuickActionsCard />
              </div>

              {/* Stats Summary Card */}
              <div className="bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100 shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Aperçu Rapide</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Projets Actifs</span>
                    <span className="font-bold text-gray-800">7</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Tâches en Attente</span>
                    <span className="font-bold text-gray-800">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Rapports ce Mois</span>
                    <span className="font-bold text-gray-800">24</span>
                  </div>
                </div>
              </div>

              {/* Main Cards Grid */}
              {quickAccessCards.map((card, index) => (
                <EnhancedCard key={index} {...card} />
              ))}
            </div>
          </section>

          {/* Recent Activity Section */}
          <section className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Activité Récente</h2>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                Voir tout
                <ArrowRight className="w-4 h-4 inline-block ml-1" />
              </button>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100 shadow-lg overflow-hidden">
              <div className="divide-y divide-gray-100">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          Nouveau rapport créé
                        </p>
                        <p className="text-sm text-gray-500">
                          Il y a 2 heures par {session.user?.name}
                        </p>
                      </div>
                      <div>
                        <button className="text-sm text-gray-600 hover:text-gray-900">
                          Voir
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
