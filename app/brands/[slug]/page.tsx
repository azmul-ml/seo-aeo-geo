import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo';
import { schemasForBrand } from '@/lib/page-schemas';
import { brands, getBrand, getProduct } from '@/lib/catalog';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FaqAccordion } from '@/components/FaqAccordion';

interface BrandPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: BrandPageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) return {};

  return constructMetadata({
    title: `${brand.name} Brand Overview`,
    description: brand.summary,
    path: `/brands/${slug}`,
  });
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) notFound();

  const crumbs = [{ name: brand.name, item: `/brands/${slug}` }];
  const popular = brand.popularProductSlugs.map((s) => getProduct(s)).filter(Boolean);

  return (
    <>
      <JsonLd
        canonicalPath={`/brands/${slug}`}
        schemas={schemasForBrand(slug, brand.name, brand.summary, brand.faqs)}
      />
      <Breadcrumbs crumbs={crumbs} />

      <div className="bg-slate-50 min-h-screen py-10">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <header className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 text-left">
            <h1 className="text-3xl font-black text-slate-900">{brand.name}</h1>
            <p className="text-sm text-slate-600 mt-3 font-medium">{brand.summary}</p>
          </header>

          <section className="bg-white border border-slate-200 rounded-2xl p-6 text-left">
            <h2 className="text-lg font-bold text-slate-900 mb-3">Brand Overview</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{brand.overview}</p>
          </section>

          <section className="bg-white border border-slate-200 rounded-2xl p-6 text-left">
            <h2 className="text-lg font-bold text-slate-900 mb-3">Trust Signals</h2>
            <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
              {brand.trustSignals.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-4 text-left">Popular Products</h2>
            <ul className="space-y-3">
              {popular.map((p) => (
                <li key={p!.slug}>
                  <Link
                    href={`/products/${p!.slug}`}
                    className="block bg-white border border-slate-200 rounded-xl p-4 hover:border-indigo-200"
                  >
                    <span className="font-bold text-slate-900">{p!.name}</span>
                    <p className="text-xs text-slate-600 mt-1">{p!.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-4 text-left">Brand FAQ</h2>
            <FaqAccordion items={brand.faqs} />
          </section>
        </div>
      </div>
    </>
  );
}
