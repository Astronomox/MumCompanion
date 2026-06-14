"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Send, Mic } from "lucide-react"
import { ChatBubble, TypingIndicator } from "@/components/chat/ChatBubble"
import { ModeSelector } from "@/components/chat/ModeSelector"
import { BottomNav } from "@/components/layout/BottomNav"
import { sendChat, type ChatResponse } from "@/lib/api/client"
import { useAppStore } from "@/lib/store"
import { cn } from "@/lib/utils/cn"

type Mode = "general" | "symptom" | "nutrition"

const WELCOME = {
  general: "Nne, I am here. How are you feeling today?",
  symptom: "Tell me what symptom you are experiencing. Be as specific as you can -- I am here to help.",
  nutrition: "What would you like to know about food and nutrition during your pregnancy?",
}

const QUICK_PROMPTS: Record<Mode, string[]> = {
  general: ["I feel tired today", "Is this normal?", "I have a question"],
  symptom: ["I have back pain", "My legs are swollen", "I feel nauseous"],
  nutrition: ["What should I eat today?", "Is eba safe in pregnancy?", "Foods rich in iron"],
}

export default function ChatPage() {
  const { user, messages, addMessage, chatMode, setChatMode } = useAppStore()
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [hasGreeted, setHasGreeted] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading, scrollToBottom])

  // Greet on first load
  useEffect(() => {
    if (!hasGreeted && messages.length === 0) {
      addMessage({
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: WELCOME[chatMode],
        mode: chatMode,
        timestamp: new Date().toISOString(),
      })
      setHasGreeted(true)
    }
  }, [hasGreeted, messages.length, chatMode, addMessage])

  const handleModeChange = (mode: Mode) => {
    setChatMode(mode)
    addMessage({
      id: `system-${Date.now()}`,
      role: "assistant",
      content: WELCOME[mode],
      mode,
      timestamp: new Date().toISOString(),
    })
  }

  const send = async (text: string) => {
    if (!text.trim() || isLoading) return

    const userMsg = {
      id: `user-${Date.now()}`,
      role: "user" as const,
      content: text.trim(),
      mode: chatMode,
      timestamp: new Date().toISOString(),
    }
    addMessage(userMsg)
    setInput("")
    setIsLoading(true)

    try {
      // Build message history for API (last 10 turns)
      const history = messages
        .filter((m) => m.role === "user" || m.role === "assistant")
        .slice(-10)
        .map((m) => ({ role: m.role, content: m.content }))

      history.push({ role: "user", content: text.trim() })

      const res: ChatResponse = await sendChat({
        messages: history,
        mode: chatMode,
        stage: user?.stage || "second_trimester",
        week: user?.week || 20,
      })

      addMessage({
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: res.answer,
        tier: res.tier,
        mode: chatMode,
        timestamp: new Date().toISOString(),
      })
    } catch {
      addMessage({
        id: `err-${Date.now()}`,
        role: "assistant",
        content: "I am sorry, I could not reach MamaBot right now. Please check your connection and try again.",
        mode: chatMode,
        timestamp: new Date().toISOString(),
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      send(input)
    }
  }

  return (
    <div className="flex flex-col h-dvh bg-cream-50">
      {/* Header */}
      <header className="bg-white border-b border-stone-100 pt-safe z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-lg text-stone-800">MamaBot</h1>
            <p className="text-[11px] text-stone-400">Powered by HelpMum</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-forest-400 animate-pulse-soft" />
            <span className="text-xs text-stone-500">Online</span>
          </div>
        </div>
        <ModeSelector active={chatMode} onChange={handleModeChange} />
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto chat-scroll px-4 py-4 space-y-4 pb-32">
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            role={msg.role}
            content={msg.content}
            tier={msg.tier as "normal" | "see_clinic" | "urgent" | undefined}
            timestamp={msg.timestamp}
          />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={scrollRef} />
      </div>

      {/* Quick prompts */}
      {messages.length <= 2 && !isLoading && (
        <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-none">
          {QUICK_PROMPTS[chatMode].map((prompt) => (
            <button
              key={prompt}
              onClick={() => send(prompt)}
              className="shrink-0 bg-white border border-stone-200 text-stone-600 text-xs px-3 py-2 rounded-xl active:bg-stone-50 whitespace-nowrap"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-stone-100 px-4 py-3">
        <div className="flex gap-3 items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              chatMode === "symptom"
                ? "Describe what you are feeling..."
                : chatMode === "nutrition"
                ? "Ask about food, diet, nutrients..."
                : "Talk to MamaBot..."
            }
            className="flex-1 resize-none bg-stone-100 rounded-2xl px-4 py-3 text-sm text-stone-800 placeholder:text-stone-400 outline-none min-h-[48px] max-h-[120px] leading-relaxed"
            rows={1}
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim() || isLoading}
            className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all",
              input.trim() && !isLoading
                ? "bg-terracotta-500 text-white active:bg-terracotta-600"
                : "bg-stone-200 text-stone-400"
            )}
            aria-label="Send message"
          >
            <Send className="w-4.5 h-4.5" />
          </button>
        </div>
        <p className="text-[10px] text-stone-400 text-center mt-2">
          MamaBot provides guidance, not medical advice.
        </p>
      </div>

      <BottomNav />
    </div>
  )
}
