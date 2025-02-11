import prisma from '@/lib/prisma'
import { z } from 'zod'

// Validation Schema for Zone
const ZoneSchema = z.object({
  name: z.string().min(2, 'Le nom de la zone doit contenir au moins 2 caractères'),
  code: z.string().min(2, 'Le code de la zone doit contenir au moins 2 caractères'),
  description: z.string().optional()
})

export class ZoneService {
  // Create a new zone
  static async createZone(data: z.infer<typeof ZoneSchema>) {
    try {
      const validatedData = ZoneSchema.parse(data)
      
      return await prisma.zone.create({
        data: {
          ...validatedData,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })
    } catch (error) {
      console.error('Erreur lors de la création de la zone:', error)
      throw error
    }
  }

  // Get all zones with optional filtering
  static async getZones(options: {
    page?: number
    pageSize?: number
  } = {}) {
    const {
      page = 1,
      pageSize = 10
    } = options

    try {
      const totalZones = await prisma.zone.count()
      
      const zones = await prisma.zone.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          units: true,
          centres: true,
          users: true
        },
        orderBy: { createdAt: 'desc' }
      })

      return {
        zones,
        totalZones,
        totalPages: Math.ceil(totalZones / pageSize),
        currentPage: page
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des zones:', error)
      throw error
    }
  }

  // Update a zone
  static async updateZone(id: string, data: Partial<z.infer<typeof ZoneSchema>>) {
    try {
      return await prisma.zone.update({
        where: { id },
        data: {
          ...data,
          updatedAt: new Date()
        }
      })
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la zone:', error)
      throw error
    }
  }

  // Delete a zone
  static async deleteZone(id: string) {
    try {
      return await prisma.zone.delete({
        where: { id }
      })
    } catch (error) {
      console.error('Erreur lors de la suppression de la zone:', error)
      throw error
    }
  }

  // Get a single zone by ID
  static async getZoneById(id: string) {
    try {
      return await prisma.zone.findUnique({
        where: { id },
        include: {
          units: true,
          centres: true,
          users: true
        }
      })
    } catch (error) {
      console.error('Erreur lors de la récupération de la zone:', error)
      throw error
    }
  }
}

export default ZoneService
