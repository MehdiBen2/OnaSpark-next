import prisma from '@/lib/prisma'
import { z } from 'zod'

// Validation Schema for Unit
const UnitSchema = z.object({
  name: z.string().min(2, 'Le nom de l\'unité doit contenir au moins 2 caractères'),
  code: z.string().min(2, 'Le code de l\'unité doit contenir au moins 2 caractères'),
  description: z.string().optional(),
  zoneId: z.string({ required_error: 'La zone est requise' })
})

export class UnitService {
  // Create a new unit
  static async createUnit(data: z.infer<typeof UnitSchema>) {
    try {
      const validatedData = UnitSchema.parse(data)
      
      return await prisma.unit.create({
        data: {
          ...validatedData,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })
    } catch (error) {
      console.error('Erreur lors de la création de l\'unité:', error)
      throw error
    }
  }

  // Get all units with optional filtering
  static async getUnits(options: {
    page?: number
    pageSize?: number
    zoneId?: string
  } = {}) {
    const {
      page = 1,
      pageSize = 10,
      zoneId
    } = options

    try {
      const where = {
        ...(zoneId && { zoneId })
      }

      const totalUnits = await prisma.unit.count({ where })
      
      const units = await prisma.unit.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          zone: true,
          centres: true,
          users: true
        },
        orderBy: { createdAt: 'desc' }
      })

      return {
        units,
        totalUnits,
        totalPages: Math.ceil(totalUnits / pageSize),
        currentPage: page
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des unités:', error)
      throw error
    }
  }

  // Update a unit
  static async updateUnit(id: string, data: Partial<z.infer<typeof UnitSchema>>) {
    try {
      return await prisma.unit.update({
        where: { id },
        data: {
          ...data,
          updatedAt: new Date()
        }
      })
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'unité:', error)
      throw error
    }
  }

  // Delete a unit
  static async deleteUnit(id: string) {
    try {
      return await prisma.unit.delete({
        where: { id }
      })
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'unité:', error)
      throw error
    }
  }

  // Get a single unit by ID
  static async getUnitById(id: string) {
    try {
      return await prisma.unit.findUnique({
        where: { id },
        include: {
          zone: true,
          centres: true,
          users: true
        }
      })
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'unité:', error)
      throw error
    }
  }
}

export default UnitService
