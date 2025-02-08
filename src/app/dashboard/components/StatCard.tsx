import React from 'react'
import Link from 'next/link'

interface StatCardProps {
  title: string
  value: string
  icon: string
  color?: string
}

export default function StatCard({ 
  title, 
  value, 
  icon, 
  color = 'bg-blue-500' 
}: StatCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            {title}
          </h3>
          <p className="text-2xl font-bold text-gray-800">
            {value}
          </p>
        </div>
        <div className={`p-3 rounded-full ${color} text-white`}>
          <i className={`${icon} text-2xl`}></i>
        </div>
      </div>
    </div>
  )
}
