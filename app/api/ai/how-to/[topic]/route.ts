import { exportHowTo } from '@/lib/ai-export';
import { aiJsonResponse } from '@/lib/ai-response';

export async function GET(
  _request: Request,
  context: { params: Promise<{ topic: string }> }
) {
  const { topic } = await context.params;
  const payload = exportHowTo(topic);

  if (!payload) {
    return Response.json({ error: 'How-to guide not found' }, { status: 404 });
  }

  return aiJsonResponse(payload, `/how-to/${topic}`, payload.lastModified);
}
