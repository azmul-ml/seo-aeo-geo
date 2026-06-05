import Image from 'next/image';
import { SeoLink } from '@/components/SeoLink';
import { Article, formatDate } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
}

/**
 * ArticleCard Component
 * 
 * WHY SEO, AEO & GEO:
 * - Content Freshness (GEO/SEO): Explicitly highlights the last modified date, which search 
 *   algorithms evaluate as a signal for informational accuracy and freshness.
 * - Readability Metrics (AEO): Lists estimated reading times, matching user intent expectations for content depth.
 * - Semantic Structure: Uses semantic elements, providing explicit context boundaries.
 */
export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-200 flex flex-col h-full text-left">
      <div className="h-44 w-full relative overflow-hidden bg-slate-100">
        <Image
          src={article.image}
          alt={`Cover image for ${article.title}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <span className="absolute top-4 left-4 bg-white/90 text-indigo-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md z-10">
          {article.category}
        </span>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Freshness Badge & Reading Time */}
          <div className="flex items-center gap-3 text-xs text-gray-500 font-semibold">
            <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              Updated {formatDate(article.dateModified)}
            </span>
            <span>&bull;</span>
            <span>{calculateReadingTime(article.content)} min read</span>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
            {article.description}
          </p>
        </div>

        <div className="pt-4 border-t border-gray-50 mt-4 flex items-center justify-between">
          {/* Author Name */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-gray-800">{article.author.name}</span>
          </div>

          {/* Link Button */}
          <SeoLink 
            href={`/blog/${article.slug}`} 
            className="text-xs font-bold text-indigo-600 group-hover:text-indigo-800 flex items-center gap-0.5 transition-colors duration-150"
          >
            Read Article
            <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform duration-150" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </SeoLink>
        </div>
      </div>
    </article>
  );
}

// Inline implementation of calculateReadingTime to avoid build dependencies in nested imports
function calculateReadingTime(text: string): number {
  const wordsPerMinute = 225;
  const cleanText = text.replace(/<[^>]*>/g, '');
  const wordCount = cleanText.split(/\s+/).filter(Boolean).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export default ArticleCard;
