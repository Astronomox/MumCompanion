"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { ChatBubble, TypingIndicator } from "@/components/chat/ChatBubble"
import { ModeSelector } from "@/components/chat/ModeSelector"
import { BottomNav } from "@/components/layout/BottomNav"
import { EmergencyOverlay } from "@/components/emergency/EmergencyOverlay"
import { sendChat, type ChatResponse } from "@/lib/api/client"
import { useAppStore } from "@/lib/store"
import { cn } from "@/lib/utils/cn"

type Mode = "general" | "symptom" | "nutrition"

function getGreeting(name: string, mode: Mode): string {
  const n = name && name !== "Mama" ? name : ""
  const greetings = {
    general: [
      `Hey ${n || "you"}! Lami here. How you dey today?`,
      `${n ? n + ", h" : "H"}ow far? I was just thinking about you. Talk to me.`,
    ],
    symptom: `Okay ${n || "babe"}, tell me what is going on with your body. Do not hold back, I am listening.`,
    nutrition: `Ehen, let us talk food. What did you eat, or what are you craving? No judgment... okay small judgment.`,
  }
  if (mode === "general") return greetings.general[Math.floor(Math.random() * 2)]
  return greetings[mode]
}

const QUICK: Record<Mode, string[]> = {
  general: ["I am tired today", "Talk to me", "I cannot sleep"],
  symptom: ["My back hurts", "My feet are swollen", "I feel dizzy"],
  nutrition: ["What should I eat today?", "Is eba okay?", "Cravings are crazy"],
}

export default function ChatPage() {
  const { user, messages, addMessage, chatMode, setChatMode } = useAppStore()
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [greeted, setGreeted] = useState(false)
  const [sosOpen, setSosOpen] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => scrollRef.current?.scrollIntoView({ behavior: "smooth" }))
  }, [])

  useEffect(() => { scrollToBottom() }, [messages, isLoading, scrollToBottom])

  useEffect(() => {
    if (!greeted && messages.length === 0) {
      addMessage({
        id: `bot-${Date.now()}`, role: "assistant",
        content: getGreeting(user?.name || "", "general"),
        mode: "general", timestamp: new Date().toISOString(),
      })
      setGreeted(true)
    }
  }, [greeted, messages.length, user, addMessage])

  const handleModeChange = (mode: Mode) => {
    setChatMode(mode)
    addMessage({
      id: `sys-${Date.now()}`, role: "assistant",
      content: getGreeting(user?.name || "", mode),
      mode, timestamp: new Date().toISOString(),
    })
  }

  const send = async (text: string) => {
    if (!text.trim() || isLoading) return
    addMessage({ id: `u-${Date.now()}`, role: "user", content: text.trim(), mode: chatMode, timestamp: new Date().toISOString() })
    setInput("")
    setIsLoading(true)
    try {
      const history = messages.filter((m) => m.role === "user" || m.role === "assistant").slice(-10).map((m) => ({ role: m.role, content: m.content }))
      history.push({ role: "user", content: text.trim() })
      const res: ChatResponse = await sendChat({
        messages: history, mode: chatMode,
        name: user?.name || "Mama", stage: user?.stage || "second_trimester",
        week: user?.week || 20, baby_name: user?.babyName || "",
      })
      addMessage({ id: `bot-${Date.now()}`, role: "assistant", content: res.answer, tier: res.tier, mode: chatMode, timestamp: new Date().toISOString() })
      if (res.tier === "urgent") setSosOpen(true)
    } catch {
      addMessage({ id: `err-${Date.now()}`, role: "assistant", content: "Ah, my network just disappointed me. Try me again in a second?", mode: chatMode, timestamp: new Date().toISOString() })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-dvh bg-cream-50">
      <EmergencyOverlay open={sosOpen} onClose={() => setSosOpen(false)} />

      <header className="bg-white border-b border-stone-100 pt-safe z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-forest-100 flex items-center justify-center">
              <span className="font-display font-bold text-forest-700">L</span>
            </div>
            <div>
              <h1 className="font-display font-bold text-lg text-stone-800">Lami</h1>
              <p className="text-[11px] text-forest-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-soft" /> here for you
              </p>
            </div>
          </div>
        </div>
        <ModeSelector active={chatMode} onChange={handleModeChange} />
      </header>

      <div className="flex-1 overflow-y-auto chat-scroll px-4 py-4 space-y-4 pb-44">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} role={msg.role} content={msg.content}
            tier={msg.tier as "normal" | "see_clinic" | "urgent" | undefined}
            onSos={() => setSosOpen(true)} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={scrollRef} />
      </div>

      {messages.length <= 2 && !isLoading && (
        <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-none fixed bottom-[136px] left-0 right-0">
          {QUICK[chatMode].map((p) => (
            <button key={p} onClick={() => send(p)}
              className="shrink-0 bg-white border border-stone-200 text-stone-600 text-xs px-3 py-2 rounded-xl active:bg-stone-50 whitespace-nowrap">
              {p}
            </button>
          ))}
        </div>
      )}

      <div className="fixed bottom-[72px] left-0 right-0 bg-white border-t border-stone-100 px-4 py-3">
        <div className="flex gap-3 items-end">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input) } }}
            placeholder="Talk to Lami..."
            rows={1}
            className="flex-1 resize-none bg-stone-100 rounded-2xl px-4 py-3 text-sm text-stone-800 placeholder:text-stone-400 outline-none min-h-[48px] max-h-[120px] leading-relaxed"
          />
          <button onClick={() => send(input)} disabled={!input.trim() || isLoading}
            className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all",
              input.trim() && !isLoading ? "bg-forest-600 text-white active:bg-forest-700" : "bg-stone-200 text-stone-400")}
            aria-label="Send">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5"><path d="M4 12 L20 4 L14 20 L11 13 Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="currentColor"/></svg>
          </button>
        </div>
        <p className="text-[10px] text-stone-400 text-center mt-2">Lami gives guidance, not medical advice.</p>
      </div>

      <BottomNav />
    </div>
  )
}
