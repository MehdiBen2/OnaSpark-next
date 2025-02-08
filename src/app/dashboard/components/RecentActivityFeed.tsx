import React from 'react'

const RECENT_ACTIVITIES = [
  {
    icon: 'fas fa-file-upload',
    message: 'Rapport de qualité d\'eau généré',
    timestamp: '2 heures',
    color: 'text-blue-500'
  },
  {
    icon: 'fas fa-chart-line',
    message: 'Analyse des données de station de traitement',
    timestamp: '4 heures',
    color: 'text-green-500'
  },
  {
    icon: 'fas fa-user-edit',
    message: 'Profil utilisateur mis à jour',
    timestamp: '1 jour',
    color: 'text-purple-500'
  }
]

export default function RecentActivityFeed() {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <ul className="space-y-4">
        {RECENT_ACTIVITIES.map((activity, index) => (
          <li 
            key={index} 
            className="flex items-center space-x-4 pb-4 border-b last:border-b-0"
          >
            <div className={`${activity.color} p-2 rounded-full`}>
              <i className={`${activity.icon} text-lg`}></i>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700">
                {activity.message}
              </p>
              <p className="text-xs text-gray-500">
                {activity.timestamp}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
