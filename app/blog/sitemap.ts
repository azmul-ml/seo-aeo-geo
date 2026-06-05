import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { mockArticles } from '@/lib/utils';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...mockArticles.map((article) => ({
      url: `${SITE_URL}/blog/${article.slug}`,
      lastModified: article.dateModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];
}
