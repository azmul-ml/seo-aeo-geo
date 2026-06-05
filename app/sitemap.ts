import type { MetadataRoute } from 'next';
import { SITE_LAST_UPDATED, SITE_URL } from '@/lib/seo';
import { mockHowToGuides } from '@/lib/utils';
import { brands } from '@/lib/catalog';

/**
 * Core sitemap (static and hub pages).
 * Segment sitemaps: /blog/sitemap.xml, /products/sitemap.xml, /categories/sitemap.xml
 * Image sitemap: /sitemap-images.xml
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastUpdated = SITE_LAST_UPDATED;
  const guideTopics = ['generative-engine-optimization', 'entity-disambiguation'];

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: lastUpdated, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: lastUpdated, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/faq`, lastModified: lastUpdated, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${SITE_URL}/contact`, lastModified: lastUpdated, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${SITE_URL}/editorial-policy`, lastModified: lastUpdated, changeFrequency: 'yearly', priority: 0.65 },
    { url: `${SITE_URL}/privacy`, lastModified: lastUpdated, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE_URL}/terms`, lastModified: lastUpdated, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE_URL}/products`, lastModified: lastUpdated, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${SITE_URL}/categories`, lastModified: lastUpdated, changeFrequency: 'weekly', priority: 0.8 },
  ];

  const howToRoutes: MetadataRoute.Sitemap = Object.keys(mockHowToGuides).map((topic) => ({
    url: `${SITE_URL}/how-to/${topic}`,
    lastModified: lastUpdated,
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }));

  const guideRoutes: MetadataRoute.Sitemap = guideTopics.map((topic) => ({
    url: `${SITE_URL}/guides/${topic}`,
    lastModified: lastUpdated,
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }));

  const brandRoutes: MetadataRoute.Sitemap = brands.map((brand) => ({
    url: `${SITE_URL}/brands/${brand.slug}`,
    lastModified: brand.dateModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...howToRoutes, ...guideRoutes, ...brandRoutes];
}
