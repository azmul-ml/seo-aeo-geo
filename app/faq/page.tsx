import { constructMetadata } from '@/lib/seo';
import { schemasForFaqPage } from '@/lib/page-schemas';
import { JsonLd } from '@/components/JsonLd';
import { FaqAccordion } from '@/components/FaqAccordion';
import { AnswerBlock } from '@/components/AnswerBlock';
import { TableOfContents } from '@/components/TableOfContents';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { mockFaqs } from '@/lib/utils';

export const dynamic = 'force-static';
export const revalidate = false;
export const metadata = constructMetadata({
  title: 'Search Optimization FAQ | AEO & GEO Fundamentals',
  description:
    'Get direct, conversational answers about search engine optimization (SEO), Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO).',
  path: '/faq',
});

/**
 * FAQPage Component
 * 
 * WHY AEO & VOICE SEARCH:
 * - Direct answers: First 2 sentences of descriptions contain clear, declarative answers.
 * - Semantic structures: Using Table of Contents and FaqAccordion details elements.
 * - FAQPage JSON-LD: Targets rich snippets and conversational assistant answers.
 */
export default function FaqPage() {
  const crumbs = [{ name: 'FAQ', item: '/faq' }];

  // Headings mapped for TOC targeting (AEO jump-to-links optimization)
  const tocItems = [
    { id: 'aeo-definition', text: 'What is AEO?', depth: 2 },
    { id: 'geo-definition', text: 'What is GEO?', depth: 2 },
    { id: 'faqs-accordion', text: 'Frequently Asked Questions', depth: 2 },
  ];

  return (
    <>
      {/* WebPage Schema */}
      <JsonLd canonicalPath="/faq" schemas={schemasForFaqPage()} />
      <div className="bg-slate-50 min-h-screen">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs crumbs={crumbs} />

        <div className="max-w-6xl mx-auto px-4 py-10 sm:px-6 lg:py-14">
          {/* Header Panel */}
          <header className="text-center space-y-4 mb-12">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Search Optimization FAQ
            </h1>
            <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed font-medium">
              Conversational definitions and direct answers designed to resolve query intents for voice assistants, answer bots, and traditional layouts.
            </p>
            <div className="max-w-xl mx-auto text-left">
              <AnswerBlock
                question="What is the difference between SEO, AEO, and GEO?"
                answer="SEO ranks pages in link-based search results. AEO formats direct answers for voice and featured snippets. GEO structures citations and machine-readable exports so LLMs cite your content in AI-generated answers."
              />
            </div>
          </header>

          {/* Grid Layout (Content + Table of Contents Sidebar) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sidebar Table of Contents (3 cols) */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24">
              <TableOfContents items={tocItems} />
            </aside>

            {/* Main Content Area (8 cols) */}
            <div className="lg:col-span-8 space-y-12 text-left">
              {/* Question Definition 1: AEO */}
              <section id="aeo-definition" className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-2xs space-y-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full"></span>
                  What is Answer Engine Optimization (AEO)?
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  <strong>Answer Engine Optimization (AEO) is the practice of structuring and phrasing digital content so conversational systems and voice assistants can extract a direct answer to a user query.</strong> Voice search tools, mobile widgets, and featured snippet engines index these direct definitions to deliver immediate solutions without requiring page browsing.
                </p>
                <p className="text-xs text-slate-400 font-medium">
                  Voice search friendly signal: Conversational phrasing, short definition, clear headings.
                </p>
              </section>

              {/* Question Definition 2: GEO */}
              <section id="geo-definition" className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-2xs space-y-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full"></span>
                  What is Generative Engine Optimization (GEO)?
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  <strong>Generative Engine Optimization (GEO) is the strategy of structuring web information so LLM-powered search systems (like Google AI Overviews and Perplexity) select and cite it in their synthesized responses.</strong> GEO relies on establishing verifiable credentials (E-E-A-T), adding authoritative references, resolving entity relationships clearly, and providing unique factual insight.
                </p>
                <p className="text-xs text-slate-400 font-medium">
                  LLM indexing signal: Factual claims backed by credentials, disambiguated concepts, direct references.
                </p>
              </section>

              {/* FAQ Accordion Section */}
              <section id="faqs-accordion" className="space-y-6">
                <div className="border-b border-slate-200 pb-3">
                  <h2 className="text-xl font-bold text-slate-900">
                    Frequently Asked Questions Index
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Expand cards to view semantic FAQ structures configured with JSON-LD schemas.
                  </p>
                </div>

                <FaqAccordion items={mockFaqs} />
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
