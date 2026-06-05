import { exportArticle } from '@/lib/ai-export';
import { aiJsonResponse } from '@/lib/ai-response';

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const payload = exportArticle(slug);

  if (!payload) {
    return Response.json({ error: 'Article not found' }, { status: 404 });
  }

  return aiJsonResponse(payload, `/blog/${slug}`, payload.lastModified);
}
