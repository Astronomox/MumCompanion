"""Lami - heart of Mum AI Companion.

Primary: HelpMum MamaBot-Llama via HuggingFace Inference API
Fallback: Groq llama-3.1-8b-instant
"""
import os
import json
import httpx
from groq import AsyncGroq
from core.red_flags import check_red_flags

GROQ_MODEL = "llama-3.1-8b-instant"
MAMABOT_MODEL = "HelpMumHQ/MamaBot-Llama"
HF_API_URL = f"https://api-inference.huggingface.co/models/{MAMABOT_MODEL}/v1/chat/completions"

LAMI_SYSTEM = """You are Lami, a Nigerian woman who is the user's funny best friend and also happens to be a trained nurse and midwife. You are talking to a mother (pregnant or with a new baby) on her phone.

WHO YOU ARE:
- You are warm, funny, and real. You gossip, you tease, you laugh with her. You are her gist partner.
- You talk like a real Lagos friend. Light, natural Nigerian warmth: "ah ah", "nne", "abeg", "no wahala", "I dey hear you", "ehen?", "chai". Never overdo it, never cartoonish.
- You use her name when you know it. You remember her week of pregnancy and her baby.
- You are the friend she texts at 2am. You meet her where she is.

THE SWITCH (most important rule):
- The MOMENT anything medical, risky, or scary comes up, you stop joking and become focused, calm, and clear. Warmth stays, but the silliness drops completely.
- You never make light of symptoms. You never joke about bleeding, pain, the baby movements, or how she feels physically.
- When she is in danger you become her advocate: direct, specific, action-first.

HOW YOU TALK:
- Short messages. Like real texting. Two or three sentences most of the time.
- You ask one question at a time, not a list.
- You never lecture. You never sound like a textbook or a chatbot.
- You give real, specific, useful guidance grounded in maternal health.

YOUR LIMITS:
- You are a companion, not a replacement for her doctor or midwife.
- You never diagnose with false certainty. You never prescribe specific medication doses.
- If she might be in danger, tell her to press the red SOS button or get to a hospital now.

You are the friend every mother deserves. Be her person."""

EMERGENCY_CONTEXT = """
RIGHT NOW THIS IS SERIOUS. Drop all humor. She may be in a medical emergency.
Be calm, brief, and tell her exactly what to do. Tell her to press the red SOS button
to call her emergency contact, or get to a hospital immediately. Short sentences."""


def _build_messages(messages, name, stage, week, baby_name, urgent=False):
    bits = []
    if name and name != "Mama":
        bits.append(f"Her name is {name}.")
    if week:
        bits.append(f"She is {week} weeks pregnant ({stage.replace('_', ' ')}).")
    if baby_name:
        bits.append(f"Her baby is called {baby_name}.")

    system = LAMI_SYSTEM
    if bits:
        system += f"\n\nWHAT YOU KNOW ABOUT HER: {' '.join(bits)}"
    if urgent:
        system += f"\n{EMERGENCY_CONTEXT}"

    built = [{"role": "system", "content": system}]
    for m in messages[-10:]:
        role = m.get("role", "user")
        if role in ("user", "assistant"):
            built.append({"role": role, "content": m.get("content", "")})
    return built


async def _call_mamabot(messages_payload: list, temperature: float) -> str:
    """Call MamaBot-Llama via HuggingFace Inference API."""
    hf_token = os.environ.get("HF_API_TOKEN", "")
    if not hf_token:
        raise ValueError("No HF token")

    payload = {
        "model": MAMABOT_MODEL,
        "messages": messages_payload,
        "max_tokens": 400,
        "temperature": temperature,
        "stream": False,
    }

    async with httpx.AsyncClient(timeout=20.0) as client:
        resp = await client.post(
            HF_API_URL,
            headers={
                "Authorization": f"Bearer {hf_token}",
                "Content-Type": "application/json",
            },
            json=payload,
        )
        resp.raise_for_status()
        data = resp.json()
        return data["choices"][0]["message"]["content"].strip()


async def _call_groq(messages_payload: list, temperature: float) -> str:
    """Call Groq as fallback."""
    api_key = os.environ.get("GROQ_API_KEY", "")
    if not api_key:
        raise ValueError("No Groq key")
    client = AsyncGroq(api_key=api_key)
    resp = await client.chat.completions.create(
        model=GROQ_MODEL,
        messages=messages_payload,
        temperature=temperature,
        max_tokens=400,
    )
    return resp.choices[0].message.content.strip()


async def chat_with_lami(
    messages: list[dict],
    mode: str,
    name: str,
    stage: str,
    week: int,
    baby_name: str,
    latest_message: str,
) -> dict:
    # Red flag check always runs first
    is_urgent, red_flag = check_red_flags(latest_message)
    tier = "urgent" if is_urgent else ("see_clinic" if mode == "symptom" and len(latest_message) > 20 else "normal")
    temperature = 0.4 if is_urgent else 0.85

    built = _build_messages(messages, name, stage, week, baby_name, urgent=is_urgent)

    answer = None

    # Try MamaBot-Llama first
    try:
        answer = await _call_mamabot(built, temperature)
    except Exception as e:
        print(f"MamaBot failed, falling back to Groq: {e}")

    # Fallback to Groq
    if not answer:
        try:
            answer = await _call_groq(built, temperature)
        except Exception as e:
            print(f"Groq also failed: {e}")
            answer = _fallback(is_urgent)

    return {
        "answer": answer,
        "tier": tier,
        "triage_reason": red_flag,
        "red_flag_matched": red_flag,
    }


def _fallback(urgent: bool) -> str:
    if urgent:
        return (
            "I am right here with you. Press the red SOS button now to call your "
            "emergency contact, or get to the nearest hospital. Do not wait."
        )
    return (
        "Ah, my network is doing somehow right now. "
        "Try me again in a second nne."
    )
