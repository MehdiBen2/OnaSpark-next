import React from 'react'
import Link from 'next/link'

interface QuickActionCardProps {
  title: string
  icon: string
  href: string
}

export default function QuickActionCard({ 
  title, 
  icon, 
  href 
}: QuickActionCardProps) {
  return (
    <Link 
      href={href} 
      className="block bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-all hover:scale-[1.02]"
    >
      <div className="flex items-center space-x-4">
        <div className="bg-blue-100 p-3 rounded-full">
          <i className={`${icon} text-blue-600 text-xl`}></i>
        </div>
        <span className="text-gray-700 font-medium">
          {title}
        </span>
      </div>
    </Link>
  )
}
