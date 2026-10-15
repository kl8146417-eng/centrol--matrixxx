# Cold outreach to clothing brands: runbook

Sources: `docs/research/design-research.md` §5, `docs/research/PLAYBOOK.md` §5–6. Treat benchmark
numbers there as directional; validate on our own first 200 sends.

## The funnel

```
cold email (plain text, no link) ─► reply "yes, send them"
        └► make 3 looks from their products ─► /for/<slug>?ref=<slug> (private, noindex)
                                   └► order a package online  |  WhatsApp  |  call
cold email follow-ups link to       ─► /fashion?brand=<Brand>&first=<Name>&p=<product>&ref=<slug>
```

Every visit carries `ref`/UTM. It is stored with the contact or sample request (`[source]` line in
the admin inbox) and sent to GA4 and Meta when those IDs are set.

## Sending setup (before the first email)

- 2–3 secondary domains (never centrolmatrix.com itself). Use 2 inboxes per domain.
- Set SPF, DKIM and DMARC, plus one-click unsubscribe.
- Warm up for 2–4 weeks, then send 20–40 emails per inbox per day.
- Keep bounces under 2% and complaints under 0.3%.
- Send plain text. No open tracking. No link in email 1.
- Tools: Instantly or Smartlead to send, Apollo + Hunter to find emails, Clay optional.

## Who to email

**Best signal:** brands already running Meta ads. Search the Meta Ad Library (India) for "kurti",
"co-ord set", "oversized tee", "ethnic wear", "activewear". Apify has an Ad Library scraper.

**Other signals:**
- Shopify stores: check for `cdn.shopify.com` or `/products.json`.
- Instagram labels whose posts are only flat lays or hanger shots.
- Marketplace sellers with weak images.

**Qualify on:**
- product photos are flat lays or ghost-mannequin only
- 20–500 products
- the founder is reachable
- they reuse the same creative in their ads

## Sequence (4 touches, each under 80 words)

| Day | Subject | Body idea |
|---|---|---|
| 0 | `3 looks for {brand}` | You noticed {product} is shown as a flat lay. Offer to put three of their pieces on a model, free, made from the photos already on their store. Ask: "want them?" |
| 3 | `{brand} on-model` | Made them anyway: link to `/for/{slug}` with a GIF thumbnail of the slider. Anchor: a shoot day vs a set from $247. |
| 7 | `ads for {product}` | Meta angle: one UGC-style ad from the same product (link a sample from `/fashion#work`). |
| 12 | `closing the loop` | Short breakup. Leave the `/fashion` link for later. |

WhatsApp only after they reply. Never pretend AI people are real customers. Label AI work.

## Making a sample (per prospect)

1. **Source.** Take 3 product photos from their store: the real photo is the reference.
2. **Generate.** Follow `PLAYBOOK.md` §1 (anti-slop rules, templates T1–T9):
   - Lock the garment.
   - Describe the phone camera and lighting physically.
   - Add real imperfections.
   - No logos or labels.
   - Generate 5 and keep the best.
3. **QC against the source.** Check colour, print, stitch count, neckline and label. Reject any
   drift.
4. **Publish.**
   - Export the before and after images at 4:5 to `public/prospects/<slug>/`.
   - Add an entry to `content/prospects.ts` with `expires` set to about 21 days.
   - Deploy.
5. **Optional extras.** A 9:16 UGC clip (`video`) and a 2-minute Loom (`loom`).

## Compliance

- Every email states who we are, a postal address and a way to opt out.
- India's DPDP rules on marketing consent are still settling. UK and EU cold email needs a
  legitimate-interest check. Ask a lawyer before sending to the UK or EU.
