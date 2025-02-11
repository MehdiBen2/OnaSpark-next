import prisma from '@/lib/prisma'
import { IncidentPhysique, IncidentStatus, IncidentGravity } from '@prisma/client'
import { z } from 'zod'

// Validation Schema
const IncidentSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  wilaya: z.string().min(2, 'Wilaya is required'),
  commune: z.string().min(2, 'Commune is required'),
  localite: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  natureCause: z.string().min(3, 'Nature of cause is required'),
  structureType: z.string().optional(),
  stepType: z.string().min(2, 'Step type is required'),
  dateIncident: z.date(),
  status: z.nativeEnum(IncidentStatus).default(IncidentStatus.PENDING),
  gravite: z.nativeEnum(IncidentGravity),
  impact: z.string().optional(),
  mesuresPrises: z.string().optional(),
  resolutionNotes: z.string().optional(),
  userId: z.string().optional(),
  unitId: z.string().optional(),
  zoneId: z.string().optional(),
  departmentId: z.string().optional(),
  centreId: z.string().optional()
})

export class IncidentService {
  // Create a new incident
  static async createIncident (data: z.infer<typeof IncidentSchema>) {
    try {
      const validatedData = IncidentSchema.parse(data)
      
      return await prisma.incidentPhysique.create({
        data: {
          ...validatedData,
          isValid: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })
    } catch (error) {
      console.error('Error creating incident:', error)
      throw error
    }
  }

  // Read incidents with flexible filtering
  static async getIncidents (options: {
    page?: number
    pageSize?: number
    status?: IncidentStatus
    gravite?: IncidentGravity
    userId?: string
    zoneId?: string
  } = {}) {
    const {
      page = 1,
      pageSize = 10,
      status,
      gravite,
      userId,
      zoneId
    } = options

    try {
      const where = {
        ...(status && { status }),
        ...(gravite && { gravite }),
        ...(userId && { userId }),
        ...(zoneId && { zoneId })
      }

      const totalIncidents = await prisma.incidentPhysique.count({ where })
      
      const incidents = await prisma.incidentPhysique.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          user: true,
          zone: true,
          unit: true,
          department: true,
          centre: true
        },
        orderBy: { createdAt: 'desc' }
      })

      return {
        incidents,
        totalIncidents,
        totalPages: Math.ceil(totalIncidents / pageSize),
        currentPage: page
      }
    } catch (error) {
      console.error('Error fetching incidents:', error)
      throw error
    }
  }

  // Get single incident by ID
  static async getIncidentById (id: string) {
    try {
      return await prisma.incidentPhysique.findUnique({
        where: { id },
        include: {
          user: true,
          zone: true,
          unit: true,
          department: true,
          centre: true
        }
      })
    } catch (error) {
      console.error(`Error fetching incident ${id}:`, error)
      throw error
    }
  }

  // Update incident
  static async updateIncident (
    id: string, 
    data: Partial<z.infer<typeof IncidentSchema>>
  ) {
    try {
      const validatedData = IncidentSchema.partial().parse(data)
      
      return await prisma.incidentPhysique.update({
        where: { id },
        data: {
          ...validatedData,
          updatedAt: new Date()
        }
      })
    } catch (error) {
      console.error(`Error updating incident ${id}:`, error)
      throw error
    }
  }

  // Update incident status
  static async updateIncidentStatus (
    id: string, 
    status: IncidentStatus, 
    resolutionNotes?: string
  ) {
    try {
      return await prisma.incidentPhysique.update({
        where: { id },
        data: {
          status,
          ...(resolutionNotes && { resolutionNotes }),
          ...(status === IncidentStatus.RESOLVED && { 
            resolvedAt: new Date() 
          }),
          updatedAt: new Date()
        }
      })
    } catch (error) {
      console.error(`Error updating incident status ${id}:`, error)
      throw error
    }
  }

  // Delete incident
  static async deleteIncident (id: string) {
    try {
      return await prisma.incidentPhysique.delete({
        where: { id }
      })
    } catch (error) {
      console.error(`Error deleting incident ${id}:`, error)
      throw error
    }
  }

  // Advanced filtering and search
  static async searchIncidents (query: {
    keyword?: string
    startDate?: Date
    endDate?: Date
    minGravity?: IncidentGravity
    maxGravity?: IncidentGravity
  } = {}) {
    const {
      keyword,
      startDate,
      endDate,
      minGravity,
      maxGravity
    } = query

    try {
      return await prisma.incidentPhysique.findMany({
        where: {
          ...(keyword && {
            OR: [
              { title: { contains: keyword } },
              { description: { contains: keyword } },
              { wilaya: { contains: keyword } },
              { commune: { contains: keyword } }
            ]
          }),
          ...(startDate && { dateIncident: { gte: startDate } }),
          ...(endDate && { dateIncident: { lte: endDate } }),
          ...(minGravity && { gravite: { gte: minGravity } }),
          ...(maxGravity && { gravite: { lte: maxGravity } })
        },
        orderBy: { dateIncident: 'desc' }
      })
    } catch (error) {
      console.error('Error searching incidents:', error)
      throw error
    }
  }
}

export default IncidentService
