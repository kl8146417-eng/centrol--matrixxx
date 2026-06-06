"""Extract frames from screen recording and send to OpenRouter for analysis.
Uses minimax/minimax-m3 and xiaomi/mimo-v2.5 (both multimodal)."""
import cv2
import base64
import os
import json
import sys
import time
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import requests

ROOT = Path(r"D:\agwnyc website")
VIDEO = ROOT / "Recording 2026-06-06 223845.mp4"
FRAMES_DIR = ROOT / "_frames"
OUTPUT_MD = ROOT / "VIDEO_ANALYSIS.md"

NUM_FRAMES = 50
TARGET_W = 1280
JPEG_Q = 82

api_key = None
for line in (ROOT / ".env").read_text().splitlines():
    if line.startswith("openrouter_key="):
        api_key = line.split("=", 1)[1].strip()
        break
if not api_key:
    sys.exit("No API key")

FRAMES_DIR.mkdir(exist_ok=True)
for old in FRAMES_DIR.glob("frame_*.jpg"):
    old.unlink()

cap = cv2.VideoCapture(str(VIDEO))
fps = cap.get(cv2.CAP_PROP_FPS)
total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
duration = total / fps if fps else 0
W = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
H = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
print(f"Video: {W}x{H} @ {fps:.1f}fps, {duration:.1f}s, {total} frames")

scale = min(1.0, TARGET_W / W)
new_w, new_h = int(W * scale), int(H * scale)
indices = [int(total * i / NUM_FRAMES) for i in range(NUM_FRAMES)]

frames = []
for i, idx in enumerate(indices):
    cap.set(cv2.CAP_PROP_POS_FRAMES, idx)
    ok, fr = cap.read()
    if not ok:
        continue
    if scale < 1.0:
        fr = cv2.resize(fr, (new_w, new_h), interpolation=cv2.INTER_AREA)
    fp = FRAMES_DIR / f"frame_{i:02d}.jpg"
    cv2.imwrite(str(fp), fr, [cv2.IMWRITE_JPEG_QUALITY, JPEG_Q])
    frames.append((idx / fps, fp))
cap.release()

total_kb = sum(fp.stat().st_size for _, fp in frames) / 1024
print(f"Extracted {len(frames)} frames -> {total_kb:.0f}KB total")

PROMPT = (
    "You are an elite front-end engineer and design analyst. The following images are "
    f"{len(frames)} sequential frames sampled across a {duration:.1f}-second screen recording of a "
    "website we want to CLONE pixel-perfect. Examine EVERY frame in extreme detail and produce an "
    "exhaustive, implementation-ready markdown spec. Do not summarize - enumerate.\n\n"
    "REQUIRED SECTIONS (use ## headings, be VERY thorough on every one):\n\n"
    "## 1. Overview\n"
    "What kind of site, brand name, what it does, target users, overall vibe and emotional tone.\n\n"
    "## 2. Page Structure & Section-by-Section Walkthrough\n"
    "Go through the recording chronologically. For each section observed (with timestamps), describe:\n"
    "- Section name and purpose\n"
    "- Layout type (full-bleed, contained, grid columns, flex direction)\n"
    "- Container width, padding, margins\n"
    "- Vertical spacing rhythm\n"
    "- All sub-elements and their arrangement\n\n"
    "## 3. Color Palette (exact hex codes)\n"
    "List EVERY distinct color seen with hex code, role (bg/text/accent/border), and where used. "
    "Include gradients with stops and direction.\n\n"
    "## 4. Typography\n"
    "For each text style: probable font family, weight, size in px AND rem, line-height, "
    "letter-spacing, text-transform, color. Identify display vs body vs UI text. Guess actual font names.\n\n"
    "## 5. Components (every reusable element)\n"
    "Buttons (all variants & states), cards, inputs, accordions, tabs, modals, badges, icons, "
    "carousels, sliders, navigation items, footer elements, marquees. For each: dimensions, "
    "border-radius, shadow, padding, hover state, active state.\n\n"
    "## 6. Animations & Motion (be specific!)\n"
    "Every animation observed. For each: trigger (scroll/hover/load), duration in ms, easing curve, "
    "transform/opacity/color changes, stagger. Include: page load, hero entrance, scroll reveals, "
    "parallax, marquees, hover micro-interactions, button presses, carousel transitions, accordion "
    "open/close, mask reveals, text scrambles, number counters, image hover effects.\n\n"
    "## 7. Interactions & Micro-interactions\n"
    "Cursor behavior (custom cursor?), click feedback, focus rings, form interactions, hover states "
    "on links/buttons/cards, scroll-jacking or smooth-scroll behavior.\n\n"
    "## 8. Imagery, Video & Media\n"
    "Every image/video/illustration: subject, treatment (filter, mask, overlay), aspect ratio, "
    "placement. Note any 3D, WebGL, video backgrounds, lottie animations.\n\n"
    "## 9. Content Inventory (verbatim text)\n"
    "Quote ALL visible text in order: headlines, sub-heads, body copy, button labels, nav items, "
    "stat numbers and labels, captions, footer text, legal. Use exact capitalization.\n\n"
    "## 10. Iconography & Graphic Elements\n"
    "Icon style (line/filled/duotone), stroke width, sizes, any custom graphic marks, logos, "
    "decorative shapes, dividers.\n\n"
    "## 11. Responsive & Breakpoint Hints\n"
    "Any signs of breakpoints, mobile vs desktop behavior, grid collapsing.\n\n"
    "## 12. Likely Tech Stack\n"
    "What was used to build this and why you think so: framework (Next.js, Astro, Webflow, Framer), "
    "animation libs (GSAP, Framer Motion, Lenis for scroll, Locomotive), 3D (Three.js/R3F), "
    "CSS approach (Tailwind, vanilla, modules).\n\n"
    "## 13. Asset List\n"
    "Every asset that would need recreating: logos, hero video, product images, icons.\n\n"
    "## 14. Complete Clone-Build Prompt\n"
    "A single dense prompt (600-1000 words) another AI coding agent can use VERBATIM to build this "
    "clone. Include: tech stack choice, file structure, color tokens with hex, font stack, every "
    "section's HTML/JSX shape, animation timings, exact copy, component specs. Be ruthlessly specific.\n\n"
    "Rules: Reference frame timestamps (e.g. 'at t=12.4s'). Estimate hex codes if uncertain - "
    "give a value, not 'unknown'. Markdown only. No outer code fences."
)

