interface AnswerBlockProps {
  question: string;
  answer: string;
}

export function AnswerBlock({ question, answer }: AnswerBlockProps) {
  return (
    <section
      id="direct-answer"
      className="speakable my-6 p-5 border border-indigo-100 rounded-2xl bg-indigo-50/50 text-left"
      aria-label={`Direct answer: ${question}`}
    >
      <h2 className="text-base font-bold text-slate-900 mb-2">{question}</h2>
      <p className="text-sm text-slate-700 leading-relaxed speakable">{answer}</p>
    </section>
  );
}
