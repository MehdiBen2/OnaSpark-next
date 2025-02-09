'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Building2, 
  Wrench, 
  Recycle, 
  Wallet, 
  Users, 
  Shield,
  Truck,
  Package,
  LineChart,
  FileText,
  Droplets,
  Scale,
  Info,
  Calculator,
  Receipt,
  GraduationCap,
  ClipboardCheck,
  HeartPulse,
  Leaf,
  ArrowRight,
  LayoutGrid,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const departements = [
  {
    title: 'Moyens Généraux',
    description: 'Gestion des ressources matérielles et logistiques de l\'organisation',
    icon: Building2,
    color: 'from-blue-500 to-blue-600',
    subItems: [
      { name: 'Infrastructure', icon: Building2 },
      { name: 'Transport', icon: Truck },
      { name: 'Stock', icon: Package }
    ],
    href: '/departement/moyens-generaux'
  },
  {
    title: 'Exploitation et Maintenance',
    description: 'Supervision des opérations et maintenance des installations',
    icon: Wrench,
    color: 'from-green-500 to-green-600',
    subItems: [
      { name: 'Rapports', icon: FileText },
      { name: 'Maintenance', icon: Wrench },
      { name: 'Performance', icon: LineChart }
    ],
    href: '/departement/exploitation'
  },
  {
    title: 'REUSE',
    description: 'Réutilisation de l\'eau après épuration',
    icon: Recycle,
    color: 'from-teal-500 to-teal-600',
    subItems: [
      { name: 'Réglementations', icon: Scale },
      { name: 'Qualité de l\'eau', icon: Droplets },
      { name: 'Informations', icon: Info }
    ],
    href: '/departement/reuse'
  },
  {
    title: 'Finance',
    description: 'Gestion financière et comptable de l\'organisation',
    icon: Wallet,
    color: 'from-purple-500 to-purple-600',
    subItems: [
      { name: 'Comptabilité', icon: Calculator },
      { name: 'Budget', icon: Wallet },
      { name: 'Factures', icon: Receipt }
    ],
    href: '/departement/finance'
  },
  {
    title: 'DRH',
    description: 'Gestion des ressources humaines et développement du personnel',
    icon: Users,
    color: 'from-orange-500 to-orange-600',
    subItems: [
      { name: 'Personnel', icon: Users },
      { name: 'Formation', icon: GraduationCap },
      { name: 'Évaluation', icon: ClipboardCheck }
    ],
    href: '/departement/drh'
  },
  {
    title: 'HSE',
    description: 'Hygiène, Sécurité et Environnement pour un milieu de travail sûr',
    icon: Shield,
    color: 'from-red-500 to-red-600',
    subItems: [
      { name: 'Sécurité', icon: Shield },
      { name: 'Environnement', icon: Leaf },
      { name: 'Santé', icon: HeartPulse }
    ],
    href: '/departement/hse'
  }
]

const DepartementCard = ({ title, description, icon: Icon, color, subItems, href }) => {
  return (
    <Link href={href} className="group">
      <motion.div 
        className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:border-blue-200"
        whileHover={{ y: -10, scale: 1.02 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="absolute top-0 right-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
          <Icon size={150} className="text-gray-300" />
        </div>
        
        <div className="relative z-10 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${color} text-white shadow-md`}>
              <Icon size={28} />
            </div>
            <div className="text-sm font-medium text-gray-500 flex items-center space-x-1 opacity-70 group-hover:opacity-100 transition-opacity font-segoe">
              <span>Voir détails</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
          
          <h3 className="text-2xl font-normal text-gray-800 mb-2 group-hover:text-blue-600 transition-colors font-segoe">
            {title}
          </h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 font-segoe">
            {description}
          </p>
          
          <div className="grid grid-cols-2 gap-2">
            {subItems.map((item, index) => {
              const ItemIcon = item.icon
              return (
                <div 
                  key={index}
                  className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2 text-xs text-gray-700 group-hover:bg-blue-50 transition-colors font-segoe-condensed"
                >
                  <ItemIcon size={14} className="text-gray-500 group-hover:text-blue-600" />
                  <span>{item.name}</span>
                </div>
              )
            })}
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </motion.div>
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

const DepartementBanner = () => {
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
              Départements ONA
            </h2>
            
            <div className="flex items-center justify-center md:justify-start space-x-4 text-white/80">
              <LayoutGrid className="w-6 h-6 opacity-70" />
              <p className="text-xl font-black tracking-wide">
                Gestion intégrée des services et opérations
              </p>
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
  return (
    <div className="min-h-screen bg-gray-50">
      <DepartementBanner />
      
      <div 
        id="departement-list"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {departements.map((dept, index) => (
            <motion.div
              key={dept.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.1,
                type: 'spring',
                stiffness: 100
              }}
            >
              <DepartementCard {...dept} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
