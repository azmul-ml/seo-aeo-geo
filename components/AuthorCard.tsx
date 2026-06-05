import Image from 'next/image';
import { Author } from '@/lib/utils';

interface AuthorCardProps {
  author: Author;
  role?: 'Author' | 'Reviewer';
  reviewedBy?: boolean;
}

/**
 * AuthorCard Component
 * 
 * WHY GEO (Generative Engine Optimization):
 * - E-E-A-T Validation: Large Language Models evaluate creator trust. Displaying explicit education tags, 
 *   experience markers, and professional credentials signals high topical authority.
 * - Social Trust Links: Including sameAs outbound links (LinkedIn, Twitter, Google Scholar) allows 
 *   search and answer crawlers to resolve the writer's digital identity across external web databases.
 */
export function AuthorCard({ author, role = 'Author', reviewedBy = false }: AuthorCardProps) {
  const authorId = author.name.toLowerCase().replace(/\s+/g, '-');

  return (
    <section 
      id={authorId}
      aria-label={`${role} details for ${author.name}`}
      className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row gap-5 items-start text-left"
    >
      {/* Visual Avatar - Priority/Preload omitted since it is secondary layout */}
      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-100 flex-shrink-0 bg-gray-150">
        {author.avatar ? (
          <Image
            src={author.avatar}
            alt={`Photo of ${author.name}`}
            fill
            className="object-cover"
            sizes="64px"
          />
        ) : (
          <div className="w-full h-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg select-none">
            {author.name.charAt(0)}
          </div>
        )}
      </div>

      <div className="space-y-3 flex-1">
        {/* Name and Role Badges */}
        <div className="flex flex-wrap items-center gap-2.5">
          <h3 className="text-lg font-bold text-gray-900 leading-tight">{author.name}</h3>
          <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full ${
            reviewedBy 
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-150' 
              : 'bg-indigo-50 text-indigo-700 border border-indigo-150'
          }`}>
            {role}
          </span>
        </div>

        {/* Bio description */}
        <p className="text-sm text-gray-600 leading-relaxed font-normal">
          {author.bio}
        </p>

        {/* Credentials / E-E-A-T badges */}
        {author.credentials && author.credentials.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1.5">
            {author.credentials.map((cred, idx) => (
              <span 
                key={idx} 
                className="inline-flex items-center text-xs font-semibold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-md"
              >
                <svg className="w-3.5 h-3.5 text-indigo-500 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                {cred}
              </span>
            ))}
          </div>
        )}

        {/* Verified Links */}
        {author.sameAs && author.sameAs.length > 0 && (
          <div className="flex gap-4 items-center pt-2 border-t border-gray-50 text-xs text-gray-500 font-medium">
            <span className="text-gray-400">Verified Profiles:</span>
            {author.sameAs.map((link) => {
              let label = 'Profile';
              if (link.includes('twitter.com')) label = 'X / Twitter';
              if (link.includes('linkedin.com')) label = 'LinkedIn';
              if (link.includes('scholar.google.com')) label = 'Google Scholar';
              
              return (
                <a 
                  key={link} 
                  href={link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-0.5"
                >
                  {label}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default AuthorCard;
