export async function POST(request: Request) {
  const form = await request.formData();
  const name = String(form.get('name') ?? '').trim();
  const email = String(form.get('email') ?? '').trim();
  const subject = String(form.get('subject') ?? '').trim();
  const message = String(form.get('message') ?? '').trim();

  if (!name || !email || !subject || !message) {
    return Response.json({ error: 'All fields are required.' }, { status: 400 });
  }

  if (!email.includes('@')) {
    return Response.json({ error: 'Valid email required.' }, { status: 400 });
  }

  return Response.json({
    ok: true,
    message: 'Your message was received. Our team typically responds within 2 business days.',
  });
}
