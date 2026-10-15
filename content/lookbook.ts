// Before/after lookbook pairs made in our own pipeline (manifest + prompts: public/media/lookbook/manifest.json).
// Every "after" is AI-generated from its "before". The graphic tee's "before" is a real ORVA store photo;
// the other "befores" are generated stand-ins for a seller's flat lay, so the page calls these demo pairs.
import type { LookPair } from '@/components/BeforeAfter';

export const lookbook: (LookPair & { realBefore: boolean })[] = [
  { id: "linen-coord", category: "Co-ord set", style: "lookbook", before: "/media/lookbook/linen-coord-before.webp", after: "/media/lookbook/linen-coord-after.webp",
    alt_before: "Sage-green linen co-ord set, a camp-collar shirt and wide-leg drawstring trousers, laid flat on a wrinkled white bedsheet and shot from above on a phone.",
    alt_after: "Woman walking along a lime-washed street wall with bougainvillea, wearing the sage-green linen camp-collar shirt and matching wide-leg trousers.",
    realBefore: false },
  { id: "block-print-kurta", category: "Kurta set", style: "lookbook", before: "/media/lookbook/block-print-kurta-before.webp", after: "/media/lookbook/block-print-kurta-after.webp",
    alt_before: "Indigo cotton kurta with small off-white block-printed motifs and plain off-white pants, laid flat on a terrazzo floor in daylight.",
    alt_after: "Indian woman in a sunlit courtyard beside a carved wooden door, wearing the indigo block-print kurta with off-white pants and tan kolhapuri sandals.",
    realBefore: false },
  { id: "streetwear-tee", category: "Graphic tee", style: "ugc", before: "/media/lookbook/streetwear-tee-before.webp", after: "/media/lookbook/streetwear-tee-after.webp",
    alt_before: "Off-white cotton T-shirt with a square cobalt-blue ornamental tile print, photographed on a wooden hanger against a plain light-grey background.",
    alt_after: "Young Indian man taking a mirror selfie in a lived-in bedroom, wearing the off-white tile-print tee oversized with black cargo trousers and white canvas sneakers.",
    realBefore: true },
  { id: "floral-midi-dress", category: "Summer dress", style: "lookbook", before: "/media/lookbook/floral-midi-dress-before.webp", after: "/media/lookbook/floral-midi-dress-after.webp",
    alt_before: "Cream cotton midi dress with a small terracotta and mustard floral print, flutter sleeves and a tie belt, laid flat on sunlit wooden floorboards.",
    alt_after: "Smiling plus-size Indian woman turning back toward the camera on a sunny Goa lane, wearing the cream floral tiered midi dress with flutter sleeves.",
    realBefore: false },
  { id: "training-set", category: "Activewear", style: "lookbook", before: "/media/lookbook/training-set-before.webp", after: "/media/lookbook/training-set-after.webp",
    alt_before: "Deep teal half-zip long-sleeve training top and matching high-waist leggings laid flat on a light wood floor next to a rolled yoga mat.",
    alt_after: "Woman standing in a grey photo studio, one hand on her hip, wearing the deep teal half-zip training top and matching full-length leggings.",
    realBefore: false },
  { id: "denim-shirt", category: "Denim shirt", style: "ugc", before: "/media/lookbook/denim-shirt-before.webp", after: "/media/lookbook/denim-shirt-after.webp",
    alt_before: "Light-wash denim shirt with white buttons and two flap chest pockets, laid flat on an off-white waffle blanket beside a mustard cushion.",
    alt_after: "Woman laughing outside a bakery on a quiet street, wearing the light-wash denim shirt with rolled sleeves, ecru trousers and a canvas tote.",
    realBefore: false },
];
