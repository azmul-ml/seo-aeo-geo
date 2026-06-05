import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { constructMetadata } from '@/lib/seo';
import { schemasForGuide } from '@/lib/page-schemas';
import { mockGuides } from '@/lib/guides';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AuthorCard } from '@/components/AuthorCard';
import { TableOfContents } from '@/components/TableOfContents';
import { AnswerBlock } from '@/components/AnswerBlock';
import { ContentSummary } from '@/components/ContentSummary';
import { FaqAccordion } from '@/components/FaqAccordion';
import { formatDate } from '@/lib/utils';

interface GuidePageProps {
  params: Promise<{ topic: string }>;
}

export const dynamic = 'force-static';
export const revalidate = false;
export const dynamicParams = false;
export async function generateStaticParams() {
  return Object.keys(mockGuides).map((topic) => ({ topic }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { topic } = await params;
  const guide = mockGuides[topic];

  if (!guide) return {};

  return constructMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${topic}`,
    type: 'article',
    publishedTime: guide.datePublished,
    modifiedTime: guide.dateModified,
    authors: [guide.author.name],
  });
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { topic } = await params;
  const guide = mockGuides[topic];

  if (!guide) {
    notFound();
  }

  const crumbs = [
    { name: 'Guides', item: '/blog' },
    { name: guide.title, item: `/guides/${topic}` },
  ];

  return (
    <>
      <JsonLd canonicalPath={`/guides/${topic}`} schemas={schemasForGuide(guide)} />
      <Breadcrumbs crumbs={crumbs} />

      <div className="bg-slate-50 min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <header className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-2xs mb-8 text-left space-y-4">
            <span className="inline-block bg-indigo-50 text-indigo-700 border border-indigo-150 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
              Generative Engine Study
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {guide.title}
            </h1>

            <AnswerBlock question={`What is ${guide.title.split(':')[0]}?`} answer={guide.directAnswer} />

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 pt-2 border-t border-slate-50">
              <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 border border-emerald-150 px-2.5 py-1 rounded-md">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                Updated: {formatDate(guide.dateModified)}
              </span>
              <span className="flex items-center gap-1 text-blue-600 bg-blue-50 border border-blue-150 px-2.5 py-1 rounded-md">
                Reviewed By {guide.reviewer.name}
              </span>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
              <TableOfContents items={guide.toc} />
            </aside>

            <main className="lg:col-span-8 space-y-10">
              <ContentSummary summary={guide.description} takeaways={[guide.directAnswer]} />

              <article
                className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-2xs text-left article-body"
                dangerouslySetInnerHTML={{ __html: guide.contentHtml }}
              />

              {guide.citations.length > 0 && (
                <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-2xs space-y-4 text-left">
                  <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                    Authoritative Citations
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-xs font-semibold text-slate-600">
                    {guide.citations.map((cite, idx) => (
                      <li key={idx}>
                        <a href={cite.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                          {cite.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {guide.pageFaqs && guide.pageFaqs.length > 0 && (
                <section>
                  <h3 className="text-base font-bold text-slate-900 mb-4">Guide FAQ</h3>
                  <FaqAccordion items={guide.pageFaqs} />
                </section>
              )}

              <p className="text-xs text-slate-500 text-left">
                Machine-readable:{' '}
                <a href={`/api/ai/guides/${topic}`} className="text-indigo-600 hover:underline">
                  /api/ai/guides/{topic}
                </a>
              </p>

              <section className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 text-left">Editorial and Peer Review Team</h3>
                <AuthorCard author={guide.author} role="Author" />
                <AuthorCard
                  author={{
                    name: guide.reviewer.name,
                    avatar: '',
                    bio: guide.reviewer.bio,
                    credentials: guide.reviewer.credentials,
                    sameAs: [],
                  }}
                  role="Reviewer"
                  reviewedBy
                />
              </section>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
