'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import StatCard from './components/StatCard'
import QuickActionCard from './components/QuickActionCard'
import RecentActivityFeed from './components/RecentActivityFeed'
import WaterQualityChart from './components/WaterQualityChart'

export default function DashboardPage() {
  const { data: session } = useSession()

  // Mock data - replace with actual data fetching
  const statsData = [
    { 
      title: 'Stations de Traitement', 
      value: '24', 
      icon: 'fas fa-water', 
      color: 'bg-blue-500' 
    },
    { 
      title: 'Qualité de l\'Eau', 
      value: '92%', 
      icon: 'fas fa-check-circle', 
      color: 'bg-green-500' 
    },
    { 
      title: 'Rapports Générés', 
      value: '156', 
      icon: 'fas fa-file-alt', 
      color: 'bg-purple-500' 
    }
  ]

  const quickActions = [
    { 
      title: 'Nouveau Rapport', 
      icon: 'fas fa-plus-circle', 
      href: '/reports/create' 
    },
    { 
      title: 'Qualité de l\'Eau', 
      icon: 'fas fa-flask', 
      href: '/water-quality' 
    },
    { 
      title: 'Paramètres', 
      icon: 'fas fa-cog', 
      href: '/settings' 
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Tableau de Bord
        </h1>
        <div className="text-gray-600">
          Bonjour, {session?.user?.nickname || session?.user?.username}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <StatCard 
            key={index} 
            title={stat.title} 
            value={stat.value} 
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <WaterQualityChart />
        </div>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Actions Rapides</h2>
            <div className="space-y-4">
              {quickActions.map((action, index) => (
                <QuickActionCard 
                  key={index}
                  title={action.title}
                  icon={action.icon}
                  href={action.href}
                />
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Activité Récente</h2>
            <RecentActivityFeed />
          </div>
        </div>
      </div>
    </div>
  )
}
