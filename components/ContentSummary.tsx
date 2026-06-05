interface ContentSummaryProps {
  summary: string;
  takeaways?: string[];
}

export function ContentSummary({ summary, takeaways }: ContentSummaryProps) {
  return (
    <section
      aria-labelledby="content-summary-heading"
      className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-6 md:p-8 space-y-4 text-left"
    >
      <h2 id="content-summary-heading" className="text-lg font-bold text-slate-900">
        Executive Summary
      </h2>
      <p className="text-sm text-slate-700 leading-relaxed font-medium">{summary}</p>
      {takeaways && takeaways.length > 0 && (
        <div>
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
            Key Takeaways
          </h3>
          <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-700">
            {takeaways.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
