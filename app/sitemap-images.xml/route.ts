import { products } from '@/lib/catalog';
import { mockArticles } from '@/lib/utils';
import { SITE_URL } from '@/lib/seo';

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function GET() {
  const entries: { page: string; loc: string; title: string }[] = [];

  for (const article of mockArticles) {
    entries.push({
      page: `${SITE_URL}/blog/${article.slug}`,
      loc: `${SITE_URL}${article.image}`,
      title: article.title,
    });
  }

  for (const product of products) {
    for (const image of product.images) {
      entries.push({
        page: `${SITE_URL}/products/${product.slug}`,
        loc: `${SITE_URL}${image}`,
        title: product.name,
      });
    }
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries
  .map(
    (e) => `  <url>
    <loc>${escapeXml(e.page)}</loc>
    <image:image>
      <image:loc>${escapeXml(e.loc)}</image:loc>
      <image:title>${escapeXml(e.title)}</image:title>
    </image:image>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
