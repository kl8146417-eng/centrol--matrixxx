// Netlify Functions accept ~6 MB request bodies, so uploads at checkout are capped at 5 MB in total.
// Larger files are sent after ordering (email / WhatsApp / shared link).
export const MAX_TOTAL_MB = 5;
export const MAX_FILES = 10;
export const ALLOWED_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif', '.heic', '.heif', '.pdf', '.zip', '.mp4', '.mov', '.webm', '.txt', '.doc', '.docx', '.csv']);
