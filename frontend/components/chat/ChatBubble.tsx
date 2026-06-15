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
      <div className={cn(
        "rounded-3xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap",
        isUser
          ? "bg-forest-600 text-white rounded-br-sm max-w-[80%]"
          : "bg-white text-stone-800 rounded-bl-sm max-w-[88%] shadow-card border border-stone-100"
      )}>
        {content}
      </div>
      {!isUser && <p className="text-[11px] text-stone-400 px-1">Lami</p>}
    </div>
  )
}

export function TypingIndicator() {
  return (
    <div className="flex items-start">
      <div className="bg-white rounded-3xl rounded-bl-sm px-5 py-4 shadow-card border border-stone-100">
        <div className="flex gap-1.5 items-center">
          {[0, 1, 2].map((i) => (
            <span key={i} className="w-2 h-2 bg-forest-300 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      </div>
    </div>
  )
}
