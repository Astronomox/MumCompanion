from fastapi import APIRouter
from pydantic import BaseModel
from services.medication import check_drug_safety

router = APIRouter(prefix="/medication", tags=["medication"])


class DrugCheck(BaseModel):
    drug_name: str
    dosage: str = ""
    frequency: str = ""
    with_food: bool = False


@router.post("/check")
async def check(payload: DrugCheck):
    return await check_drug_safety(
        drug_name=payload.drug_name,
        dosage=payload.dosage,
        frequency=payload.frequency,
        with_food=payload.with_food,
    )
