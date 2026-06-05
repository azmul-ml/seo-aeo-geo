export async function POST(request: Request) {
  const form = await request.formData();
  const email = String(form.get('email') ?? '').trim();

  if (!email || !email.includes('@')) {
    return Response.json({ error: 'Valid email required' }, { status: 400 });
  }

  return Response.json({ ok: true, message: 'Subscription received (demo endpoint).' });
}
