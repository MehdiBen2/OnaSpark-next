'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';

// Input validation schema
const LoginSchema = z.object({
  username: z.string().min(1, 'Nom d\'utilisateur requis'),
  password: z.string().min(1, 'Mot de passe requis')
});

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string; general?: string }>({});
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    try {
      const validatedData = LoginSchema.parse({ username, password });
      // TODO: Implement actual authentication
      if (validatedData.username === 'admin' && validatedData.password === 'password') {
        router.push('/home');
      } else {
        setErrors({ general: 'Identifiants incorrects' });
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = err.flatten().fieldErrors;
        setErrors({
          username: fieldErrors.username?.[0],
          password: fieldErrors.password?.[0]
        });
      } else {
        setErrors({ general: 'Une erreur est survenue' });
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Dark background with logo */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-b from-gray-700 to-gray-900 text-white p-12 flex-col justify-between relative">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="text-2xl font-bold">
            Office National de l'Assainissement
          </div>
          <div className="text-xl">
            SparK
          </div>
          <div className="w-32 h-32 relative">
            <Image
              src="/images/Ona_Blogo.png"
              alt="ONA Logo"
              width={128}
              height={128}
              className="object-contain"
            />
          </div>
        </div>
        <div className="text-center text-sm opacity-80">
          <p>Ce logo est la propriété exclusive de l'Office National de l'Assainissement</p>
          <p className="mt-2">Système de Gestion Centralisée des Données</p>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Connexion à l'office
            </h2>
            <div className="mt-2 text-sm text-gray-600">
              Veuillez vous connecter avec vos identifiants pour accéder à la plateforme OnaSpark.
            </div>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Nom d'utilisateur
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errors.username ? 'border-red-300' : 'border-gray-300'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {errors.username && (
                    <p className="mt-1 text-sm text-red-600">{errors.username}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errors.password ? 'border-red-300' : 'border-gray-300'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>
              </div>
            </div>

            {errors.general && (
              <div className="text-sm text-red-600 text-center">
                {errors.general}
              </div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Se connecter
              </button>
            </div>

            <div className="text-center">
              <Link
                href="/"
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Retour à l'accueil
              </Link>
            </div>

            <div className="text-center text-xs text-gray-500">
              Essayez notre nouvelle interface de connexion
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
