"""HelpMum 9ja Translation Service - Production-ready.

Uses HelpMum's M2M100-based translation models:
- HelpMumHQ/AI-translator-9ja-to-eng  (Yoruba/Igbo/Hausa -> English)
- HelpMumHQ/AI-translator-eng-to-9ja  (English -> Yoruba/Igbo/Hausa)

Handles cold starts, retries, and forwards target language correctly.
"""
import os
import asyncio
import httpx

HF_9JA_TO_ENG = "https://api-inference.huggingface.co/models/HelpMumHQ/AI-translator-9ja-to-eng"
HF_ENG_TO_9JA = "https://api-inference.huggingface.co/models/HelpMumHQ/AI-translator-eng-to-9ja"

LANGUAGE_CODES = {
    "yoruba": "yo",
    "igbo": "ig",
    "hausa": "ha",
    "english": "en",
    "yo": "yo",
    "ig": "ig",
    "ha": "ha",
    "en": "en",
}


def _headers() -> dict:
    token = os.environ.get("HF_API_TOKEN", "")
    return {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }


async def _call_hf(url: str, src: str, tgt: str, text: str) -> str:
    """Call HF Inference API with retries for cold start."""
    payload = {
        "inputs": text,
        "parameters": {
            "src_lang": src,
            "tgt_lang": tgt,
        },
        "options": {
            "wait_for_model": True,
            "use_cache": True,
        }
    }

    max_attempts = 3
    for attempt in range(max_attempts):
        try:
            async with httpx.AsyncClient(timeout=45.0) as client:
                resp = await client.post(url, headers=_headers(), json=payload)

                # Cold start - model is loading
                if resp.status_code == 503:
                    try:
                        body = resp.json()
                        wait = float(body.get("estimated_time", 15.0))
                        print(f"[translator] Cold start, waiting {wait}s")
                        await asyncio.sleep(min(wait, 20))
                        continue
                    except Exception:
                        await asyncio.sleep(10)
                        continue

                if resp.status_code != 200:
                    print(f"[translator] HTTP {resp.status_code}: {resp.text[:200]}")
                    if attempt < max_attempts - 1:
                        await asyncio.sleep(2)
                        continue
                    return text

                data = resp.json()

                # Response is typically [{"translation_text": "..."}]
                if isinstance(data, list) and data:
                    item = data[0]
                    if isinstance(item, dict):
                        if "translation_text" in item:
                            return item["translation_text"].strip()
                        if "generated_text" in item:
                            return item["generated_text"].strip()
                elif isinstance(data, dict):
                    if "translation_text" in data:
                        return data["translation_text"].strip()
                    if "generated_text" in data:
                        return data["generated_text"].strip()

                print(f"[translator] Unexpected response shape: {str(data)[:200]}")
                return text

        except httpx.TimeoutException:
            print(f"[translator] Timeout on attempt {attempt+1}")
            if attempt < max_attempts - 1:
                continue
            return text
        except Exception as e:
            print(f"[translator] Error: {e}")
            if attempt < max_attempts - 1:
                await asyncio.sleep(1)
                continue
            return text

    return text


async def translate_to_english(text: str, source_language: str) -> str:
    """Yoruba/Igbo/Hausa -> English."""
    if not text or not text.strip():
        return text

    src = LANGUAGE_CODES.get(source_language.lower(), "en")
    if src == "en":
        return text

    token = os.environ.get("HF_API_TOKEN", "")
    if not token:
        print("[translator] No HF_API_TOKEN set")
        return text

    result = await _call_hf(HF_9JA_TO_ENG, src, "en", text)
    print(f"[translator] {src}->en: '{text[:50]}' => '{result[:50]}'")
    return result


async def translate_to_9ja(text: str, target_language: str) -> str:
    """English -> Yoruba/Igbo/Hausa."""
    if not text or not text.strip():
        return text

    tgt = LANGUAGE_CODES.get(target_language.lower(), "en")
    if tgt == "en":
        return text

    token = os.environ.get("HF_API_TOKEN", "")
    if not token:
        print("[translator] No HF_API_TOKEN set")
        return text

    result = await _call_hf(HF_ENG_TO_9JA, "en", tgt, text)
    print(f"[translator] en->{tgt}: '{text[:50]}' => '{result[:50]}'")
    return result
