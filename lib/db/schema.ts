import {
  pgTable,
  uuid,
  text,
  integer,
  boolean,
  timestamp,
  pgEnum,
  uniqueIndex,
  customType,
  jsonb,
} from 'drizzle-orm/pg-core';

export const postStatus = pgEnum('post_status', ['draft', 'published']);

// Postgres bytea <-> Node Buffer. Stores raw image bytes so uploaded covers
// live in the same database as the posts (no third-party image host needed).
const bytea = customType<{ data: Buffer; default: false }>({
  dataType() {
    return 'bytea';
  },
});

export const apiTokens = pgTable('api_tokens', {
  id: uuid('id').defaultRandom().primaryKey(),
  label: text('label').notNull(),
  tokenHash: text('token_hash').notNull().unique(),
  scopes: text('scopes').array().notNull().default(['blog:write']),
  revoked: boolean('revoked').notNull().default(false),
  expiresAt: timestamp('expires_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  lastUsedAt: timestamp('last_used_at', { withTimezone: true }),
});

export const posts = pgTable(
  'posts',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    slug: text('slug').notNull(),
    title: text('title').notNull(),
    excerpt: text('excerpt'),
    contentMarkdown: text('content_markdown'),
    contentHtml: text('content_html').notNull(),
    coverImageUrl: text('cover_image_url'),
    tags: text('tags').array().notNull().default([]),
    author: text('author').notNull().default('Centrol Matrix'),
    status: postStatus('status').notNull().default('published'),
    readingTime: integer('reading_time').notNull().default(1),
    publishedAt: timestamp('published_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
    createdByToken: uuid('created_by_token').references(() => apiTokens.id),
    deletedAt: timestamp('deleted_at', { withTimezone: true }),
  },
  (t) => ({
    slugIdx: uniqueIndex('posts_slug_idx').on(t.slug),
  })
);

// Uploaded images (blog covers, inline media). Bytes live in Postgres and are
// served back at a stable public URL: /media/<id>.<ext>
export const media = pgTable('media', {
  id: uuid('id').defaultRandom().primaryKey(),
  filename: text('filename'),
  mimeType: text('mime_type').notNull().default('image/jpeg'),
  byteSize: integer('byte_size').notNull(),
  width: integer('width'),
  height: integer('height'),
  data: bytea('data').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  uploadedByToken: uuid('uploaded_by_token').references(() => apiTokens.id),
});

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
export type ApiToken = typeof apiTokens.$inferSelect;
export type Media = typeof media.$inferSelect;
export type NewMedia = typeof media.$inferInsert;

// ---- Commerce (merged agency site): orders + contact enquiries ----
// Complex nested parts (items, brief, contact, payment, uploads, history) are jsonb.


export const orders = pgTable('orders', {
  id: text('id').primaryKey(), // e.g. CMX-261015-AB2CD
  token: text('token').notNull(), // customer access token for /order/<id>?t=
  status: text('status').notNull().default('New'),
  totalUsd: integer('total_usd_cents').notNull(),
  email: text('email').notNull(),
  brandName: text('brand_name'),
  data: jsonb('data').notNull(), // full order document
  adminNotes: text('admin_notes').notNull().default(''),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const contacts = pgTable('contacts', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  company: text('company'),
  whatsapp: text('whatsapp'),
  message: text('message').notNull(),
  meta: jsonb('meta'),
  handled: boolean('handled').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export type OrderRow = typeof orders.$inferSelect;
export type ContactRow = typeof contacts.$inferSelect;
