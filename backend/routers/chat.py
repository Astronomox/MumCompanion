from fastapi import APIRouter
from pydantic import BaseModel
from services.lami import chat_with_lami
from services.translator import translate_to_english, translate_to_9ja
from core.red_flags import check_red_flags

router = APIRouter(prefix="/chat", tags=["chat"])


class ChatRequest(BaseModel):
    messages: list[dict]
    mode: str = "general"
    name: str = ""
    stage: str = "second_trimester"
    week: int = 20
    baby_name: str = ""
    language: str = "english"


@router.post("/")
async def chat(req: ChatRequest):
    if not req.messages:
        return {"answer": "Hey nne! Talk to me.", "tier": "normal", "triage_reason": None}

    latest = req.messages[-1].get("content", "")

    # Step 1: if not English, translate incoming message to English first
    english_message = latest
    if req.language.lower() not in ("english", "en"):
        english_message = await translate_to_english(latest, req.language)

    # Step 2: replace last message with English version for processing
    processed_messages = req.messages[:-1] + [{"role": "user", "content": english_message}]

    # Step 3: get Lami's response in English
    result = await chat_with_lami(
        messages=processed_messages,
        mode=req.mode,
        name=req.name,
        stage=req.stage,
        week=req.week,
        baby_name=req.baby_name,
        latest_message=english_message,
    )

    # Step 4: if not English, translate Lami's response back
    answer = result["answer"]
    if req.language.lower() not in ("english", "en"):
        answer = await translate_to_9ja(answer, req.language)
        result["answer"] = answer

    return result
