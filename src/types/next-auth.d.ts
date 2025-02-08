import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    email: string
    name: string
    role: string
    department?: string
    zone?: string
    unit?: string
  }

  interface Session {
    user: User & {
      id: string
      role: string
      department?: string
      zone?: string
      unit?: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: string
    department?: string
    zone?: string
    unit?: string
  }
}
