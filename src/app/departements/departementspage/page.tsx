'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Wrench, 
  Users, 
  BarChart2, 
  Shield, 
  ArrowRight, 
  Clock,
  Beaker
} from 'lucide-react'

// Define a type for the color configuration
type ColorConfig = {
  bgColor: string
  textColor: string
  gradientFrom: string
  gradientTo: string
}

// Color configuration for each section
const COLOR_CONFIGS: Record<string, ColorConfig> = {
  exploitation: {
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    gradientFrom: 'from-emerald-500',
    gradientTo: 'to-emerald-600'
  },
  ressourceshumaines: {
    bgColor: 'bg-sky-50',
    textColor: 'text-sky-600',
    gradientFrom: 'from-sky-500',
    gradientTo: 'to-sky-600'
  },
  finance: {
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-600',
    gradientFrom: 'from-amber-500',
    gradientTo: 'to-amber-600'
  },
  securite: {
    bgColor: 'bg-rose-50',
    textColor: 'text-rose-600',
    gradientFrom: 'from-rose-500',
    gradientTo: 'to-rose-600'
  },
  strategieetperformance: {
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-600',
    gradientFrom: 'from-indigo-500',
    gradientTo: 'to-indigo-600'
  },
  rechercheEtInnovation: {
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600',
    gradientFrom: 'from-purple-500',
    gradientTo: 'to-purple-600'
  }
}

type DepartementCardProps = {
  title: string
  description: string
  icon: any
  subItems: Array<{ value: string }>
  href: string
}

function DepartementCard({ 
  title, 
  description, 
  icon: Icon, 
  subItems, 
  href 
}: DepartementCardProps) {
  // Determine color configuration based on title
  const colorKey = title.toLowerCase()
    .replace(/\s+/g, '')
    .replace("'", '') as keyof typeof COLOR_CONFIGS

  const colorConfig = COLOR_CONFIGS[colorKey] || COLOR_CONFIGS.exploitation

  return (
    <Link 
      href={href} 
      className="group relative block transform transition-all duration-300 hover:-translate-y-2"
      aria-label={`Voir les détails du département ${title}`}
    >
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${colorConfig.gradientFrom} ${colorConfig.gradientTo} rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-sm`}></div>
      
      <div className="relative bg-white p-6 rounded-2xl shadow-xl ring-1 ring-gray-900/5 space-y-5">
        <div className="flex items-center justify-between">
          <div className={`p-3 rounded-xl ${colorConfig.bgColor} ${colorConfig.textColor} bg-opacity-10`}>
            <Icon 
              size={28} 
              className={`${colorConfig.textColor} opacity-80`} 
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-gray-500">
              {subItems[0].value}
            </span>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className={`text-xl font-bold text-gray-900 group-hover:${colorConfig.textColor} transition-colors`}>
            {title}
          </h3>
          
          <p className="text-sm text-gray-600 line-clamp-2">
            {description}
          </p>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-500">Mis à jour récemment</span>
          </div>
          
          <div className={`flex items-center ${colorConfig.textColor} font-semibold text-sm group-hover:opacity-80 transition-colors`}>
            Explorer
            <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  )
}

function DepartementBanner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#4a90e2] to-[#1a237e] py-20 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_26%,transparent_27%,transparent_74%,rgba(255,255,255,0.05)_75%,rgba(255,255,255,0.05)_76%,transparent_77%,transparent)] bg-[length:4rem_4rem]"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-white/10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-white/10"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="mb-4 text-5xl font-black tracking-tight">
            DEPARTEMENTS ONA
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/80">
            Découvrez nos différents départements et leurs responsabilités au sein de l'Office National de l'Assainissement
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default function DepartementsPage() {
  const departementSections = [
    {
      title: 'Exploitation',
      description: 'Gestion opérationnelle et maintenance des infrastructures',
      icon: Wrench,
      subItems: [{ value: '5 projets actifs' }],
      href: '/departements/exploitation'
    },
    {
      title: 'Ressources Humaines',
      description: 'Développement et gestion du capital humain',
      icon: Users,
      subItems: [{ value: '120 employés' }],
      href: '/departements/ressources-humaines'
    },
    {
      title: 'Finance',
      description: 'Gestion financière et optimisation budgétaire',
      icon: BarChart2,
      subItems: [{ value: '4 rapports financiers' }],
      href: '/departements/finance'
    },
    {
      title: 'Sécurité',
      description: 'Protection et prévention des risques opérationnels',
      icon: Shield,
      subItems: [{ value: '3 alertes de sécurité' }],
      href: '/departements/securite'
    },
    {
      title: 'Stratégie et Performance',
      description: 'Analyse stratégique et amélioration continue',
      icon: FileText,
      subItems: [{ value: '2 initiatives stratégiques' }],
      href: '/departements/strategie-performance'
    },
    {
      title: 'Recherche et Innovation',
      description: 'Développement de solutions technologiques avancées pour l\'assainissement',
      icon: Beaker,
      subItems: [{ value: '7 projets de recherche' }],
      href: '/departements/recherche-innovation'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <DepartementBanner />
      
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departementSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.1,
                type: 'spring',
                stiffness: 100
              }}
            >
              <DepartementCard {...section} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
