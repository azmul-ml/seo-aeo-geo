import Link from 'next/link';
import { generateBreadcrumbSchema } from '@/lib/seo';
import { StructuredData } from './StructuredData';

export interface BreadcrumbCrumb {
  name: string;
  item: string; // relative or absolute URL path
}

interface BreadcrumbsProps {
  crumbs: BreadcrumbCrumb[];
}

/**
 * Breadcrumbs Component
 * 
 * WHY SEO:
 * - Internal Linking: Distributes PageRank and establishes clear site navigation hierarchies.
 * - UX: Offers users a clear visual path back to the home page or index.
 * - BreadcrumbList Schema: Helps search engines structure the URL breadcrumb string inside organic SERPs.
 */
export function Breadcrumbs({ crumbs }: BreadcrumbsProps) {
  // Always prepend Home if not already present
  const allCrumbs =
    crumbs[0]?.item === '/'
      ? crumbs
      : [{ name: 'Home', item: '/' }, ...crumbs];

  const schema = generateBreadcrumbSchema(allCrumbs);

  return (
    <>
      <StructuredData schema={schema} />
      <nav aria-label="Breadcrumb" className="py-3 px-4 bg-gray-50 border-b border-gray-150">
      <ol className="flex items-center space-x-2 flex-wrap text-sm text-gray-500 font-medium">
        {allCrumbs.map((crumb, idx) => {
          const isLast = idx === allCrumbs.length - 1;
          return (
            <li key={crumb.item} className="flex items-center">
              {idx > 0 && (
                <svg
                  className="flex-shrink-0 h-4 w-4 text-gray-300 mx-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              )}
              {isLast ? (
                <span className="text-gray-900 font-semibold" aria-current="page">
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.item}
                  className="hover:text-indigo-600 hover:underline transition-colors duration-150"
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
    </>
  );
}

export default Breadcrumbs;
