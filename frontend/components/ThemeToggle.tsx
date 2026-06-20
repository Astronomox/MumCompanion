"use client"

import { useState, useEffect, type CSSProperties } from "react"
import { getStoredTheme, applyTheme, type Theme } from "@/lib/theme"

function SunIcon({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="2.2"/>
      <path d="M12 2.5v2.8M12 18.7v2.8M4.6 4.6l2 2M17.4 17.4l2 2M2.5 12h2.8M18.7 12h2.8M4.6 19.4l2-2M17.4 6.6l2-2"
        stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  )
}

function MoonIcon({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path
        d="M19.5 14.3c-1 .4-2.1.6-3.2.6-4.7 0-8.6-3.8-8.6-8.6 0-1.2.2-2.3.6-3.3-3.5 1.3-6 4.7-6 8.6 0 5.1 4.2 9.3 9.3 9.3 3.9 0 7.3-2.4 8.6-6-.2 0-.5-.1-.7-.6Z"
        fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"
      />
      <circle cx="15.5" cy="6.5" r="0.9" fill="currentColor" />
      <circle cx="18" cy="10" r="0.6" fill="currentColor" />
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
