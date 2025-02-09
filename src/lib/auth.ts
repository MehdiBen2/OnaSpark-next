import NextAuth from 'next-auth'
import { compare } from 'bcryptjs'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from './prisma'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        console.log('Attempting to authorize:', {
          username: credentials?.username,
          passwordProvided: !!credentials?.password
        })

        if (!credentials?.username || !credentials?.password) {
          console.log('Invalid credentials: Missing username or password')
          throw new Error('Invalid credentials')
        }

        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username,
          },
          include: {
            department: true,
            zone: true,
            unit: true,
          }
        })

        console.log('User lookup result:', {
          userFound: !!user,
          username: credentials.username
        })

        if (!user) {
          console.log('User not found')
          throw new Error('User not found')
        }

        const isPasswordValid = await compare(credentials.password, user.passwordHash)

        console.log('Password validation:', {
          isPasswordValid,
          hashedStoredPassword: user.passwordHash
        })

        if (!isPasswordValid) {
          console.log('Invalid password')
          throw new Error('Invalid password')
        }

        if (!user.isActive) {
          console.log('User account is not active')
          throw new Error('User account is not active')
        }

        // Update last login
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLogin: new Date() }
        })

        return {
          id: user.id,
          username: user.username,
          displayName: user.displayName,
          role: user.role,
          department: user.department?.name,
          zone: user.zone?.name,
          unit: user.unit?.name,
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          username: user.username,
          displayName: user.displayName,
          role: user.role,
          department: user.department,
          zone: user.zone,
          unit: user.unit,
        }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          username: token.username,
          displayName: token.displayName,
          role: token.role,
          department: token.department,
          zone: token.zone,
          unit: token.unit,
        }
      }
    }
  }
})
