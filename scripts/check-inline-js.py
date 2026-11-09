#!/usr/bin/env python3
"""Lightweight pre-deploy checks for HW Price Check."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
import json
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]

class ScriptExtractor(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.in_script = False
        self.external = False
        self.current = []
        self.scripts = []

    def handle_starttag(self, tag, attrs):
        if tag.lower() == "script":
            self.in_script = True
            self.external = any(k.lower() == "src" for k, _ in attrs)
            self.current = []

    def handle_data(self, data):
        if self.in_script and not self.external:
            self.current.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "script" and self.in_script:
            source = "".join(self.current).strip()
            if source:
                self.scripts.append(source)
            self.in_script = False
            self.external = False
            self.current = []

def check(command, label):
    result = subprocess.run(command, cwd=ROOT, text=True, capture_output=True)
    if result.returncode:
        print(result.stdout)
        print(result.stderr)
        raise SystemExit(f"FAIL: {label}")
    print(f"PASS: {label}")

html = (ROOT / "index.html").read_text(encoding="utf-8")
parser = ScriptExtractor()
parser.feed(html)
# Validate every same-origin JavaScript asset referenced by the page.
external_scripts = []
for match in __import__("re").finditer(r'<script\b([^>]*)>', html, __import__("re").I):
    src = __import__("re").search(r'\bsrc=["\']([^"\']+)', match.group(1), __import__("re").I)
    if not src:
        continue
    parsed = urlparse(src.group(1))
    if parsed.scheme or parsed.netloc:
        continue
    asset = (ROOT / parsed.path.lstrip("./")).resolve()
    if ROOT.resolve() not in asset.parents:
        raise SystemExit(f"FAIL: script path escapes repository: {src.group(1)}")
    if not asset.is_file():
        raise SystemExit(f"FAIL: missing JavaScript asset: {src.group(1)}")
    if asset.suffix == ".js":
        external_scripts.append(asset)

if not parser.scripts and not external_scripts:
    raise SystemExit("FAIL: no JavaScript found in index.html")

with tempfile.TemporaryDirectory() as temp:
    for number, source in enumerate(parser.scripts, start=1):
        path = Path(temp) / f"inline-{number}.js"
        path.write_text(source, encoding="utf-8")
        check(["node", "--check", str(path)], f"inline JavaScript block {number}")

for asset in sorted(set(external_scripts)):
    check(["node", "--check", str(asset)], f"external JavaScript asset {asset.relative_to(ROOT)}")

check(["node", "--check", str(ROOT / "sw.js")], "service worker JavaScript")
json.loads((ROOT / "manifest.json").read_text(encoding="utf-8"))
print("PASS: manifest.json is valid JSON")
