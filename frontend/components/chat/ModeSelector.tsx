"use client"

import { cn } from "@/lib/utils/cn"

type Mode = "general" | "symptom" | "nutrition"

function Chat2({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M4 6 a3 3 0 0 1 3 -3 h10 a3 3 0 0 1 3 3 v6 a3 3 0 0 1 -3 3 H9 l-4 3 v-3 a3 3 0 0 1 -1 -9 Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/></svg>
}
function Stetho({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M5 3 v5 a4 4 0 0 0 8 0 V3 M9 16 a5 5 0 0 0 10 0 v-3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/><circle cx="19" cy="11" r="2" stroke="currentColor" strokeWidth="2.2"/></svg>
}
function Apple({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M12 8 c-2 -2 -6 -1 -6 4 c0 4 3 9 6 9 s6 -5 6 -9 c0 -5 -4 -6 -6 -4 Z" stroke="currentColor" strokeWidth="2.2"/><path d="M12 8 V5 a2 2 0 0 1 2 -2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>
}

const modes: { id: Mode; label: string; icon: typeof Chat2 }[] = [
  { id: "general", label: "Chat", icon: Chat2 },
  { id: "symptom", label: "Symptoms", icon: Stetho },
  { id: "nutrition", label: "Food", icon: Apple },
]

export function ModeSelector({ active, onChange }: { active: Mode; onChange: (m: Mode) => void }) {
  return (
    <div className="flex gap-2 px-4 py-2">
      {modes.map((mode) => {
        const Icon = mode.icon
        const isActive = active === mode.id
        return (
          <button key={mode.id} onClick={() => onChange(mode.id)}
            className={cn("flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all",
              isActive ? "bg-forest-600 text-white shadow-warm" : "bg-stone-100 text-stone-500 active:bg-stone-200")}>
            <Icon className="w-3.5 h-3.5" />
            {mode.label}
          </button>
        )
      })}
    </div>
  )
}
