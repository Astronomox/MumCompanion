from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.mamabot import chat_with_mamabot

router = APIRouter(prefix="/chat", tags=["chat"])


class MessageIn(BaseModel):
    messages: list[dict]
    mode: str = "general"
    stage: str = "second_trimester"
    week: int = 20


class MessageOut(BaseModel):
    answer: str
    tier: str
    triage_reason: str | None = None
    red_flag_matched: str | None = None


@router.post("/", response_model=MessageOut)
async def chat(payload: MessageIn):
    if not payload.messages:
        raise HTTPException(status_code=400, detail="messages cannot be empty")

    latest = payload.messages[-1].get("content", "")
    if not latest:
        raise HTTPException(status_code=400, detail="last message has no content")

    result = await chat_with_mamabot(
        messages=payload.messages,
        mode=payload.mode,
        stage=payload.stage,
        week=payload.week,
        latest_message=latest,
    )
    return result
