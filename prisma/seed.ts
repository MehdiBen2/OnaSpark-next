import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Delete existing users to prevent conflicts
  await prisma.user.deleteMany()
  await prisma.department.deleteMany()
  await prisma.zone.deleteMany()
  await prisma.unit.deleteMany()

  // Create initial Department
  const adminDepartment = await prisma.department.create({
    data: {
      name: 'Administration Générale',
      code: 'ADMIN_DEPT',
      description: 'Département central pour la gestion administrative'
    }
  })

  // Create initial Zone
  const mainZone = await prisma.zone.create({
    data: {
      name: 'Zone Centrale',
      code: 'ZONE_CENTRALE',
      description: 'Zone administrative principale'
    }
  })

  // Create initial Unit
  const mainUnit = await prisma.unit.create({
    data: {
      name: 'Unité Administrative Principale',
      code: 'UNITE_ADMIN',
      zoneId: mainZone.id,
      description: 'Unité administrative centrale'
    }
  })

  // Hash password
  const hashedPassword = await bcrypt.hash('ONA_Admin_2024!', 10)

  // Create Admin User
  await prisma.user.create({
    data: {
      username: 'admin',
      displayName: 'Administrateur Système',
      passwordHash: hashedPassword,
      role: 'ADMIN',
      departmentId: adminDepartment.id,
      zoneId: mainZone.id,
      unitId: mainUnit.id,
      isActive: true
    }
  })

  console.log('Seed data created successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
