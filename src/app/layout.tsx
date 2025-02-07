import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Roboto } from "next/font/google";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${GeistSans.className} ${roboto.className}`}>
      <body>{children}</body>
    </html>
  );
}
