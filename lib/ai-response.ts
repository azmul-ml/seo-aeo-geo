import { getCanonicalUrl } from './seo';

export function aiJsonResponse(payload: unknown, canonicalPath: string, lastModified?: string) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
    Link: `<${getCanonicalUrl(canonicalPath)}>; rel="canonical"`,
  };

  if (lastModified) {
    headers['Last-Modified'] = new Date(lastModified).toUTCString();
  }

  return Response.json(payload, { headers });
}
