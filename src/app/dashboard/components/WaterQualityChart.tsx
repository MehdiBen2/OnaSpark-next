'use client'

import React from 'react'
import dynamic from 'next/dynamic'

// Dynamically import chart to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function WaterQualityChart() {
  const chartOptions = {
    chart: {
      type: 'line',
      height: 350,
      toolbar: { show: false }
    },
    title: {
      text: 'Qualité de l\'Eau par Station',
      align: 'left',
      style: { fontSize: '16px', fontWeight: 'bold' }
    },
    xaxis: {
      categories: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin']
    },
    colors: ['#356ee7', '#95C11F'],
    stroke: { curve: 'smooth', width: 3 },
    markers: { size: 5 }
  }

  const chartSeries = [
    {
      name: 'Station Nord',
      data: [45, 52, 38, 45, 55, 48]
    },
    {
      name: 'Station Sud',
      data: [35, 41, 36, 42, 48, 41]
    }
  ]

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <Chart 
        options={chartOptions} 
        series={chartSeries} 
        type="line" 
        height={350} 
      />
    </div>
  )
}
