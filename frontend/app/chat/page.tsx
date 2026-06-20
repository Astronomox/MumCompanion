"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { ChatBubble, TypingIndicator } from "@/components/chat/ChatBubble"
import { BottomNav } from "@/components/layout/BottomNav"
import { EmergencyOverlay } from "@/components/emergency/EmergencyOverlay"
import { sendChat, type ChatResponse } from "@/lib/api/client"
import { persistMessage, loadChatHistory } from "@/lib/chatPersistence"
import { useAppStore } from "@/lib/store"
import { cn } from "@/lib/utils/cn"

type Mode = "general" | "symptom" | "nutrition"
type Language = "english" | "yoruba" | "igbo" | "hausa"

const LANGUAGES: { value: Language; label: string }[] = [
  { value: "english", label: "English" },
  { value: "yoruba", label: "Yoruba" },
  { value: "igbo", label: "Igbo" },
  { value: "hausa", label: "Hausa" },
]

const MODES: { value: Mode; label: string }[] = [
  { value: "general", label: "Chat" },
  { value: "symptom", label: "Symptoms" },
  { value: "nutrition", label: "Food" },
]

const QUICK: Record<Mode, Record<Language, string[]>> = {
  general: {
    english: ["I am tired today", "Talk to me", "I cannot sleep"],
    yoruba: ["Mo rara loni", "Soro pelu mi", "Mi o le sun"],
    igbo: ["Aru gwuru m taa", "Kọọrọ m", "Enweghi m ura"],
    hausa: ["Ina gajiya yau", "Yi mini magana", "Bana iya barci"],
  },
  symptom: {
    english: ["My back hurts", "My feet are swollen", "I feel dizzy"],
    yoruba: ["Ehin mi n run", "Ese mi wú", "Ori mi n yi"],
    igbo: ["Azụ m na-egbu", "Ụkwụ m fụlitere", "Isi m na-akpa"],
    hausa: ["Bayya na yana ciwo", "Ƙafata sun kumbura", "Kaina na juyawa"],
  },
  nutrition: {
    english: ["What should I eat?", "Is eba okay?", "Cravings are crazy"],
    yoruba: ["Kini mo le je?", "Eba dara bi?", "Ifẹ onje n pa mi"],
    igbo: ["Gini ka m ga-eri?", "Eba ọ dị mma?", "Agụụ na-eme m"],
    hausa: ["Me zan ci?", "Eba ya dace?", "Sha'awar abinci na"],
  },
}

function getGreeting(name: string, mode: Mode, language: Language): string {
  const n = name && name.trim() ? name.trim() : "nne"
  const greetings: Record<Language, Record<Mode, string>> = {
    english: {
      general: `Hey ${n}! Lami here. How are you doing today?`,
      symptom: `Okay ${n}, tell me what is going on with your body.`,
      nutrition: `Let us talk food ${n}. What did you eat, or what are you craving?`,
    },
    yoruba: {
      general: `Pele ${n}! Lami ni mi. Bawo ni o se wa loni?`,
      symptom: `${n}, so fun mi ohun ti n se ara re.`,
      nutrition: `${n}, e je ka soro nipa onje. Kini o je?`,
    },
    igbo: {
      general: `Nnọọ ${n}! Lami bụ aha m. Kedu ka i si dị taa?`,
      symptom: `${n}, gwa m ihe na-eme n'ahụ gị.`,
      nutrition: `${n}, ka anyị kparịta maka nri.`,
    },
    hausa: {
      general: `Sannu ${n}! Lami ce ni. Yaya kike yau?`,
      symptom: `${n}, gaya mini abin da ke faruwa a jikinki.`,
      nutrition: `${n}, bari mu yi magana game da abinci.`,
    },
  }
  return greetings[language][mode]
}

function SendIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function GlobeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.2"/>
      <path d="M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9M12 3c2.5 3 4 5.5 4 9s-1.5 6-4 9M3 12h18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  )
}

