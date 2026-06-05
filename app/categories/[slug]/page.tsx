import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo';
import { schemasForCategory } from '@/lib/page-schemas';
import { categories, getCategory, getProduct } from '@/lib/catalog';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FaqAccordion } from '@/components/FaqAccordion';
import { formatDate } from '@/lib/utils';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};

  return constructMetadata({
    title: category.name,
    description: category.summary,
    path: `/categories/${slug}`,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const crumbs = [
    { name: 'Categories', item: '/categories' },
    { name: category.name, item: `/categories/${slug}` },
  ];

  const categoryProducts = category.productSlugs
    .map((s) => getProduct(s))
    .filter(Boolean);

  return (
    <>
      <JsonLd
        canonicalPath={`/categories/${slug}`}
        schemas={schemasForCategory(
          slug,
          category.name,
          category.summary,
          category.faqs,
          categoryProducts.map((p) => ({
            name: p!.name,
            url: `/products/${p!.slug}`,
            description: p!.summary,
          }))
        )}
      />
      <Breadcrumbs crumbs={crumbs} />

      <div className="bg-slate-50 min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
          <header className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 text-left space-y-3">
            <h1 className="text-3xl font-black text-slate-900">{category.name}</h1>
            <p className="text-sm text-slate-600 font-medium">{category.summary}</p>
            <p className="text-xs text-slate-500">
              Last updated: <time dateTime={category.dateModified}>{formatDate(category.dateModified)}</time>
            </p>
          </header>

          <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 text-left">
            <h2 className="text-lg font-bold text-slate-900 mb-3">Category Overview</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{category.overview}</p>
          </section>

          <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 text-left">
            <h2 className="text-lg font-bold text-slate-900 mb-3">Buying Guide</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{category.buyingGuide}</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-4 text-left">Products in this category</h2>
            <ul className="grid gap-4 md:grid-cols-2">
              {categoryProducts.map((p) => (
                <li key={p!.slug}>
                  <article className="bg-white border border-slate-200 rounded-xl p-5 h-full">
                    <h3 className="font-bold text-slate-900">
                      <Link href={`/products/${p!.slug}`} className="hover:text-indigo-600">
                        {p!.name}
                      </Link>
                    </h3>
                    <p className="text-xs text-slate-600 mt-2">{p!.summary}</p>
                  </article>
                </li>
              ))}
            </ul>
          </section>

          {category.relatedCategorySlugs.length > 0 && (
            <nav aria-label="Related categories" className="text-left">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                Related Categories
              </h2>
              <ul className="flex flex-wrap gap-3">
                {category.relatedCategorySlugs.map((rel) => {
                  const c = getCategory(rel);
                  if (!c) return null;
                  return (
                    <li key={rel}>
                      <Link
                        href={`/categories/${rel}`}
                        className="text-sm font-semibold text-indigo-600 hover:underline"
                      >
                        {c.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-4 text-left">Category FAQ</h2>
            <FaqAccordion items={category.faqs} />
          </section>

          <p className="text-xs text-slate-500 text-center">
            AI export:{' '}
            <Link href={`/api/ai/categories/${slug}`} className="text-indigo-600 hover:underline">
              /api/ai/categories/{slug}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
