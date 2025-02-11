'use server'

import { PrismaClient } from '@prisma/client'

// Ensure a single Prisma client instance
const prisma = new PrismaClient()

export async function getZones() {
  try {
    const zones = await prisma.zone.findMany({
      select: {
        id: true,
        name: true
      }
    })
    
    return { 
      zones,
      success: true 
    }
  } catch (error) {
    // Safely log the error without throwing
    if (error instanceof Error) {
      console.error('Error fetching zones:', error.message)
    } else {
      console.error('Unknown error in getZones:', String(error))
    }
    
    return { 
      zones: [], 
      success: false,
      error: error instanceof Error 
        ? error.message 
        : 'Une erreur est survenue lors du chargement des zones'
    }
  } finally {
    await prisma.$disconnect()
  }
}

export async function getUnits(params: { 
  page?: number, 
  pageSize?: number, 
  zoneId?: string 
} = {}) {
  try {
    const page = params.page ?? 1
    const pageSize = params.pageSize ?? 10
    const zoneId = params.zoneId ?? undefined
    
    const where = zoneId ? { zoneId } : {}
    
    const [totalUnits, units] = await Promise.all([
      prisma.unit.count({ where }),
      prisma.unit.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          zone: {
            select: {
              id: true,
              name: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    ])
    
    return { 
      units,
      totalPages: Math.ceil(totalUnits / pageSize),
      total: totalUnits,
      success: true 
    }
  } catch (error) {
    // Safely log the error without throwing
    if (error instanceof Error) {
      console.error('Error in getUnits:', error.message)
    } else {
      console.error('Unknown error in getUnits:', String(error))
    }
    
    return { 
      units: [], 
      totalPages: 0,
      total: 0,
      success: false,
      error: error instanceof Error 
        ? error.message 
        : 'Une erreur est survenue lors du chargement des unités'
    }
  } finally {
    await prisma.$disconnect()
  }
}
