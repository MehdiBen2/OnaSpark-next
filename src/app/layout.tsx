import type { Metadata } from 'next'
import { GeistSans } from "geist/font/sans";
import { auth } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

export const metadata: Metadata = {
  title: 'ONA Spark',
  description: 'Plateforme interne de l\'Office National de l\'Assainissement',
}

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
    <html 
      lang="fr" 
      className={GeistSans.className}
    >
      <body className="min-h-screen bg-gray-50">
        <SessionProvider session={session}>
          <ClientLayoutWrapper session={session}>
            {children}
          </ClientLayoutWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}
