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
  Beaker,
  Recycle
} from 'lucide-react'
import Image from 'next/image'

// Define a type for the color configuration
type ColorConfig = {
  bgColor: string
  textColor: string
  gradientFrom: string
  gradientTo: string
}

// Color configuration for each section
const COLOR_CONFIGS: Record<string, ColorConfig> = {
  moyensgeneraux: {
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    gradientFrom: 'from-emerald-500',
    gradientTo: 'to-emerald-600'
  },
  exploitation: {
    bgColor: 'bg-sky-50',
    textColor: 'text-sky-600',
    gradientFrom: 'from-sky-500',
    gradientTo: 'to-sky-600'
  },
  reuse: {
    bgColor: 'bg-green-50',
    textColor: 'text-green-600',
    gradientFrom: 'from-green-500',
    gradientTo: 'to-green-600'
  },
  finance: {
    bgColor: 'bg-violet-50',
    textColor: 'text-violet-600',
    gradientFrom: 'from-violet-500',
    gradientTo: 'to-violet-600'
  },
  drh: {
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-600',
    gradientFrom: 'from-indigo-500',
    gradientTo: 'to-indigo-600'
  },
  hse: {
    bgColor: 'bg-rose-50',
    textColor: 'text-rose-600',
    gradientFrom: 'from-rose-500',
    gradientTo: 'to-rose-600'
  }
}

type DepartementCardProps = {
  title: string
  description: string
  icon: any
  subItems: Array<{ value: string }>
  href: string
  color: string
}

function DepartementCard({ 
  title, 
  description, 
  icon: Icon, 
  subItems, 
  href,
  color
}: DepartementCardProps) {
  // More robust color extraction
  const extractColor = (prefix: string) => {
    const match = color.match(new RegExp(`${prefix}-(\\w+)-\\d+`))
    return match ? match[1] : 'primary'
  }

  const fromColor = extractColor('from')
  const toColor = extractColor('to')

  // Determine the color intensity based on the color name
  const colorIntensity = color.match(/\d+/)[0]

  return (
    <Link 
      href={href} 
      className="group relative block transform transition-all duration-300 hover:-translate-y-2"
      aria-label={`Voir les détails du département ${title}`}
    >
      <div className="relative w-full h-full">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:border-gray-200">
          <div className="p-6 space-y-5">
            {/* Header with Icon and Status */}
            <div className="flex items-center justify-between">
              <div 
                className={`p-3 rounded-xl bg-opacity-10 transition-all duration-300 group-hover:bg-opacity-20`}
                style={{ 
                  backgroundColor: `rgba(var(--${fromColor}-${colorIntensity}-rgb), 0.1)`, 
                  color: `rgb(var(--${fromColor}-${colorIntensity}-rgb))`
                }}
              >
                <Icon 
                  size={28} 
                  className="opacity-80 group-hover:opacity-100 transition-opacity"
                  style={{ 
                    color: `rgb(var(--${fromColor}-${colorIntensity}-rgb))`
                  }}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium text-gray-500">
                  {subItems[0].value}
                </span>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-black transition-colors">
                {title}
              </h3>
              
              <p className="text-sm text-gray-600 line-clamp-2 min-h-[48px]">
                {description}
              </p>
            </div>

            {/* Footer */}
            <div 
              className={`flex items-center justify-between pt-4 border-t border-gray-100`}
            >
              <div className="flex items-center space-x-2 text-gray-500">
                <Clock className="w-4 h-4" />
                <span className="text-xs">Mis à jour récemment</span>
              </div>
              
              <div 
                className="flex items-center text-sm font-medium text-gray-800 group-hover:text-black transition-colors group-hover:translate-x-1"
                style={{ 
                  color: `rgb(var(--${fromColor}-${colorIntensity}-rgb))`,
                  transition: 'color 0.3s, transform 0.3s'
                }}
              >
                Explorer
                <ArrowRight className="ml-1 w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

function DepartementBanner() {
  const currentDate = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return (
    <div className="relative bg-gradient-to-br from-[#4a90e2] to-[#1a237e] text-white overflow-hidden shadow-2xl">
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
              DEPARTEMENTS ONA
            </h2>
            
            <div className="flex items-center justify-center md:justify-start space-x-4 text-white/80">
              <Clock className="w-6 h-6 opacity-70" />
              <p className="text-xl font-black tracking-wide">
                {currentDate}
              </p>
            </div>
            
            <div className="mt-4 flex items-center justify-center md:justify-start space-x-3">
              <FileText className="w-6 h-6 opacity-70" />
              <span className="text-lg font-black text-white/90">
                Gestion intégrée des services et opérations
              </span>
            </div>
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

export default function DepartementsPage() {
  const departementSections = [
    {
      title: 'Moyens Généraux',
      description: 'Gestion des ressources matérielles et logistiques de l\'organisation',
      icon: Wrench,
      color: 'from-orange-600 to-orange-700',
      subItems: [{ value: 'Infrastructure • Transport • Stock' }],
      href: '/departements/moyens-generaux'
    },
    {
      title: 'Exploitation et Maintenance',
      description: 'Supervision des opérations et maintenance des installations',
      icon: FileText,
      color: 'from-indigo-500 to-indigo-600',
      subItems: [{ value: 'Rapports • Maintenance • Performance' }],
      href: '/departements/exploitation'
    },
    {
      title: 'REUSE',
      description: 'Réutilisation et valorisation des eaux épurées',
      icon: Recycle,
      color: 'from-green-600 to-green-700',
      subItems: [{ value: 'Réutilisation • Recyclage • Durabilité' }],
      href: '/departements/reuse'
    },
    {
      title: 'Finance',
      description: 'Gestion financière, budgétaire et optimisation des ressources',
      icon: BarChart2,
      color: 'from-sky-500 to-sky-600',
      subItems: [{ value: 'Comptabilité • Budget • Factures' }],
      href: '/departements/finance'
    },
    {
      title: 'DRH',
      description: 'Gestion des ressources humaines et développement du personnel',
      icon: Users,
      color: 'from-rose-500 to-rose-600',
      subItems: [{ value: 'Personnel • Formation • Évaluation' }],
      href: '/departements/drh'
    },
    {
      title: 'HSE',
      description: 'Hygiène, Sécurité et Environnement pour un milieu de travail sûr',
      icon: Shield,
      color: 'from-violet-500 to-violet-600',
      subItems: [{ value: 'Sécurité • Environnement • Santé' }],
      href: '/departements/hse'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
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
