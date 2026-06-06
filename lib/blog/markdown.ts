import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';

// Allow a sensible set of tags/attrs. img is permitted (cover/inline images),
// but scripts, styles, iframes, and event handlers are stripped by the sanitizer.
const schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    img: [...(defaultSchema.attributes?.img ?? []), 'loading'],
    a: [...(defaultSchema.attributes?.a ?? []), 'rel', 'target'],
  },
};

/** Render Markdown to sanitized HTML. */
export async function markdownToSafeHtml(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSanitize, schema)
    .use(rehypeStringify)
    .process(markdown);
  return String(file);
}

/** Sanitize already-HTML content (parse as HTML fragment, sanitize, re-stringify). */
export async function sanitizeHtml(html: string): Promise<string> {
  // Re-run through the markdown pipeline's sanitizer by treating the HTML as a
  // raw block. rehype-sanitize strips anything dangerous regardless of source.
  const { rehype } = await import('rehype');
  const file = await rehype()
    .use(rehypeSanitize, schema)
    .process(html);
  return String(file);
}

/** Words / 200, minimum 1. Strips HTML tags before counting. */
export function readingTime(text: string): number {
  const words = text
    .replace(/<[^>]+>/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Slugify a title: lowercase, hyphenate, strip non-url-safe chars. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}
