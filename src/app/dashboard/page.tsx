'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import StatCard from './components/StatCard'
import QuickActionCard from './components/QuickActionCard'
import RecentActivityFeed from './components/RecentActivityFeed'
import WaterQualityChart from './components/WaterQualityChart'

export default function DashboardPage() {
  const { data: session } = useSession()
  const [currentTime, setCurrentTime] = useState('')
  const [currentDate, setCurrentDate] = useState('')

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      const timeOptions: Intl.DateTimeFormatOptions = { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }
      const dateOptions: Intl.DateTimeFormatOptions = { 
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }

      setCurrentTime(now.toLocaleTimeString('fr-FR', timeOptions))
      setCurrentDate(now.toLocaleDateString('fr-FR', dateOptions))
    }

    updateDateTime()
    const interval = setInterval(updateDateTime, 1000)

    return () => clearInterval(interval)
  }, [])

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
    <div className="min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-r from-[rgb(74,144,226)] to-[rgb(26,35,126)] h-[400px]"></div>
      
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="flex flex-col items-center text-center">
            <div className="relative w-[300px] h-[150px] mb-6">
              <Image
                src="/images/onalogos/sparkLogofull.png"
                alt="ONA Spark Logo"
                fill
                className="object-contain brightness-0 invert"
                priority
              />
            </div>
            <h1 className="text-2xl font-semibold text-white mb-3">
              Office National de l&apos;Assainissement
            </h1>
            <div className="text-lg text-white/90 mb-4">
              Bienvenue, <span className="font-medium">{session?.user?.name || session?.user?.email}</span>
            </div>
            <div className="flex items-center space-x-4 text-white/80 text-base">
              <div className="font-medium">{currentDate}</div>
              <div className="w-1.5 h-1.5 bg-white/50 rounded-full"></div>
              <div className="font-medium">{currentTime}</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-t-3xl mt-12 pt-12 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        </div>
      </div>
    </div>
  );
}
