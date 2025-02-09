'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams, router } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { z } from 'zod'
import Link from 'next/link'

const LoginSchema = z.object({
  username: z.string().min(3, 'Nom d\'utilisateur requis'),
  password: z.string().min(1, 'Mot de passe requis')
})

type LoginFormData = z.infer<typeof LoginSchema>

export default function LoginPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
  
  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (session) {
      router.replace('/dashboard')
    }
  }, [session, router])

  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: ''
  })
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [cyclingText, setCyclingText] = useState('Smart Platform for Advanced Reporting and Knowledge')
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)

  // Ref for modal scroll position
  const modalScrollRef = useRef<HTMLDivElement>(null)

  // Preserve modal scroll position
  const preserveModalScroll = () => {
    if (modalScrollRef.current) {
      const currentScrollPosition = modalScrollRef.current.scrollTop
      setTimeout(() => {
        if (modalScrollRef.current) {
          modalScrollRef.current.scrollTop = currentScrollPosition
        }
      }, 0)
    }
  }

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
      preserveModalScroll()
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
        username: validatedData.username,
        password: validatedData.password,
        redirect: false
      })

      if (result?.error) {
        setError('Nom d\'utilisateur ou mot de passe incorrect')
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

  const TermsOfServiceModal = () => {
    return (
      <>
        {isTermsModalOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-black bg-opacity-50"
            onClick={() => setIsTermsModalOpen(false)}
          >
            <div 
              className="relative w-full max-w-2xl max-h-[90vh] mx-4 my-8 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex flex-col w-full bg-white rounded-lg shadow-2xl dark:bg-gray-800">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700 rounded-t-lg">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Conditions d'Utilisation SPARK
                  </h3>
                  <button 
                    onClick={() => setIsTermsModalOpen(false)}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                
                {/* Modal Content */}
                <div 
                  ref={modalScrollRef} 
                  className="p-6 space-y-6 text-gray-700 dark:text-gray-300 max-h-[60vh] overflow-y-auto"
                >
                  <section>
                    <h4 className="text-xl font-semibold mb-3">1. Introduction</h4>
                    <p>Bienvenue sur SPARK, la plateforme centralisé de données de l'office national de l'assainsiemnts. En utilisant notre service, vous acceptez d'être lié par les présentes conditions d'utilisation.</p>
                    <p className="mt-2">À propos de SPARK : Cette application est un projet développé par l'ONA pour les employés de l'ONA. Tous les logos et images liés à l'ONA sont la propriété exclusive de l'Office National de l'Assainissement. Les logos SPARK et tout le contenu SPARK appartiennent à leur créateur.</p>
                    <p className="mt-2">Ce projet est développé avec soin et attention, en amélioration continue pour répondre au mieux aux besoins des utilisateurs.</p>
                  </section>

                  <section className="mt-4">
                    <h4 className="text-xl font-semibold mb-3">2. Confidentialité des Données</h4>
                    <p>En tant qu'utilisateur de SPARK, vous vous engagez à :</p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Maintenir la confidentialité des informations sensibles</li>
                      <li>Ne pas partager vos identifiants de connexion</li>
                      <li>Signaler immédiatement toute violation de sécurité suspectée</li>
                    </ul>
                  </section>

                  <section className="mt-4">
                    <h4 className="text-xl font-semibold mb-3">3. Responsabilités de l'Utilisateur</h4>
                    <p>En tant qu'utilisateur, vous êtes responsable de :</p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>L'exactitude des informations fournies lors du signalement d'incidents</li>
                      <li>La mise à jour régulière de vos informations personnelles</li>
                      <li>L'utilisation appropriée et professionnelle de la plateforme</li>
                    </ul>
                  </section>

                  <section className="mt-4">
                    <h4 className="text-xl font-semibold mb-3">4. Utilisation du Service et Intégrité des Données</h4>
                    <p className="font-bold">Important :</p>
                    <p>Les utilisateurs de SPARK doivent comprendre que toutes les données saisies dans l'application (incidents, rapports, données) sont considérées comme des documents officiels de l'ONA. Par conséquent :</p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Il est strictement interdit de falsifier ou de manipuler les données</li>
                      <li>Tous les rapports d'incidents doivent être précis et véridiques</li>
                      <li>Les informations saisies sont considérées comme des documents officiels de l'ONA</li>
                      <li>Toute manipulation frauduleuse des données peut entraîner des sanctions administratives</li>
                    </ul>
                  </section>

                  <section className="mt-4">
                    <h4 className="text-xl font-semibold mb-3">5. Protection des Données</h4>
                    <p>SPARK s'engage à :</p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Protéger vos données personnelles conformément aux lois en vigueur</li>
                      <li>Utiliser des mesures de sécurité appropriées pour protéger les informations</li>
                      <li>Ne jamais partager vos informations avec des tiers non autorisés</li>
                    </ul>
                  </section>

                  <section className="mt-4">
                    <h4 className="text-xl font-semibold mb-3">6. Modifications des Conditions</h4>
                    <p>SPARK se réserve le droit de modifier ces conditions d'utilisation à tout moment. Les utilisateurs seront notifiés des changements importants.</p>
                  </section>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-end p-6 border-t border-gray-200 dark:border-gray-700 rounded-b-lg">
                  <button 
                    onClick={() => setIsTermsModalOpen(false)}
                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    J'accepte
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    )
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
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Nom d'utilisateur
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={formData.username}
                    onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black dark:text-white"
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
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black dark:text-white"
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
                <button 
                  type="button"
                  onClick={() => setIsTermsModalOpen(true)}
                  className="mt-2 text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 underline"
                >
                  Conditions d'Utilisation
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <TermsOfServiceModal />
    </main>
  )
}
