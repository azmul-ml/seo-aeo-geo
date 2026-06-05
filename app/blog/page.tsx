import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { schemasForBlogIndex } from '@/lib/page-schemas';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ArticleCard } from '@/components/ArticleCard';
import { SeoLink } from '@/components/SeoLink';
import { mockArticles } from '@/lib/utils';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = constructMetadata({
  title: 'Technical SEO, AEO, and GEO Article Library',
  description:
    'Browse our comprehensive, peer-reviewed collection of technology guides, search optimization metrics, and metadata tutorials.',
  path: '/blog',
});

export default function BlogPage() {
  const crumbs = [{ name: 'Blog', item: '/blog' }];

  return (
    <>
      <JsonLd
        canonicalPath="/blog"
        schemas={schemasForBlogIndex(
          'Browse peer-reviewed SEO, AEO, and GEO articles and implementation guides.'
        )}
      />
      <div className="bg-slate-50 min-h-screen">
        <Breadcrumbs crumbs={crumbs} />

        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:py-12 space-y-10">
          <header className="text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Article Library
            </h1>
            <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed font-medium">
              Read technical analysis on crawlers, index algorithms, structure schemas, and AI search
              optimizations. Every page is fully server-rendered for crawlers.
            </p>
          </header>

          <section className="bg-white border border-slate-200 p-5 rounded-2xl shadow-2xs space-y-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <nav className="flex gap-2 w-full md:w-auto flex-wrap" aria-label="Blog categories">
              <SeoLink
                href="/blog"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-xs"
              >
                All Categories
              </SeoLink>
              {(['seo', 'aeo', 'geo'] as const).map((cat) => (
                <SeoLink
                  key={cat}
                  href={`/blog/category/${cat}`}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700"
                >
                  {cat.toUpperCase()}
                </SeoLink>
              ))}
            </nav>

            <form action="/search" method="get" className="flex items-center gap-2 w-full md:w-80">
              <input
                type="text"
                name="q"
                placeholder="Search articles..."
                className="flex-grow bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
              >
                Search
              </button>
            </form>
          </section>

          <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {mockArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </section>
        </div>
      </div>
    </>
  );
}
