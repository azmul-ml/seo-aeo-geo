import type { MetadataRoute } from 'next';
import { SITE_LAST_UPDATED, SITE_URL } from '@/lib/seo';
import { categories } from '@/lib/catalog';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/categories`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...categories.map((category) => ({
      url: `${SITE_URL}/categories/${category.slug}`,
      lastModified: category.dateModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];
}
