import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { SeoLink } from '@/components/SeoLink';
import { constructMetadata } from '@/lib/seo';
import { schemasForProduct } from '@/lib/page-schemas';
import {
  getAggregateRating,
  getBrand,
  getCategory,
  getProduct,
  products,
} from '@/lib/catalog';
import { mockArticles, formatDate } from '@/lib/utils';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FaqAccordion } from '@/components/FaqAccordion';
import { RelatedEntities } from '@/components/RelatedEntities';
import { AnswerBlock } from '@/components/AnswerBlock';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-static';
export const revalidate = false;
export const dynamicParams = false;
export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  return constructMetadata({
    title: product.name,
    description: product.summary,
    path: `/products/${slug}`,
    image: product.image,
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const brand = getBrand(product.brandSlug);
  const category = getCategory(product.categorySlug);
  const rating = getAggregateRating(product);
  const crumbs = [
    { name: 'Products', item: '/products' },
    ...(category ? [{ name: category.name, item: `/categories/${category.slug}` }] : []),
    { name: product.name, item: `/products/${slug}` },
  ];

  const relatedLinks = [
    ...product.relatedProductSlugs
      .map((s) => getProduct(s))
      .filter(Boolean)
      .map((p) => ({ href: `/products/${p!.slug}`, label: p!.name, type: 'Product' })),
    ...product.relatedArticleSlugs
      .map((s) => mockArticles.find((a) => a.slug === s))
      .filter(Boolean)
      .map((a) => ({ href: `/blog/${a!.slug}`, label: a!.title, type: 'Article' })),
  ];

  const comparisonProducts = product.relatedProductSlugs
    .map((s) => getProduct(s))
    .filter(Boolean);

  return (
    <>
      <JsonLd canonicalPath={`/products/${slug}`} schemas={schemasForProduct(product, slug)} />

      <Breadcrumbs crumbs={crumbs} />

      <article className="bg-slate-50 min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
          <header className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-2xs text-left space-y-4">
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              {category?.name}
              {brand && (
                <>
                  {' '}
                  &middot;{' '}
                  <SeoLink href={`/brands/${brand.slug}`} className="hover:underline">
                    {brand.name}
                  </SeoLink>
                </>
              )}
            </p>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900">{product.name}</h1>
            <div className="relative w-full aspect-[2/1] max-h-64 rounded-xl overflow-hidden border border-slate-200">
              <Image
                src={product.image}
                alt={`Product image: ${product.name}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 768px"
                priority
              />
            </div>
            <AnswerBlock question={`What is ${product.name}?`} answer={product.summary} />
            <p className="text-sm text-slate-600 leading-relaxed font-medium">{product.summary}</p>
            <dl className="flex flex-wrap gap-4 text-xs font-semibold text-slate-600 pt-2">
              <div>
                <dt className="text-slate-400 uppercase tracking-wider">Price</dt>
                <dd className="text-lg text-slate-900 font-black">
                  {product.currency} {product.price}
                </dd>
              </div>
              <div>
                <dt className="text-slate-400 uppercase tracking-wider">Availability</dt>
                <dd>{product.availability}</dd>
              </div>
              <div>
                <dt className="text-slate-400 uppercase tracking-wider">SKU</dt>
                <dd>{product.sku}</dd>
              </div>
              <div>
                <dt className="text-slate-400 uppercase tracking-wider">Updated</dt>
                <dd>
                  <time dateTime={product.dateModified}>{formatDate(product.dateModified)}</time>
                </dd>
              </div>
            </dl>
          </header>

          <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-2xs text-left space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Overview</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{product.description}</p>
          </section>

          <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-2xs text-left">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Key Features</h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-slate-700">
              {product.keyFeatures.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </section>

          <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-2xs text-left overflow-x-auto">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Specifications</h2>
            <table className="w-full text-sm text-left border-collapse">
              <caption className="sr-only">Product specifications for {product.name}</caption>
              <tbody>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <tr key={key} className="border-b border-slate-100">
                    <th scope="row" className="py-2 pr-4 font-bold text-slate-800 w-1/3">
                      {key}
                    </th>
                    <td className="py-2 text-slate-600">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs text-left">
              <h2 className="text-base font-bold text-slate-900 mb-3">Pros</h2>
              <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                {product.pros.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs text-left">
              <h2 className="text-base font-bold text-slate-900 mb-3">Use Cases</h2>
              <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                {product.useCases.map((u) => (
                  <li key={u}>{u}</li>
                ))}
              </ul>
            </div>
          </section>

          {comparisonProducts.length > 0 && (
            <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-2xs text-left overflow-x-auto">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Comparison</h2>
              <table className="w-full text-xs border-collapse">
                <caption className="sr-only">Product comparison table</caption>
                <thead>
                  <tr className="border-b border-slate-200">
                    <th scope="col" className="text-left py-2 pr-4">
                      Attribute
                    </th>
                    <th scope="col" className="text-left py-2 px-2 font-bold">
                      {product.name}
                    </th>
                    {comparisonProducts.map((p) => (
                      <th key={p!.slug} scope="col" className="text-left py-2 px-2">
                        {p!.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <th scope="row" className="py-2 pr-4 font-semibold">
                      Price
                    </th>
                    <td className="py-2 px-2">
                      {product.currency} {product.price}
                    </td>
                    {comparisonProducts.map((p) => (
                      <td key={p!.slug} className="py-2 px-2">
                        {p!.currency} {p!.price}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row" className="py-2 pr-4 font-semibold">
                      Rating
                    </th>
                    <td className="py-2 px-2">{rating?.ratingValue ?? '—'}</td>
                    {comparisonProducts.map((p) => {
                      const r = getAggregateRating(p!);
                      return (
                        <td key={p!.slug} className="py-2 px-2">
                          {r?.ratingValue ?? '—'}
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </section>
          )}

          <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-2xs text-left space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Customer Reviews</h2>
            {product.reviews.map((review) => (
              <figure key={review.author} className="border-l-2 border-indigo-200 pl-4">
                <blockquote className="text-sm text-slate-700">{review.reviewBody}</blockquote>
                <figcaption className="text-xs text-slate-500 mt-2 font-semibold">
                  {review.author} &middot; {review.ratingValue}/5 &middot;{' '}
                  <time dateTime={review.datePublished}>{review.datePublished}</time>
                </figcaption>
              </figure>
            ))}
          </section>

          <section className="grid md:grid-cols-2 gap-6 text-sm text-slate-600">
            <div className="bg-slate-100 rounded-2xl p-5 border border-slate-200">
              <h2 className="font-bold text-slate-900 text-sm mb-2">Shipping</h2>
              <p>{product.shippingInfo}</p>
            </div>
            <div className="bg-slate-100 rounded-2xl p-5 border border-slate-200">
              <h2 className="font-bold text-slate-900 text-sm mb-2">Returns</h2>
              <p>{product.returnPolicy}</p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-4 text-left">Product FAQ</h2>
            <FaqAccordion items={product.faqs} />
          </section>

          <RelatedEntities links={relatedLinks} />

          <p className="text-xs text-slate-500 text-center">
            Machine-readable export:{' '}
            <SeoLink href={`/api/ai/products/${slug}`} className="text-indigo-600 hover:underline">
              /api/ai/products/{slug}
            </SeoLink>
          </p>
        </div>
      </article>
    </>
  );
}
