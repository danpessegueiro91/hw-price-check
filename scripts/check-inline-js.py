#!/usr/bin/env python3
"""Lightweight pre-deploy checks for HW Price Check."""
from html.parser import HTMLParser
from pathlib import Path
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
if not parser.scripts:
    raise SystemExit("FAIL: no inline JavaScript blocks found")

with tempfile.TemporaryDirectory() as temp:
    for number, source in enumerate(parser.scripts, start=1):
        path = Path(temp) / f"inline-{number}.js"
        path.write_text(source, encoding="utf-8")
        check(["node", "--check", str(path)], f"inline JavaScript block {number}")

check(["node", "--check", str(ROOT / "sw.js")], "service worker JavaScript")
json.loads((ROOT / "manifest.json").read_text(encoding="utf-8"))
print("PASS: manifest.json is valid JSON")
