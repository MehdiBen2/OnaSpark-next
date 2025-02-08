'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { z } from 'zod'

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
      'Smart Platform for Advanced Reporting and Knowledge',
      'Intelligent Water Management System',
      'AI-Powered Water Quality Assessment',
      'Comprehensive Organizational Tracking'
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
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-4 right-4 z-20">
          <Image
            src="/images/backrounds/testphase.png"
            alt="Test Phase"
            width={500}
            height={500}
            className="object-contain opacity-50"
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
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Connexion
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Accédez à votre espace de travail
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-100 dark:bg-red-900/30 rounded-lg">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
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
          </form>
        </div>
      </div>
    </main>
  )
}
