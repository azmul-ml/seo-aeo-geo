import type { MetadataRoute } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: SITE_URL,
    name: SITE_NAME,
    short_name: 'TechKnowledge',
    description:
      'Knowledge hub for Technical SEO, Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO).',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    lang: 'en-US',
    dir: 'ltr',
    background_color: '#f8fafc',
    theme_color: '#4f46e5',
    categories: ['education', 'productivity', 'business'],
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
