"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils/cn"
import { EmergencyOverlay } from "@/components/emergency/EmergencyOverlay"

function ChatIcon({ active, className = "" }: { active: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6 a3 3 0 0 1 3 -3 h10 a3 3 0 0 1 3 3 v7 a3 3 0 0 1 -3 3 H9 l-5 4 v-4 a3 3 0 0 1 0 -10 Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
    </svg>
  )
}

function JourneyIcon({ active, className = "" }: { active: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="5" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.7" fill={active ? "currentColor" : "none"} fillOpacity={active ? "0.15" : "0"}/>
      <path d="M4 10 H20 M8 3 V7 M16 3 V7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      <circle cx="12" cy="15" r="1.6" fill="currentColor"/>
    </svg>
  )
}

function MoveIcon({ active, className = "" }: { active: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="5" r="2.2" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.7"/>
      <path d="M12 8 V15 M12 11 L7 13 M12 11 L17 13 M12 15 L9 21 M12 15 L15 21" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  )
}

function ScanIcon({ active, className = "" }: { active: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M4 8 V6 a2 2 0 0 1 2 -2 h2 M16 4 h2 a2 2 0 0 1 2 2 v2 M20 16 v2 a2 2 0 0 1 -2 2 h-2 M8 20 H6 a2 2 0 0 1 -2 -2 v-2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      <path d="M4 12 H20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  )
}

function MeIcon({ active, className = "" }: { active: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8" r="3.4" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.7"/>
      <path d="M5 20 a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  )
}

const tabs = [
  { href: "/chat", label: "Lami", icon: ChatIcon },
  { href: "/journey", label: "Journey", icon: JourneyIcon },
  { href: "/move", label: "Move", icon: MoveIcon },
  { href: "/scan", label: "Scan", icon: ScanIcon },
  { href: "/profile", label: "Me", icon: MeIcon },
]

export function BottomNav() {
  const pathname = usePathname()
  const [sosOpen, setSosOpen] = useState(false)

  return (
    <>
      <EmergencyOverlay open={sosOpen} onClose={() => setSosOpen(false)} />

      {/* Floating SOS button - always visible above nav */}
      <button
        onClick={() => setSosOpen(true)}
        className="fixed bottom-24 right-4 z-50 w-14 h-14 rounded-full bg-red-600 text-white font-bold text-sm flex items-center justify-center shadow-xl animate-sos-pulse active:scale-95 transition-transform"
        aria-label="Emergency SOS"
      >
        SOS
      </button>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-100 pb-safe z-40">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const active = pathname.startsWith(tab.href)
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "flex-1 flex flex-col items-center gap-1 py-2.5 tap-target text-[11px] font-medium transition-colors",
                  active ? "text-forest-600" : "text-stone-400"
                )}
              >
                <Icon active={active} className="w-6 h-6" />
                <span>{tab.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
