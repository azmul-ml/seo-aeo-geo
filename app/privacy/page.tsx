import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { schemasForTrustPage } from '@/lib/page-schemas';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const dynamic = 'force-static';
export const revalidate = false;
export const metadata: Metadata = constructMetadata({
  title: 'Privacy Policy',
  description: 'How TechKnowledge Hub collects, uses, and protects personal data.',
  path: '/privacy',
});

export default function PrivacyPage() {
  const crumbs = [{ name: 'Privacy Policy', item: '/privacy' }];

  return (
    <>
      <JsonLd
        canonicalPath="/privacy"
        schemas={schemasForTrustPage('/privacy', 'Privacy Policy', 'Privacy policy for TechKnowledge Hub.')}
      />
      <Breadcrumbs crumbs={crumbs} />
      <article className="bg-slate-50 min-h-screen py-10">
        <div className="max-w-3xl mx-auto px-4 prose prose-slate text-left">
          <header>
            <h1 className="text-3xl font-black text-slate-900">Privacy Policy</h1>
            <p className="text-xs text-slate-500 mt-2">
              Last updated: <time dateTime="2026-06-01">June 1, 2026</time>
            </p>
          </header>
          <section className="mt-8 space-y-4 text-sm text-slate-700">
            <p>
              TechKnowledge Hub respects your privacy. We collect minimal analytics to improve content quality and
              do not sell personal data to third parties.
            </p>
            <h2 className="text-lg font-bold text-slate-900">Data we collect</h2>
            <p>Newsletter email addresses (with consent), server logs, and aggregated usage metrics.</p>
            <h2 className="text-lg font-bold text-slate-900">Your rights</h2>
            <p>
              You may request access, correction, or deletion of personal data by contacting{' '}
              <a href="mailto:privacy@techknowledgehub.example.com" className="text-indigo-600">
                privacy@techknowledgehub.example.com
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
