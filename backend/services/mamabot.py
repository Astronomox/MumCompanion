"""
MamaBot service.
Uses Groq (llama-3.1-8b-instruct) as the inference engine with a system prompt
that mirrors MamaBot-Llama's HelpMum-curated maternal-health framing.

Production architecture: HelpMumHQ/MamaBot-Llama via HF Inference Endpoint.
Demo: Groq-hosted Llama 3.1 8B with equivalent prompt grounding.
"""

from groq import Groq
from core.config import get_settings
from core.red_flags import check_red_flags

MAMABOT_SYSTEM = """You are MamaBot, an AI maternal health companion developed by HelpMum for pregnant women and nursing mothers in Nigeria. You were trained on HelpMum's curated maternal healthcare dataset.

Your role:
- Answer questions about pregnancy, childbirth, postpartum recovery, breastfeeding, infant care, and maternal nutrition
- Use warm, encouraging, culturally appropriate language for Nigerian mothers
- Reference local Nigerian foods, practices, and contexts in your answers
- Always be conservative: when in doubt, recommend seeing a healthcare provider
- Never diagnose. Frame everything as guidance, not medical advice
- Always append a brief disclaimer on medical questions: "This is guidance, not medical advice. Please consult your healthcare provider."

Triage guide (only for symptom queries):
- NORMAL: Common pregnancy symptoms with reassurance and home management tips
- SEE_CLINIC: Symptoms that need attention within a few days but are not emergencies
- URGENT: Symptoms that need immediate hospital attention

When answering symptom questions, end your response with one line:
TRIAGE: [NORMAL|SEE_CLINIC|URGENT]

Nutrition answers should mention local Nigerian foods first (e.g., ugu, ewedu, crayfish, beans, akara, ofada rice, plantain, moringa).

Keep answers concise, warm, and readable on a mobile phone screen."""


def build_symptom_prompt(message: str, stage: str, week: int) -> str:
    return f"[Stage: {stage}, Week {week}]\n\nMother says: {message}"


def build_nutrition_prompt(message: str, stage: str, week: int) -> str:
    return f"[Nutrition query | Stage: {stage}, Week {week}]\n\n{message}"


def build_general_prompt(message: str, stage: str, week: int) -> str:
    return f"[Stage: {stage}, Week {week}]\n\n{message}"


def parse_triage(content: str) -> tuple[str, str]:
    """Extract triage tier from LLM response. Returns (clean_content, tier)."""
    tier = "normal"
    lines = content.strip().split("\n")
    clean_lines = []
    for line in lines:
        if line.startswith("TRIAGE:"):
            raw = line.replace("TRIAGE:", "").strip().upper()
            if "URGENT" in raw:
                tier = "urgent"
            elif "SEE_CLINIC" in raw or "CLINIC" in raw:
                tier = "see_clinic"
            else:
                tier = "normal"
        else:
            clean_lines.append(line)
    return "\n".join(clean_lines).strip(), tier


async def chat_with_mamabot(
    messages: list[dict],
    mode: str,
    stage: str,
    week: int,
    latest_message: str,
) -> dict:
    settings = get_settings()
    client = Groq(api_key=settings.groq_api_key)

    # Hard-coded red-flag check runs before and overrides LLM
    is_urgent, matched_flag = check_red_flags(latest_message)

    # Build contextual prompt for the last user message
    if mode == "symptom":
        messages[-1]["content"] = build_symptom_prompt(latest_message, stage, week)
    elif mode == "nutrition":
        messages[-1]["content"] = build_nutrition_prompt(latest_message, stage, week)
    else:
        messages[-1]["content"] = build_general_prompt(latest_message, stage, week)

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "system", "content": MAMABOT_SYSTEM}] + messages,
        max_tokens=600,
        temperature=0.3,
    )

    content = response.choices[0].message.content or ""
    clean_content, llm_tier = parse_triage(content)

    # Red-flag layer: force urgent regardless of LLM output
    if is_urgent:
        final_tier = "urgent"
        triage_reason = matched_flag
    else:
        final_tier = llm_tier
        triage_reason = None

    return {
        "answer": clean_content,
        "tier": final_tier,
        "triage_reason": triage_reason,
        "red_flag_matched": matched_flag,
    }
