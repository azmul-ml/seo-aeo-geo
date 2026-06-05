import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo';
import { schemasForGuide } from '@/lib/page-schemas';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AuthorCard } from '@/components/AuthorCard';
import { TableOfContents } from '@/components/TableOfContents';
import { authors, reviewers, formatDate } from '@/lib/utils';

interface GuidePageProps {
  params: Promise<{ topic: string }>;
}

export async function generateStaticParams() {
  return Object.keys(mockGuides).map((topic) => ({ topic }));
}

interface GuideContent {
  topic: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  author: typeof authors.alex;
  reviewer: typeof reviewers.elena;
  citations: { text: string; url: string }[];
  contentHtml: string;
  toc: { id: string; text: string; depth: number }[];
}

// Mock GEO detailed guides
const mockGuides: Record<string, GuideContent> = {
  'generative-engine-optimization': {
    topic: 'generative-engine-optimization',
    title: 'Generative Engine Optimization (GEO) & LLM Citation Strategy',
    description: 'A scientific analysis of information indexing in LLM search assistants. Learn the factual, structural, and citation metrics required for generative search.',
    datePublished: '2026-04-01T08:00:00Z',
    dateModified: '2026-05-30T09:45:00Z',
    author: authors.taylor,
    reviewer: reviewers.elena,
    citations: [
      { text: 'GEO: Generative Engine Optimization (Paper - arXiv:2311.09747)', url: 'https://arxiv.org/abs/2311.09747' },
      { text: 'Retrieval-Augmented Generation for Knowledge-Intensive Tasks (NeurIPS)', url: 'https://arxiv.org/abs/2005.11401' },
      { text: 'W3C Semantic Web Specifications', url: 'https://www.w3.org/standards/semanticweb/' }
    ],
    toc: [
      { id: 'geo-mechanics', text: 'How Generative Search Works', depth: 2 },
      { id: 'citations-authority', text: 'Citations and Authority Metrics', depth: 2 },
      { id: 'claim-source', text: 'The Claim-Source Structure', depth: 2 },
      { id: 'eeat-verification', text: 'Topical Authority Verification', depth: 2 },
    ],
    contentHtml: `
<section id="geo-mechanics" class="space-y-4">
  <h2>How Generative Search Works</h2>
  <p>
    Generative Search Engines (such as Perplexity, Gemini, and Google\'s AI Overviews) utilize a technology named <strong>Retrieval-Augmented Generation (RAG)</strong>. Unlike traditional engines that search indices for matching keywords, a RAG pipeline converts user queries into semantic embeddings, retrieves relevant document chunks from the vector database, and prompts an LLM to synthesize a unified response.
  </p>
  <p>
    Research indicates that to be cited in these synthesized responses, documents must demonstrate high information density and structural clarity. The LLM acts as an editor, selecting chunks that offer the most direct, verifiable support for its generated narrative.
  </p>
</section>

<section id="citations-authority" class="space-y-4">
  <h2>Citations and Authority Metrics</h2>
  <p>
    According to the seminal research paper <a href="https://arxiv.org/abs/2311.09747" target="_blank" rel="noopener noreferrer">GEO: Generative Engine Optimization</a>, incorporating authoritative citations is the most influential factor in improving an article\'s visibility in generative search summaries.
  </p>
  <p>
    AI engines prioritize citing resources that links directly to primary sources, such as governmental domains (<code>.gov</code>), academic institutions (<code>.edu</code>), or recognized standards bodies (like the <a href="https://www.w3.org" target="_blank" rel="noopener noreferrer">W3C</a>). This helps the generative engine defend its answers against hallucinations, aligning with search quality standards.
  </p>
</section>

<section id="claim-source" class="space-y-4">
  <h2>The Claim-Source Structure</h2>
  <p>
    Traditional writing often wraps facts in descriptive prose. For GEO, clear assertions are preferred. Structure factual details in a direct <strong>"Claim-and-Source"</strong> layout:
  </p>
  <div class="my-6 bg-slate-50 border-l-4 border-indigo-600 p-5 rounded-r-xl space-y-2">
    <p class="font-bold text-slate-900 text-sm">Factual Formula for LLMs:</p>
    <blockquote class="italic text-xs text-slate-700">
      "[Topic Entity] has [Feature X] as verified by [Authoritative Entity] in [Reference Doc]."
    </blockquote>
    <p class="text-xs text-slate-500 font-medium">
      Example: "Next.js App Router renders static layout containers as defined by React Server Component specs."
    </p>
  </div>
  <p>
    This declarative structure allows vector search pipelines to match user query embeddings directly to your claim nodes, maximizing the probability of extraction during retrieval phases.
  </p>
</section>

<section id="eeat-verification" class="space-y-4">
  <h2>Topical Authority Verification</h2>
  <p>
    E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) is no longer a subjective guideline; it is a critical ranking factor in generative search. AI systems utilize entity extraction to check if the author of a document is a verified expert in that field.
  </p>
  <p>
    Linking your author bio to external authority indices (such as Google Scholar or LinkedIn) and including credentials in the schema markup helps the system resolve the creator\'s entity correctly, boosting the page\'s trustworthiness score.
  </p>
</section>
    `,
  },
  'entity-disambiguation': {
    topic: 'entity-disambiguation',
    title: 'Entity Disambiguation: Structuring Web Relationships',
    description: 'Master the principles of entity linking. Learn how to explicitly define terms and build relationships that search graphs and language models understand without ambiguity.',
    datePublished: '2026-04-10T09:00:00Z',
    dateModified: '2026-06-01T11:30:00Z',
    author: authors.alex,
    reviewer: reviewers.elena,
    citations: [
      { text: 'Schema.org Entity Disambiguation', url: 'https://schema.org/docs/datamodel.html' },
      { text: 'W3C RDF Semantic Linkage Guide', url: 'https://www.w3.org/TR/rdf11-concepts/' }
    ],
    toc: [
      { id: 'entity-disambiguation-concept', text: 'What is Entity Disambiguation?', depth: 2 },
      { id: 'why-llms-need-disambiguation', text: 'Why LLMs Need Semantic Linking', depth: 2 },
      { id: 'schema-implementation', text: 'Schema Implementation Strategies', depth: 2 },
    ],
    contentHtml: `
<section id="entity-disambiguation-concept" class="space-y-4">
  <h2>What is Entity Disambiguation?</h2>
  <p>
    <strong>Entity Disambiguation is the process of identifying unique real-world concepts (entities) in text and linking them to their correct definitions.</strong> For example, the term "React" can refer to a psychological state, a chemical process, or a JavaScript library. In web optimization, disambiguation ensures search bots link terms to their exact conceptual identities.
  </p>
  <p>
    Without clear entity mapping, search engines and LLM vector layers must rely on contextual heuristics, which increases the likelihood of classification errors.
  </p>
</section>

<section id="why-llms-need-disambiguation" class="space-y-4">
  <h2>Why LLMs Need Semantic Linking</h2>
  <p>
    Large Language Models encode knowledge inside multidimensional vector spaces. When an LLM retrieves information for a search query, it evaluates the relationships between query concepts and document entities.
  </p>
  <p>
    By explicitly linking key concepts in your articles to authoritative schemas (like <a href="https://schema.org" target="_blank" rel="noopener noreferrer">Schema.org</a> or Wikipedia), you assist the LLM in constructing accurate relationship edges, improving indexation accuracy.
  </p>
</section>

<section id="schema-implementation" class="space-y-4">
  <h2>Schema Implementation Strategies</h2>
  <p>
    To resolve entity ambiguity, implement these structural parameters in your pages:
  </p>
  <ul>
    <li><strong>SameAs Linking:</strong> Use the <code>sameAs</code> schema attribute inside entity definitions to point directly to authoritative, verified profiles.</li>
    <li><strong>Explicit Parent Associations:</strong> Connect sub-entities (like authors or articles) directly to parent elements (like publishers or websites) using unique ID hashes.</li>
    <li><strong>Authoritative External References:</strong> When discussing technical topics, link terms to their primary definitions on official documentation sites (like the <a href="https://www.w3.org" target="_blank" rel="noopener noreferrer">W3C</a>).</li>
  </ul>
</section>
    `,
  },
};

