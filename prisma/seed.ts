import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create initial Department
  const adminDepartment = await prisma.department.upsert({
    where: { code: 'ADMIN_DEPT' },
    update: {},
    create: {
      name: 'Administration Générale',
      code: 'ADMIN_DEPT',
      description: 'Département central pour la gestion administrative'
    }
  })

  // Create initial Zone
  const mainZone = await prisma.zone.upsert({
    where: { code: 'ZONE_CENTRALE' },
    update: {},
    create: {
      name: 'Zone Centrale',
      code: 'ZONE_CENTRALE',
      description: 'Zone administrative principale'
    }
  })

  // Create initial Unit
  const mainUnit = await prisma.unit.upsert({
    where: { code: 'UNITE_ADMIN' },
    update: {},
    create: {
      name: 'Unité Administrative Principale',
      code: 'UNITE_ADMIN',
      description: 'Unité administrative centrale',
      zoneId: mainZone.id
    }
  })

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash('ONA_Admin_2024!', salt)

  // Create Admin User
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
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
