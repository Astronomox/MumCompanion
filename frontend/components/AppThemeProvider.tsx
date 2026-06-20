"use client"

import { useEffect, useState, type ReactNode } from "react"
import { getStoredTheme, type Theme } from "@/lib/theme"

/**
 * Wraps authenticated app pages (chat, journey, move, scan, settings, onboarding)
 * and applies data-theme ONLY to this subtree - never to <html> or <body>.
 * This keeps the public marketing/auth pages (landing, login, signup,
 * forgot-password, reset-password) permanently locked to light mode.
 */
export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setTheme(getStoredTheme())
    setMounted(true)

    // Listen for theme changes triggered by ThemeToggle elsewhere in the tree
    const handler = () => setTheme(getStoredTheme())
    window.addEventListener("lami-theme-change", handler)
    return () => window.removeEventListener("lami-theme-change", handler)
  }, [])

  return (
    <div data-theme={mounted ? theme : "light"} style={{ minHeight: "100dvh" }}>
      {children}
    </div>
  )
}
