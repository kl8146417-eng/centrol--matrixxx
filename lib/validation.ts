import { z } from 'zod';

const postFields = z.object({
  title: z.string().min(1, 'title is required').max(200),
  slug: z.string().max(80).optional(),
  excerpt: z.string().max(400).optional(),
  contentMarkdown: z.string().optional(),
  contentHtml: z.string().optional(),
  coverImageUrl: z.string().url().optional(),
  tags: z.array(z.string().max(40)).max(12).optional(),
  author: z.string().max(120).optional(),
  status: z.enum(['draft', 'published']).optional(),
  publishedAt: z.string().datetime().optional(),
});

export const createPostSchema = postFields.refine(
  (d) => Boolean(d.contentMarkdown || d.contentHtml),
  {
    message: 'Provide one of contentMarkdown or contentHtml.',
    path: ['contentMarkdown'],
  }
);

export const updatePostSchema = postFields
  .partial()
  .refine((d) => Object.keys(d).length > 0, {
    message: 'Provide at least one field to update.',
  });

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;

/** Flatten Zod errors into { field: message } for clean 422 responses. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join('.') || '_';
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
