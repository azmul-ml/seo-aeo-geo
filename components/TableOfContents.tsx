import React from 'react';

export interface TocItem {
  id: string;
  text: string;
  depth: number; // 2 for H2, 3 for H3, etc.
}

interface TableOfContentsProps {
  items: TocItem[];
}

/**
 * TableOfContents Component
 * 
 * WHY AEO & SEO:
 * - Jump-to Links: Search engines (like Google) often reward long-form content containing direct anchor 
 *   links by rendering "Jump to" links directly in search results, boosting click-through-rates.
 * - Crawler Navigation: Helps semantic crawler bots index specific segments of a page separately.
 * - Accessibility & UX: Improves navigability for users scrolling through complex topics.
 */
export function TableOfContents({ items }: TableOfContentsProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav 
      aria-label="Table of contents" 
      className="p-5 bg-white border border-gray-200 rounded-xl shadow-xs sticky top-6"
    >
      <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 mb-4 flex items-center">
        <svg 
          className="w-5 h-5 text-indigo-600 mr-2" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
        Table of Contents
      </h2>
      <ul className="space-y-2.5 text-sm">
        {items.map((item) => {
          const paddingLeft = item.depth === 3 ? 'pl-4 border-l border-gray-150 ml-1' : '';
          return (
            <li 
              key={item.id} 
              className={`${paddingLeft} transition-all duration-150 hover:translate-x-0.5`}
            >
              <a 
                href={`#${item.id}`} 
                className={`block leading-relaxed text-gray-600 hover:text-indigo-600 font-medium ${
                  item.depth === 2 ? 'text-gray-800' : 'text-gray-500 font-normal text-xs'
                }`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default TableOfContents;
