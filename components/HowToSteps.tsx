import { HowToSchemaProps } from '@/lib/seo';

interface HowToStepsProps {
  guide: HowToSchemaProps;
}

/**
 * HowToSteps Component
 * 
 * WHY AEO & SEO:
 * - HowTo Structured Schema: Directly targets instructions search filters, enabling Google search 
 *   results to list the guide steps, estimated time, and tools right in the organic snippet.
 * - Clear Layout: Grouping tools and estimated time helps answer engine summarizers parse the tutorial layout.
 */
export function HowToSteps({ guide }: HowToStepsProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-xs space-y-6">
      {/* Guide Meta Header */}
      <div className="flex flex-wrap gap-4 items-center justify-between border-b border-gray-100 pb-5">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900">{guide.name}</h2>
          <p className="text-sm text-gray-500 mt-1">{guide.description}</p>
        </div>
        <div className="flex items-center space-x-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg text-sm font-semibold">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Est. Time: {guide.estimatedTimeMinutes} mins</span>
        </div>
      </div>

      {/* Tools & Supplies List */}
      <div className="grid md:grid-cols-2 gap-6 bg-gray-50 p-5 rounded-xl">
        {guide.tools && guide.tools.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center mb-3">
              <svg className="w-4 h-4 text-indigo-600 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Tools Needed
            </h3>
            <ul className="space-y-1.5 text-sm text-gray-700 font-medium">
              {guide.tools.map((tool, idx) => (
                <li key={idx} className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        )}

        {guide.supplies && guide.supplies.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center mb-3">
              <svg className="w-4 h-4 text-indigo-600 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Prerequisites / Supplies
            </h3>
            <ul className="space-y-1.5 text-sm text-gray-700 font-medium">
              {guide.supplies.map((supply, idx) => (
                <li key={idx} className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
                  {supply}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Step Checklist */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-5">Step-by-Step Directions</h3>
        <ol className="relative border-l border-gray-200 ml-3.5 space-y-8">
          {guide.steps.map((step, idx) => (
            <li key={idx} className="relative pl-8">
              {/* Step indicator */}
              <span className="absolute -left-3.5 top-0 flex items-center justify-center w-7 h-7 bg-indigo-600 rounded-full ring-4 ring-white text-white text-xs font-bold">
                {idx + 1}
              </span>
              
              <div className="bg-white border border-gray-150 rounded-xl p-5 shadow-2xs hover:border-gray-300 transition-colors duration-150">
                <h4 className="font-bold text-gray-900 text-base">{step.name}</h4>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default HowToSteps;
