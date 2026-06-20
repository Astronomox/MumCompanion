"use client"

import { createClient } from "@/lib/supabase/client"

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  tier?: "normal" | "see_clinic" | "urgent"
  mode: string
  timestamp: string
}

/** Save a single message to Supabase. Fire-and-forget, never blocks UI. */
export async function persistMessage(msg: ChatMessage) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from("messages").insert({
      user_id: user.id,
      role: msg.role,
      content: msg.content,
      tier: msg.tier || null,
      mode: msg.mode,
    })
  } catch (e) {
    console.error("Failed to persist message", e)
  }
}

/** Load chat history from Supabase, most recent 50 messages. */
export async function loadChatHistory(): Promise<ChatMessage[]> {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    const { data, error } = await supabase
      .from("messages")
      .select("id, role, content, tier, mode, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true })
      .limit(50)

    if (error || !data) return []

    return data.map((m) => ({
      id: m.id,
      role: m.role as "user" | "assistant",
      content: m.content,
      tier: m.tier as "normal" | "see_clinic" | "urgent" | undefined,
      mode: m.mode || "general",
      timestamp: m.created_at,
    }))
  } catch (e) {
    console.error("Failed to load chat history", e)
    return []
  }
}
