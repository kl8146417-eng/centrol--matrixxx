# Centrol Matrix: AI UGC & Fashion-Ad Playbook (X + Reddit research, Oct 2026)

Research date: 2026-10-15. Sources: 65 linked tweets with their author threads, 11 X long-form articles plus 14 more that were linked from search results, ~1,000 recent tweets from 13 creators, 9 keyword searches on X (~1,000 tweets), linked prompt docs/tools, and Reddit.
Raw data is in this folder (`raw_*.json`, `tweets_main.txt`, `conv*.txt`, `articles*.txt`, `timelines*.txt`, `searches.txt`, `reddit/`).
**Verbatim long prompts are in `PROMPTS_APPENDIX.md`** (same folder). Every prompt there is credited and linked.

Model names in this file (Seedance 2.5, GPT Image 2.5, Nano Banana 2.1, Omni 1.1 Flash, Kling 4.0, Opus 5.5 and so on) are the versions creators were using in Sep–Oct 2026.

---

## 0. TL;DR: the 12 things that matter most

1. **Start from a real reference, not a blank prompt.** The top operators (@brainextends, @Mho_23, @maverickecom, @DavidRunsAds, @imrollandex) all start from a frame of a real TikTok/IG video. TikTok works better than Pinterest, which "is flooded with AI slop now" (@Mho_23). Have a vision model turn that frame into a long JSON prompt, then generate a *new* person from the description. In @maverickecom's words, "the composition matches and the individual does not".
2. **Describe who is holding the camera, not how "realistic" it should be.** "tell it WHO is holding the camera, WHERE they're sitting and HOW they move… that one sentence is why it doesn't look like AI" (@abxxai). Typing "natural lighting, realistic, handheld camera… that's not a prompt. that's a wish" (@DavidRunsAds).
3. **Use phone-camera language.** For example: front camera ~24–28mm at arm's length, rear-camera mirror selfie, broad phone depth of field (no portrait-mode blur), restrained HDR, subtle shadow noise, AF hunting, exposure breathing, slight crooked framing. **Ban pro lighting**: no ring light, softbox, cinematic grade or rim light.
4. **Build in imperfections.** Visible pores, asymmetric freckles, flyaways, fabric creases, under-eye shadows, a small blemish, lived-in rooms. "the more 'generated' the starting image looks, the worse the video gets" (@brainextends).
5. **Lock identity with sheets.** Make a character sheet (turnaround plus expression panels), a location sheet and a **garment sheet** (ghost-mannequin front/back/macro). Then give every reference a single job, e.g. "@Image2 controls garment silhouette, materials, colors ONLY" (@ivanka_humeniuk, @abxxai).
6. **Garment and label fidelity is make-or-break for apparel.** "the label has to be readable in the reference or the model invents its own text. that's where most people's ads die" (@abxxai). Lock stripe count, collar shape and print placement explicitly.
7. **For video, upload a reference video.** Put a real UGC clip into Seedance 2.5 as Video1. The prompt that works is "replace the girl in VIDEO1 with the girl in IMAGE1. keep the same camera movement and expressions. no text on screen." (@simonecanciello, @0xROAS, @DavidRunsAds).
8. **Audio is the most common AI tell.** "a clean studio voice dropped into a kitchen scene reads as ai instantly" (@maverickecom). Use native Seedance/Omni audio, which matches the room. Or render an ElevenLabs V4 voice as a **black-screen MP4** and feed that as the audio reference for lip-sync (@alexis_aurion).
9. **The script matters more than the model.** Mine reviews for customer language, rebuild ads that are already proven, and run a "judge panel" before you spend credits. "seedance will render a weak script just as beautifully as a strong one" (@beechinour).
10. **Plan on volume and a yield rate.** Expect 60–70% of generations to be usable (@maverickecom). Turn one winner into ~20 variants, changing **one variable at a time** (hook, face, room, format).
11. **Costs have collapsed.** Clips cost about $0–$6 each: Omni 1.1 Flash ≈ $0.38/clip (@DavidRunsAds), Google Flow credits ≈ free (@jasonugc), Seedance 2.5 720p ≈ $2.50–$6 per 8s clip (@beechinour). You sell output and velocity, not tools.
12. **Sell catalog output to apparel brands, not "AI".** The best-documented apparel case is @0xTria's operator. He sold a D2C streetwear label a "virtual model desk": $1,800/mo for 60 posts, $2,900/mo for 100 posts plus 12 loops, and a $750 rush pack of 20 looks in 48h. Real models were kept for hero frames only.

---

## 1. Anti-slop AI image prompting playbook

### 1.1 Rules (synthesized from creators; credit in brackets)

**A. Reference first**
- Pull a real frame from TikTok/IG that already has the look you want: framing, lighting, phone quality, makeup, room, clothes and camera distance (@brainextends). Pinterest is now polluted with AI images, so prefer TikTok (@Mho_23).
- Reverse-engineer it with a vision LLM. Ask: *"analyze this photo and give me a very detailed json prompt that can recreate it, it should be very detailed, really make sure to break down the color grading and all the exact colors in the photo"* (@imrollandex). Paste the JSON into the generator, generate 4 at once and keep the best (@maverickecom).
- Use reference-image prompting on GPT Image 2.5. Raw prompting "is going to look like AI slop". Creators say the "Sunburst" variant is the realism one (@Mho_23). Nano Banana Pro/2.x is cheaper and great with strong references, but it defaults to a greyish grade, so specify the colour grading (@imrollandex, @simonecanciello).
- Alternative (@DavidRunsAds): generate the *character* as a 4-second 9:16 1080p **Seedance 2.5 clip** from the JSON, then pause and grab the best frame. "image models make people look too perfect… video models don't do that."

**B. Camera and capture language (UGC)**
- Name the device and its behaviour, e.g.: `Modern smartphone front-facing camera… wide-angle selfie lens, ~24mm equivalent, f/2.2` and `capture_style: casual arm's-length selfie` (@SDDFounder). For mirror selfies: `Modern smartphone rear main camera photographing a mirror reflection… Broad smartphone depth of field; no artificial subject cutout or portrait-mode background blur… Restrained computational processing without aggressive HDR, beauty filtering, or cinematic grading… Very subtle luminance texture in darker areas` (@brainextends).
- Give the scene a camera operator: "my friend is filming from the back seat" becomes micro-shake, late reactions, AF hunting and exposure shifts (@abxxai).
- Era looks work well for lifestyle: early-2000s point-and-shoot, 1990s direct flash, camcorder, CCD flash (@abxxai, @NanoBanana_labs, @mightyking, @underwoodxie96).

**C. Imperfection and anatomy**
- Skin: "visible pores… fine forehead texture, natural freckling, faint under-eye shadows, a small blemish near the jaw, stray flyaway hairs… vellus hair" (@abxxai). Keep texture non-uniform and pigmentation separate from relief. Avoid waxy smoothing, synthetic pore overlays and over-carved wrinkles (@IamEmily2050).
- Describe expression as observable muscle movement (gaze vector, eyelid aperture, brow tension, lip closure), not mood words (@IamEmily2050).
- Add asymmetry mapping: "left brow sits fractionally lower, right eye opens slightly wider" (@ivanka_humeniuk).
- Fabric: "real fabric creases", "natural tension lines and slight gathering around the waist", "individual rib columns and knit loops readable", "fuzzy knit halo" (@brainextends, @abxxai).
- The environment should be lived-in, "organized but not styled like a retail display" (@brainextends).

**D. Negative / prohibited stack** (combined from @brainextends, @jasonugc, @SDDFounder, @leaf_sanren)
`no ring light, no direct flash (unless intended), no studio softboxes, no colored accent lights, no cinematic rim light, no plastic/waxy skin, no beauty filter, no aggressive HDR, no oversharpened pores, no artificial bokeh / portrait-mode halos, no CGI / 3D render / illustration, no text, captions, watermarks, logos, UI overlays, no extra fingers / fused fingers / extra people, no exaggerated anatomy, no warped stripes/patterns, no duplicated garments.`

**E. Words to avoid for UGC** (my synthesis from comparing the prompts that went viral): "8K masterpiece, ARRI Alexa, Dolby Vision, hyper-realistic, ultra-detailed cinematic" give you the glossy AI look. Keep cinema language for **editorial/studio** shots only, and for UGC describe the phone.

**F. Consistency**
- Lock one face per account or brand persona: "we have watched a creator's sales die the week they swapped avatars" (@maverickecom).
- Split prompts into an **IDENTITY block** that never changes and a **SCENE block** that changes every time (@imrollandex). Keep 3 angle references (front, profile, 3/4) "forever".
- Character sheet: a 2×2 or 6-panel turnaround on a neutral grey cyc with 85mm f/5.6 even softbox light, plus an expression row (neutral / soft smile / excited disbelief / laugh / "I told you") (@abxxai).
- Assign each reference a single job (attribute isolation): identity, wardrobe, environment, product label, first frame (@abxxai, @ivanka_humeniuk, @IamEmily2050).

**G. JSON vs prose**
- JSON helps when *reconstructing* a reference or when you need many locked attributes: wardrobe pieces, jewellery, composition coordinates, negative lists (@brainextends, @jasonugc, @SDDFounder, @xmliisu).
- Use labelled prose blocks (SUBJECT / LOCATION / LIGHTING / OPTICS / MATERIAL / POSITIVE LOCKS) for sheets and videos (@abxxai, @ivanka_humeniuk).
- Have Claude/ChatGPT write the long prompt from your brief plus screenshots. "i didn't write a single prompt myself… i gave Opus one idea plus a few screenshots" (@abxxai). For Seedance, first ask Claude to research the official Seedance prompting docs (@DavidRunsAds).

