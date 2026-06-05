import type { Metadata } from 'next';
import { SeoLink } from '@/components/SeoLink';
import { constructMetadata } from '@/lib/seo';
import { schemasForTrustPage } from '@/lib/page-schemas';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const dynamic = 'force-static';
export const revalidate = false;
export const metadata: Metadata = constructMetadata({
  title: 'Editorial Policy & Fact-Checking Standards',
  description:
    'Our editorial standards for peer review, citations, corrections, and E-E-A-T transparency across SEO, AEO, and GEO content.',
  path: '/editorial-policy',
});

export default function EditorialPolicyPage() {
  const crumbs = [{ name: 'Editorial Policy', item: '/editorial-policy' }];

  return (
    <>
      <JsonLd
        canonicalPath="/editorial-policy"
        schemas={schemasForTrustPage(
          '/editorial-policy',
          'Editorial Policy',
          'Editorial and fact-checking standards.'
        )}
      />
      <Breadcrumbs crumbs={crumbs} />
      <article className="bg-slate-50 min-h-screen py-10">
        <div className="max-w-3xl mx-auto px-4 text-left space-y-6">
          <header>
            <h1 className="text-3xl font-black text-slate-900">Editorial Policy</h1>
            <p className="text-sm text-slate-600 mt-2">
              How we research, review, update, and cite content for search engines and AI answer systems.
            </p>
          </header>
          <section className="bg-white border border-slate-200 rounded-2xl p-6 text-sm text-slate-700 space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Standards</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Technical claims must link to primary sources (W3C, Schema.org, Google Search Central, arXiv).</li>
              <li>Guides with implementation risk undergo peer review by qualified reviewers.</li>
              <li>Authors disclose credentials; Person schema reflects verified profiles.</li>
              <li>Pages display last-updated timestamps and correction contact paths.</li>
            </ul>
            <p>
              Report corrections via{' '}
              <SeoLink href="/contact" className="text-indigo-600 hover:underline">
                Contact
              </SeoLink>{' '}
              or email{' '}
              <a href="mailto:editorial@techknowledgehub.example.com" className="text-indigo-600 hover:underline">
                editorial@techknowledgehub.example.com
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
