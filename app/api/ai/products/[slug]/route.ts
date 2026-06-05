import { exportProduct } from '@/lib/ai-export';
import { NextResponse } from 'next/server';

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const payload = exportProduct(slug);

  if (!payload) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(payload, {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