**H. Model notes (Oct 2026)**

| Job | What creators use |
|---|---|
| Photoreal UGC stills | GPT Image 2.5 (Sunburst) with a reference image; Nano Banana Pro/2/2.1 (cheaper, needs a colour-grade spec); Grok Imagine (@MaxbatIe) |
| Fashion/beauty editorial stills | Seedream 5.0 Pro (@ivanka_humeniuk), Nano Banana 2.1, GPT Image 2.5 |
| Talking UGC video | Seedance 2.5 (consensus best; native audio), Omni 1.1 Flash (cheap/free via Google Flow, follows detailed prompts), Kling 4.0 (Omni Reference up to 15 refs, 30s native, 10 keyframes) |
| Weaker/alt | MiniMax H3 ("lower quality, less premium", @simonecanciello), Veo, Wan, Higgsfield Genjutsu (motion copy from trend clips) |
| Voice | Native Seedance/Omni, ElevenLabs V4, Fish Audio |
| Orchestration | Claude (Opus/Sonnet 5.5) writes sheets, shot lists, prompts; Higgsfield MCP / FAL API / Kie AI MCP to call models |

**I. More anti-slop rules from the long-form articles**
- **Ask for imperfect characters.** "perfect skin is the fastest way to get called out as ai". Run each GPT Image 2.5 prompt 5× and keep the least AI-looking. Delete on sight: "plastic skin, hair without a single stray, eyes slightly too big, a background clean enough to be a showroom, and any light that looks like a ring light" (@sleepclip).
- **Camera specs go last.** Writing "iPhone" in the scene description renders an iPhone into the shot (@sleepclip).
- **Start from an "already holding / already wearing" state.** Asking the model to pick something up produces six fingers or two phones (@sleepclip). Show one hand if possible and avoid complex product manipulation (@Just_sharon7).
- **Fit the word count to the clip length.** "a 40 word line in 7 seconds comes out rushed and a 12 word line leaves your character staring at the lens for 4 seconds". Add a glance away at about 5s. Use one delivery word ("tired") instead of a pile of adjectives (@sleepclip). Write `[pause] [laughs] [looks off camera]` into scripts (@CEO_Vlad).
- **Lock the voice.** Render clip 1, check it, then reuse its audio as the voice reference for every other clip, along with the headshot and fullbody (@sleepclip). Speech-to-speech (your own recorded read mapped onto the AI actor) beats TTS (@adriansolarzz).
- **Anchor the colour grade.** Use a JSON colour grade that mimics "iPhone 15 Pro Max front-facing camera in overcast natural light" (@growthsuck). Specify native room tone ("acoustic reverb of a bathroom mirror selfie").
- **Video structure: hero still, then storyboard, then video.** Cap it at 6 shots, keep the product visible in at least 4, and fix the weak stage instead of writing a longer prompt (@Just_sharon7).
- **Wardrobe styling for UGC.** "dress your ai actors like your target customer dresses on a normal tuesday"; only premium products suit polish (@adriansolarzz). For apparel, the hero garment should look *worn*, not styled.
- **Keep text out of the top and bottom 15%** (TikTok UI). Captions are mandatory (@beamnxw, @adriansolarzz).

### 1.2 Copy-paste templates (apparel)

Replace the `[brackets]`. Sources are credited. Full originals are in `PROMPTS_APPENDIX.md`.

**T0. Base UGC creator, identity lock and video blocks.** Start with @jasonugc's Notion "AI UGC Creator System" prompts (appendix). It has three blocks:
- the selfie prompt: "NOT a model shoot… iPhone front camera, 23mm… natural phone-sensor depth of field (NOT shallow cinema DOF)…"
- the identity-lock prompt: "PRESERVE from Image 1, IDENTITY LOCK… CHANGE, new shot: …"
- the Seedance block, which includes "MAXIMUM SKIN REALISM" and "ANTI-AI REALISM CONSTRAINTS".

For packs and batches, pair it with @brainextends' **CREATOR LOCK / PRODUCT LOCK** skill (`ugc-ultra-system-skill/`). For apparel, set the PRODUCT LOCK `must show:` field to the garment's proof beat: fit on body, fabric close-up, label.

---
**T1. Realistic UGC mirror try-on selfie** (GPT Image 2.5 or Nano Banana Pro/2.1; attach a reference frame plus the client garment photo)

Based on @DanjiTosaka's fitting-room prompt and @brainextends' closet-mirror JSON:
```text
A realistic amateurish mirror selfie of a [age ~25] [woman/man] in a [modern fitting room / small bedroom with a full-length mirror] with neutral white walls and [dark curtains / clothes rail]. They are wearing the [GARMENT from Image 2: exact colour, print, neckline, length, fabric]. Holding a [phone, no case / plain case] in the right hand, pointed at the mirror, phone not covering the face. Relaxed, slightly playful pose, weight on one hip.
Camera: modern smartphone rear main camera photographing a mirror reflection, ~24–28mm look, broad smartphone depth of field, no portrait-mode blur, restrained processing, no aggressive HDR, no beauty filter, subtle noise in shadows.
Light: the room's existing warm-neutral ceiling light plus window spill; no ring light, no studio softbox, no flash.
Realism: natural skin texture with pores and slight asymmetry, flyaway hairs, real fabric creases and tension lines where the garment bends, sharp detail on the [fabric texture / print / hem].
Garment lock: keep the garment's colour, print scale, seams, buttons and length exactly as Image 2. Do not recolour, do not add logos.
Negative: no text, captions, watermarks, UI, no extra fingers, no extra people, no warped mirror geometry, no CGI look. 4:5 vertical.
```

---
**T2. Flat-lay / ghost-mannequin apparel sheet** (GPT Image 2.5 / Seedream 5.0; attach the garment photo)

