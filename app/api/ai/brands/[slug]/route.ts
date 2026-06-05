import { exportBrand } from '@/lib/ai-export';
import { aiJsonResponse } from '@/lib/ai-response';

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const payload = exportBrand(slug);

  if (!payload) {
    return Response.json({ error: 'Brand not found' }, { status: 404 });
  }

  return aiJsonResponse(payload, `/brands/${slug}`, payload.lastModified);
}
