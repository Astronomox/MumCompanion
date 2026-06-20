import type { Metadata, Viewport } from "next"
import { Inter, Bricolage_Grotesque, Fraunces } from "next/font/google"
import "../styles/globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" })
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap", weight: ["500", "600"] })

export const metadata: Metadata = {
  title: "Mum AI Companion | Lami, your pregnancy friend",
  description: "Meet Lami, your AI companion through pregnancy and motherhood in Nigeria. Chat, nutrition, exercises, medicine checks, and emergency help. Built on HelpMum.",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Mum AI Companion" },
}

export const viewport: Viewport = {
  width: "device-width", initialScale: 1, maximumScale: 1, userScalable: false, themeColor: "#0E1F17",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${bricolage.variable} ${fraunces.variable}`}>
      <body>{children}</body>
    </html>
  )
}
