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
  const session = await auth();

  return (
    <html lang="fr" className={`${GeistSans.className} ${roboto.className}`}>
      <body className="min-h-screen bg-gray-50">
        <SessionProvider session={session}>
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
