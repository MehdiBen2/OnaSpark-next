'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams, router } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { z } from 'zod'
import Link from 'next/link'

const LoginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Mot de passe requis')
})

type LoginFormData = z.infer<typeof LoginSchema>

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  })
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [cyclingText, setCyclingText] = useState('Smart Platform for Advanced Reporting and Knowledge')

  // Cycling text animation
  useEffect(() => {
    const texts = [
      'Plateforme intelligente pour le reporting avancé et la connaissance',
      'Système intelligent de gestion de l\'eau',
      'Évaluation de la qualité de l\'eau assistée par IA',
      'Suivi organisationnel complet'
    ]
    let currentIndex = 0

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % texts.length
      setCyclingText(texts[currentIndex])
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Validate form data
      const validatedData = LoginSchema.parse(formData)

      // Attempt to sign in
      const result = await signIn('credentials', {
        email: validatedData.email,
        password: validatedData.password,
        redirect: false
      })

      if (result?.error) {
        setError('Email ou mot de passe incorrect')
      } else if (result?.ok) {
        router.push(callbackUrl)
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message)
      } else {
        setError('Une erreur est survenue')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen">
      {/* Left Sidebar with Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/backrounds/bglogin.png"
            alt="ONA Water Infrastructure"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            priority
            quality={100}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-0 left-0 right-0 z-20 flex justify-end p-4">
          <Image
            src="/images/backrounds/phasetest.png"
            alt="Test Phase"
            width={300}
            height={100}
            className="object-contain"
          />
        </div>
        <div className="absolute inset-0 bg-black/50 z-10 flex flex-col justify-center items-center text-white p-12">
          <div className="max-w-md text-center space-y-6">
            <Image
              src="/images/onalogos/sparkLogofull.png"
              alt="ONA Logo"
              width={350}
              height={180}
              className="mx-auto mb-8 object-contain animate-slide-in-right"
            />
            <p 
              key={cyclingText} 
              className="text-xl opacity-80 transition-all duration-500 ease-in-out transform animate-fade-in"
            >
              {cyclingText}
            </p>
            <div className="border-t border-white/30 pt-6 mt-6">
              <p className="text-base opacity-70">
                Votre plateforme de gestion et de suivi des infrastructures hydrauliques
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#f0f4f8] dark:bg-gray-900">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 text-center">
              Connexion à l'Office
            </h1>
            <p className="text-md text-gray-600 text-center mb-6">
              Accédez à la plateforme ONA Spark
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  {error}
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Votre email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Mot de passe
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {isLoading ? 'Connexion...' : 'Se connecter'}
                </button>
              </div>

              <div className="relative flex items-center justify-center my-6">
                <div className="absolute left-0 w-[calc(50%-40px)] h-[1.5px] top-1/2 left-0 bg-gradient-to-r from-transparent via-gray-300 to-gray-300"></div>
                <div className="absolute right-0 w-[calc(50%-40px)] h-[1.5px] top-1/2 right-0 bg-gradient-to-r from-gray-300 via-gray-300 to-transparent"></div>
                <span className="relative z-10 px-4 text-gray-500 font-medium text-sm uppercase tracking-wider">
                  Ou
                </span>
              </div>

              <div className="text-center mt-4">
                <button 
                  type="button"
                  onClick={() => router.push('/')}
                  className="w-full flex justify-center py-2 px-4 border border-blue-600 rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  Retour à l'accueil
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
