"""
Medication safety checker.
First checks the curated Nigerian drug database.
If the drug is not found, asks Lami (LLM) for a careful, conservative answer.
"""

from groq import Groq
from core.config import get_settings
from data.drug_safety import lookup_drug

DRUG_SYSTEM = """You are Lami, a nurse friend helping a pregnant or breastfeeding Nigerian mother understand if a medication is safe.

Rules:
- Be careful and conservative. When unsure, tell her to confirm with a pharmacist or clinician.
- Give a clear verdict for pregnancy and for breastfeeding: safe, use with caution, or avoid.
- Mention any key warning in plain language.
- Keep it short, warm, and clear. You are her friend who knows medicine.
- Never invent certainty you do not have.

Respond ONLY with valid JSON, no markdown:
{
  "drug": "drug name",
  "pregnancy": "safe|caution|avoid|unknown",
  "breastfeeding": "safe|caution|avoid|unknown",
  "note": "one or two warm, clear sentences"
}"""


async def check_medication(
    drug_name: str,
    dosage: str,
    frequency: str,
    with_food: bool,
) -> dict:
    found = lookup_drug(drug_name)

    if found:
        return {
            "drug": found["key"].title(),
            "pregnancy": found["pregnancy"],
            "breastfeeding": found["breastfeeding"],
            "note": found["note"],
            "user_dosage": dosage,
            "user_frequency": frequency,
            "with_food": with_food,
            "source": "database",
        }

    # Not in DB - ask Lami carefully
    settings = get_settings()
    client = Groq(api_key=settings.groq_api_key)

    prompt = f"Is {drug_name} safe in pregnancy and breastfeeding? She takes {dosage}, {frequency}."
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": DRUG_SYSTEM},
            {"role": "user", "content": prompt},
        ],
        max_tokens=300,
        temperature=0.2,
    )

    import json
    content = (response.choices[0].message.content or "{}").strip()
    if content.startswith("```"):
        lines = content.split("\n")
        content = "\n".join(lines[1:-1] if lines[-1].strip() == "```" else lines[1:])

    try:
        parsed = json.loads(content)
    except Exception:
        parsed = {
            "drug": drug_name.title(),
            "pregnancy": "unknown",
            "breastfeeding": "unknown",
            "note": "I could not confirm this one for sure, nne. Please show it to a pharmacist or your clinician before taking it.",
        }

    parsed.update({
        "user_dosage": dosage,
        "user_frequency": frequency,
        "with_food": with_food,
        "source": "lami",
    })
    return parsed
