import type { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo';
import { schemasForTrustPage } from '@/lib/page-schemas';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ArticleCard } from '@/components/ArticleCard';
import { mockArticles } from '@/lib/utils';

type SearchParams = Promise<{
  q?: string;
}>;

interface SearchPageProps {
  searchParams: SearchParams;
}

/**
 * Dynamic Metadata Generator
 * 
 * WHY SEO:
 * - Crawl Budget: Internal search result pages MUST be marked as `noindex, nofollow` 
 *   to prevent search crawlers from wasting indexing resources on infinite search parameter variations.
 */
export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const searchTerm = q || '';

  return constructMetadata({
    title: searchTerm ? `Search Results for "${searchTerm}"` : 'Search Our Knowledge Hub',
    description: 'Find articles and step-by-step guides regarding Technical SEO, Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO).',
    path: `/search${searchTerm ? `?q=${encodeURIComponent(searchTerm)}` : ''}`,
    noIndex: true, // Crucial parameter to inject noindex tag in head
  });
}

/**
 * Search Page Component
 * 
 * WHY:
 * - Interactivity & Crawl Budget: Handled completely on the server-side without hydration lag.
 * - Prevents indexing: Direct canonical mapping combined with noindex declarations.
 */
export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = (q || '').toLowerCase().trim();

  // Filter article items matching search queries
  const results = query
    ? mockArticles.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.description.toLowerCase().includes(query) ||
          article.content.toLowerCase().includes(query) ||
          article.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    : [];

  const crumbs = [{ name: 'Search', item: '/search' }];
  const canonicalPath = `/search${q ? `?q=${encodeURIComponent(q)}` : ''}`;

  return (
    <>
      <JsonLd
        canonicalPath={canonicalPath}
        schemas={schemasForTrustPage(
          canonicalPath.split('?')[0],
          q ? `Search: ${q}` : 'Search',
          'Search TechKnowledge Hub articles and guides.'
        )}
      />
      <Breadcrumbs crumbs={crumbs} />

      <div className="bg-slate-50 min-h-screen py-10">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <header className="space-y-2 text-left">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Search Knowledge Hub</h1>
            <p className="text-sm text-slate-500">
              Query our research repository for crawl optimization tutorials, AEO snippets and E-E-A-T guides.
            </p>
          </header>

          {/* Keyword Search Input Form */}
          <section className="bg-white border border-slate-200 p-6 rounded-2xl shadow-2xs text-left">
            <form action="/search" className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                name="q"
                defaultValue={q || ''}
                placeholder="Type keywords (e.g. sitemap, voice search, citations)..."
                required
                className="flex-grow bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-xs transition-colors duration-150"
              >
                Find Articles
              </button>
            </form>
          </section>

          {/* Search results list */}
          <section className="space-y-6">
            {query ? (
              <div>
                <h2 className="text-sm font-bold text-slate-500 text-left uppercase tracking-wider mb-4">
                  Found {results.length} results for &ldquo;{q}&rdquo;
                </h2>
                
                {results.length > 0 ? (
                  <div className="grid gap-6 sm:grid-cols-2">
                    {results.map((article) => (
                      <ArticleCard key={article.id} article={article} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl">
                    <svg className="w-10 h-10 text-slate-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-slate-500 text-sm font-bold">No results matched your search term.</p>
                    <p className="text-slate-400 text-xs mt-1">Try other keywords like &quot;AEO&quot;, &quot;SEO&quot;, or &quot;Next.js&quot;.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl p-6">
                <svg className="w-10 h-10 text-slate-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-slate-400 text-sm font-medium">Enter search keywords to browse index matches.</p>
                <div className="flex justify-center gap-3 mt-4 text-xs font-semibold text-indigo-600">
                  <Link href="/search?q=sitemap" className="hover:underline">sitemap</Link>
                  <span>&bull;</span>
                  <Link href="/search?q=AEO" className="hover:underline">AEO</Link>
                  <span>&bull;</span>
                  <Link href="/search?q=EEAT" className="hover:underline">EEAT</Link>
                  <span>&bull;</span>
                  <Link href="/search?q=citations" className="hover:underline">citations</Link>
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
}
