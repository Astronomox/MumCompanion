"use client"

import { AlertTriangle, Clock, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils/cn"

interface TriageAlertProps {
  tier: "urgent" | "see_clinic" | "normal"
  redFlagMatched?: string
}

const configs = {
  urgent: {
    icon: AlertTriangle,
    bg: "bg-red-50 border-red-200",
    text: "text-red-800",
    iconColor: "text-red-600",
    heading: "Go to hospital now",
    body: "Based on what you described, you need immediate medical attention. Please go to the nearest hospital or call emergency services right away.",
  },
  see_clinic: {
    icon: Clock,
    bg: "bg-amber-50 border-amber-200",
    text: "text-amber-800",
    iconColor: "text-amber-600",
    heading: "See a clinic this week",
    body: "What you are experiencing needs a healthcare provider's attention. Please book an appointment or visit a clinic within the next few days.",
  },
  normal: {
    icon: CheckCircle2,
    bg: "bg-green-50 border-green-200",
    text: "text-green-800",
    iconColor: "text-green-600",
    heading: "This is normal",
    body: "What you are experiencing is common during pregnancy. See below for guidance.",
  },
}

export function TriageAlert({ tier, redFlagMatched }: TriageAlertProps) {
  const config = configs[tier]
  const Icon = config.icon

  if (tier === "normal") return null

  return (
    <div
      className={cn(
        "flex gap-3 rounded-2xl border p-4 mb-3 animate-slide-up",
        config.bg
      )}
      role="alert"
      aria-live="assertive"
    >
      <Icon className={cn("w-5 h-5 mt-0.5 shrink-0", config.iconColor)} />
      <div className={cn("text-sm", config.text)}>
        <p className="font-bold mb-1">{config.heading}</p>
        <p>{config.body}</p>
        {redFlagMatched && tier === "urgent" && (
          <p className="mt-2 font-medium">
            Symptom detected: {redFlagMatched}
          </p>
        )}
      </div>
    </div>
  )
}
