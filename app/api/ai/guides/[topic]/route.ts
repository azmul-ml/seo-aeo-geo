import { exportGuide } from '@/lib/ai-export';
import { aiJsonResponse } from '@/lib/ai-response';

export async function GET(
  _request: Request,
  context: { params: Promise<{ topic: string }> }
) {
  const { topic } = await context.params;
  const payload = exportGuide(topic);

  if (!payload) {
    return Response.json({ error: 'Guide not found' }, { status: 404 });
  }

  return aiJsonResponse(payload, `/guides/${topic}`, payload.lastModified);
}
