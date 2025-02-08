import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Roboto } from "next/font/google";
import { auth } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "ONA Spark",
  description: "Plateforme interne de l'Office National de l'Assainissement",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session = null;
  try {
    session = await auth();
  } catch (error) {
    console.error('Session authentication error:', error);
  }

  return (
    <html lang="fr" className={`${GeistSans.className} ${roboto.className}`}>
      <body className="min-h-screen bg-gray-50">
        <SessionProvider session={session}>
          {!session ? (
            <main className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
                <p className="text-gray-600 mb-4">Please log in to access the application.</p>
                <a href="/login" className="btn btn-primary">
                  Go to Login
                </a>
              </div>
            </main>
          ) : (
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
