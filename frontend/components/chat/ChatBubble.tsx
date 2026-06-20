"use client"

import { cn } from "@/lib/utils/cn"
import { TriageAlert } from "./TriageAlert"

interface ChatBubbleProps {
  role: "user" | "assistant"
  content: string
  tier?: "normal" | "see_clinic" | "urgent"
  redFlagMatched?: string
  onSos?: () => void
}

export function ChatBubble({ role, content, tier, redFlagMatched, onSos }: ChatBubbleProps) {
  const isUser = role === "user"
  return (
    <div className={cn("flex flex-col gap-1", isUser ? "items-end" : "items-start")}>
      {!isUser && tier && tier !== "normal" && (
        <TriageAlert tier={tier} redFlagMatched={redFlagMatched} onSos={onSos} />
      )}
      <div className="relative max-w-[83%]">
        <div className={cn(
          "px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap",
          isUser
            ? "bg-forest-600 text-cream-50 rounded-[18px_4px_18px_18px] shadow-emerald"
            : "bg-white text-stone-800 rounded-[4px_18px_18px_18px] shadow-card border border-stone-100"
        )}>
          {content}
        </div>
        {/* Real speech-bubble tail, not a generic rounded corner */}
        {isUser ? (
          <svg width="10" height="10" viewBox="0 0 10 10" className="absolute -top-0 -right-[7px]" style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.06))" }}>
            <path d="M0 0 L10 0 L0 10 Z" className="fill-forest-600" />
          </svg>
        ) : (
          <svg width="10" height="10" viewBox="0 0 10 10" className="absolute -top-0 -left-[7px]">
            <path d="M10 0 L0 0 L10 10 Z" fill="white" />
          </svg>
        )}
      </div>
      {!isUser && <p className="text-[10.5px] text-stone-400 px-1 font-semibold uppercase tracking-wider">Lami</p>}
    </div>
  )
}

export function TypingIndicator() {
  return (
    <div className="flex items-start">
      <div className="relative">
        <div className="bg-white rounded-[4px_18px_18px_18px] px-5 py-4 shadow-card border border-stone-100">
          <div className="flex gap-1.5 items-center">
            {[0, 1, 2].map((i) => (
              <span key={i} className="w-2 h-2 bg-forest-300 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
        <svg width="10" height="10" viewBox="0 0 10 10" className="absolute -top-0 -left-[7px]">
          <path d="M10 0 L0 0 L10 10 Z" fill="white" />
        </svg>
      </div>
    </div>
  )
}
