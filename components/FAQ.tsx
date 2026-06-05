// components/FAQ.tsx
import { useId } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ: React.FC<{ items: FAQItem[] }> = ({ items }) => {
  const id = useId();
  return (
    <section aria-labelledby={`${id}-faq-title`} className="my-8">
      <h2 id={`${id}-faq-title`} className="text-2xl font-semibold mb-4">
        Frequently Asked Questions
      </h2>
      <dl className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="border-b pb-4">
            <dt className="font-medium text-lg">{item.question}</dt>
            <dd className="mt-2 text-gray-600">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};
