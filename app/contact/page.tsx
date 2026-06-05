import type { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo';
import { schemasForTrustPage } from '@/lib/page-schemas';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = constructMetadata({
  title: 'Contact TechKnowledge Hub',
  description: 'Contact our editorial team for corrections, partnerships, and technical SEO inquiries.',
  path: '/contact',
});

export default function ContactPage() {
  const crumbs = [{ name: 'Contact', item: '/contact' }];

  return (
    <>
      <JsonLd
        canonicalPath="/contact"
        schemas={schemasForTrustPage('/contact', 'Contact', 'Contact information for TechKnowledge Hub.')}
      />
      <Breadcrumbs crumbs={crumbs} />
      <div className="bg-slate-50 min-h-screen py-10">
        <main className="max-w-2xl mx-auto px-4 space-y-6 text-left">
          <header>
            <h1 className="text-3xl font-black text-slate-900">Contact Us</h1>
            <p className="text-sm text-slate-600 mt-2">
              Reach the editorial and support teams for fact-checking, press, and product questions.
            </p>
          </header>
          <section className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 text-sm text-slate-700">
            <dl>
              <dt className="font-bold text-slate-900">Editorial</dt>
              <dd>
                <a href="mailto:editorial@techknowledgehub.example.com" className="text-indigo-600 hover:underline">
                  editorial@techknowledgehub.example.com
                </a>
              </dd>
            </dl>
            <dl>
              <dt className="font-bold text-slate-900">Support</dt>
              <dd>
                <a href="mailto:support@techknowledgehub.example.com" className="text-indigo-600 hover:underline">
                  support@techknowledgehub.example.com
                </a>
              </dd>
            </dl>
            <dl>
              <dt className="font-bold text-slate-900">Phone</dt>
              <dd>
                <a href="tel:+15550199" className="text-indigo-600 hover:underline">
                  +1-555-0199
                </a>
              </dd>
            </dl>
            <p>
              See also our <Link href="/about" className="text-indigo-600 hover:underline">About</Link> and{' '}
              <Link href="/editorial-policy" className="text-indigo-600 hover:underline">Editorial Policy</Link>{' '}
              pages.
            </p>
          </section>
        </main>
      </div>
    </>
  );
}
