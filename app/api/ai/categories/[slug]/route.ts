import { exportCategory } from '@/lib/ai-export';
import { aiJsonResponse } from '@/lib/ai-response';

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const payload = exportCategory(slug);

  if (!payload) {
    return Response.json({ error: 'Category not found' }, { status: 404 });
  }

  return aiJsonResponse(payload, `/categories/${slug}`, payload.lastModified);
}
