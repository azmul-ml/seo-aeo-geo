import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { products } from '@/lib/catalog';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/products`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    ...products.map((product) => ({
      url: `${SITE_URL}/products/${product.slug}`,
      lastModified: product.dateModified,
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    })),
  ];
}