From @abxxai's "Cloth sheet" and @ivanka_humeniuk's "Outfit Map":
```text
SCENE CONTEXT
A photoreal garment reference sheet of one [garment], ghost-mannequin style, for [an e-commerce PDP / a UGC try-on video].
SUBJECT
[Exact garment description: cut, fabric, colour/stripe order, collar, closures, hem, label position.] 100% matches the reference.
LAYOUT
Three panels: front ghost-mannequin at 47° FOV, back ghost-mannequin at 47° FOV, macro detail at 12° FOV of the [collar / print / weave].
BACKGROUND  Seamless neutral light-grey cyclorama.
LIGHTING  Even soft studio softbox key from the front-upper, gentle raking fill that lifts the [knit/weave] in relief, WB 5500K.
MATERIAL  [Individual rib columns and knit loops readable / twill diagonal visible / slub texture], crisp clean pattern edges.
STYLE  Photoreal editorial e-commerce product photography.
POSITIVE LOCKS  No model, no hanger, no text overlays, no watermark. [Stripe count, widths, collar shape] 100% consistent across all panels.
```
For a styled **overhead flat lay** use @ivanka_humeniuk's shot block: `Wide overhead wardrobe flat lay, every item fully visible on one plane with clean spacing · Bird's-eye at a true 90° angle · Centred editorial grid from accessories at the top to shoes at the bottom, balanced negative space · Deep focus across [leather grain, weave, hardware]`. Then list each item with `description` and `placement`.

---
**T3. On-model lookbook from a garment photo** (Nano Banana 2.1 / GPT Image 2.5 / FLUX.2 multi-reference; attach the character sheet plus the garment sheet)

@0xShukran's lookbook prompt, extended with @ivanka_humeniuk's reference-role syntax:
```text
REFERENCES: Image 1 = model identity ONLY (face, hair, skin, body proportions). Image 2 = garment ONLY (silhouette, fabric, colour, print, hardware).
Use the supplied character references to preserve [Name]'s facial features, hair, apparent age, and proportions. Create a vertical fashion photograph in [a modest apartment hallway / sunlit balcony / old-city lane]. [Name] wears the garment from Image 2 with [straight-leg blue jeans / white sneakers]. One hand rests naturally beside the body. Soft morning light from the left. Eye-level medium-full composition. Keep [the silver earrings] visible. Leave space above the head for a short caption.
Garment must match Image 2 exactly: [print placement, neckline, sleeve length, hem]. Natural fabric drape and creases. Natural skin texture. No text, no watermark.
```
Iterate by editing *only* the clothing while keeping the character, room, lighting and composition. This gives you a 2-look carousel, an outfit-choice video, a Story poll and a detail shot from one session (@0xShukran). For Indian brands, swap in local settings and styling (haveli courtyard, Mumbai local platform, Bengaluru café, wedding mehendi). That substitution is our suggestion; the structure is unchanged.

---
**T4. Street-style candid** (GPT Image 2.5 / Nano Banana; attach a street reference frame)

Condensed from @jasonugc's alley JSON and @NanoBanana_labs' "viral street-style portrait":
```json
{
 "prompt_type": "photorealistic_reference_reconstruction_with_targeted_modifications",
 "objective": "Recreate the supplied outdoor street photo's composition, light and camera feel with a new fictional adult model wearing the garment from Image 2. Ignore all text, buttons, watermarks, UI overlays.",
 "canvas": {"orientation": "portrait", "aspect_ratio": "4:5", "framing": "[full-body walking / close vertical selfie]", "camera_position": "[friend shooting from across the lane at chest height / arm's-length selfie]"},
 "scene": {"location": "[narrow lane in old Jaipur / Bandra street / cobblestone alley]", "time_of_day": "late afternoon", "background": "[weathered wall, parked scooters, shop shutters] slightly out of focus but readable"},
 "wardrobe": {"garment": "[exact description from Image 2]", "fit": "[relaxed/fitted]", "change_instruction": "Keep cut and print identical to Image 2"},
 "lighting": {"type": "natural outdoor daylight", "quality": "soft, even", "effect_on_skin": "warm natural highlights on forehead, cheeks, collarbones"},
 "camera": {"device": "modern smartphone [rear/front] camera", "focal_length_equivalent": "approximately 24-28mm", "depth_of_field": "moderately deep so the street remains recognizable", "processing": "subtle HDR and realistic smartphone sharpening"},
 "photographic_style": {"genre": "candid street-style snapshot", "retouching": "minimal and natural", "desired_result": "looks like a genuine smartphone photo taken by a friend"},
 "negative_prompt": ["studio background","plastic skin","heavy beauty filter","CGI","3D render","warped anatomy","extra fingers","text","logos","watermarks"]
}
```
@jasonugc's version shows the **colorway trick**: `"modify": ["black outer top changed to white", "green earring changed to red"]`. One approved shot then becomes every colourway of a SKU.

---
**T5. Product-in-hand / garment-detail UGC still** (Nano Banana Pro in Gemini)

@imrollandex's method, verbatim steps:
```text
1) ChatGPT (thinking mode) + a Pinterest/TikTok frame: "analyze this photo and give me a very detailed json prompt that can recreate it, it should be very detailed, really make sure to break down the color grading and all the exact colors in the photo"
2) Nano Banana Pro: "using this json as reference, generate the person holding my product [attach product image]"
3) Save the result as the character reference and attach it every time for facial consistency.
```
Also verbatim from @MaxbatIe (Grok Imagine): *"smartphone shot of a ultra realistic made with the back camera of an iPhone, native-looking like a random USA woman who works as a nurse, filmed inside a real hospital room. Woman in her 40s holding a plastic bag of face-mask skincare products, with healthy glass-skin glow."* The persona is specific, the location is real, and the phone is named. For apparel, use something like "native-looking 26-year-old Delhi college student holding the folded [kurta] up to the camera in her hostel room".

---
**T6. Before/after and A-or-B outfit choice** (any image model, then animate)

Built from @0xShukran's outfit-decision format, @maverickecom ("before and after… drives profile visits and product clicks harder than anything else") and @jasonugc's targeted-modification JSON:
```text
Frame A (before): the same [character sheet] model in [plain everyday outfit / garment on hanger], same room, same light, holding the phone, slightly unimpressed expression.
Frame B (after): identical composition, light, pose family and room; ONLY the clothing changes to the garment in Image 2; expression shifts to a pleased half-smile. Keep face, hair, body, background objects pixel-consistent.
On-screen text (added in edit, not generated): "dinner in 20 minutes. choose for me." → "A or B?"
```

---
**T7. Carousel / photo-dump ad** (ChatGPT Images or Nano Banana, one generation producing several panels)

Verbatim, @MissDelulu9:
```text
Ultra-realistic 6-photo collage (3×2 grid) of the same person using client photo for identity only (exact face, facial features, eye color, natural hair color/length/volume/texture). Plain light grey-blue wall background, black thin-strap camisole, minimal jewelry, Canon PowerShot G7X Mark III strong direct flash, hard shadows, sharp focus, natural skin texture, slight film grain. Instagram photo dump aesthetic. Six unique expressions/poses: (1) soft smile, hands on cheeks, (2) wink, big smile, hand in hair, (3) eyes closed, tongue slightly out, both hands lifting hair, (4) confident side glance, hand under chin, (5) laughing, looking away, hair flipped, (6) dreamy look, hand touching hair. Different hair positions in every frame. No AI look, no distorted hands, no extra fingers. --ar 3:4
```
Swap the camisole for the client garment. @hellorob's trick is to generate 4 images in one prompt, which "cuts the cost of Nano Banana Pro by 4x", then crop. @minchoi does a 4×4 grid in ChatGPT Images and crops 2×2s. For a "shop the look" carousel use @IamEmily2050's **Wardrobe Deconstruction / Style Profile** collage (full in appendix): a central full-body subject, each garment as a separate product shot, fabric close-ups and labels.

---
**T8. Studio editorial / campaign still** (Seedream 5.0 Pro or Nano Banana 2.1)

From @ivanka_humeniuk's character map (excerpt, verbatim):
```text
MEDIUM: stock: 35mm fashion photograph on Kodak Ektachrome 100 · artifact: fine uniform film grain, restrained highlight halation
LIGHT: key: large diffused 5200K source from front-upper-left, soft-edged · fill: broad frontal bounce at 2:1, preserving facial volume · rim: gentle cool edge along the hair and shoulders · integration: natural catchlights in both eyes, pore-level skin specular, soft ground contact
LOOK: authenticity: 85mm at f/5.6, natural facial compression, undistorted body proportions, face and complete outfit clearly resolved
SCENE: backdrop: light cool-grey #DDE0E3 seamless ground with soft contact shadow beneath the full-body figure
CONSISTENCY_LOCK: [same person, identical facial geometry, micro-asymmetry, body proportions, wardrobe, skin tone, light, film stock and colour treatment]
```
Run your editorial prompts through @IamEmily2050's **HUMAN PORTRAIT DIRECTOR** system prompt (appendix). It pushes 85mm, focus on the nearest eye, one dominant key light, realistic fabric weave/drape, and no orange/teal grading.

---
**T9. Competitor-ad remix (static)** (Nano Banana Pro). Verbatim, @VibeMarketer_:
```text
Recreate this ad concept using my product instead of theirs. Keep the same mood, lighting, composition, and overall vibe. Remove all competitor branding.
Replace the product with the one from my uploaded image and adapt all background elements, props, and surrounding textures to be visually relevant to my product's brand, flavor profile, and aesthetic — not the original brand's. Maintain photorealism and accurate product proportions.
```
(For apparel, change "flavor profile" to "fabric, colour story and customer".)

---
**T10. Video A: UGC try-on haul, 30s** (Seedance 2.5). This is the single most apparel-relevant prompt found (@abxxai, full in appendix).
Inputs: (1) character sheet, (2) location sheet, (3) brand label macro, (4) first-frame selfie, (5) ghost-mannequin garment sheet. Key structure:
```text
ACTIVE REFERENCES: @Image1 CHARACTER … @Image2 ENVIRONMENT … @Image3 BRAND LABEL, LABEL ONLY … @Image4 FIRST FRAME … @Image5 GARMENT. Each "100% matches the reference."
FORMAT MODE: Timed multishot, exactly ONE HARD CUT at 0:20 … Instant cut, no dissolve, no whip, no morph.
OPTICS: Smartphone footage, 9:16. Selfie beats: front camera at 84° FOV … nose a touch larger from the short distance, exactly like a real front camera … slight rolling-shutter skew and motion blur on the fast swings.
CAMERA: gentle arm sway, small wrist tremor, micro-bob on stressed words, horizon tilting 2 to 3 degrees … auto-exposure breathing … Autofocus … hunts and softens when the label comes close to the lens, overshoots into blur, then snaps crisp onto the wordmark.
ACTION: 0:00–0:05 hook expression by expression … 0:05–0:08 clips phone onto tripod … 0:08–0:13 shows the garment front/back, touches the lapel … label to lens … changes … outfit check … lifts phone for close selfie CTA.
VOICE: quiet breaths before phrases … light natural vocal fry … never announcer-like, no ad-read cadence.
POSITIVE LOCKS: garment keeps the stripe order, collar, cut … label straight, sharp, fully legible … stays covered in every frame … five fingers … no on-screen text.
```
⚠️ The original uses a real high-street brand's label. Only ever use the **client's own** label and products.

**T10b. Video B: product-only fashion commercial, 15s** (GPT Image 2.5 board, then Seedance 2.5; @HeyAbhishek, full in appendix). First generate a 16:9 **product sheet plus a 15-frame storyboard** with CAMERA/SOUND/MOTION notes per frame. Then: *"Create a 15-second premium cinematic fashion product commercial… using the storyboard and product sheet as the visual reference… product-only with no human model… slow push-ins, locked beauty shots, macro glides… Do not introduce humans, extra garments, … warped check patterns, duplicate shirts."* This is the safest option for brands that don't want AI people.

**T10c. Video C: reference-video swap** (Seedance 2.5). Verbatim (@0xROAS): *"Reference Image1 for the character only. Replace the old man in Video1 with the character in Image1, make sure to keep everything else the same. also make sure the color grading is correct and matches the original video."* Only use a reference video you have rights to (your own shoot, a licensed stock clip, or the brand's past UGC with usage rights).

**T10d. Video D: simple talking-head UGC** (Omni 1.1 Flash or Seedance 2.5). Verbatim (@jasonugc):
*image:* `recreate this image 1:1, ignore any text or buttons on screen. keep the same light makeup but a natural face, no objects in her hands, arms relaxed at her sides.`
*video:* `persuasive UGC creator, expressive gestures, says exactly: {your script}. casual unpolished single-take phone video, full eye contact, start frame matches the reference exactly, no objects, no cuts, no music.`
Timestamped variant (@beechinour): `subject: the woman from the reference frame, same hair, same hoodie, same car / camera: handheld front camera selfie perspective, chest-up framing, natural micro shakes, 9:16 / audio: clear phone-mic voice with light room tone, no background music / 00:00-00:03 … [hook] / 00:03-00:12 natural blinks, small head movements, one pause mid-thought: [body] / 00:12-00:15 slight smile, closing line straight to lens: [cta] / keep the skin texture, no beauty-filter look, lips synced, 15 seconds`.

**T11. Seamless product-page loop / cinemagraph** (any video model). @IamEmily2050's "Virtual Loop Architect" system prompt (appendix): `[Visual Scene] :: [Anchor: tripod, locked-off, static light] :: [Oscillator: subtle wind movement, breathing, fabric sway] :: [Container: no objects exiting frame] :: [Specs: First Frame Matches Last Frame, cinemagraph; negative: camera pan, zoom, morphing, cuts]`. This suits fabric-in-breeze hero loops on Shopify PDPs.

---

## 2. AI UGC video pipeline (as creators run it)

### 2.1 Consensus pipeline
1. **Research winners.** Use Meta Ad Library (ads live 60+ days), TikTok/TikTok Shop leaderboards, darkugc.com (format database) and competitor organic posts (@CEO_Vlad, @maverickecom, @twoclipping, @jasonugc).
2. **Script.** Write from proof, not a blank page:
   - *Review-mining prompt* (verbatim, @maverickecom): "here are real customer reviews for [product]. find the top 5 problems customers mention most, in their own words. give me the exact phrases they use. then write 10 hook lines, each under 12 words, that call out one of those problems in the first 2 seconds. no marketing words. write like a real person who just discovered this."
   - *Transcript rebuild* (verbatim): "take this csv of transcripts, analyze the video structure, every unique pain point and angle, then analyze the product listing… and rewrite each transcript for this product, keeping each hook, pain point, and cta the same, adjusted to fit."
   - Ban "game-changing, revolutionary, must-have, unlock" (@maverickecom). Use Claude for dialogue. Have a **judge panel** of Claude skills (pacing, vocab, ideas, structure), with at least one judge trained on a real creator's transcripts (@beechinour). Write in stumbles (@CEO_Vlad's "Written-In Stumbles").
3. **Avatar/character.** Reference screenshot, then JSON, then generate 4 and pick 1. Build the character sheet and lock it forever. Match age and room to the buyer, not to your taste (@maverickecom, @CEO_Vlad).
4. **First frame** in GPT Image 2.5 or Nano Banana (T1/T3/T4).
5. **Video.** Use Seedance 2.5 / Omni 1.1 Flash / Kling 4.0 with the first frame, the reference video and a timestamped beat prompt. Keep each clip 4–15s and chain clips using the last frame ("extend this video and make her say this…", @eptwts). 9:16, 720p first, upscale only the keepers.
6. **Voice.** Use native audio, or ElevenLabs V4 rendered as a black-screen MP4 for lip-sync (@alexis_aurion). To keep a voice consistent across clips, take the mp3 from clip 1 and use it as the reference (@maverickecom).
7. **Edit like real footage** in CapCut. Cut dead air, add native captions and reply-to-comment overlays (@CEO_Vlad), add real product B-roll, and speed it up slightly (@mikefutia). "real footage plus ai commentary beats pure ai" (@maverickecom).
8. **Vary and test.** One winner becomes 20 ads, one variable at a time. Run a campaign per format, broad targeting, ~$20/day per creative, 3-day window, kill on CTR/hold rate (@CEO_Vlad). Read metrics in this order: hook retention, then watch-through, then sales (@maverickecom).
9. **Automate only after the manual flow works.** "automating a broken flow just makes slop faster" (@beechinour). Claude skills / Claude Code plus Higgsfield MCP or FAL API (@mikefutia, @Mho_23, @EXM7777's Obsidian "LLM wiki" of scraped ads).

### 2.2 Costs quoted (Sep–Oct 2026)

| Item | Cost | Source |
|---|---|---|
| Omni 1.1 Flash clip | ~$0.38 (< $0.50) | @DavidRunsAds |
| Google Flow route | "full video = 45 credits (three 10s clips)", 1,000 credits/mo + 50/day free; upscale ≈ $1 | @jasonugc (⚠️ he buys a resold Google AI Pro account on z2u/g2g; that's grey-market and against ToS, so don't copy it) |
| Seedance 2.5 on Dreamina | 720p 8s ≈ 296 credits ≈ $3.50 on the $19 plan; $2.50–$6/clip across platforms | @beechinour |
| Full AI UGC ad | "< $1.20 an ad, < 15 minutes" | @twoclipping |
| AI car-detailing ad | 18 min, $0.80 compute | @sammgrowth |
| Arcads | ~$11/video | @mikefutia |
| Human UGC creator | $150–$300 (low end), $300–500, $500–1,500/video; retainer $180–200/video + usage + product | @mikefutia, @twoclipping, @maverickecom |
| Opus 5.5 launch film | $26.77 of Claude usage for 5 clips vs ~$5,000 studio | @socialwithaayan |
| Monthly tool stack for an apparel retainer | $40–$80 tools for 60 posts | @0xTria |

### 2.3 Specific workflows worth copying
- **@abxxai "director" method.** Claude Opus/Sonnet 5.5 gets one idea plus style screenshots and writes the character sheet, start frames, camera moves, dialogue timing and sound. GPT Image 2.5 makes the stills and Seedance 2.5 makes the video.
- **@DavidRunsAds street interview.** Character image + a real street-interview video (Video1) + a prompt written by Claude after it has read the Seedance docs.
- **@minchoi memory reel.** ChatGPT Images 4×4 grid ("candid nostalgic photos shot with iphone… Lots of camera shake, amateur framing") → crop → Seedance 2.0 at 12–15s per clip with an identical style prompt → Suno music → CapCut. This works for lifestyle "brand mood" reels.
- **@simonecanciello character format** (an AI character used by a clothing brand, 100M+ views). Your photo plus a frame from the viral video go into Nano Banana Pro as "character asset in PSX style". Then build an environment asset, then Seedance 2.5 with Video1 + Image1 + Image2. A recognizable stylized character that "spits facts" about the niche gives a repeatable brand-mascot format for streetwear.
- **@0xTria virtual model desk.** Lock one face, body type and lighting pack. For each SKU feed the flat-lay/mannequin shot and generate 8–12 outfit posts in an afternoon: same model, new piece, micro-reactions, phone-in-hand framing.

---

## 3. Ad creative frameworks that convert (apparel lens)

### 3.1 Formats creators say are working
- **Native "doesn't look like an ad" clips.** Dancing out of a doorway with a dark-joke caption, a drama storytime told over food, a "WTF did I just find" discovery. The product appears once (@jasonugc's breakdowns of 12–38M-view posts).
- **@CEO_Vlad's 7 formats.** Talking head (20–40s, test 20 hooks on one body), two-person podcast (skeptic vs expert), story animation, claymation, chalkboard explainer, brick/LEGO animation, and **in-car rant** with a reply-to-comment overlay. Run the same script through several formats and let CTR pick.
- **@maverickecom.** Exposé comparison vs a mainstream competitor (that drove about half of one brand's $1M month), two-person podcast ("everyone will eavesdrop on a conversation"), animation, reaction to real footage, and **before/after**. "when a format fatigues, change the format, not just the hook."
- **Drama / song ads** (@0xROAS, @mikefutia, @Ecombos_Ai): an aggressive hook, a plot twist and a payoff, with the product inside the story. ⚠️ @0xROAS openly recommends rage-bait themes like "cheating husband". Don't use those for brand-safe apparel clients.
- **Outfit-choice "A or B?"**, ordinary-moment-with-editorial-twist ("dressed for dinner. going to buy toothpaste.") and mini-stories (@0xShukran).
- **"Fashion test" street walk.** One character sheet, the outfit, a real street, captioned like a shoot (@k4zxbt). **Seasonal lookbook as video**, e.g. the pumpkin-patch clip "looks exactly like an autumn lookbook from a clothing brand" (@sayonaracash, 4.6M views).
- **Tier list / ranking** (@rossark0): rank 4–8 items on camera with the client's in the top tier mid-video; it gets the comments arguing. **Wise stranger** (@rossark0): one honest line about the niche over a night city walk, brand name only in the caption.
- **5-second loop** (@KCodes7777): shock face, then the product in action, then the result, then end. It loops and gets rewatched; pin a comment with the name.
- **Problem-stacking "Trigger ad"** with visual illustration (@SarahLevinger).
- **Slideshows** (@brainextends): a 2-slide TikTok slideshow with AI visuals and notification-style copy took an app from $1k to $5k MRR. They're cheap to make 50 versions of.

### 3.2 Hooks (data from @twoclipping / darkugc top-viewed app UGC; adapt to fashion)
1. "POV: ___" (180M views) → "POV: you finally found a kurta that doesn't need altering"
2. "WHAT is my husband's ___ 😭" (148M)
3. "why is ___ so hard 😭" (135M) → "why is finding linen pants that aren't see-through so hard 😭"
4. "___ years of ___ and I JUST found this??" (65M)
5. "how do you say ___ in ___?" (63M)
6. "my bf tried to surprise me but he forgot ___" (46M)
7. "you're telling me ___??" (42M)

Also: comment-reply overlays, "I'm in actual shock…" (@KCodes7777) and therapist/expert-recommendation framing (@jasonugc). @xElenaYangx warns that baiting hooks ("F me if I'm wrong") get engagement but there are "1000 other hooks that are more non-baiting".

### 3.3 Apparel-specific angles (our synthesis from the formats above)
Fit/size anxiety (same piece on 3 body types), fabric proof (macro plus a stretch/wash test), "3 ways to style one piece", occasion (office → dinner; Indian wedding/festive season), GRWM, try-on haul with label-to-lens, price reveal / "dupe", outfit A/B poll, colourway carousel (T4 recolor trick), real-footage + AI hybrid (brand's real product B-roll with AI creator commentary).

### 3.4 Distribution tips
- Post the same video 4 times on IG: trial reel, regular reel, shortened with new audio as a trial, then regular again (@eglitisX).
- Cross-post to every platform from day one, because others will repost your content anyway (@twoclipping).
- Close with a comment keyword and deliver the link by DM, with a force-follow first (@maverickecom).
- Write the post around the payoff and put the link in the first reply (@socialwithaayan).

---

## 4. What the List B tweets are about (one line each)

⭐ = useful for the Centrol Matrix website or for selling services.

| Tweet | Gist | Tools / links |
|---|---|---|
| ⭐ @twoclipping 2110329502676951367 | Prompt to make a 14.5s **3D fly-over video of your landing page**, made in code. Claude captures the page with Playwright, builds a WebGL2 film with seek(t), depth of field and lifted cards, then renders an MP4. Full prompt in appendix | Claude Code, Playwright, WebGL2, ffmpeg, Geist + Instrument Serif |
| ⭐ @illyism 2110180038637408357 | Open-sourced SEO + AEO system prompt/skills for Claude Code/Cursor: tech-SEO audit, SERP reverse-engineering, comparison pages, checks what ChatGPT/Perplexity cite | github.com/Illyism/seo-skills |
| ⭐ @beamnxw 2109722135291744578 | "Opus 5.5 motion design studio": brief → frame timeline → preview → scoped edit → render → reuse. Sell a 20s launch clip. Has the Apple-keynote launch-film prompt (by @twoclipping) | Claude Code, Remotion (article), Mixkit, Pexels, Playwright |
| ⭐ @socialwithaayan 2105271130215064056 | 10 GitHub repos from "Opus 5.5 week" (motion graphics to games); article: the 5-file launch-video studio (Rules / Look / Kit / Scenes / Clock), $26.77 vs $5k | PDoomVideo, awesome-opus5-5-videos, lemo-opuscar, shipvideo, motion-graphics-music-video-skill, opus-video-skills, whatships.com, Mixkit, Remotion, HyperFrames |
| ⭐ @RoundtableSpace 2105209785335373948 | "Only prompt you need" for motion graphics with Opus 5.5: study refs frame-by-frame, storyboard, GSAP + Three.js scenes, critic loop | github.com/echris6/motion-video-kit |
| ⭐ @vasuman 2102775594161434965 | "Open the article, paste into Claude Code, win": points to @EXM7777's *How to automate SEO with Opus 5.5* (find the money page, 4-pass audit, weekly loop) | Search Console, DataForSEO, Firecrawl, Parallel, PostHog, Ahrefs, Viktor (sponsor) |
| @brainextends 2108628141401071690 | Omni 1.1 Flash makes AI UGC for $0; free workflow; pitches the AffiliateNetwork creator network | ultraugcsystem.pages.dev, affiliatenetwork.com |
| ⭐ @DavidRunsAds 2107947730752401505 | Upload a real UGC **reference video** to Seedance 2.5 as Video1 for the biggest realism jump | Seedance 2.5; paid whop |
| @jail0r1 2107677555499344378 | An artist's short video with sound design built from earlier "concept frames/shots" (visual inspiration, no workflow given) | — |
| @BusDownBonnor 2107506688186286423 | Stompers app hit #1 in the App Store from one viral TikTok; the rest of the account's posts in the same format got < 1k views (virality is lumpy) | TikTok |
| @jasonugc 2107468373986586933 | Breakdown: a 9s "dancing out of a doorway" dark-joke clip (19.9M views) for the Flo app; "doesn't look like an ad" | darkugc.com |
| @xElenaYangx 2105770699604512943 | Critique of crude baiting UGC hooks; non-bait hooks also work | — |
| @eglitisX 2105197263681470629 | IG hack: post the same video 4× (trial / regular / shortened trial / regular) | Instagram trial reels |
| @rossark0 2105100751156474185 | App-promo formats: "wise stranger" night walk and "app tier list" | TikTok |
| @jasonugc 2104983708478370263 | A full AI UGC video for ~$0 via Google Flow credits (3×10s clips = 45 credits) | Google Flow/Omni; free workflow at ai-ugc-clone-system.netlify.app |
| ⭐ @amritwt 2103828468106674428 | Full prompt for a subscribe-page demo video: pasted @leomeethewoo's "Apple framework" plus @rexan_wong's workflow into Opus 5.5 (brand rules, one shot = one idea, BPM guide, sound design) | HyperFrames / Remotion, 21st.dev, whatships.com |
| ⭐ @rexan_wong 2103707054108299437 | The 6-step workflow behind "one prompt" Opus motion videos: reference videos, install HyperFrames/Remotion, 21st.dev components, brand + screenshots + ref, 3 storyboards, stills before animation, director notes | whatships.com, HyperFrames, Remotion, 21st.dev |
| @0xShukran 2102034550524203097 | AI "girl" thirst-content monetization story ($8,400). His linked article on building virtual creators has a good **outfit-choice content system**, but the main post's tactic is deceptive, so avoid it | — |
| @alexolim_ 2101188865394418165 | 5-step structure for college-app viral videos: familiar format, product dropped in fast, no screen-recording walkthroughs | — |
| @adriamatz 2100526288008016269 | Tested a 10-minute TikTok account warm-up (@guillemcraft): sign up, train the feed, post | — |
| @virgilerietsch 2099377866261631392 | "Launch videos are now table stakes on X"; quoting a launch-video service | unfair.so/lore |
| ⭐ @MeganeJon 2099061297321246827 | The tool behind an AI brand's texture/visual identity: add logo + mockups, apply ready-made effects, export as image or video | **unicorn.studio** (WebGL/shader effects; good for our site hero) |
| @SarahLevinger 2097727362737602996 | An organic IG direct-response "Trigger ad" (2.2M views from a 14.5k account) using visual illustration and problem stacking | — |
| @ivanfioravanti 2097320782615781837 | DeepSeek v4.1 flash speed test (~350 tok/s); not relevant | — |
| @CEO_Vlad 2085796081174983024 | "7 AI UGC formats behind $6M months": talking head, podcast, Zach-D animation, claymation, chalkboard, brick, in-car | infiniteugc.com (affiliate) |
| @maverickecom 2085733537299231067 | AI organic video example plus the AI-affiliate article (faceless AI pages, 150–220% commissions, Amazon rank strategy, scripts, avatars, voice, DM funnel) | Arcads, Gemini Omni Flow, Claude |
| @theriac33 2082622694160544099 | Productivity/dopamine article; not relevant | — |
| @KCodes7777 2073083713856884953 | 5-second loop format (shock face → app in action → result), pin the app name in a comment | — |
| ⭐ @Oluwaphilemon1 2062432083436286414 | Motion design with Claude + Higgsfield MCP (idea → storyboard → render). Quoted: a 16-min tutorial on **Gemini 3.1 + Seedance 2.0 cinematic "$10k websites"** | Higgsfield MCP |
| @ErnestoSOFTWARE 2043012401784652120 | "GPT search method" video: search a question your product answers, then show the product (321K views) | — |
| @spwfeijen 2037893037645279713 | Nano Banana 2: one product photo → "agency-level ads" in 2 minutes plus a custom GPT pipeline (comment-to-DM lead magnet) | Nano Banana 2 |

---

## 5. Cold outreach to clothing brands

### 5.1 What X creators and agency operators say works

**Who to target**
- **Small labels under 5K followers that only have flat-lay or hanger shots and no model photos.** "a linen brand [found on Pinterest] with flat product shots and no model photos. I sent one free on-model frame. She asked for the full ten-SKU batch the same day." (@0xTria, *$68/Month in AI Tools…*)
- **Shopify/D2C brands doing roughly $100K–$2M a year that already run Meta ads and have creative fatigue.** They need "20 fresh hooks per month" (@beamnxw).
- **Listings whose content "fails to show installation, movement, fit, use, or the final result."** For apparel that means no on-body fit, no movement and no fabric close-up (@AmirMushich).
- **Brands that burn creative every 2–3 weeks.** Check Meta Ad Library for brands running 30+ variants. Fitness apparel already pays creators $600–1,500 per video (@DeRonin_).
- **Pick one niche and say so.** Say "we make on-model catalog and UGC ads for Indian D2C ethnic-wear brands", not "we make AI UGC". A niched prompt library cuts revision cost from about $2k to about $200 per client (@DeRonin_).

**Lead with finished work, not a pitch**
- **Free private sample:** one on-model frame from their own flat-lay, or a 15s spec ad of one SKU. Keep it private or watermarked. "don't publish the seller's assets without permission" (@AmirMushich). "I sent finished work first. Then I named the price." (@0xTria).
- **Loom audit:** look at their ads in Meta Ad Library, then record a 2-minute screen share. Script: *"Your current creatives look like ads. Here are three UGC concepts that convert better. I'll produce five free videos. If they perform, we talk retainer."* (@beamnxw)
- **Preview link:** build a draft page or site with their real products and send the live link in line one (@rimtoln). His DM template, verbatim: *"Saw [business] on Maps — no site / only Facebook. Built a draft: [link]. I can polish + publish on your domain this week for $X. Want your real photos in?"* For apparel, send a mock Shopify PDP or homepage with AI on-model images, and put a WhatsApp CTA on it for Indian buyers.
- **Show the gap and the outcome, not the tool.** "Don't lead with 'I make AI videos.'" (@AmirMushich). "brands don't buy technology. they buy creative velocity… 'you'll never run out of ad creative' closes deals" (@DeRonin_). Don't say "AI magic"; say catalog output (@0xTria).
- **Lead with their numbers, then offer free proof.** This is the only clean idea in @danclipping's otherwise unethical article.
- **Channels:** cold email, IG DM (small labels live on IG), LinkedIn for founders. "Don't use marketplace buyer messaging for cold outreach" (@AmirMushich).

**Offers and pricing anchors** (USD as quoted; Indian D2C pricing will need to be lower, see 5.3)

| Offer | Price | Source |
|---|---|---|
| Virtual model desk: 60 on-model posts/mo | $1,800/mo | @0xTria (tweet) |
| 100 posts + 12 short video loops | $2,900/mo | @0xTria |
| Rush drop: 20 looks in 48h | $750 | @0xTria |
| Lookbook: ~10 SKUs on one consistent model + 3 motion clips | $600–1,200 (+$150–250 live "direction call" edits) | @0xTria article |
| UGC pack: 20 videos/mo / +10 photos / 40 videos + A/B | $1,500 / $2,000 / $3,000 | @beamnxw |
| AI UGC as a service | $3,000–8,000/mo per client; add statics +$1k, email videos +$1.5k, organic TikTok +$2k, AI product photography +$1k | @DeRonin_ |
| Single 15s UGC ad / streetwear drop poster / poster retainer | $150–500 / $100–400 / $1.2–3K per month | @0x_fokki |
| Local site / 3-page site + retainer | $300–500 / $1–2K + $100–300/mo | @rimtoln |

**How to retain clients**
- Anchor your price to what you replace (a $3–6K agency, a $4K UGC-creator retainer), not to your hours. "Sell the SLA, not the software." (@doublenickk)
- Package recurring lines:
  - **Same-Day Catalog Drop** for new SKUs
  - **Weekly content engine** built from last week's data
  - **Brand character builder**: a brand-owned recurring model, which creates switching cost
  - **Multi-market localizer**
- Build a human QA pass and a revision cap into every contract.
- Report the client's results with @CEO_Vlad's diagnostic: CTR measures the hook, hold rate measures the story, conversion measures the face and proof. Kill anything under 1% CTR after 3 days at about $20/day per creative.

### 5.2 Suggested cold email (our synthesis of the patterns above, not a creator quote)

> **Subject:** [Brand] — your [SKU name] on a model (made it for you)
> Hi [Name], I noticed [Brand]'s [SKU] is only shown flat-lay on the site and in your last [N] Meta ads [or: the same 2 creatives have been running since August].
> I put it on a model in 3 settings and cut a 12-second try-on reel. Private link, watermarked: [link]
> We do this as a monthly "catalog + ad creative" desk: every new drop on a consistent brand model within 48 hours, plus [8] short ads a month to test. Real models stay for your hero campaign.
> Want me to do your next 5 SKUs as a paid pilot? Happy to send pricing.
> — [Name], Centrol Matrix

**Follow-ups**
- Day 3: send a different SKU or colourway.
- Day 7: send a one-line case result or "A/B" poll idea.
- Day 14: break-up note.

Keep it plain text, use secondary sending domains, and verify lists. (These are standard cold-email practices. See the Reddit section for practitioner detail.)

### 5.3 Translating to Indian D2C apparel (our recommendations)
- **Price ladder:**
  - Pilot: ₹5k–15k for 5 SKUs on-model plus 1 reel
  - Catalog desk: ₹25k–60k/mo
  - Catalog + ads: ₹60k–1.5L/mo
  - Website: ₹40k–1.5L, plus a retainer
  These are calibrated to the US anchors above at roughly 25–35%. Validate them on your first 10 calls.
- **Hooks for the Indian market:** festive and wedding season drops, "fits Indian body types" and size inclusivity, fabric for heat and humidity, Meesho/Myntra/Ajio/Amazon listing images, WhatsApp-first CTAs.
- **Lead sources:** IG labels with flat-lays, Shopify stores (look for the `myshopify` tell), Meta Ad Library filtered by India, and marketplace sellers with poor catalog images.

---

## 6. Reddit insights

**How the Reddit data was collected.** Reddit blocks WebFetch from this environment, so we used the Apify `trudax~reddit-scraper-lite` actor on subreddit search URLs (~520 items). Raw data is in `reddit/`. Upvote counts come from the scraper. Many recent r/ecommerce threads have low scores, and quite a few comments are tool founders promoting themselves, so weigh the evidence accordingly.

### 6.1 What looks real vs fake (practitioners)
- **Start from the real product photo and generate only the scene or model around it.** "Always start with authentic product photos… Inaccuracy leads to mismatched expectations and high return rates." Nano Banana "is currently one of the few tools that consistently retains key product features." Source: r/ecommerce [1w5omwl](https://www.reddit.com/r/ecommerce/comments/1w5omwl/).
- **Composites fail on light.** "most composites fall apart on light direction… a hard [shadow] in a soft scene gives it away. no contact shadow at all and the object floats." Use one scene and shadow setting across the whole catalog. "get the still right first, then mess with motion in Runway, Pixverse, or Kling."
- **A real cutout in an AI scene is roughly even with real photos in Meta tests; fully generated garments are risky.** "when the product itself is a real photo cutout and only the scene around it is generated, it's a coin flip, some months the AI versions win outright. fully generated product shots… texture slightly off, shade slightly off, and you pay for that in returns." They cut their photo budget by about half. Source: [1we46op](https://www.reddit.com/r/ecommerce/comments/1we46op/).
- **People are the hard part.** "A minor detail out of place can ruin images entirely. An image without people… most won't even know it's AI." So for cautious brands, offer product-only video first (T10b).
- **Test images on people before publishing.** Send them to friends without saying they're AI ([1wkfkk5](https://www.reddit.com/r/ecommerce/comments/1wkfkk5/)).
- **For UGC, the script is the bigger tell.** "The tell with AI isn't the visual quality anymore… it's the script… use real customer language" ([1o9dl2y](https://www.reddit.com/r/ecommerce/comments/1o9dl2y/)). "Old way vs new way" contrast formats beat "this changed my life" claims ([1ulftge](https://www.reddit.com/r/ecommerce/comments/1ulftge/)).
- **Consistent brand model (r/StableDiffusion).**
  - Qwen Image Edit 2511 + LoRAs ([1uiie5i](https://www.reddit.com/r/StableDiffusion/comments/1uiie5i/), 894 upvotes).
  - Multi-reference character-sheet workflow ([1vr5nvc](https://www.reddit.com/r/StableDiffusion/comments/1vr5nvc/), 1,554 upvotes).
  - LoRA training: use 30 clean images including full-body and rear-3/4. "A LoRA can absolutely nail the face and still have no idea what the person looks like from the shoulders down" ([1x0imbp](https://www.reddit.com/r/StableDiffusion/comments/1x0imbp/), 852 upvotes).
- **Safe default.** Keep the main listing image a real photo. Use AI for secondary/lifestyle shots and ads, and check every output for detail drift ([1togsfu](https://www.reddit.com/r/ecommerce/comments/1togsfu/), 103 comments).

### 6.2 Sentiment and backlash
- **Consumers are loudly hostile to *obvious* AI.**
  - r/sewing banned AI content (16.8k upvotes).
  - r/me_irl on AI ads: "It's so obvious and so low effort" ([1wqctmc](https://www.reddit.com/r/me_irl/comments/1wqctmc/)).
  - Apparel: ATOÌR's AI models were called "Feels so deceptive… $400 dress and you can only see an image generated version" ([r/AusFemaleFashion](https://www.reddit.com/r/AusFemaleFashion/comments/1lommlz/)).
  - The Guess AI model in Vogue (Aug 2025) drew boycott calls.
  - Models are suing over AI lookalikes ([PetaPixel, Jun 2026](https://petapixel.com/2026/06/24/models-claim-fashion-brand-used-ai-to-create-their-doppelgangers/)).
  - "AI product images will always give that temu/shein vibe" ([1wa3oys](https://www.reddit.com/r/ecommerce/comments/1wa3oys/)).
- **Fit is the limit.** "Style preview, yes. Buying decision, no… the return happens because of 'does this fit me'" ([1wdir85](https://www.reddit.com/r/ecommerce/comments/1wdir85/)). One brand dropped its try-on widget because "customers complained more about the slow site" ([1pmmwhq](https://www.reddit.com/r/ecommerce/comments/1pmmwhq/)).
- **India labelling.** MeitY's IT Amendment Rules 2026 were notified 10 Feb 2026 and took effect 20 Feb 2026. They require prominent labels on synthetically generated visuals, plus metadata where feasible (per [Hogan Lovells](https://www.hoganlovells.com/en/publications/india-introduces-mandatory-labelling-for-ai-and-3hour-takedown-for-illegal-content)). The obligations mainly bind platforms, but tell clients to expect "AI info" labels, and put disclosure in the contract. An April 2026 draft proposing a continuously shown label was not confirmed as final. Endorsement-style fake testimonials also raise ASCI issues.

### 6.3 Does AI UGC perform? (mixed; use it for testing and volume)
- **Negative.** A DTC skincare brand spending about $60K/mo on Meta tried AI video for two weeks: "a disaster. CTR was fine but the bounce rate spiked because the video promised something the LP didn't deliver. Pulled them after $4K." The same account cut CPA from $47 to $19 through creative *variety* ([r/FacebookAds 1t2g74z](https://www.reddit.com/r/FacebookAds/comments/1t2g74z/)). Another commenter: "none of the ai ads have been in top 20 of best performers… Best ads still are from real people" ([1vw3zer](https://www.reddit.com/r/FacebookAds/comments/1vw3zer/)).
- **Positive.** AI images gave up to 20% higher CVR in one niche, though real images won by 10% in B2B ([1we46op](https://www.reddit.com/r/ecommerce/comments/1we46op/)). A rule of thumb: AI UGC is fine under about $30 AOV, depends on execution around $100, and real creators win above $200. "test 10 variations in 48 hours… Once you find a winning angle via AI, remake it with a real creator" ([1o9dl2y](https://www.reddit.com/r/ecommerce/comments/1o9dl2y/)).
- **Demand is real.** A brand spending $25K/mo pays creators $200–300 per video with 7–10 day turnaround, and winners "die after 7–10 days" ([1vw3zer](https://www.reddit.com/r/FacebookAds/comments/1vw3zer/)). Meta's Andromeda update rewards creative variety ([1o7bhhn](https://www.reddit.com/r/FacebookAds/comments/1o7bhhn/)).
- **Positioning for Centrol Matrix.** "AI for hook testing and catalog volume, real footage or creators for hero ads." Track returns and complaints, not just CTR. Make sure the ad never over-promises versus the PDP.

### 6.4 Cold outreach (Reddit)
- **A spec offer beats a generic offer** ([r/agency 1quoezk](https://www.reddit.com/r/agency/comments/1quoezk/)).
  - Generic emails from 5 domains, 15 inboxes and ~5K leads got 10–15% opens and "hardly any replies".
  - A spec email got **50–60% opens on ~1,000 emails, 3 calls and 2 closes**.
  - Subject: **"We redesigned one of your pages. Want to see it?"** They send the asset plus a Loom *only after the prospect says yes*.
  - In the same thread, an agency sends **"Hey, made this video ad for [Product]. Not asking for anything, just thought you might want to use it."** That takes ~5 minutes per lead and gets a **~28% reply rate**. "Sometimes the physics are a bit floaty — but it proves we can deliver."
  - Counterpoint: mature buyers see mass-made AI spec as "low effort". **Send one tight, high-quality asset, or ask permission first.**
- **Three things matter** ([1rpsdp5](https://www.reddit.com/r/agency/comments/1rpsdp5/), 95 comments):
  - "Targeting… very specific. Observation: start the message with something real… Offer: do not ask for a call immediately."
  - LinkedIn voice notes get about a 1-in-10 reply rate. Connect without a note, then send a short video or voice note.
- **Research quality beats volume.** "once you burn a prospect with a generic message, that door is closed for good" ([1s8s3v0](https://www.reddit.com/r/agency/comments/1s8s3v0/)). Use 50 prospects instead of 500: give them one real finding, then ask "Want me to send the full details?"
- **Anchor the email to something recent** (a new drop, a site change, a new campaign). Benchmark: about 1 positive reply per 120 emails in a good niche ([1w2vqt9](https://www.reddit.com/r/agency/comments/1w2vqt9/)).
- **India D2C pain, in their own words** ([r/StartUpIndia 1vndp4k](https://www.reddit.com/r/StartUpIndia/comments/1vndp4k/)). This is near-ready pitch copy:
  - "Inventory arrives and then nothing happens for 2–6 weeks… can't list, can't run ads… because the shoot isn't done."
  - A fresh look "requires a fresh ₹50k–₹3L shoot."
  - Flat-lays and ghost mannequins make customers read "this brand is smaller than it's presenting".
  - Apparel and beauty CACs are up 60–110% YoY ([1t0klx2](https://www.reddit.com/r/StartUpIndia/comments/1t0klx2/)), so pitch cheaper creative volume against rising CAC.
  - Indian founders have not obviously bought into AI try-on studios ([1tg241k](https://www.reddit.com/r/StartUpIndia/comments/1tg241k/), low engagement). **Sell "launch-day catalog + ads", not "virtual try-on".**

---

## 7. Linked resources and tools (fetched)

### 7.1 Free UGC systems (verbatim prompts are in `PROMPTS_APPENDIX.md`)
- **@jasonugc, "The AI UGC Creator System"** (Notion page behind ai-ugc-clone-system.netlify.app). Claims ~$2 and 10 minutes per ad.
  - Generate 8 selfies and keep the one with the *most skin texture, not the prettiest*.
  - Build a 4-image identity kit: selfie, 90° profile on white, macro eye, 6-panel feature collage.
  - Seedance multi-reference input: start frame, 4 references and a 5–10s voice MP3, at 720p for ~7s per line.
  - Stitch in CapCut with bold white captions.
  - Troubleshooting: slow-motion talking means the clip is too long for the line; a "staged" look means you need clutter and window light.
  - ⚠️ He recommends ripping a *real TikTok creator's voice* with ssstik. Don't do that; it's voice misappropriation. Use licensed or ElevenLabs voices or our own recordings.
  - The prompts (selfie, identity-lock, Seedance anti-AI blocks) are the best general UGC templates found.
- **@brainextends, "UGC Ultra System" skill** (ZIP on ultraugcsystem.pages.dev; saved at `scratchpad\dl\zipout\x\ugc-ultra-system\`). A drop-in SKILL.md for Claude.
  - Core principle: "lock first, vary second". It uses CREATOR LOCK and PRODUCT LOCK blocks.
  - Modes: Hero Ad Rebuild, One-Face 50 Pack (15 talking-head / 15 how-to / 10 before-after / 10 confession) and Matrix (creator × product × hook × angle, changing one axis at a time).
  - 11-block video prompt order: opening style, CHARACTER, ENVIRONMENT, VOICE, TIMELINE, LIP SYNC, PHYSICS, CAMERA, LIGHTING, STYLE+NEGATIVES, SOUND.
  - 15-second beat template. Includes a 77 KB Seedance 2.5 prompting reference ("<Character A> corresponds to @Image 1. Use only the appearance, hairstyle and clothing… Do not use the image background.").
  - **This is the fastest way to stand up our internal UGC skill.**
- **@brainextends, "Organic App Growth Playbook"** (15-page PDF). Treat the first 30 posts as research. Variation math: 5 hooks × 3 scripts × 2 visuals × 2 CTAs = 60. Includes 25 hook templates (in appendix).
- **@maxxmalist's Google Doc.** One long Sora 2 Pro image-to-video UGC testimonial prompt (in appendix). It's a good structure: Style / Setting / Character / Cinematography / Actions / Dialogue / Audio.
- **promptsref.com (@underwoodxie96).** The "share" links are referral links with no prompt in them. The prompt pages have strong realism blocks (e.g. "FACIAL GEOMETRY IS THE ABSOLUTE PRIORITY", an 85mm look, "frame extracted from high-quality 4K behind-the-scenes footage", a numbered 41-item priority list). Many of them are sexualized, so reuse only the realism blocks. There is no fashion category. Fashion picks: "Streetwear Portrait Beside a White Evo IX" (Nano Banana 2, direct-flash 90s streetwear) and "Urban Fashion Editorial Collage" (GPT Image 2.5).
- **darkugc.com** (free, by AffiliateNetwork). A library of viral app UGC (50K+ views, accounts with ≤30K followers), filterable by format and by AI UGC. Average views per format:
  - Dance / lip-sync / pose: 3.5M
  - Challenge struggle: 2.55M
  - Input → AI result (before/after): 2.4M
  - Reacts to the app: 2.16M
  - Text + daily moment: 1.85M
  - Storytime: 1.5M
  - Lock-screen reveal: 1.09M
  - Slideshow: 990K
  - Text + GRWM: 950K
  - Podcast: 400K
  Use it as a format swipe file. It is app-centric.
- **Paid "courses"**: 0xROAS's AI UGC System costs $148/mo on Whop and DavidRunsAds' CreativeLab V3 costs $79. The free resources above cover most of what they advertise.

### 7.2 Website / launch-video tools (⭐ = recommended for the Centrol Matrix site)

| Tool | What it is | Cost / license | Use for us |
|---|---|---|---|
| ⭐ **HyperFrames** (heygen-com/hyperframes) | HTML → deterministic MP4 (GSAP / Three.js / Lottie). Claude plugin with 21 skills including product-launch | Apache-2.0, free | Showreel, service explainer videos, client launch reels. Already installed here as skills |
| **Remotion** | React → video | Free for teams ≤3 people; 4+ need a company license ($25/seat/mo) | Alternative to HyperFrames |
| ⭐ **echris6/motion-video-kit** | Claude Code skill for business and launch films: motion grammar, critic "gauntlet", QC, Three.js product hero, pricing/pilot playbook | MIT | Premium motion pieces for the site, plus a sellable "launch film" offer |
| ⭐ **Unicorn Studio** (unicorn.studio) | No-code WebGL/shader effects editor (~70 effects); embed via a ~30 KB SDK; Framer/Webflow support | Free (8 publishes, branded); $20/mo Legend | Shader hero background / brand texture (as @MeganeJon used) |
| ⭐ **21st.dev** | React/Tailwind/shadcn component registry, shaders, gradients; `npx @21st-dev/cli@latest init --client claude` | Free browse (2 copies/day); paid membership | High-quality site sections; real UI in motion videos (@rexan_wong) |
| ⭐ **awesome-opus5-5-videos** (yihui-dev) | 703 prompts for code-animation videos, 418 with remakes | MIT | Prompt mine for hero animations and reels |
| **whatships.com** | 2,522 launch videos from X, with `/llms.txt` and an API | Free | Reference mood boards ("naming a style works way better than describing one") |
| **Illyism/seo-skills** | SEO/AEO skills for Claude Code (`npx skills add Illyism/seo-skills`) | MIT | Ongoing SEO for our site and client sites |
| **OpenMontage** (calesthio) | Agentic video studio for Claude Code (explainer, avatar, clip factory, localization pipelines) | AGPLv3 (fine for internal use) | Internal production pipeline |
| ⭐ **higgsfield-ai/skills** | Official Claude skills: soul-id (reusable face), **product-photoshoot (10 modes)**, Marketing Studio (UGC / unboxing / **try-on** ads), marketplace-cards, brandkit | MIT; needs Higgsfield credits | Directly relevant for apparel catalog and ad production |
| AKCodez/higgsfield-claude-skills | 19 Playwright-driven slash commands (`/13-fashion-lookbook`, `/ugc-video-auto`…) | No license; fragile; may breach ToS | Ideas only |
| **huashu-art-motion** | 36 art-style animation recipes plus explainer grammars | MIT (code) | Stylized brand-story videos |
| shipvideo (diggerhq) | URL → 20–40s launch video | Needs an OpenComputer key | Quick spec launch videos |
| unfair.so/lore | Done-for-you X launch video studio: **$5,900 (no shoot) / $9,900 (on camera)**, 7-day delivery | — | Price benchmark for an AI-native launch-video offer at Indian prices |

**Website workflow consensus** (@rexan_wong, @amritwt, @socialwithaayan, @beamnxw, @RoundtableSpace):
1. Pick 1–3 reference films or sites by name.
2. Use HyperFrames/Remotion so the model renders code to MP4.
3. Use real components (21st.dev) and real screenshots; "Never redraw UI".
4. Write brand rules into CLAUDE.md / LOOK.md.
5. Ask for 3 storyboards, then stills per scene, before animating.
6. Give director notes in camera words.
7. Build scene by scene, with one technique per clip, and run contact-sheet and pop-scan QC.

To demo the agency, run @twoclipping's landing-page fly-over prompt on our own site and on prospects' sites. A personalized 15s video of *their* store is a strong cold-email asset.

---

## 8. Risks and ethics (read before selling)
- **Disclosure.** TikTok requires labelling realistic AI images, audio and video (@0xShukran's article cites this), and Meta has "AI info" labels. In India, the IT Amendment Rules 2026 have applied since 20 Feb 2026 and require prominent labels on synthetically generated visuals (see 6.2). Fake AI testimonials also raise ASCI endorsement issues. Garments in ads must match the real product, because consumer-protection law covers misleading ads and returns. Put AI-usage disclosure and approval in the contract.
- **Don't impersonate or mislead.** Don't use real brands' labels or logos, celebrity likenesses, fake reviews, fake "customers" or fake results in client ads. Several viral prompts use ZARA/LANEIGE/Ferrari/celebrity names; strip those. @RoundtableSpace's motion prompt makes the same point: "never generate a fake finished job, fake customer, fake review or fake result".
- **Reference licensing.** @ethancole_ai found that 10 of 57 references in a month had no source or banned AI use. Keep a reference log, and use the brand's own footage, licensed stock or our own shoots for the Video1 references.
- **Garment accuracy = returns.** If AI changes colour, print or fit, customers return the product. Always QC against the physical SKU, and keep real photos for the PDP's primary image if the marketplace requires it.
- **Avoid grey-market tactics** creators promote: resold Google accounts, phone farms with proxies to fake US locales, "remove AI metadata", rage-bait drama, thirst content.
- **Hype filter.** Many "550 videos a day" / "$33k/day" posts are comment-to-DM funnels selling courses (FynCas, georgesttock, davidfigeira, NahFlo2n). Treat their numbers as marketing.

---

## 9. Source list
**Linked tweets (List A):**
- https://x.com/IamEmily2050/status/1993194975169781882
- https://x.com/IamEmily2050/status/1989165112658436122
- https://x.com/minchoi/status/2104634610629980283
- https://x.com/minchoi/status/2048247682481660367
- https://x.com/underwoodxie96/status/2107446515841335753
- https://x.com/underwoodxie96/status/2103066427276005813
- https://x.com/leaf_sanren/status/2105645639703183753
- https://x.com/abxxai/status/2102775755646337530
- https://x.com/abxxai/status/2093343495889297776
- https://x.com/brainextends/status/2102831087563186680
- https://x.com/brainextends/status/2099941049800315216
- https://x.com/jasonugc/status/2102742414758703130
- https://x.com/DanjiTosaka/status/2099938604613091792
- https://x.com/simonecanciello/status/2099864485347381410
- https://x.com/SDDFounder/status/2099168568180912369
- https://x.com/gaIpsycho/status/2098792195444850758
- https://x.com/beechinour/status/2086910005547049346
- https://x.com/mightyking/status/2087869520010494047
- https://x.com/mikefutia/status/2053866141064548396
- https://x.com/imrollandex/status/2057835768723214406
- https://x.com/twoclipping/status/2073819471354192083
- https://x.com/0xROAS/status/2051333164174348715
- https://x.com/ViralOps_/status/2046116257209122821
- https://x.com/xmliisu/status/1999507373619048501
- https://x.com/xmliisu/status/1990017945813094708
- https://x.com/xIrissy/status/1999384085400289473
- https://x.com/mizq06/status/2017588805612802539
- https://x.com/hellorob/status/1994943309572444225
- https://x.com/VibeMarketer_/status/1993757724564189225
- https://x.com/NanoBanana_labs/status/1987862714153345059
- https://x.com/NanoBanana_labs/status/1993072987898106320
- https://x.com/maxxmalist/status/1987952714043797721
- https://x.com/MaxbatIe/status/1990476368451150281
- https://x.com/elyyisa_/status/1992863330726203428 (the scraper attributes this tweet to @zachkry_)

**Linked tweets (List B):** see the table in section 4. Every row is https://x.com/<handle>/status/<id>.

**X long-form articles read in full (via fxtwitter):**
- @brainextends, *The ULTIMATE AI UGC Playbook*
- @beechinour, *how to learn 80% of ai ugc in <20 minutes*
- @maverickecom, *the most valuable AI UGC affiliate article ever written*
- @CEO_Vlad, *the 7 best AI UGC formats* and *the psychology behind AI UGC videos*
- @simonecanciello, *how to recreate this viral AI influencer*
- @0xShukran, *Your First $1,000 AI Girl…* (outfit-choice system)
- @EXM7777, *How to automate SEO with Opus 5.5*
- @socialwithaayan, *How to Make Product Launch Videos With Opus 5.5*
- @beamnxw, *Motion Engineering with Opus 5.5* and *Claude + Higgsfield MCP $10K/mo Shopify UGC Agency*
- @guillemcraft, *TikTok warm-up*
- @AmirMushich, *How to create product ads for ecommerce brands with AI*
- @doublenickk, *$20K+ retainers with Higgsfield MCP*
- @Just_sharon7, *Creator-Grade Product Ads*
- @adriansolarzz, *48 Laws of AI UGC* and *3 Layers*
- @growthsuck, *face UGC → AI UGC*
- @0x_fokki, *Folder of Prompts $12,400/month*
- @danclipping, *Local Arbitrage* (flagged unethical)
- @0xTria, *$68/Month in AI Tools, $6,400 selling AI renders*
- @sleepclip, *100 AI UGC videos for $0*
- @sayonaracash, *130 Photos… $612,000 Gone* (scam warning)
- @rimtoln, *$1.5K local sites with Lovable + Claude*

**Key threads (author self-replies fetched):**
- @abxxai 2102775755646337530 (Opus + Seedance road-trip)
- @abxxai 2093343495889297776 (balcony selfie)
- @abxxai 2095179656802844727 (product-in-hand vlog)
- @abxxai 2107847831168196890 (UGC try-on)
- @ivanka_humeniuk 2093535869680472305
- @HeyAbhishek 2098058251921457332
- @minchoi 2048247682481660367
- @imrollandex 2057835768723214406
- @RoundtableSpace 2105209785335373948
- @beamnxw 2109722135291744578
- @jasonugc 2104983708478370263
- @brainextends 2108628141401071690

**Creator timelines scanned (~40 recent posts each):** jasonugc, brainextends, IamEmily2050, underwoodxie96, abxxai, minchoi, mikefutia, 0xROAS, DavidRunsAds, twoclipping, VibeMarketer_, NanoBanana_labs, xmliisu.

**X searches** (min 20 likes, since Mar 2026): "UGC prompt nano banana", "AI UGC realistic prompt", "fashion ad AI prompt", "clothing brand AI model photoshoot", "AI UGC agency cold email", "seedance UGC", "AI ads apparel", "AI UGC clothing brand", "AI virtual try-on prompt clothing". Notable results:
- @0xTria 2077698013552624114
- @DeRonin_ 2070834450213015622
- @MimiTheDesigner 2061820367644070153
- @marvin_x1 2071850758639604219
- @sayonaracash 2108464719740699012
- @k4zxbt 2110063820093718988
- @imrollandex 2086122488094675410
- @Mho_23 2101982659190653032
- @jasonugc 2099547856486989951
- @alexis_aurion 2108497939110789413
- @eptwts 2080365325988606266
- @DavidRunsAds 2104301098227888180 and 2107593616893845562
- @CEO_Vlad 2108603146981572988
- @MissDelulu9 2110563171425800630
- @undefinedKi 2110483138413801661
- @ethancole_ai 2108501983699030244
- @jforjacob 2108500047360872644
