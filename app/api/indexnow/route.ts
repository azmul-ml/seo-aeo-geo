import { submitIndexNow } from '@/lib/indexnow';
import { SITEMAP_URLS, SITE_URL } from '@/lib/seo';

export async function POST(request: Request) {
  let urls: string[] = [];

  try {
    const body = await request.json();
    if (Array.isArray(body.urls)) {
      urls = body.urls.filter((u: unknown) => typeof u === 'string');
    }
  } catch {
    urls = [SITE_URL, ...SITEMAP_URLS];
  }

  if (urls.length === 0) {
    urls = [SITE_URL];
  }

  const result = await submitIndexNow(urls);

  return Response.json(
    { submitted: urls.length, indexNow: result },
    { status: result.ok ? 200 : 202 }
  );
}
