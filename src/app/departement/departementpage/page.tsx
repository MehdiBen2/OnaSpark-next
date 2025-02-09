'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Building2, 
  Wrench, 
  Recycle, 
  ScrollText, 
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
  Leaf
} from 'lucide-react'
import Link from 'next/link'

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
    <Link href={href}>
      <motion.div 
        className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${color} p-6 text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
        whileHover={{ y: -5 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="absolute right-0 top-0 opacity-10">
          <Icon size={120} />
        </div>
        <div className="relative z-10">
          <div className="mb-4 inline-block rounded-lg bg-white/20 p-3 backdrop-blur-sm">
            <Icon size={24} />
          </div>
          <h3 className="mb-2 text-xl font-bold">{title}</h3>
          <p className="mb-4 text-sm text-white/80">{description}</p>
          <div className="grid grid-cols-2 gap-2">
            {subItems.map((item, index) => {
              const ItemIcon = item.icon
              return (
                <div 
                  key={index}
                  className="flex items-center space-x-2 rounded-lg bg-white/10 px-3 py-2 text-sm backdrop-blur-sm"
                >
                  <ItemIcon size={16} />
                  <span>{item.name}</span>
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

const DepartementBanner = () => {
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
  return (
    <div className="min-h-screen bg-gray-50">
      <DepartementBanner />
      
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {departements.map((dept, index) => (
            <motion.div
              key={dept.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <DepartementCard {...dept} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
