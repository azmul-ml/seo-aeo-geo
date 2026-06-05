import { buildLlmsTxtSummary } from '@/lib/ai-export';

export function GET() {
  return new Response(buildLlmsTxtSummary(false), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
