"use client"

import { Stethoscope, Apple, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils/cn"

type Mode = "general" | "symptom" | "nutrition"

interface ModeSelectorProps {
  active: Mode
  onChange: (mode: Mode) => void
}

const modes: { id: Mode; label: string; icon: typeof MessageCircle; hint: string }[] = [
  { id: "general", label: "Chat", icon: MessageCircle, hint: "Talk to MamaBot" },
  { id: "symptom", label: "Symptoms", icon: Stethoscope, hint: "Check a symptom" },
  { id: "nutrition", label: "Nutrition", icon: Apple, hint: "Food & diet advice" },
]

export function ModeSelector({ active, onChange }: ModeSelectorProps) {
  return (
    <div className="flex gap-2 px-4 py-2">
      {modes.map((mode) => {
        const Icon = mode.icon
        const isActive = active === mode.id
        return (
          <button
            key={mode.id}
            onClick={() => onChange(mode.id)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all",
              isActive
                ? "bg-terracotta-500 text-white shadow-warm"
                : "bg-stone-100 text-stone-500 active:bg-stone-200"
            )}
          >
            <Icon className="w-3.5 h-3.5" />
            {mode.label}
          </button>
        )
      })}
    </div>
  )
}
