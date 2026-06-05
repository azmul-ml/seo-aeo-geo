import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { constructMetadata, SITE_URL } from '@/lib/seo';
import { schemasForBlogPost } from '@/lib/page-schemas';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { TableOfContents, TocItem } from '@/components/TableOfContents';
import { AuthorCard } from '@/components/AuthorCard';
import { mockArticles, formatDate, calculateReadingTime } from '@/lib/utils';
import { ContentSummary } from '@/components/ContentSummary';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedEntities } from '@/components/RelatedEntities';

export async function generateStaticParams() {
  return mockArticles.map((a) => ({ slug: a.slug }));
}

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

/**
 * Dynamic Metadata Generator
 * 
 * WHY SEO & GEO:
 * - Specific metadata descriptions and Open Graph metrics for each unique article slug.
 * - Adds article-specific publishing dates, modification timestamps, and authors.
 */
export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  const article = mockArticles.find((a) => a.slug === slug);

  if (!article) return {};

  return constructMetadata({
    title: article.title,
    description: article.description,
    path: `/blog/${slug}`,
    image: article.image,
    type: 'article',
    publishedTime: article.datePublished,
    modifiedTime: article.dateModified,
    authors: [article.author.name],
  });
}

/**
 * Helper to dynamically extract headings (H2 & H3) from raw HTML content
 * to build Table of Contents anchor mappings.
 */
function extractHeadings(content: string): TocItem[] {
  const headingRegex = /<(h[23])>(.*?)<\/h[23]>/g;
  const headings: TocItem[] = [];
  let match;
  
  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[2].replace(/<[^>]*>/g, '');
    const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    const depth = match[1] === 'h2' ? 2 : 3;
    headings.push({ id, text, depth });
  }
  return headings;
}

/**
 * Helper to dynamically inject id attributes into raw heading tags (<h2> and <h3>)
 * so anchor links in Table of Contents jump to correct positions.
 */
function injectHeadingIds(content: string): string {
  return content.replace(/<(h[23])>(.*?)<\/h[23]>/g, (match, tag, text) => {
    const cleanText = text.replace(/<[^>]*>/g, '');
    const id = cleanText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    return `<${tag} id="${id}">${text}</${tag}>`;
  });
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = await params;
  const article = mockArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const tocItems = extractHeadings(article.content);
  const processedContent = injectHeadingIds(article.content);
  
  const crumbs = [
    { name: 'Blog', item: '/blog' },
    { name: article.title, item: `/blog/${slug}` },
  ];

  // Sharing links (Bonus Feature: pre-populated Open Graph data)
  const shareTitle = encodeURIComponent(article.title);
  const shareUrl = encodeURIComponent(`${SITE_URL}/blog/${slug}`);
  const twitterShare = `https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`;
  const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;

  return (
    <>
      {/* 1. Article Structured Schema Markup (EEAT reviewedBy & Publisher) */}
      <JsonLd canonicalPath={`/blog/${slug}`} schemas={schemasForBlogPost(article)} />

      {/* 2. Breadcrumbs visual navigation + breadcrumb schema */}
      <Breadcrumbs crumbs={crumbs} />

      <div className="bg-slate-50 min-h-screen">
        {/* Header Cover Panel */}
        <header className="bg-white border-b border-slate-200 py-12 md:py-16 text-left">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="space-y-4">
              <span className="inline-block bg-indigo-50 text-indigo-700 border border-indigo-150 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                {article.category}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                {article.title}
              </h1>

              {/* Freshness, Peer Review and Reading Time badges */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 pt-2">
                <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 border border-emerald-150 px-2.5 py-1 rounded-md">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                  Last Updated: {formatDate(article.dateModified)}
                </span>
                
                {article.reviewedBy && (
                  <span className="flex items-center gap-1 text-blue-600 bg-blue-50 border border-blue-150 px-2.5 py-1 rounded-md">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Peer Reviewed By {article.reviewedBy.name}
                  </span>
                )}

                <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">
                  {calculateReadingTime(article.content)} min read
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Sidebar Grid Layout */}
        <div className="max-w-5xl mx-auto px-4 py-10 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Sidebar Table of Contents (4 cols) */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
              <TableOfContents items={tocItems} />
              
              {/* Share Component */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs text-left">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Share Guide</h4>
                <div className="flex gap-2">
                  <a
                    href={twitterShare}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-slate-900 hover:bg-black text-white text-xs font-bold py-2 rounded-lg text-center transition-colors"
                  >
                    X / Twitter
                  </a>
                  <a
                    href={linkedinShare}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2 rounded-lg text-center transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </aside>

            {/* Right Column: Main Article Body (8 cols) */}
            <div className="lg:col-span-8 space-y-10">
              {article.executiveSummary && (
                <ContentSummary
                  summary={article.executiveSummary}
                  takeaways={article.keyTakeaways}
                />
              )}

              {/* Semantic Article Tag */}
              <article 
                className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-2xs text-left article-body"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />

              {/* Fact Checking and Authoritative Citations Index (GEO Optimization) */}
              {((article.facts && article.facts.length > 0) || (article.citations && article.citations.length > 0)) && (
                <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-2xs space-y-6 text-left">
                  <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-1.5">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Factual Claims and Research Citations
                  </h3>

                  {/* Claims checklist */}
                  {article.facts && article.facts.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Verified Statements</h4>
                      <ul className="space-y-3">
                        {article.facts.map((fact, idx) => (
                          <li key={idx} className="bg-emerald-50/50 border-l-2 border-emerald-500 p-3 rounded-r-lg text-xs leading-relaxed">
                            <span className="font-semibold text-emerald-950">Claim:</span> {fact.claim}
                            <span className="block mt-1 font-bold text-slate-500">
                              Source: <a href={fact.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">{fact.source}</a>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Academic Reference bibliography list */}
                  {article.citations && article.citations.length > 0 && (
                    <div className="space-y-3 pt-3 border-t border-slate-100">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Primary Resources</h4>
                      <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-600 font-medium">
                        {article.citations.map((cite, idx) => (
                          <li key={idx}>
                            <a href={cite.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-semibold">
                              {cite.text}
                            </a>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </section>
              )}

              {article.pageFaqs && article.pageFaqs.length > 0 && (
                <section>
                  <h3 className="text-base font-bold text-slate-900 text-left mb-4">Article FAQ</h3>
                  <FaqAccordion items={article.pageFaqs} />
                </section>
              )}

              <RelatedEntities
                title="Related articles"
                links={mockArticles
                  .filter((a) => a.slug !== article.slug)
                  .slice(0, 3)
                  .map((a) => ({
                    href: `/blog/${a.slug}`,
                    label: a.title,
                    type: a.category,
                  }))}
              />

              <p className="text-xs text-slate-500 text-left">
                Machine-readable:{' '}
                <a href={`/api/ai/articles/${slug}`} className="text-indigo-600 hover:underline">
                  /api/ai/articles/{slug}
                </a>
              </p>

              {/* Author & Reviewer Biography Panels */}
              <section className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 text-left">Authorship and Review Profiles</h3>
                
                <div className="space-y-4">
                  {/* Author Detail */}
                  <AuthorCard author={article.author} role="Author" />

                  {/* Reviewer Detail if available */}
                  {article.reviewedBy && (
                    <AuthorCard 
                      author={{
                        name: article.reviewedBy.name,
                        avatar: '',
                        bio: article.reviewedBy.bio,
                        credentials: article.reviewedBy.credentials,
                        sameAs: []
                      }} 
                      role="Reviewer" 
                      reviewedBy={true} 
                    />
                  )}
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
