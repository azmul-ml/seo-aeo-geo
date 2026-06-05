import { FAQItem } from '@/lib/seo';

interface FaqAccordionProps {
  items: FAQItem[];
}

/**
 * FaqAccordion Component
 * 
 * WHY AEO:
 * - Semantic HTML (<details> and <summary>): Allows search spiders to digest Q&A blocks 
 *   as distinct conversational components, supporting featured answers.
 * - FAQPage JSON-LD: Expresses Q&A structured schema directly, making the page eligible 
 *   for dynamic "People Also Ask" Rich Snippets on Search Engines.
 * - Voice Search matching: Matching question prompts directly corresponds to spoken inquiries.
 */
export function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <div className="space-y-4">
      <div className="divide-y divide-gray-100 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs">
        {items.map((item, idx) => (
          <details 
            key={idx} 
            className="group p-5 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <h3 className="text-base font-semibold text-gray-900 group-open:text-indigo-600 transition-colors duration-150 pr-4">
                {item.question}
              </h3>
              <span className="flex-shrink-0 ml-1.5 p-1 text-gray-500 group-open:rotate-180 transition-transform duration-200">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </summary>
            
            <div className="mt-4 leading-relaxed text-gray-600 text-sm border-t border-gray-50 pt-4">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

export default FaqAccordion;
