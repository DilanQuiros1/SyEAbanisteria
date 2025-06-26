import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muebles S y E - Ebanistería de Calidad y Diseño",
  description: "Muebles S y E: Donde la madera cobra vida en tus espacios. Ebanistería profesional con diseños únicos y personalizados para tu hogar.",
  keywords: "ebanistería, muebles, cocinas, puertas, madera, carpintería, diseño personalizado",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
