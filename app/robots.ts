import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

const AI_BOTS = [
  'GPTBot',
  'ChatGPT-User',
  'ClaudeBot',
  'anthropic-ai',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
  'cohere-ai',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/search', '/api/', '/_next/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/search', '/api/', '/_next/'],
      },
      ...AI_BOTS.map((bot) => ({
        userAgent: bot,
        allow: ['/', '/api/ai/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/search', '/api/'],
      })),
    ],
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      `${SITE_URL}/blog/sitemap.xml`,
      `${SITE_URL}/products/sitemap.xml`,
      `${SITE_URL}/categories/sitemap.xml`,
      `${SITE_URL}/sitemap-images.xml`,
    ],
    host: SITE_URL.replace(/^https?:\/\//, ''),
  };
}
