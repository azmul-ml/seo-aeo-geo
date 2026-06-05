import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { constructMetadata } from '@/lib/seo';
import { schemasForBlogIndex } from '@/lib/page-schemas';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ArticleCard } from '@/components/ArticleCard';
import { SeoLink } from '@/components/SeoLink';
import { mockArticles } from '@/lib/utils';

export const dynamic = 'force-static';
export const revalidate = false;
export const dynamicParams = false;

const CATEGORIES = ['seo', 'aeo', 'geo'] as const;
type CategorySlug = (typeof CATEGORIES)[number];

const categoryLabels: Record<CategorySlug, string> = {
  seo: 'SEO',
  aeo: 'AEO',
  geo: 'GEO',
};

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category }));
}

interface CategoryBlogPageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: CategoryBlogPageProps): Promise<Metadata> {
  const { category } = await params;
  const slug = category.toLowerCase() as CategorySlug;
  if (!CATEGORIES.includes(slug)) return {};

  const label = categoryLabels[slug];
  return constructMetadata({
    title: `${label} Articles`,
    description: `Peer-reviewed ${label} guides on crawl optimization, structured data, and search visibility.`,
    path: `/blog/category/${slug}`,
  });
}

export default async function CategoryBlogPage({ params }: CategoryBlogPageProps) {
  const { category } = await params;
  const slug = category.toLowerCase() as CategorySlug;

  if (!CATEGORIES.includes(slug)) {
    notFound();
  }

  const label = categoryLabels[slug];
  const articles = mockArticles.filter(
    (a) => a.category.toUpperCase() === label.toUpperCase()
  );

  const crumbs = [
    { name: 'Blog', item: '/blog' },
    { name: `${label} Articles`, item: `/blog/category/${slug}` },
  ];

  return (
    <>
      <JsonLd
        canonicalPath={`/blog/category/${slug}`}
        schemas={schemasForBlogIndex(`${label} articles and implementation guides.`)}
      />
      <Breadcrumbs crumbs={crumbs} />

      <div className="bg-slate-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:py-12 space-y-10">
          <header className="text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {label} Articles
            </h1>
            <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed font-medium">
              {articles.length} article{articles.length === 1 ? '' : 's'} in the {label} category.
            </p>
          </header>

          <nav className="flex flex-wrap justify-center gap-2" aria-label="Blog categories">
            <SeoLink
              href="/blog"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              All
            </SeoLink>
            {CATEGORIES.map((cat) => (
              <SeoLink
                key={cat}
                href={`/blog/category/${cat}`}
                className={`px-4 py-2 rounded-xl text-xs font-bold ${
                  cat === slug
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {categoryLabels[cat]}
              </SeoLink>
            ))}
          </nav>

          <section className="grid gap-8 sm:grid-cols-2">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </section>

          <p className="text-center">
            <SeoLink href="/blog" className="text-xs font-bold text-indigo-600 hover:underline">
              &larr; Back to full article library
            </SeoLink>
          </p>
        </div>
      </div>
    </>
  );
}
