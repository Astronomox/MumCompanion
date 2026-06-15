"use client"

import { useState, useEffect } from "react"
import { useAppStore } from "@/lib/store"

interface EmergencyOverlayProps {
  open: boolean
  onClose: () => void
}

function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M5 4 h3 l2 5 -2.5 1.5 a11 11 0 0 0 5 5 L13 13 l5 2 v3 a2 2 0 0 1 -2 2 A16 16 0 0 1 3 6 a2 2 0 0 1 2 -2 Z" fill="currentColor"/>
    </svg>
  )
}

function ChatIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M3 6 a3 3 0 0 1 3 -3 h12 a3 3 0 0 1 3 3 v8 a3 3 0 0 1 -3 3 H9 l-5 4 v-4 H6 a3 3 0 0 1 -3 -3 Z" fill="currentColor"/>
    </svg>
  )
}

function HospitalIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="7" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M9 3 h6 v4 H9 Z" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M12 11 v6 M9 14 h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}

function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M6 6 L18 18 M18 6 L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

export function EmergencyOverlay({ open, onClose }: EmergencyOverlayProps) {
  const { user } = useAppStore()
  const [calling, setCalling] = useState(false)

  useEffect(() => {
    if (!open) {
      setCalling(false)
    }
  }, [open])

  if (!open) return null

  const emergencyName = user?.emergencyName || "your emergency contact"
  const emergencyPhone = user?.emergencyPhone
  const hospitalPhone = user?.hospitalPhone
  const name = user?.name || "I"
  const week = user?.week
  const stage = user?.stage?.replace("_", " ")

  const synopsis = `This is an emergency message from ${user?.name || "a mother"} sent through Mum AI Companion. ${week ? `She is at ${stage}, week ${week}.` : ""} She needs urgent help right now. Please call her or come to her immediately. If you cannot reach her, please call the nearest hospital.`

  const startEmergencyCall = () => {
    if (!emergencyPhone) {
      alert("Please add an emergency contact in your profile first.")
      return
    }
    setCalling(true)

    // Fire the GSM call immediately (primary action)
    window.location.href = `tel:${emergencyPhone}`

    // Send the WhatsApp synopsis right after (secondary, fires in background)
    setTimeout(() => {
      const cleanPhone = emergencyPhone.replace(/[^0-9]/g, "")
      const waNumber = cleanPhone.startsWith("0") ? "234" + cleanPhone.slice(1) : cleanPhone
      window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(synopsis)}`, "_blank")
    }, 1500)
  }

  const callHospital = () => {
    if (!hospitalPhone) {
      alert("Please add your hospital number in your profile first.")
      return
    }
    window.location.href = `tel:${hospitalPhone}`
  }

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-red-600 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-safe pt-6 pb-4">
        <p className="text-white font-display font-bold text-lg">Emergency</p>
        <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white" aria-label="Close">
          <CloseIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-24 h-24 rounded-full bg-white/15 flex items-center justify-center mb-6 animate-sos-pulse">
          <PhoneIcon className="w-10 h-10 text-white" />
        </div>

        <h1 className="font-display text-2xl font-bold text-white mb-2">
          Help is one tap away
        </h1>
        <p className="text-white/85 text-sm mb-1 max-w-xs">
          We will call {emergencyName} now and send them a message about how you feel.
        </p>
        {!emergencyPhone && (
          <p className="text-white text-xs mt-2 bg-white/20 rounded-xl px-3 py-2">
            Add an emergency contact in your profile to enable this.
          </p>
        )}

        {/* Primary: Call emergency contact */}
        <button
          onClick={startEmergencyCall}
          disabled={calling}
          className="mt-8 w-full max-w-sm bg-white text-red-600 font-bold rounded-2xl py-5 text-lg flex items-center justify-center gap-3 active:scale-[0.98] transition-transform shadow-xl"
        >
          <PhoneIcon className="w-6 h-6" />
          {calling ? "Calling..." : `Call ${user?.emergencyName || "for help"} now`}
        </button>

        {/* WhatsApp note */}
        <div className="mt-3 flex items-center gap-2 text-white/75 text-xs">
          <ChatIcon className="w-4 h-4" />
          A message about how you feel will be sent on WhatsApp too
        </div>

        {/* Secondary: Call hospital */}
        <button
          onClick={callHospital}
          className="mt-6 w-full max-w-sm bg-red-700 text-white font-semibold rounded-2xl py-4 flex items-center justify-center gap-3 active:scale-[0.98] transition-transform border border-white/20"
        >
          <HospitalIcon className="w-5 h-5" />
          Call my hospital instead
        </button>
      </div>

      <div className="px-6 pb-safe pb-8 text-center">
        <p className="text-white/70 text-xs">
          If you cannot reach anyone, go to the nearest hospital immediately or dial your local emergency line.
        </p>
      </div>
    </div>
  )
}
