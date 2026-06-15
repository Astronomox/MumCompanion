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
function SettingsNavIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth={active ? "2" : "1.7"}/>
      <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  )
}

const tabs = [
  { href: "/chat", label: "Lami", Icon: ChatIcon },
  { href: "/journey", label: "Journey", Icon: JourneyIcon },
  { href: "/move", label: "Move", Icon: MoveIcon },
  { href: "/scan", label: "Scan", Icon: ScanIcon },
  { href: "/profile", label: "Settings", Icon: SettingsNavIcon },
]

export function BottomNav() {
  const pathname = usePathname()
  const [sosOpen, setSosOpen] = useState(false)

  return (
    <>
      <EmergencyOverlay open={sosOpen} onClose={() => setSosOpen(false)} />

      {/* Draggable SOS — always visible, edge-snapping */}
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
