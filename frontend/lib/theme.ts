"use client"

export type Theme = "light" | "dark"
const STORAGE_KEY = "lami-theme"
const EVENT_NAME = "lami-theme-change"

export function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "light"
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === "light" || stored === "dark") return stored
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark"
  }
  return "light"
}

/**
 * Saves the theme choice and notifies any mounted AppThemeProvider instances.
 * Does NOT touch document.documentElement - theme is scoped to the
 * authenticated app subtree only, never the public marketing/auth pages.
 */
export function applyTheme(theme: Theme) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, theme)
  window.dispatchEvent(new CustomEvent(EVENT_NAME))
}
