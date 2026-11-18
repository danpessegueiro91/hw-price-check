#!/usr/bin/env python3
"""Discover verified Hot Wheels TH/STH photos from HWtreasure and write a manifest.

Only exact title matches are accepted. The source page must identify the same year
and Treasure Hunt type; uncertain matches are left out for manual review.
"""
from __future__ import annotations
import concurrent.futures, html, json, re, sys, time
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import quote, urljoin
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
CATALOG_JS = ROOT / "assets/js/catalog.js"
OUTPUT = ROOT / "assets/data/hotwheels-images.json"
BASE = "https://www.hwtreasure.com"
HEADERS = {"User-Agent": "HWPriceCheckImageSync/1.0 (+https://github.com/danpessegueiro91/hw-price-check)"}

def get(url: str) -> bytes:
    req = Request(url, headers=HEADERS)
    with urlopen(req, timeout=25) as response:
        return response.read()

def norm(value: str) -> str:
    value = html.unescape(value).lower().replace("&", " and ")
    value = value.replace("’", "'").replace("‘", "'").replace("–", "-")
    value = re.sub(r"[^a-z0-9]+", "", value)
    return value

def catalog_items():
    source = CATALOG_JS.read_text(encoding="utf-8")
    match = re.search(r"const Y\s*=\s*\{(.*?)\n\s*\};", source, re.S)
    if not match:
        raise RuntimeError("Could not locate the yearly catalog object Y in catalog.js")
    items = []
    pattern = re.compile(r'"(\d{4})":\{th:"((?:\\.|[^"])*)"(?:,sth:"((?:\\.|[^"])*)")?\}')
    for year, th, sth in pattern.findall(match.group(1)):
        for kind, names in (("th", th), ("sth", sth)):
            for name in names.split("|") if names else []:
                items.append({"year": year, "kind": kind, "name": name})
    if not items:
        raise RuntimeError("No catalog entries were parsed; refusing to overwrite manifest")
    return items

class MetaParser(HTMLParser):
    def __init__(self):
        super().__init__(); self.meta = {}; self.title = ""; self.in_title = False
        self.text_parts = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "meta":
            key = a.get("property") or a.get("name")
            if key and a.get("content"): self.meta[key.lower()] = a["content"]
        if tag == "title": self.in_title = True
    def handle_endtag(self, tag):
        if tag == "title": self.in_title = False
    def handle_data(self, data):
        if self.in_title: self.title += data
        self.text_parts.append(data)

def search_item(item):
    query = quote(item["name"])
    endpoint = f"{BASE}/wp-json/wp/v2/search?search={query}&per_page=10"
    try:
        results = json.loads(get(endpoint))
    except Exception:
        return None
    wanted = norm(item["name"])
    for result in results:
        title = result.get("title", "")
        if norm(title) != wanted:
            continue
        page_url = result.get("url", "")
        if not page_url.startswith(BASE):
            continue
        try:
            parser = MetaParser(); parser.feed(get(page_url).decode("utf-8", "replace"))
            text = " ".join(parser.text_parts).lower()
            year = item["year"]
            kind_terms = ("super treasure hunt", "super treasure hunts") if item["kind"] == "sth" else ("treasure hunt", "treasure hunts")
            is_super = "super treasure hunt" in text
            if year not in text or not any(term in text for term in kind_terms) or (item["kind"] == "th" and is_super):
                continue
            image = parser.meta.get("og:image") or parser.meta.get("twitter:image")
            if image and image.startswith("https://"):
                return (f'{year}|{item["kind"]}|{item["name"]}', image, page_url)
        except Exception:
            continue
    return None

def main():
    items = catalog_items()
    found = {}
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        futures = [pool.submit(search_item, item) for item in items]
        for future in concurrent.futures.as_completed(futures):
            result = future.result()
            if result:
                key, image, page = result
                found[key] = {"image": image, "source": page, "verified": True}
    previous = {}
    if OUTPUT.exists():
        try: previous = json.loads(OUTPUT.read_text(encoding="utf-8")).get("images", {})
        except Exception: pass
    # Preserve prior verified records when a source is temporarily unavailable.
    previous.update(found)
    expected = len(items)
    report = {
        "schemaVersion": 1,
        "source": "HWtreasure.com",
        "updatedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "catalogModels": expected,
        "matchedImages": len(previous),
        "images": previous,
        "pending": [f'{x["year"]}|{x["kind"]}|{x["name"]}' for x in items
                    if f'{x["year"]}|{x["kind"]}|{x["name"]}' not in previous],
    }
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f'Catalog models: {expected}; verified image records: {len(previous)}; pending: {len(report["pending"])}')
    if not found and not previous:
        raise RuntimeError("No verified images discovered; manifest was not populated")

if __name__ == "__main__":
    main()
