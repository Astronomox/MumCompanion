"""HelpMum 9ja Translation Service.

Uses HelpMum's official open-source translation models:
- HelpMumHQ/AI-translator-9ja-to-eng  (Yoruba/Igbo/Hausa -> English)
- HelpMumHQ/AI-translator-eng-to-9ja  (English -> Yoruba/Igbo/Hausa)

Language codes:
- yo = Yoruba
- ig = Igbo  
- ha = Hausa
- en = English
"""
import os
import httpx

HF_9JA_TO_ENG = "https://api-inference.huggingface.co/models/HelpMumHQ/AI-translator-9ja-to-eng"
HF_ENG_TO_9JA = "https://api-inference.huggingface.co/models/HelpMumHQ/AI-translator-eng-to-9ja"

LANGUAGE_CODES = {
    "yoruba": "yo",
    "igbo": "ig",
    "hausa": "ha",
    "english": "en",
}

LANGUAGE_NAMES = {
    "yo": "Yoruba",
    "ig": "Igbo",
    "ha": "Hausa",
    "en": "English",
}


def _get_headers() -> dict:
    token = os.environ.get("HF_API_TOKEN", "")
    return {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }


async def translate_to_english(text: str, source_language: str) -> str:
    """Translate from Yoruba/Igbo/Hausa to English."""
    lang = LANGUAGE_CODES.get(source_language.lower(), source_language.lower())

    if lang == "en":
        return text

    token = os.environ.get("HF_API_TOKEN", "")
    if not token:
        return text

    try:
        payload = {
            "inputs": text,
            "parameters": {
                "src_lang": lang,
                "tgt_lang": "en",
            }
        }
        async with httpx.AsyncClient(timeout=15.0) as client:
            resp = await client.post(
                HF_9JA_TO_ENG,
                headers=_get_headers(),
                json=payload,
            )
            resp.raise_for_status()
            data = resp.json()

            if isinstance(data, list) and data:
                return data[0].get("translation_text", text)
            return text
    except Exception as e:
        print(f"Translation 9ja->eng failed: {e}")
        return text


async def translate_to_9ja(text: str, target_language: str) -> str:
    """Translate from English to Yoruba/Igbo/Hausa."""
    lang = LANGUAGE_CODES.get(target_language.lower(), target_language.lower())

    if lang == "en":
        return text

    token = os.environ.get("HF_API_TOKEN", "")
    if not token:
        return text

    try:
        payload = {
            "inputs": text,
            "parameters": {
                "src_lang": "en",
                "tgt_lang": lang,
            }
        }
        async with httpx.AsyncClient(timeout=15.0) as client:
            resp = await client.post(
                HF_ENG_TO_9JA,
                headers=_get_headers(),
                json=payload,
            )
            resp.raise_for_status()
            data = resp.json()

            if isinstance(data, list) and data:
                return data[0].get("translation_text", text)
            return text
    except Exception as e:
        print(f"Translation eng->9ja failed: {e}")
        return text
