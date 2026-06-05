// components/AnswerBlock.tsx
export const AnswerBlock: React.FC<{ question: string; answer: string }> = ({ question, answer }) => (
  <section className="my-6 p-4 border rounded-lg bg-gray-50">
    <h3 className="text-lg font-medium mb-2">{question}</h3>
    <p className="text-gray-700 leading-relaxed">{answer}</p>
  </section>
);
