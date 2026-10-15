// Before/after lookbook pairs made in our own pipeline (see public/media/lookbook/manifest.json).
// Every "after" is AI-generated from the "before" garment photo and is labelled as such on the page.
import type { LookPair } from '@/components/BeforeAfter';

export const lookbook: (LookPair & { model_used?: string })[] = [];