def build_content():
    c = [{"type": "text", "text": PROMPT}]
    for t, fp in frames:
        with open(fp, "rb") as f:
            b64 = base64.b64encode(f.read()).decode()
        c.append({"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{b64}"}})
    return c

headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json",
    "HTTP-Referer": "https://agwnyc.local",
    "X-Title": "AGWNYC Clone Analysis",
}

def call_model(model):
    print(f"\n>>> {model}")
    payload = {
        "model": model,
        "messages": [{"role": "user", "content": build_content()}],
        "max_tokens": 16000,
        "temperature": 0.25,
    }
    start = time.time()
    try:
        r = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers, json=payload, timeout=900,
        )
        elapsed = time.time() - start
        if r.status_code != 200:
            return model, None, f"HTTP {r.status_code}: {r.text[:300]}", elapsed
        data = r.json()
        msg = data.get("choices", [{}])[0].get("message", {})
        text = msg.get("content") or ""
        if isinstance(text, list):
            text = "".join(p.get("text", "") for p in text if isinstance(p, dict))
        if not text.strip():
            return model, None, f"empty: {json.dumps(data)[:300]}", elapsed
        return model, text, None, elapsed
    except Exception as e:
        return model, None, str(e), time.time() - start

MODELS = ["minimax/minimax-m3", "xiaomi/mimo-v2.5"]
results = {}
with ThreadPoolExecutor(max_workers=2) as ex:
    for model, text, err, elapsed in ex.map(call_model, MODELS):
        if text:
            print(f"  OK {model} in {elapsed:.0f}s -> {len(text)} chars")
            results[model] = text
        else:
            print(f"  FAIL {model} in {elapsed:.0f}s -> {err}")
            results[model] = f"_Model failed: {err}_"

# Pick longest as primary, append the other as second opinion
ordered = sorted(results.items(), key=lambda kv: -len(kv[1] or ""))
primary_model, primary_text = ordered[0]
second_model, second_text = ordered[1]

header = (
    "# Video Analysis - Clone Spec\n\n"
    f"**Source:** `{VIDEO.name}`  \n"
    f"**Duration:** {duration:.1f}s  \n"
    f"**Resolution:** {W}x{H}  \n"
    f"**Frames analyzed:** {len(frames)} (sampled evenly across recording)  \n"
    f"**Primary model:** `{primary_model}` via OpenRouter  \n"
    f"**Second-opinion model:** `{second_model}`  \n\n"
    "---\n\n"
    f"# Primary Analysis ({primary_model})\n\n"
)
tail = f"\n\n---\n\n# Second-Opinion Analysis ({second_model})\n\n{second_text}\n"
OUTPUT_MD.write_text(header + primary_text + tail, encoding="utf-8")
print(f"\nWrote {OUTPUT_MD} ({OUTPUT_MD.stat().st_size} bytes)")
