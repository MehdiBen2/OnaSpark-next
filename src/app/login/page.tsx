'use client';

import { useState, useEffect, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import Image from 'next/image';

// Input validation schema
const LoginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Mot de passe requis')
});

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const router = useRouter();

  // Cycling text animation
  const [cyclingText, setCyclingText] = useState('Smart platform for reporting and knowledge');
  const cycleTexts = [
    'Smart platform for reporting and knowledge',
    'Office National de l\'Assainissement',
    'Système de Gestion Centralisée des Données',
    'Plateforme Intelligente de Suivi Hydraulique'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = cycleTexts.indexOf(cyclingText);
      const nextIndex = (currentIndex + 1) % cycleTexts.length;
      setCyclingText(cycleTexts[nextIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, [cyclingText]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    try {
      const validatedData = LoginSchema.parse({ email, password });
      // TODO: Implement actual authentication
      if (validatedData.email === 'admin@onaspark.dz' && validatedData.password === 'password') {
        router.push('/home');
      } else {
        setErrors({ general: 'Identifiants incorrects' });
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = err.flatten().fieldErrors;
        setErrors({
          email: fieldErrors.email?.[0],
          password: fieldErrors.password?.[0]
        });
      } else {
        setErrors({ general: 'Une erreur est survenue' });
      }
    }
  };

  return (
    <div className="min-h-screen flex">
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
              className="mx-auto mb-8 object-contain"
            />
            <h2 className="text-3xl font-bold">
              {/* Text removed as requested */}
            </h2>
            <p 
              key={cyclingText} 
              className="text-lg opacity-80 transition-all duration-500 ease-in-out transform animate-fade-in"
            >
              {cyclingText}
            </p>
            <div className="border-t border-white/30 pt-6 mt-6">
              <p className="text-sm opacity-70">
                Votre plateforme de gestion et de suivi des infrastructures hydrauliques
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-[#f0f4f8] dark:bg-[#1a2b3c]">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Connexion à l'Office
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Veuillez vous connecter pour accéder à votre tableau de bord
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Adresse email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                  ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                placeholder="vous@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                  ${errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {errors.general && (
              <div className="text-center text-red-500 text-sm">
                {errors.general}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md 
                hover:bg-blue-700 transition-colors duration-300 
                focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Se connecter
            </button>

            <div className="text-center">
              <Link 
                href="/forgot-password" 
                className="text-sm text-blue-600 hover:underline dark:text-blue-400"
              >
                Mot de passe oublié ?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
