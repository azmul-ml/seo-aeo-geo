import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { constructMetadata } from '@/lib/seo';
import { schemasForHowTo } from '@/lib/page-schemas';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { HowToSteps } from '@/components/HowToSteps';
import { mockHowToGuides } from '@/lib/utils';

interface HowToPageProps {
  params: Promise<{ topic: string }>;
}

export async function generateStaticParams() {
  return Object.keys(mockHowToGuides).map((topic) => ({ topic }));
}

/**
 * Dynamic Metadata Generator
 * 
 * WHY SEO:
 * - Direct description mapping for dynamic How-To paths.
 * - Prevents indexation issues by matching canonical tags to dynamic path params.
 */
export async function generateMetadata({ params }: HowToPageProps): Promise<Metadata> {
  const { topic } = await params;
  const guide = mockHowToGuides[topic];

  if (!guide) return {};

  return constructMetadata({
    title: guide.title,
    description: guide.description,
    path: `/how-to/${topic}`,
  });
}

/**
 * How-To Guide Page Component
 * 
 * WHY AEO (Answer Engine Optimization):
 * - Serves complete instructions with estimated cost, duration, and supplies.
 * - Integrates dynamic HowTo JSON-LD schema supporting Google Action recipes/tutorials features.
 */
export default async function HowToPage({ params }: HowToPageProps) {
  const { topic } = await params;
  const guide = mockHowToGuides[topic];

  if (!guide) {
    notFound();
  }

  const crumbs = [
    { name: 'How-To Guides', item: `/how-to/${topic}` },
    { name: guide.title, item: `/how-to/${topic}` },
  ];

  // Map utilities to schema props format expected by HowToSteps
  const guideSchemaProps = {
    name: guide.title,
    description: guide.description,
    steps: guide.steps,
    estimatedTimeMinutes: guide.estimatedTimeMinutes,
    tools: guide.tools,
    supplies: guide.supplies,
  };

  return (
    <>
      <JsonLd canonicalPath={`/how-to/${topic}`} schemas={schemasForHowTo(guide, topic)} />
      <Breadcrumbs crumbs={crumbs} />

      <div className="bg-slate-50 min-h-screen py-10">
        <main className="max-w-4xl mx-auto px-4 sm:px-6">
          <article className="space-y-8">
            <header className="space-y-2 text-left mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-150 px-2.5 py-1 rounded-md">
                Interactive Walkthrough
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                {guide.title}
              </h1>
              <p className="text-sm text-slate-500 max-w-2xl">
                Follow our step-by-step directions below to configure search-optimized architectures.
              </p>
            </header>

            {/* How-To component rendering sitemaps / schema scripts */}
            <HowToSteps guide={guideSchemaProps} />
          </article>
        </main>
      </div>
    </>
  );
}
