"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils/cn"
import { EmergencyOverlay } from "@/components/emergency/EmergencyOverlay"
import { DraggableSOS } from "@/components/emergency/DraggableSOS"

function ChatIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} className="w-6 h-6">
      <path d="M4 6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H9l-5 4v-4a3 3 0 0 1 0-10Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
    </svg>
  )
}

function JourneyIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <rect x="4" y="5" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.7" fill={active ? "currentColor" : "none"} fillOpacity={active ? "0.15" : "0"}/>
      <path d="M4 10H20M8 3V7M16 3V7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      <circle cx="12" cy="15" r="1.6" fill="currentColor"/>
    </svg>
  )
}

function MoveIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <circle cx="12" cy="5" r="2.2" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.7"/>
      <path d="M12 8V15M12 11L7 13M12 11L17 13M12 15L9 21M12 15L15 21" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  )
}

function ScanIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      <path d="M4 12H20" stroke="currentColor" strokeWidth={active ? "2.2" : "1.7"} strokeLinecap="round"/>
    </svg>
  )
}

function GearIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth={active ? "2" : "1.6"} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

const tabs = [
  { href: "/chat", label: "Lami", Icon: ChatIcon },
  { href: "/journey", label: "Journey", Icon: JourneyIcon },
  { href: "/move", label: "Move", Icon: MoveIcon },
  { href: "/scan", label: "Scan", Icon: ScanIcon },
  { href: "/profile", label: "Settings", Icon: GearIcon },
]

export function BottomNav() {
  const pathname = usePathname()
  const [sosOpen, setSosOpen] = useState(false)

  return (
    <>
      <EmergencyOverlay open={sosOpen} onClose={() => setSosOpen(false)} />
      <DraggableSOS onPress={() => setSosOpen(true)} />
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-100 pb-safe z-40">
        <div className="flex">
          {tabs.map(({ href, label, Icon }) => {
            const active = pathname.startsWith(href)
            return (
              <Link key={href} href={href}
                className={cn(
                  "flex-1 flex flex-col items-center justify-center gap-1 py-2.5 min-h-[56px] text-[11px] font-medium transition-colors",
                  active ? "text-forest-600" : "text-stone-400"
                )}>
                <Icon active={active} />
                <span>{label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
