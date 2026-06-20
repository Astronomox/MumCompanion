"use client"

import { useState, useEffect } from "react"
import { getStoredTheme, applyTheme, type Theme } from "@/lib/theme"

function SunIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2.2"/>
      <path d="M12 2.5v2.5M12 19v2.5M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2.5 12H5M19 12h2.5M4.2 19.8l1.8-1.8M18 6l1.8-1.8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  )
}
function MoonIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4 7 7 0 0 0 20 14.5Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" fill="currentColor" fillOpacity="0.12"/>
    </svg>
  )
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = getStoredTheme()
    setTheme(t)
    applyTheme(t)
    setMounted(true)
  }, [])

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light"
    setTheme(next)
    applyTheme(next)
  }

  if (!mounted) {
    return <div className={className} style={{ width: 52, height: 30 }} />
  }

  return (
    <button
      onClick={toggle}
      role="switch"
      aria-checked={theme === "dark"}
      aria-label="Toggle dark mode"
      className={className}
      style={{
        position: "relative",
        width: 52,
        height: 30,
        borderRadius: 999,
        background: theme === "dark" ? "rgb(var(--forest-600))" : "rgb(var(--stone-200))",
        border: "1px solid rgb(var(--stone-300))",
        transition: "background-color 0.25s ease",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 3,
          left: theme === "dark" ? 25 : 3,
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: "rgb(var(--surface-card))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "left 0.25s cubic-bezier(0.34,1.56,0.64,1)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }}
      >
        {theme === "dark" ? (
          <MoonIcon className="w-3.5 h-3.5" style={{ color: "rgb(var(--forest-500))" }} />
        ) : (
          <SunIcon className="w-3.5 h-3.5" style={{ color: "rgb(var(--cream-500))" }} />
        )}
      </span>
    </button>
  )
}
