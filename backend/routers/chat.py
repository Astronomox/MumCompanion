from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.lami import chat_with_lami

router = APIRouter(prefix="/chat", tags=["chat"])


class MessageIn(BaseModel):
    messages: list[dict]
    mode: str = "general"
    name: str = "Mama"
    stage: str = "second_trimester"
    week: int = 20
    baby_name: str = ""


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

    return await chat_with_lami(
        messages=payload.messages,
        mode=payload.mode,
        name=payload.name,
        stage=payload.stage,
        week=payload.week,
        baby_name=payload.baby_name,
        latest_message=latest,
    )
