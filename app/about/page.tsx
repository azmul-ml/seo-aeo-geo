import { constructMetadata } from '@/lib/seo';
import { schemasForAbout } from '@/lib/page-schemas';
import { JsonLd } from '@/components/JsonLd';
import { AuthorCard } from '@/components/AuthorCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { authors } from '@/lib/utils';

export const dynamic = 'force-static';
export const revalidate = false;
export const metadata = constructMetadata({
  title: 'About Our Organization & Editorial Team',
  description:
    "Learn about TechKnowledge Hub's editorial standards, organization mission, and verify our research team's credentials and authority.",
  path: '/about',
});

/**
 * About Page Component
 * 
 * WHY GEO (Generative Engine Optimization) & E-E-A-T:
 * - Transparency: Search engines value sites with clear organization profiles, physical 
 *   or digital contact parameters, and verified social linkage.
 * - Team Authority: Outlining author Ph.Ds, research credentials, and backgrounds 
 *   substantiates topical authority parameters.
 * - Schema linking: Direct links in JSON-LD between Organization and Author nodes.
 */
export default function AboutPage() {
  // Breadcrumb crumbs
  const crumbs = [{ name: 'About', item: '/about' }];

  return (
    <>
      {/* WebPage Schema */}
      <JsonLd canonicalPath="/about" schemas={schemasForAbout(Object.values(authors))} />

      <div className="bg-slate-50 min-h-screen">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs crumbs={crumbs} />

        <div className="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:py-14 space-y-12">
          {/* Header Panel */}
          <header className="text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              About TechKnowledge Hub
            </h1>
            <p className="text-base text-slate-500 max-w-xl mx-auto leading-relaxed font-medium">
              We publish peer-reviewed, fact-checked methodologies for modern web crawl strategies and search engine indexing.
            </p>
          </header>

          {/* Org Mission & Standards (EEAT Signals) */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-2xs space-y-6 text-left">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
              Our Mission & Editorial Principles
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Founded in 2026, TechKnowledge Hub serves as a central reference hub for developers, technical SEOs, and content designers navigating the transition from traditional indexing algorithms to Generative AI Search systems.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900 flex items-center">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></span>
                  Topical Verification
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  We verify all claims against established documentation from sources like the World Wide Web Consortium (W3C), Google Search Central, and peer-reviewed arXiv publications.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900 flex items-center">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></span>
                  Academic Peer-Review
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Technical guides detailing information extraction formulas undergo expert review by researchers and field professionals before publishing.
                </p>
              </div>
            </div>
          </section>

          {/* Meet our Team (EEAT Entity Disambiguation) */}
          <section className="space-y-6">
            <div className="text-center md:text-left">
              <h2 className="text-xl font-bold text-slate-900">Meet Our Editorial Board</h2>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Verify our experts\' backgrounds, credentials, and digital representations.
              </p>
            </div>

            <div className="space-y-6">
              {/* Author 1 */}
              <AuthorCard author={authors.alex} role="Author" />

              {/* Author 2 */}
              <AuthorCard author={authors.sam} role="Author" />

              {/* Author 3 */}
              <AuthorCard author={authors.taylor} role="Author" />
            </div>
          </section>

          {/* Contact Details (High Trustworthiness Signal) */}
          <section className="bg-slate-100 rounded-2xl p-6 md:p-8 border border-slate-200 text-center space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Transparency and Contact</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed font-medium">
              We welcome suggestions, fact-checking corrections, and submissions from information engineers and search specialists.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-600 font-bold pt-2">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                editorial@techknowledgehub.example.com
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Silicon Valley, CA, USA
              </span>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
