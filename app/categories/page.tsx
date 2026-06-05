import type { Metadata } from 'next';
import { SeoLink } from '@/components/SeoLink';
import { constructMetadata } from '@/lib/seo';
import { schemasForListing } from '@/lib/page-schemas';
import { categories } from '@/lib/catalog';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const dynamic = 'force-static';
export const revalidate = false;
export const metadata: Metadata = constructMetadata({
  title: 'Product Categories',
  description: 'Browse SEO tools and content optimization categories with buying guides and FAQ schema.',
  path: '/categories',
});

export default function CategoriesIndexPage() {
  const crumbs = [{ name: 'Categories', item: '/categories' }];

  return (
    <>
      <JsonLd
        canonicalPath="/categories"
        schemas={schemasForListing(
          '/categories',
          'Categories',
          'Product and knowledge categories.',
          'Categories',
          categories.map((c) => ({
            name: c.name,
            url: `/categories/${c.slug}`,
            description: c.summary,
          }))
        )}
      />
      <Breadcrumbs crumbs={crumbs} />
      <div className="bg-slate-50 min-h-screen py-10">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <header className="text-center">
            <h1 className="text-3xl font-black text-slate-900">Categories</h1>
            <p className="text-sm text-slate-500 mt-2">Guides and products grouped by topic.</p>
          </header>
          <ul className="grid gap-4">
            {categories.map((c) => (
              <li key={c.slug}>
                <article className="bg-white border border-slate-200 rounded-2xl p-6">
                  <h2 className="text-lg font-bold">
                    <SeoLink href={`/categories/${c.slug}`} className="hover:text-indigo-600">
                      {c.name}
                    </SeoLink>
                  </h2>
                  <p className="text-sm text-slate-600 mt-2">{c.summary}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
