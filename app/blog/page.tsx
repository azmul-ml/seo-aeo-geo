import type { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo';
import { schemasForBlogIndex } from '@/lib/page-schemas';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ArticleCard } from '@/components/ArticleCard';
import { mockArticles } from '@/lib/utils';


// Page size for demonstrating pagination (we have 3 articles, so 2 per page triggers pagination)
const PAGE_SIZE = 2;

type SearchParams = Promise<{
  q?: string;
  page?: string;
  category?: string;
}>;

interface BlogPageProps {
  searchParams: SearchParams;
}

/**
 * Dynamic Metadata Generator for Blog Listing
 * 
 * WHY:
 * - Dynamic Indexing: Adjusts page title and canonical URL dynamically based on page numbers 
 *   and search queries, preventing search engine indexing conflicts.
 * - Prevents duplicate content indexation for filtered states (canonical URL maps parameters).
 */
export async function generateMetadata({ searchParams }: BlogPageProps): Promise<Metadata> {
  const params = await searchParams;
  const page = parseInt(params.page || '1', 10);
  const q = params.q || '';
  const category = params.category || '';

  let title = 'Technical SEO, AEO, and GEO Article Library';
  let description = 'Browse our comprehensive, peer-reviewed collection of technology guides, search optimization metrics, and metadata tutorials.';
  
  if (q) {
    title = `Search Results for "${q}" (Page ${page})`;
  } else if (category) {
    title = `${category} Framework Articles (Page ${page})`;
  } else if (page > 1) {
    title = `Article Library - Page ${page}`;
  }

  // Generate canonical matching current page numbers
  const queryParts = [];
  if (q) queryParts.push(`q=${encodeURIComponent(q)}`);
  if (category) queryParts.push(`category=${encodeURIComponent(category)}`);
  if (page > 1) queryParts.push(`page=${page}`);
  const queryString = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';

  return constructMetadata({
    title,
    description,
    path: `/blog${queryString}`,
    noIndex: Boolean(q),
  });
}

/**
 * Blog Listing Page Component
 * 
 * WHY SEO & AEO:
 * - Query filters: Resolves query searches and categories on the server side, serving optimized HTML index lists.
 * - rel="prev/next" navigation links: Directs crawl bots through the paginated article indices.
 */
export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedParams = await searchParams;
  const q = (resolvedParams.q || '').toLowerCase().trim();
  const page = parseInt(resolvedParams.page || '1', 10);
  const category = resolvedParams.category || '';

  // 1. Filter articles based on query parameters
  let filteredArticles = mockArticles;
  if (q) {
    filteredArticles = filteredArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(q) ||
        article.description.toLowerCase().includes(q) ||
        article.content.toLowerCase().includes(q) ||
        article.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }
  if (category) {
    filteredArticles = filteredArticles.filter(
      (article) => article.category.toUpperCase() === category.toUpperCase()
    );
  }

  // 2. Compute Pagination metrics
  const totalArticles = filteredArticles.length;
  const totalPages = Math.ceil(totalArticles / PAGE_SIZE);
  const currentPage = Math.max(1, Math.min(page, totalPages || 1));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

  // Helper links for sitemap pagination paths
  const getPageLink = (pageNum: number) => {
    const queryParts = [];
    if (resolvedParams.q) queryParts.push(`q=${resolvedParams.q}`);
    if (resolvedParams.category) queryParts.push(`category=${resolvedParams.category}`);
    if (pageNum > 1) queryParts.push(`page=${pageNum}`);
    return `/blog${queryParts.length > 0 ? `?${queryParts.join('&')}` : ''}`;
  };

  const crumbs = [{ name: 'Blog', item: '/blog' }];
  const canonicalPath = getPageLink(currentPage);

  return (
    <>
      <JsonLd
        canonicalPath={canonicalPath}
        schemas={schemasForBlogIndex(
          'Browse peer-reviewed SEO, AEO, and GEO articles and implementation guides.'
        )}
      />
      <div className="bg-slate-50 min-h-screen">
        {/* Breadcrumbs */}
        <Breadcrumbs crumbs={crumbs} />

        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:py-12 space-y-10">
          <header className="text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Article Library
            </h1>
            <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed font-medium">
              Read technical analysis on crawlers, index algorithms, structure schemas, and AI search optimizations.
            </p>
          </header>

          {/* Search, Categorization, Filter Tools */}
          <section className="bg-white border border-slate-200 p-5 rounded-2xl shadow-2xs space-y-4 flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Category selection */}
            <div className="flex gap-2 w-full md:w-auto">
              <Link
                href="/blog"
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  !category
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                All Categories
              </Link>
              {['SEO', 'AEO', 'GEO'].map((cat) => (
                <Link
                  key={cat}
                  href={`/blog?category=${cat}`}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    category.toUpperCase() === cat.toUpperCase()
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {cat}
                </Link>
              ))}
            </div>

            {/* Keyword Search Input form (targets q parameter) */}
            <form action="/blog" className="flex items-center gap-2 w-full md:w-80">
              <input
                type="text"
                name="q"
                defaultValue={resolvedParams.q || ''}
                placeholder="Search articles..."
                className="flex-grow bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              />
              {category && <input type="hidden" name="category" value={category} />}
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
              >
                Search
              </button>
            </form>
          </section>

          {/* Articles Listing Grid */}
          <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {paginatedArticles.length > 0 ? (
              paginatedArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))
            ) : (
              <div className="sm:col-span-2 text-center py-16 bg-white border border-slate-200 rounded-2xl p-6">
                <p className="text-slate-500 font-bold text-sm">No articles matched your criteria.</p>
                <Link href="/blog" className="mt-4 inline-block text-indigo-600 text-xs font-bold hover:underline">
                  Reset Search Queries
                </Link>
              </div>
            )}
          </section>

          {/* Pagination Navigation Control */}
          {totalPages > 1 && (
            <nav aria-label="Pagination Navigation" className="flex items-center justify-between border-t border-slate-200 pt-6">
              {/* Prev Button */}
              {currentPage > 1 ? (
                <Link
                  href={getPageLink(currentPage - 1)}
                  rel="prev"
                  className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </Link>
              ) : (
                <span className="px-4 py-2 bg-slate-100 border border-slate-100 rounded-xl text-xs font-bold text-slate-400 cursor-not-allowed flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </span>
              )}

              <span className="text-xs text-slate-500 font-semibold">
                Page {currentPage} of {totalPages}
              </span>

              {/* Next Button */}
              {currentPage < totalPages ? (
                <Link
                  href={getPageLink(currentPage + 1)}
                  rel="next"
                  className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center gap-1.5"
                >
                  Next
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ) : (
                <span className="px-4 py-2 bg-slate-100 border border-slate-100 rounded-xl text-xs font-bold text-slate-400 cursor-not-allowed flex items-center gap-1.5">
                  Next
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              )}
            </nav>
          )}
        </div>
      </div>
    </>
  );
}
