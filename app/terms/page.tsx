import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { schemasForTrustPage } from '@/lib/page-schemas';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const dynamic = 'force-static';
export const revalidate = false;
export const metadata: Metadata = constructMetadata({
  title: 'Terms of Service',
  description: 'Terms governing use of TechKnowledge Hub content, tools, and digital products.',
  path: '/terms',
});

export default function TermsPage() {
  const crumbs = [{ name: 'Terms of Service', item: '/terms' }];

  return (
    <>
      <JsonLd
        canonicalPath="/terms"
        schemas={schemasForTrustPage('/terms', 'Terms of Service', 'Terms of service for TechKnowledge Hub.')}
      />
      <Breadcrumbs crumbs={crumbs} />
      <article className="bg-slate-50 min-h-screen py-10">
        <div className="max-w-3xl mx-auto px-4 text-left">
          <header>
            <h1 className="text-3xl font-black text-slate-900">Terms of Service</h1>
            <p className="text-xs text-slate-500 mt-2">
              Last updated: <time dateTime="2026-06-01">June 1, 2026</time>
            </p>
          </header>
          <section className="mt-8 space-y-4 text-sm text-slate-700">
            <p>
              By using TechKnowledge Hub you agree to these terms. Content is provided for educational purposes;
              verify critical SEO decisions against official search engine documentation.
            </p>
            <h2 className="text-lg font-bold text-slate-900">Digital products</h2>
            <p>
              Software licenses are non-transferable unless stated otherwise. Refund terms are listed on each product
              page.
            </p>
            <h2 className="text-lg font-bold text-slate-900">Liability</h2>
            <p>We are not liable for ranking or AI citation outcomes, which depend on many external factors.</p>
          </section>
        </div>
      </article>
    </>
  );
}