export default function ChatPage() {
  const { user, messages, addMessage, chatMode, setChatMode, updateUser } = useAppStore()
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [greeted, setGreeted] = useState(false)
  const [sosOpen, setSosOpen] = useState(false)
  const [language, setLanguage] = useState<Language>(
    (user?.preferredLanguage as Language) || "english"
  )
  const [showLangPicker, setShowLangPicker] = useState(false)
  const [historyLoaded, setHistoryLoaded] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const userName = user?.name?.trim() || ""

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => scrollRef.current?.scrollIntoView({ behavior: "smooth" }))
  }, [])

  useEffect(() => { scrollToBottom() }, [messages, isLoading, scrollToBottom])

  // On mount, if local store has no messages, try loading saved history from Supabase
  useEffect(() => {
    if (historyLoaded) return
    if (messages.length > 0) {
      setHistoryLoaded(true)
      setGreeted(true)
      return
    }
    loadChatHistory().then((history) => {
      if (history.length > 0) {
        history.forEach((m) => addMessage(m))
        setGreeted(true)
      }
      setHistoryLoaded(true)
    })
  }, [historyLoaded, messages.length, addMessage])

  // Greet on first load with proper name + language from store - only after history check completes
  useEffect(() => {
    if (!greeted && historyLoaded && messages.length === 0 && user) {
      const greetingMsg = {
        id: `bot-${Date.now()}`, role: "assistant" as const,
        content: getGreeting(userName, "general", language),
        mode: "general", timestamp: new Date().toISOString(),
      }
      addMessage(greetingMsg)
      persistMessage(greetingMsg)
      setGreeted(true)
    }
  }, [greeted, historyLoaded, messages.length, user, addMessage, language, userName])

  const handleModeChange = (mode: Mode) => {
    setChatMode(mode)
    addMessage({
      id: `sys-${Date.now()}`, role: "assistant",
      content: getGreeting(userName, mode, language),
      mode, timestamp: new Date().toISOString(),
    })
  }

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    setShowLangPicker(false)
    // Persist to store
    updateUser({ preferredLanguage: lang })
    const langLabel = LANGUAGES.find(l => l.value === lang)?.label || lang
    addMessage({
      id: `sys-${Date.now()}`, role: "assistant",
      content: lang === "english"
        ? `Switched to English. ${getGreeting(userName, chatMode, "english")}`
        : `Switched to ${langLabel}. ${getGreeting(userName, chatMode, lang)}`,
      mode: chatMode, timestamp: new Date().toISOString(),
    })
  }

  const send = async (text: string) => {
    if (!text.trim() || isLoading) return
    const userMsg = { id: `u-${Date.now()}`, role: "user" as const, content: text.trim(), mode: chatMode, timestamp: new Date().toISOString() }
    addMessage(userMsg)
    persistMessage(userMsg)
    setInput("")
    setIsLoading(true)
    try {
      const history = messages
        .filter((m) => m.role === "user" || m.role === "assistant")
        .slice(-10)
        .map((m) => ({ role: m.role, content: m.content }))
      history.push({ role: "user", content: text.trim() })

      const res: ChatResponse = await sendChat({
        messages: history,
        mode: chatMode,
        name: userName || "nne",
        stage: user?.stage || "second_trimester",
        week: user?.week || 20,
        baby_name: user?.babyName || "",
        language,
      })
      const botMsg = { id: `bot-${Date.now()}`, role: "assistant" as const, content: res.answer, tier: res.tier, mode: chatMode, timestamp: new Date().toISOString() }
      addMessage(botMsg)
      persistMessage(botMsg)
      if (res.tier === "urgent") setSosOpen(true)
    } catch {
      addMessage({
        id: `err-${Date.now()}`, role: "assistant",
        content: language === "english"
          ? `Ah ${userName || "nne"}, my network just disappointed me. Try me again?`
          : `Lami here. My connection is slow right now. Try again in a moment.`,
        mode: chatMode, timestamp: new Date().toISOString()
      })
    } finally {
      setIsLoading(false)
    }
  }

  const currentLang = LANGUAGES.find(l => l.value === language)!
  const showQuickPrompts = messages.length <= 2 && !isLoading

  return (
    <div className="flex flex-col bg-cream-50" style={{ height: "100dvh" }}>
      <EmergencyOverlay open={sosOpen} onClose={() => setSosOpen(false)} />

      <header className="bg-forest-700 pt-safe z-10 flex-shrink-0 relative">
        <div className="px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-forest-100 flex items-center justify-center flex-shrink-0 ring-2 ring-cream-400/60 shadow-brass">
              <img src="/images/lami-avatar.jpg" alt="Lami" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="font-serif font-semibold text-xl text-cream-50 tracking-wide">Lami</h1>
              <p className="text-[10.5px] text-cream-300 flex items-center gap-1.5 font-medium uppercase tracking-widest mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cream-400" style={{ boxShadow: "0 0 6px rgb(var(--cream-400))" }} />
                here for you
              </p>
            </div>
          </div>

          <button onClick={() => setShowLangPicker((v) => !v)}
            className="flex items-center gap-1.5 bg-white/8 border border-cream-400/30 hover:bg-white/12 px-3.5 py-1.5 rounded-full transition-colors">
            <GlobeIcon className="w-3.5 h-3.5 text-cream-300" />
            <span className="text-xs font-semibold text-cream-200">{currentLang.label}</span>
          </button>
        </div>

        <div className="h-px mx-4" style={{ background: "linear-gradient(90deg, transparent, rgb(var(--cream-400) / 0.5) 30%, rgb(var(--cream-500) / 0.7) 50%, rgb(var(--cream-400) / 0.5) 70%, transparent)" }} />

        {showLangPicker && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowLangPicker(false)} />
            <div className="absolute right-4 top-16 z-50 bg-white border border-stone-200 rounded-2xl shadow-glass overflow-hidden min-w-[160px]">
              {LANGUAGES.map((lang) => (
                <button key={lang.value} onClick={() => handleLanguageChange(lang.value)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors",
                    language === lang.value
                      ? "bg-forest-50 text-forest-700"
                      : "text-stone-700 hover:bg-stone-50"
                  )}>
                  <span>{lang.label}</span>
                  {language === lang.value && (
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 ml-auto text-forest-600">
                      <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </>
        )}

        <div className="flex px-4 pt-3 pb-3.5 gap-2">
          {MODES.map((m) => (
            <button key={m.value} onClick={() => handleModeChange(m.value)}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all",
                chatMode === m.value
                  ? "bg-cream-400 text-forest-900 shadow-brass"
                  : "bg-white/6 border border-white/10 text-cream-300 hover:bg-white/10"
              )}>
              {m.label}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0 chat-bg-pattern"
        style={{ paddingBottom: showQuickPrompts ? "200px" : "150px" }}>
        {messages.map((msg) => (
          <ChatBubble key={msg.id} role={msg.role} content={msg.content}
            tier={msg.tier as "normal" | "see_clinic" | "urgent" | undefined}
            onSos={() => setSosOpen(true)} />
        ))}
        {isLoading && (
          <div className="flex flex-col gap-1">
            <TypingIndicator />
            {language !== "english" && (
              <p className="text-[10px] text-stone-400 ml-12">Translating...</p>
            )}
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="flex-shrink-0 bg-white border-t border-stone-100 z-20">
        {showQuickPrompts && (
          <div className="px-4 pt-3 pb-1 flex gap-2 overflow-x-auto scrollbar-none">
            {QUICK[chatMode][language].map((p) => (
              <button key={p} onClick={() => send(p)}
                className="shrink-0 bg-forest-50 border border-forest-100 text-forest-700 text-xs px-3 py-2 rounded-xl active:bg-forest-100 whitespace-nowrap font-medium">
                {p}
              </button>
            ))}
          </div>
        )}

        <div className="px-4 py-3 pb-safe">
          <div className="flex gap-3 items-end">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input) } }}
              placeholder={
                language === "yoruba" ? "Soro pelu Lami..." :
                language === "igbo" ? "Kọọrọ Lami..." :
                language === "hausa" ? "Yi magana da Lami..." :
                "Talk to Lami..."
              }
              rows={1}
              className="flex-1 resize-none bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 text-sm text-stone-800 placeholder:text-stone-400 outline-none focus:border-cream-400 focus:ring-2 focus:ring-cream-100 min-h-[48px] max-h-[120px] leading-relaxed transition-colors"
            />
            <button onClick={() => send(input)} disabled={!input.trim() || isLoading}
              className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all",
                input.trim() && !isLoading
                  ? "bg-gradient-to-br from-cream-300 to-cream-500 text-forest-900 active:scale-95 shadow-brass"
                  : "bg-stone-200 text-stone-400"
              )}>
              <SendIcon className="w-5 h-5" />
            </button>
          </div>
          <p className="text-[10px] text-stone-400 text-center mt-2">Lami gives guidance, not medical advice.</p>
        </div>

        <div className="h-14" />
      </div>

      <BottomNav />
    </div>
  )
}
