"""Drug safety checker.

Uses Groq AI to intelligently assess drug safety for pregnancy and breastfeeding.
No hardcoded database - AI handles all drug knowledge.
"""
import os
import json
from groq import AsyncGroq

GROQ_MODEL = "llama-3.1-8b-instant"

DRUG_SYSTEM = """You are a clinical pharmacist specializing in maternal health in Nigeria.
A pregnant or breastfeeding mother is asking about a medication.

You MUST respond with ONLY a valid JSON object, no other text, no markdown, no explanation outside the JSON.

Assess the drug and return exactly this structure:
{
  "drug": "proper name of the drug",
  "pregnancy": "safe" | "caution" | "avoid" | "unknown",
  "breastfeeding": "safe" | "caution" | "avoid" | "unknown",
  "note": "2-3 sentence plain language explanation in warm but clear tone. Mention what the drug is used for, why it is safe/unsafe, and one key piece of advice. Write like a knowledgeable friend, not a textbook.",
  "common_nigerian_names": ["list", "of", "local", "brand", "names", "if", "any"]
}

Pregnancy safety definitions:
- safe: well established safety data, commonly used in pregnancy
- caution: use with care, some risks, only if benefits outweigh risks, doctor supervision needed
- avoid: known harm to fetus or significant risk, should not be used
- unknown: insufficient data, err on side of caution

Be accurate. Be warm. Be specific to Nigerian context where relevant.
Common Nigerian drugs include: Panadol, Flagyl, Ampiclox, Piriton, Septrin, Artesunate, SP, Dexa, Vitamin C, Folic acid, Iron tablets, Omeprazole, Gestid, Buscopan."""


async def check_drug_safety(
    drug_name: str,
    dosage: str = "",
    frequency: str = "",
    with_food: bool = False,
) -> dict:
    api_key = os.environ.get("GROQ_API_KEY", "")
    if not api_key:
        return _error_response(drug_name)

    context_parts = [f"Drug name: {drug_name}"]
    if dosage:
        context_parts.append(f"Dosage: {dosage}")
    if frequency:
        context_parts.append(f"Frequency: {frequency}")
    if with_food:
        context_parts.append("Taken with food: yes")

    user_msg = "\n".join(context_parts)

    try:
        client = AsyncGroq(api_key=api_key)
        resp = await client.chat.completions.create(
            model=GROQ_MODEL,
            messages=[
                {"role": "system", "content": DRUG_SYSTEM},
                {"role": "user", "content": user_msg},
            ],
            temperature=0.1,
            max_tokens=500,
        )
        raw = resp.choices[0].message.content.strip()

        # Strip any markdown fences if present
        if raw.startswith("```"):
            raw = raw.split("```")[1]
            if raw.startswith("json"):
                raw = raw[4:]
        raw = raw.strip()

        data = json.loads(raw)

        return {
            "drug": data.get("drug", drug_name),
            "pregnancy": data.get("pregnancy", "unknown"),
            "breastfeeding": data.get("breastfeeding", "unknown"),
            "note": data.get("note", "Please consult your pharmacist or doctor for guidance on this medication."),
            "user_dosage": dosage,
            "user_frequency": frequency,
            "with_food": with_food,
        }

    except json.JSONDecodeError:
        # Groq returned non-JSON - parse what we can
        return _error_response(drug_name)
    except Exception as e:
        print(f"Drug check error: {e}")
        return _error_response(drug_name)


def _error_response(drug_name: str) -> dict:
    return {
        "drug": drug_name,
        "pregnancy": "unknown",
        "breastfeeding": "unknown",
        "note": "I could not find clear information on this medicine right now. Please speak to your pharmacist or doctor before taking it during pregnancy or while breastfeeding.",
        "user_dosage": "",
        "user_frequency": "",
        "with_food": False,
    }
