import prisma from '@/lib/prisma'
import { z } from 'zod'

export class BaseService<T extends { id: string }> {
  private model: any

  constructor (modelName: string) {
    this.model = (prisma as any)[modelName]
  }

  // Generic create method
  async create (data: any, validationSchema?: z.ZodSchema) {
    try {
      if (validationSchema) {
        const validatedData = validationSchema.parse(data)
        return await this.model.create({ data: validatedData })
      }
      return await this.model.create({ data })
    } catch (error) {
      console.error('Error creating record:', error)
      throw error
    }
  }

  // Generic read method with pagination and filtering
  async findMany (options: {
    page?: number
    pageSize?: number
    where?: any
    include?: any
    orderBy?: any
  } = {}) {
    const {
      page = 1,
      pageSize = 10,
      where = {},
      include = {},
      orderBy = { createdAt: 'desc' }
    } = options

    try {
      const totalRecords = await this.model.count({ where })
      
      const records = await this.model.findMany({
        where,
        include,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy
      })

      return {
        records,
        totalRecords,
        totalPages: Math.ceil(totalRecords / pageSize),
        currentPage: page
      }
    } catch (error) {
      console.error('Error fetching records:', error)
      throw error
    }
  }

  // Generic find by ID method
  async findById (id: string, include?: any) {
    try {
      return await this.model.findUnique({
        where: { id },
        include
      })
    } catch (error) {
      console.error(`Error fetching record ${id}:`, error)
      throw error
    }
  }

  // Generic update method
  async update (id: string, data: Partial<T>, validationSchema?: z.ZodSchema) {
    try {
      if (validationSchema) {
        const validatedData = validationSchema.partial().parse(data)
        return await this.model.update({
          where: { id },
          data: validatedData
        })
      }
      return await this.model.update({
        where: { id },
        data
      })
    } catch (error) {
      console.error(`Error updating record ${id}:`, error)
      throw error
    }
  }

  // Generic delete method
  async delete (id: string) {
    try {
      return await this.model.delete({
        where: { id }
      })
    } catch (error) {
      console.error(`Error deleting record ${id}:`, error)
      throw error
    }
  }

  // Generic search method
  async search (query: {
    keyword?: string
    fields?: string[]
    startDate?: Date
    endDate?: Date
  } = {}) {
    const {
      keyword,
      fields = ['name', 'title'],
      startDate,
      endDate
    } = query

    try {
      return await this.model.findMany({
        where: {
          ...(keyword && {
            OR: fields.map(field => ({
              [field]: { contains: keyword }
            }))
          }),
          ...(startDate && { createdAt: { gte: startDate } }),
          ...(endDate && { createdAt: { lte: endDate } })
        },
        orderBy: { createdAt: 'desc' }
      })
    } catch (error) {
      console.error('Error searching records:', error)
      throw error
    }
  }
}

export default BaseService
