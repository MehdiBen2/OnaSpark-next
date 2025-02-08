import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create initial departments
  const adminDepartment = await prisma.department.create({
    data: {
      name: 'Administration',
      description: 'Central administrative department'
    }
  })

  const waterQualityDepartment = await prisma.department.create({
    data: {
      name: 'Water Quality',
      description: 'Department responsible for water quality monitoring'
    }
  })

  // Create initial zones
  const centralZone = await prisma.zone.create({
    data: {
      name: 'Central Zone',
      code: 'ZONE-CENTRAL-001',
      description: 'Central administrative zone'
    }
  })

  // Create initial units
  const mainUnit = await prisma.unit.create({
    data: {
      name: 'Main Unit',
      code: 'UNIT-MAIN-001',
      description: 'Primary operational unit',
      zoneId: centralZone.id
    }
  })

  // Create initial users
  // Admin user
  const adminPassword = await hash('AdminPass123!', 12)
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@onaspark.dz',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      status: 'ACTIVE',
      departmentId: adminDepartment.id,
      zoneId: centralZone.id,
      unitId: mainUnit.id
    }
  })

  // DG Employee
  const dgPassword = await hash('DGPass123!', 12)
  const dgUser = await prisma.user.create({
    data: {
      email: 'dg@onaspark.dz',
      password: dgPassword,
      firstName: 'DG',
      lastName: 'Employee',
      role: 'DG_EMPLOYEE',
      status: 'ACTIVE',
      departmentId: waterQualityDepartment.id
    }
  })

  console.log('Seed data created successfully:', {
    departments: [adminDepartment, waterQualityDepartment],
    zones: [centralZone],
    units: [mainUnit],
    users: [adminUser, dgUser]
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

export {}
