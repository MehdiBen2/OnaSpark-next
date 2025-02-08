'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

// Input validation schema
const LoginSchema = z.object({
  email: z.string().email('Adresse email invalide'),
  password: z.string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
});

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    try {
      // Validate inputs using Zod
      const validatedData = LoginSchema.parse({ email, password });

      // TODO: Replace with actual authentication logic
      // This is a placeholder for future secure authentication
      if (validatedData.email === 'admin@onaspark.dz' && validatedData.password === 'SecurePassword123!') {
        router.push('/home');
      } else {
        setErrors({ general: 'Identifiants incorrects' });
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Handle validation errors
        const fieldErrors = err.flatten().fieldErrors;
        setErrors({
          email: fieldErrors.email?.[0],
          password: fieldErrors.password?.[0]
        });
      } else {
        setErrors({ general: 'Une erreur est survenue. Veuillez réessayer.' });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Connexion
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Accédez à votre compte ONA Spark
          </p>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="space-y-4">
            <div className="relative">
              <label htmlFor="email" className="sr-only">Adresse email</label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none block w-full pl-10 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 
                  ${errors.email 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                  } text-sm`}
                placeholder="Adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <label htmlFor="password" className="sr-only">Mot de passe</label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                className={`appearance-none block w-full pl-10 pr-10 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 
                  ${errors.password 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                  } text-sm`}
                placeholder="Mot de passe"
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
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>
          </div>

          {errors.general && (
            <div className="text-center text-sm text-red-500">
              {errors.general}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                Se souvenir de moi
              </label>
            </div>

            <div className="text-sm">
              <Link 
                href="/forgot-password" 
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
              >
                Mot de passe oublié ?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Se connecter
            </button>
          </div>

          <div className="text-center">
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Pas de compte ? {' '}
              <Link 
                href="/register" 
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
              >
                Créer un compte
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
