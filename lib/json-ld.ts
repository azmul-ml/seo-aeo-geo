/** Safe JSON-LD serialization per Next.js guidance (prevents XSS via `<` in payloads). */
export function serializeJsonLd(schema: Record<string, unknown>): string {
  return JSON.stringify(schema).replace(/</g, '\\u003c');
}
