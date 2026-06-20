"use client"

import { cn } from "@/lib/utils/cn"

interface TriageAlertProps {
  tier: "urgent" | "see_clinic" | "normal"
  redFlagMatched?: string
  onSos?: () => void
}

function Warn({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M12 3 L22 20 H2 Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M12 10 V14 M12 17 h0.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
}
function Clock({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/><path d="M12 7 V12 L15 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
}

export function TriageAlert({ tier, redFlagMatched, onSos }: TriageAlertProps) {
  if (tier === "normal") return null

  if (tier === "urgent") {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-4 mb-3 animate-slide-up" role="alert">
        <div className="flex gap-3">
          <Warn className="w-5 h-5 mt-0.5 shrink-0 text-red-600" />
          <div className="text-sm text-red-800">
            <p className="font-bold mb-1">Please get help now</p>
            <p>What you described needs urgent medical attention. Do not wait. Use the SOS button or get to a hospital right away.</p>
            {redFlagMatched && <p className="mt-2 font-medium">Sign detected: {redFlagMatched}</p>}
          </div>
        </div>
        {onSos && (
          <button onClick={onSos} className="mt-3 w-full bg-red-600 text-white font-bold rounded-xl py-3 text-sm active:bg-red-700">
            Open Emergency SOS
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-cream-300/60 bg-cream-50 p-4 mb-3 animate-slide-up flex gap-3" role="alert">
      <Clock className="w-5 h-5 mt-0.5 shrink-0 text-cream-500" />
      <div className="text-sm text-stone-700">
        <p className="font-bold mb-1 text-stone-800">See a clinic this week</p>
        <p>This needs a healthcare provider&apos;s attention soon. Please book a visit in the next few days.</p>
      </div>
    </div>
  )
}
