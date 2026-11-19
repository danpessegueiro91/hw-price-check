#!/usr/bin/env python3
"""Download the verified 2026 TH/STH photos into the site before testing/deploying."""
from __future__ import annotations

import argparse
import hashlib
import json
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "assets/data/hotwheels-images.json"
OUT = ROOT / "assets/hotwheels"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/125.0 Safari/537.36",
    "Referer": "https://www.hwtreasure.com/",
    "Accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
}

def fetch(url: str) -> bytes:
    candidates = [
        url,
        "https://wsrv.nl/?url=" + urllib.parse.quote(url, safe=""),
        "https://images.weserv.nl/?url=" + urllib.parse.quote(url, safe=""),
    ]
    errors = []
    for candidate in candidates:
        try:
            request = urllib.request.Request(candidate, headers=HEADERS)
            with urllib.request.urlopen(request, timeout=30) as response:
                data = response.read()
                content_type = response.headers.get("Content-Type", "")
            if not data or not (data.startswith(b"\xff\xd8\xff") or data.startswith(b"\x89PNG\r\n\x1a\n") or data[:4] == b"RIFF"):
                raise ValueError(f"not an image (Content-Type: {content_type})")
            return data
        except Exception as exc:
            errors.append(f"{candidate}: {exc}")
    raise RuntimeError(" | ".join(errors))

def slug(value: str) -> str:
    value = value.lower().replace("'", "").replace("|", "-")
    value = re.sub(r"[^a-z0-9]+", "-", value).strip("-")
    return value[:72] or hashlib.sha1(value.encode()).hexdigest()[:12]

def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--require-all", action="store_true")
    args = parser.parse_args()
    data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    OUT.mkdir(parents=True, exist_ok=True)
    success, failures = 0, []
    for key, record in data.get("images", {}).items():
        if not record.get("verified") or not record.get("image"):
            failures.append((key, "not verified or missing URL"))
            continue
        parts = key.split("|", 2)
        if len(parts) != 3:
            failures.append((key, "invalid manifest key"))
            continue
        year, kind, name = parts
        filename = f"{year}-{kind}-{slug(name)}.jpg"
        target = OUT / filename
        try:
            if not target.exists() or target.stat().st_size < 1000:
                target.write_bytes(fetch(record["image"]))
            record["image"] = f"/assets/hotwheels/{filename}"
            success += 1
            print(f"OK {key} -> {record['image']}")
        except Exception as exc:
            failures.append((key, str(exc)))
            print(f"FAIL {key}: {exc}", file=sys.stderr)
    data["matchedImages"] = success
    data["pending"] = [key for key, _ in failures]
    MANIFEST.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Downloaded {success}/{len(data.get('images', {}))} photos.")
    if failures and args.require_all:
        return 1
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
