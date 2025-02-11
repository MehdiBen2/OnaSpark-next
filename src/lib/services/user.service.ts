import prisma from '@/lib/prisma'
import { User, UserRole } from '@prisma/client'
import { z } from 'zod'
import bcrypt from 'bcrypt'

// Validation Schema
const UserSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  displayName: z.string().min(2, 'Display name is required'),
  role: z.nativeEnum(UserRole),
  departmentId: z.string().optional(),
  zoneId: z.string().optional(),
  unitId: z.string().optional(),
  isActive: z.boolean().default(true),
  password: z.string().min(8, 'Password must be at least 8 characters')
})

export class UserService {
  // Create a new user
  static async createUser (data: z.infer<typeof UserSchema>) {
    try {
      const validatedData = UserSchema.parse(data)
      
      // Hash password
      const passwordHash = await bcrypt.hash(validatedData.password, 10)
      
      return await prisma.user.create({
        data: {
          ...validatedData,
          passwordHash,
          lastLogin: null,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        select: {
          id: true,
          username: true,
          displayName: true,
          role: true,
          isActive: true,
          createdAt: true
        }
      })
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  }

  // Authenticate user
  static async authenticateUser (username: string, password: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { username }
      })

      if (!user) {
        throw new Error('User not found')
      }

      const isPasswordValid = await bcrypt.compare(password, user.passwordHash)

      if (!isPasswordValid) {
        throw new Error('Invalid password')
      }

      // Update last login
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLogin: new Date() }
      })

      // Exclude sensitive information
      const { passwordHash, ...userWithoutPassword } = user
      return userWithoutPassword
    } catch (error) {
      console.error('Authentication error:', error)
      throw error
    }
  }

  // Read users with flexible filtering
  static async getUsers (options: {
    page?: number
    pageSize?: number
    role?: UserRole
    departmentId?: string
    zoneId?: string
    isActive?: boolean
  } = {}) {
    const {
      page = 1,
      pageSize = 10,
      role,
      departmentId,
      zoneId,
      isActive
    } = options

    try {
      const where = {
        ...(role && { role }),
        ...(departmentId && { departmentId }),
        ...(zoneId && { zoneId }),
        ...(isActive !== undefined && { isActive })
      }

      const totalUsers = await prisma.user.count({ where })
      
      const users = await prisma.user.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          id: true,
          username: true,
          displayName: true,
          role: true,
          isActive: true,
          department: true,
          zone: true,
          unit: true,
          lastLogin: true,
          createdAt: true
        },
        orderBy: { createdAt: 'desc' }
      })

      return {
        users,
        totalUsers,
        totalPages: Math.ceil(totalUsers / pageSize),
        currentPage: page
      }
    } catch (error) {
      console.error('Error fetching users:', error)
      throw error
    }
  }

  // Get single user by ID
  static async getUserById (id: string) {
    try {
      return await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          username: true,
          displayName: true,
          role: true,
          isActive: true,
          department: true,
          zone: true,
          unit: true,
          lastLogin: true,
          createdAt: true,
          incidents: true
        }
      })
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error)
      throw error
    }
  }

  // Update user
  static async updateUser (
    id: string, 
    data: Partial<z.infer<typeof UserSchema>>
  ) {
    try {
      const validatedData = UserSchema.partial().parse(data)
      
      // If password is being updated, hash it
      const updateData = validatedData.password 
        ? { 
            ...validatedData, 
            passwordHash: await bcrypt.hash(validatedData.password, 10) 
          }
        : validatedData

      return await prisma.user.update({
        where: { id },
        data: {
          ...updateData,
          updatedAt: new Date()
        },
        select: {
          id: true,
          username: true,
          displayName: true,
          role: true,
          isActive: true
        }
      })
    } catch (error) {
      console.error(`Error updating user ${id}:`, error)
      throw error
    }
  }

  // Update user role
  static async updateUserRole (id: string, role: UserRole) {
    try {
      return await prisma.user.update({
        where: { id },
        data: { 
          role,
          updatedAt: new Date() 
        },
        select: {
          id: true,
          username: true,
          role: true
        }
      })
    } catch (error) {
      console.error(`Error updating user role ${id}:`, error)
      throw error
    }
  }

  // Soft delete / deactivate user
  static async deactivateUser (id: string) {
    try {
      return await prisma.user.update({
        where: { id },
        data: { 
          isActive: false,
          updatedAt: new Date() 
        }
      })
    } catch (error) {
      console.error(`Error deactivating user ${id}:`, error)
      throw error
    }
  }

  // Hard delete user
  static async deleteUser (id: string) {
    try {
      return await prisma.user.delete({
        where: { id }
      })
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error)
      throw error
    }
  }

  // Advanced user search
  static async searchUsers (query: {
    keyword?: string
    minCreatedDate?: Date
    maxCreatedDate?: Date
    roles?: UserRole[]
  } = {}) {
    const {
      keyword,
      minCreatedDate,
      maxCreatedDate,
      roles
    } = query

    try {
      return await prisma.user.findMany({
        where: {
          ...(keyword && {
            OR: [
              { username: { contains: keyword } },
              { displayName: { contains: keyword } }
            ]
          }),
          ...(minCreatedDate && { createdAt: { gte: minCreatedDate } }),
          ...(maxCreatedDate && { createdAt: { lte: maxCreatedDate } }),
          ...(roles && { role: { in: roles } })
        },
        select: {
          id: true,
          username: true,
          displayName: true,
          role: true,
          isActive: true
        },
        orderBy: { createdAt: 'desc' }
      })
    } catch (error) {
      console.error('Error searching users:', error)
      throw error
    }
  }
}

export default UserService
