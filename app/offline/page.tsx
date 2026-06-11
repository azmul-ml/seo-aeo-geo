import type { Metadata } from 'next';
import { SeoLink } from '@/components/SeoLink';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'You are offline',
  description: 'TechKnowledge Hub is unavailable offline. Reconnect to browse articles and guides.',
  path: '/offline',
  noIndex: true,
});

export default function OfflinePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">Offline</p>
      <h1 className="mt-3 text-3xl font-black text-slate-900">No connection right now</h1>
      <p className="mt-4 text-slate-600 leading-relaxed">
        TechKnowledge Hub needs an internet connection to load articles, guides, and search. Check your network and try
        again.
      </p>
      <SeoLink
        href="/"
        className="inline-block mt-8 px-5 py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
      >
        Retry homepage
      </SeoLink>
    </div>
  );
}
