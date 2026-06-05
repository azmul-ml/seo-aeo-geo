import type { MetadataRoute } from 'next';
import { SITE_LAST_UPDATED, SITE_URL } from '@/lib/seo';
import { mockArticles } from '@/lib/utils';

const BLOG_CATEGORIES = ['seo', 'aeo', 'geo'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/blog`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...BLOG_CATEGORIES.map((category) => ({
      url: `${SITE_URL}/blog/category/${category}`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    })),
    ...mockArticles.map((article) => ({
      url: `${SITE_URL}/blog/${article.slug}`,
      lastModified: article.dateModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];
}
