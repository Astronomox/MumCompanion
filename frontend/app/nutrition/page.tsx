"use client"

import { useState } from "react"
import { Loader2, Send, Leaf } from "lucide-react"
import { BottomNav } from "@/components/layout/BottomNav"
import { sendChat } from "@/lib/api/client"
import { useAppStore } from "@/lib/store"
import { cn } from "@/lib/utils/cn"

const QUICK_QUESTIONS = [
  "Is eba safe during pregnancy?",
  "Best iron-rich Nigerian foods",
  "Can I eat suya when pregnant?",
  "How much water should I drink?",
  "Foods to avoid in first trimester",
  "Is moringa safe for breastfeeding?",
]

interface NutritionMessage {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function NutritionPage() {
  const { user } = useAppStore()
  const [messages, setMessages] = useState<NutritionMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Ask me anything about food, nutrition, and diet during pregnancy or breastfeeding. I will give you guidance based on Nigerian foods and HelpMum's maternal health knowledge.",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const ask = async (question: string) => {
    if (!question.trim() || loading) return

    const userMsg: NutritionMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: question.trim(),
    }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setLoading(true)

    try {
      const history = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }))

      const res = await sendChat({
        messages: history,
        mode: "nutrition",
        stage: user?.stage || "second_trimester",
        week: user?.week || 20,
      })

      setMessages((prev) => [
        ...prev,
        { id: `b-${Date.now()}`, role: "assistant", content: res.answer },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          content: "Could not reach MamaBot. Please try again.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-dvh bg-cream-50">
      <header className="bg-white border-b border-stone-100 px-4 py-4 pt-safe">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-forest-50 flex items-center justify-center">
            <Leaf className="w-4 h-4 text-forest-500" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg text-stone-800">Nutrition</h1>
            <p className="text-[11px] text-stone-400">Food & diet guidance</p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-36 chat-scroll">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "rounded-3xl px-4 py-3 text-sm leading-relaxed max-w-[85%]",
                msg.role === "user"
                  ? "bg-forest-500 text-white rounded-br-sm"
                  : "bg-white text-stone-800 shadow-card border border-stone-100 rounded-bl-sm"
              )}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-stone-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">MamaBot is thinking...</span>
          </div>
        )}
      </div>

      {/* Quick questions */}
      {messages.length <= 2 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-stone-400 mb-2">Common questions</p>
          <div className="flex flex-wrap gap-2">
            {QUICK_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => ask(q)}
                className="bg-white border border-stone-200 text-stone-600 text-xs px-3 py-2 rounded-xl"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-stone-100 px-4 py-3">
        <div className="flex gap-3 items-end">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && ask(input)}
            placeholder="Ask about any food or nutrient..."
            className="flex-1 bg-stone-100 rounded-2xl px-4 py-3 text-sm text-stone-800 placeholder:text-stone-400 outline-none min-h-[48px]"
          />
          <button
            onClick={() => ask(input)}
            disabled={!input.trim() || loading}
            className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all",
              input.trim() && !loading
                ? "bg-forest-500 text-white"
                : "bg-stone-200 text-stone-400"
            )}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