/**
 * Dynamic Metadata
 */
export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { topic } = await params;
  const guide = mockGuides[topic];

  if (!guide) return {};

  return constructMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${topic}`,
    type: 'article',
    publishedTime: guide.datePublished,
    modifiedTime: guide.dateModified,
    authors: [guide.author.name],
  });
}

/**
 * GEO Guides Page Component
 * 
 * WHY GEO:
 * - Entity linking: Renders deep entity disambiguation, outbound references.
 * - Credibility: Display Peer Review status and author credentials visibly and in JSON-LD.
 * - Table of Contents: Enables deep structural navigability.
 */
export default async function GuidePage({ params }: GuidePageProps) {
  const { topic } = await params;
  const guide = mockGuides[topic];

  if (!guide) {
    notFound();
  }

  const crumbs = [
    { name: 'Guides', item: '/blog' },
    { name: guide.title, item: `/guides/${topic}` },
  ];

  return (
    <>
      {/* 1. Article and WebPage schemas (E-E-A-T and ReviewedBy validation) */}
      <JsonLd
        canonicalPath={`/guides/${topic}`}
        schemas={schemasForGuide(
          topic,
          guide.title,
          guide.description,
          {
            slug: `guides/${guide.topic}`,
            title: guide.title,
            description: guide.description,
            image: '/images/default-og.jpg',
            datePublished: guide.datePublished,
            dateModified: guide.dateModified,
            authorName: guide.author.name,
            authorBio: guide.author.bio,
            authorCredentials: guide.author.credentials,
            reviewedByName: guide.reviewer.name,
            reviewedByBio: guide.reviewer.bio,
          }
        )}
      />

      <Breadcrumbs crumbs={crumbs} />

      <div className="bg-slate-50 min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          
          {/* Header Coverage */}
          <header className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-2xs mb-8 text-left space-y-4">
            <span className="inline-block bg-indigo-50 text-indigo-700 border border-indigo-150 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
              Generative Engine Study
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {guide.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 pt-2 border-t border-slate-50">
              <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 border border-emerald-150 px-2.5 py-1 rounded-md">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                Updated: {formatDate(guide.dateModified)}
              </span>
              
              <span className="flex items-center gap-1 text-blue-600 bg-blue-50 border border-blue-150 px-2.5 py-1 rounded-md">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Reviewed By {guide.reviewer.name}
              </span>
            </div>
          </header>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Sidebar (4 cols) */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
              <TableOfContents items={guide.toc} />
            </aside>

            {/* Main Content Area (8 cols) */}
            <main className="lg:col-span-8 space-y-10">
              {/* Dynamic HTML Content */}
              <article 
                className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-2xs text-left article-body"
                dangerouslySetInnerHTML={{ __html: guide.contentHtml }}
              />

              {/* Authoritative Citations list */}
              {guide.citations && guide.citations.length > 0 && (
                <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-2xs space-y-4 text-left">
                  <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-1.5">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Authoritative Citations & Reference Base
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-xs font-semibold text-slate-600">
                    {guide.citations.map((cite, idx) => (
                      <li key={idx}>
                        <a href={cite.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                          {cite.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {/* E-E-A-T Team Cards */}
              <section className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 text-left">Editorial and Peer Review Team</h3>
                <div className="space-y-4">
                  <AuthorCard author={guide.author} role="Author" />
                  <AuthorCard 
                    author={{
                      name: guide.reviewer.name,
                      avatar: '',
                      bio: guide.reviewer.bio,
                      credentials: guide.reviewer.credentials,
                      sameAs: []
                    }} 
                    role="Reviewer" 
                    reviewedBy={true} 
                  />
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
