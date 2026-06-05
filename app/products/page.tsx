import type { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo';
import { schemasForListing } from '@/lib/page-schemas';
import { products } from '@/lib/catalog';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = constructMetadata({
  title: 'SEO & GEO Product Catalog',
  description:
    'Browse citation-ready SEO, AEO, and GEO tools with structured Product schema, reviews, and machine-readable AI exports.',
  path: '/products',
});

export default function ProductsIndexPage() {
  const crumbs = [{ name: 'Products', item: '/products' }];

  return (
    <>
      <JsonLd
        canonicalPath="/products"
        schemas={schemasForListing(
          '/products',
          'Product Catalog',
          'SEO, AEO, and GEO software products.',
          'TechKnowledge Hub Products',
          products.map((p) => ({
            name: p.name,
            url: `/products/${p.slug}`,
            description: p.summary,
          }))
        )}
      />
      <Breadcrumbs crumbs={crumbs} />
      <div className="bg-slate-50 min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
          <header className="text-center space-y-3">
            <h1 className="text-3xl font-black text-slate-900">Product Catalog</h1>
            <p className="text-sm text-slate-500 max-w-xl mx-auto">
              Tools optimized for structured data, Bing index parity, and AI citation exports.
            </p>
          </header>
          <section className="grid gap-6 md:grid-cols-2">
            {products.map((product) => (
              <article
                key={product.slug}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs text-left"
              >
                <h2 className="text-lg font-bold text-slate-900">
                  <Link href={`/products/${product.slug}`} className="hover:text-indigo-600">
                    {product.name}
                  </Link>
                </h2>
                <p className="text-sm text-slate-600 mt-2">{product.summary}</p>
                <p className="text-xs font-bold text-indigo-600 mt-4">
                  {product.currency} {product.price} &middot; {product.availability}
                </p>
              </article>
            ))}
          </section>
        </div>
      </div>
    </>
  );
}
