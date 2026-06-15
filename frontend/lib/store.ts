import { create } from "zustand"
import { persist } from "zustand/middleware"

interface UserProfile {
  id: string
  name: string
  stage: string
  week: number
  weeklyBudget: number
  preferredLanguage: string
  dueDate?: string
  babyName?: string
  emergencyName?: string
  emergencyPhone?: string
  hospitalName?: string
  hospitalPhone?: string
}

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  tier?: "normal" | "see_clinic" | "urgent"
  mode: string
  timestamp: string
}

interface AppState {
  user: UserProfile | null
  messages: ChatMessage[]
  chatMode: "general" | "symptom" | "nutrition"
  setUser: (user: UserProfile) => void
  updateUser: (patch: Partial<UserProfile>) => void
  addMessage: (msg: ChatMessage) => void
  clearMessages: () => void
  setChatMode: (mode: "general" | "symptom" | "nutrition") => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      messages: [],
      chatMode: "general",
      setUser: (user) => set({ user }),
      updateUser: (patch) => set((s) => ({ user: s.user ? { ...s.user, ...patch } : null })),
      addMessage: (msg) => set((s) => ({ messages: [...s.messages, msg] })),
      clearMessages: () => set({ messages: [] }),
      setChatMode: (mode) => set({ chatMode: mode }),
    }),
    {
      name: "mum-ai-companion-store",
      partialize: (s) => ({ user: s.user, messages: s.messages.slice(-50) }),
    }
  )
)
