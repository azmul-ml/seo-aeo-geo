import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ArticleCard } from '@/components/ArticleCard';
import { SeoLink } from '@/components/SeoLink';
import { mockArticles } from '@/lib/utils';

/** SSR on each request — full HTML reload when the search form is submitted. */
export const dynamic = 'force-dynamic';

type SearchParams = Promise<{
  q?: string;
}>;

interface SearchPageProps {
  searchParams: SearchParams;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const searchTerm = q || '';

  return constructMetadata({
    title: searchTerm ? `Search Results for "${searchTerm}"` : 'Search Our Knowledge Hub',
    description:
      'Find articles and step-by-step guides regarding Technical SEO, Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO).',
    path: `/search${searchTerm ? `?q=${encodeURIComponent(searchTerm)}` : ''}`,
    noIndex: true,
  });
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = (q || '').toLowerCase().trim();

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

  return (
    <>
      <Breadcrumbs crumbs={crumbs} />

      <div className="bg-slate-50 min-h-screen py-10">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <header className="space-y-2 text-left">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Search Knowledge Hub</h1>
            <p className="text-sm text-slate-500">
              Query our research repository. Submissions trigger a full page reload with server-rendered
              results.
            </p>
          </header>

          <section className="bg-white border border-slate-200 p-6 rounded-2xl shadow-2xs text-left">
            <form action="/search" method="get" className="flex flex-col sm:flex-row gap-3">
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
                    <p className="text-slate-500 text-sm font-bold">No results matched your search term.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl p-6">
                <p className="text-slate-400 text-sm font-medium">Enter search keywords to browse index matches.</p>
                <div className="flex justify-center gap-3 mt-4 text-xs font-semibold text-indigo-600">
                  <SeoLink href="/search?q=sitemap" className="hover:underline">
                    sitemap
                  </SeoLink>
                  <span>&bull;</span>
                  <SeoLink href="/search?q=AEO" className="hover:underline">
                    AEO
                  </SeoLink>
                  <span>&bull;</span>
                  <SeoLink href="/search?q=EEAT" className="hover:underline">
                    EEAT
                  </SeoLink>
                  <span>&bull;</span>
                  <SeoLink href="/search?q=citations" className="hover:underline">
                    citations
                  </SeoLink>
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
}
