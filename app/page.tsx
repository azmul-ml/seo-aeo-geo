import Link from 'next/link';
import { constructMetadata } from '@/lib/seo';
import { schemasForHome } from '@/lib/page-schemas';
import { JsonLd } from '@/components/JsonLd';
import { ArticleCard } from '@/components/ArticleCard';
import { mockArticles } from '@/lib/utils';

export const metadata = constructMetadata({
  title: 'Home | TechKnowledge Hub',
  description:
    'Learn Technical SEO, Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO) through detailed guides, tutorials, and schemas.',
  path: '/',
});

/**
 * Homepage Component
 * 
 * WHY:
 * - Technical SEO: Renders a WebPage schema pointing back to our global WebSite/Org elements.
 * - Core Web Vitals (LCP): Structure loads fast, displaying text hierarchies immediately.
 * - Semantic Structure: Uses <main>, <section>, <header> elements to construct a crawl-friendly semantic grid.
 */
export default function Home() {
  // Pull all mock articles for homepage display
  const articles = mockArticles;

  return (
    <>
      {/* 1. WebPage Structured Schema */}
      <JsonLd canonicalPath="/" schemas={schemasForHome()} />

      <div className="bg-slate-50 min-h-screen">
        {/* Hero Banner Panel with modern gradient grid aesthetics */}
        <section className="bg-white border-b border-slate-200 py-16 md:py-24 relative overflow-hidden">
          {/* Background grid accent */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative">
            <span className="inline-flex items-center text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-150 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              Search Optimization for 2026 and Beyond
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              Master <span className="text-gradient">SEO, AEO, and GEO</span>
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-500 leading-relaxed font-medium">
              Dive deep into technical crawler schemas, voice-search answer optimization (Position Zero), and generative AI engine citation signals.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link 
                href="/blog" 
                className="px-6 py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-150 rounded-xl shadow-md hover:shadow-lg"
              >
                Read Optimization Blog &rarr;
              </Link>
              <Link 
                href="/faq" 
                className="px-6 py-3 text-sm font-bold text-slate-700 bg-white border border-slate-250 hover:bg-slate-50 transition-all duration-150 rounded-xl shadow-xs"
              >
                Explore FAQ Accordion
              </Link>
            </div>
          </div>
        </section>

        {/* Feature Grid Section (AEO/GEO Core Topics) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Optimization Frameworks</h2>
            <p className="text-sm text-slate-500 mt-2 font-medium">
              Understanding the different mechanisms that govern discovery across web clients.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Box 1 - Technical SEO */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs hover:shadow-sm transition-all duration-150 flex flex-col justify-between text-left">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-150 flex items-center justify-center text-indigo-600 font-bold">
                  1
                </div>
                <h3 className="text-lg font-bold text-slate-900">Technical SEO Foundation</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  Configuring server-rendering pipelines, relative canonical paths, dynamic XML sitemaps, robots.txt directives, and explicit microdata schemas.
                </p>
              </div>
              <Link href="/blog/seo-fundamentals-2026" className="mt-6 text-xs font-bold text-indigo-600 hover:underline inline-flex items-center gap-1">
                Learn Technical SEO &rarr;
              </Link>
            </div>

            {/* Box 2 - AEO */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs hover:shadow-sm transition-all duration-150 flex flex-col justify-between text-left">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-150 flex items-center justify-center text-indigo-600 font-bold">
                  2
                </div>
                <h3 className="text-lg font-bold text-slate-900">Answer Engine (AEO)</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  Structuring question-based headers, micro Q&A fragments, details/summary disclosure layouts, and FAQPage schemas to claim voice search features.
                </p>
              </div>
              <Link href="/blog/aeo-optimization-guide" className="mt-6 text-xs font-bold text-indigo-600 hover:underline inline-flex items-center gap-1">
                Explore AEO Guide &rarr;
              </Link>
            </div>

            {/* Box 3 - GEO */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs hover:shadow-sm transition-all duration-150 flex flex-col justify-between text-left">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-150 flex items-center justify-center text-indigo-600 font-bold">
                  3
                </div>
                <h3 className="text-lg font-bold text-slate-900">Generative AI (GEO)</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  Optimizing informational density, factual statements, references/citation anchors, and E-E-A-T credentials for LLM extraction algorithms.
                </p>
              </div>
              <Link href="/blog/geo-future-of-search" className="mt-6 text-xs font-bold text-indigo-600 hover:underline inline-flex items-center gap-1">
                Discover GEO Strategy &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Articles Section */}
        <section className="bg-slate-100 border-y border-slate-200 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-between items-end mb-10 gap-4">
              <div className="text-left">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Deep-Dive Guides</h2>
                <p className="text-sm text-slate-500 mt-1 font-medium">Our latest research studies and implementation checklists.</p>
              </div>
              <Link 
                href="/blog" 
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-0.5"
              >
                Browse all guides &rarr;
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action - Interactive Newsletter */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 shadow-lg text-white space-y-6 max-w-4xl mx-auto relative overflow-hidden">
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold">Stay Ahead of Crawlers and AI Bots</h2>
            <p className="max-w-md mx-auto text-sm text-indigo-100 leading-relaxed font-medium">
              Subscribe to our bi-weekly newsletter to receive search optimization techniques, schema updates, and AI indexation insights.
            </p>
            
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 pt-3">
              <input 
                type="email" 
                placeholder="Enter your professional email" 
                required 
                className="flex-grow bg-white/10 border border-white/20 placeholder-indigo-200 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-xs font-medium"
              />
              <button 
                type="submit" 
                className="bg-white text-indigo-700 hover:bg-slate-50 px-6 py-2.5 rounded-xl font-bold text-sm shadow-xs transition-colors duration-150"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}