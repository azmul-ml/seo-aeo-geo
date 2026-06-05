import { authors, reviewers } from './utils';

export interface GuideContent {
  topic: string;
  title: string;
  description: string;
  directAnswer: string;
  datePublished: string;
  dateModified: string;
  author: typeof authors.alex;
  reviewer: typeof reviewers.elena;
  citations: { text: string; url: string }[];
  contentHtml: string;
  toc: { id: string; text: string; depth: number }[];
  pageFaqs?: { question: string; answer: string }[];
}

export const mockGuides: Record<string, GuideContent> = {
  'generative-engine-optimization': {
    topic: 'generative-engine-optimization',
    title: 'Generative Engine Optimization (GEO) & LLM Citation Strategy',
    description: 'A scientific analysis of information indexing in LLM search assistants. Learn the factual, structural, and citation metrics required for generative search.',
    directAnswer: 'Generative Engine Optimization (GEO) structures web content with citations, claim-and-source blocks, and E-E-A-T signals so LLM search systems cite your pages in synthesized answers.',
    datePublished: '2026-04-01T08:00:00Z',
    dateModified: '2026-05-30T09:45:00Z',
    author: authors.taylor,
    reviewer: reviewers.elena,
    citations: [
      { text: 'GEO: Generative Engine Optimization (Paper - arXiv:2311.09747)', url: 'https://arxiv.org/abs/2311.09747' },
      { text: 'Retrieval-Augmented Generation for Knowledge-Intensive Tasks (NeurIPS)', url: 'https://arxiv.org/abs/2005.11401' },
      { text: 'W3C Semantic Web Specifications', url: 'https://www.w3.org/standards/semanticweb/' }
    ],
    toc: [
      { id: 'geo-mechanics', text: 'How Generative Search Works', depth: 2 },
      { id: 'citations-authority', text: 'Citations and Authority Metrics', depth: 2 },
      { id: 'claim-source', text: 'The Claim-Source Structure', depth: 2 },
      { id: 'eeat-verification', text: 'Topical Authority Verification', depth: 2 },
    ],
    pageFaqs: [
      { question: 'What is GEO in search marketing?', answer: 'GEO (Generative Engine Optimization) is the practice of structuring content so LLM-powered search tools cite your site in AI-generated answers.' },
      { question: 'How do LLMs choose sources to cite?', answer: 'LLMs favor pages with high information density, authoritative outbound citations, verified author entities, and machine-readable exports like JSON-LD and /api/ai endpoints.' },
    ],
    contentHtml: `
<section id="geo-mechanics" class="space-y-4">
  <h2>How Generative Search Works</h2>
  <p>
    Generative Search Engines (such as Perplexity, Gemini, and Google\'s AI Overviews) utilize a technology named <strong>Retrieval-Augmented Generation (RAG)</strong>. Unlike traditional engines that search indices for matching keywords, a RAG pipeline converts user queries into semantic embeddings, retrieves relevant document chunks from the vector database, and prompts an LLM to synthesize a unified response.
  </p>
  <p>
    Research indicates that to be cited in these synthesized responses, documents must demonstrate high information density and structural clarity. The LLM acts as an editor, selecting chunks that offer the most direct, verifiable support for its generated narrative.
  </p>
</section>

<section id="citations-authority" class="space-y-4">
  <h2>Citations and Authority Metrics</h2>
  <p>
    According to the seminal research paper <a href="https://arxiv.org/abs/2311.09747" target="_blank" rel="noopener noreferrer">GEO: Generative Engine Optimization</a>, incorporating authoritative citations is the most influential factor in improving an article\'s visibility in generative search summaries.
  </p>
  <p>
    AI engines prioritize citing resources that links directly to primary sources, such as governmental domains (<code>.gov</code>), academic institutions (<code>.edu</code>), or recognized standards bodies (like the <a href="https://www.w3.org" target="_blank" rel="noopener noreferrer">W3C</a>). This helps the generative engine defend its answers against hallucinations, aligning with search quality standards.
  </p>
</section>

<section id="claim-source" class="space-y-4">
  <h2>The Claim-Source Structure</h2>
  <p>
    Traditional writing often wraps facts in descriptive prose. For GEO, clear assertions are preferred. Structure factual details in a direct <strong>"Claim-and-Source"</strong> layout:
  </p>
  <div class="my-6 bg-slate-50 border-l-4 border-indigo-600 p-5 rounded-r-xl space-y-2">
    <p class="font-bold text-slate-900 text-sm">Factual Formula for LLMs:</p>
    <blockquote class="italic text-xs text-slate-700">
      "[Topic Entity] has [Feature X] as verified by [Authoritative Entity] in [Reference Doc]."
    </blockquote>
    <p class="text-xs text-slate-500 font-medium">
      Example: "Next.js App Router renders static layout containers as defined by React Server Component specs."
    </p>
  </div>
  <p>
    This declarative structure allows vector search pipelines to match user query embeddings directly to your claim nodes, maximizing the probability of extraction during retrieval phases.
  </p>
</section>

<section id="eeat-verification" class="space-y-4">
  <h2>Topical Authority Verification</h2>
  <p>
    E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) is no longer a subjective guideline; it is a critical ranking factor in generative search. AI systems utilize entity extraction to check if the author of a document is a verified expert in that field.
  </p>
  <p>
    Linking your author bio to external authority indices (such as Google Scholar or LinkedIn) and including credentials in the schema markup helps the system resolve the creator\'s entity correctly, boosting the page\'s trustworthiness score.
  </p>
</section>
    `,
  },
  'entity-disambiguation': {
    topic: 'entity-disambiguation',
    title: 'Entity Disambiguation: Structuring Web Relationships',
    description: 'Master the principles of entity linking. Learn how to explicitly define terms and build relationships that search graphs and language models understand without ambiguity.',
    directAnswer: 'Entity disambiguation links terms to unique real-world concepts using Schema.org sameAs, explicit parent associations, and authoritative external references so search graphs and LLMs resolve meaning without ambiguity.',
    datePublished: '2026-04-10T09:00:00Z',
    dateModified: '2026-06-01T11:30:00Z',
    author: authors.alex,
    reviewer: reviewers.elena,
    citations: [
      { text: 'Schema.org Entity Disambiguation', url: 'https://schema.org/docs/datamodel.html' },
      { text: 'W3C RDF Semantic Linkage Guide', url: 'https://www.w3.org/TR/rdf11-concepts/' }
    ],
    toc: [
      { id: 'entity-disambiguation-concept', text: 'What is Entity Disambiguation?', depth: 2 },
      { id: 'why-llms-need-disambiguation', text: 'Why LLMs Need Semantic Linking', depth: 2 },
      { id: 'schema-implementation', text: 'Schema Implementation Strategies', depth: 2 },
    ],
    pageFaqs: [
      { question: 'Why does entity disambiguation matter for SEO?', answer: 'Disambiguation prevents search engines from conflating homonyms (e.g., React the library vs. a chemical reaction), improving correct indexing and rich-result eligibility.' },
    ],
    contentHtml: `
<section id="entity-disambiguation-concept" class="space-y-4">
  <h2>What is Entity Disambiguation?</h2>
  <p>
    <strong>Entity Disambiguation is the process of identifying unique real-world concepts (entities) in text and linking them to their correct definitions.</strong> For example, the term "React" can refer to a psychological state, a chemical process, or a JavaScript library. In web optimization, disambiguation ensures search bots link terms to their exact conceptual identities.
  </p>
  <p>
    Without clear entity mapping, search engines and LLM vector layers must rely on contextual heuristics, which increases the likelihood of classification errors.
  </p>
</section>

<section id="why-llms-need-disambiguation" class="space-y-4">
  <h2>Why LLMs Need Semantic Linking</h2>
  <p>
    Large Language Models encode knowledge inside multidimensional vector spaces. When an LLM retrieves information for a search query, it evaluates the relationships between query concepts and document entities.
  </p>
  <p>
    By explicitly linking key concepts in your articles to authoritative schemas (like <a href="https://schema.org" target="_blank" rel="noopener noreferrer">Schema.org</a> or Wikipedia), you assist the LLM in constructing accurate relationship edges, improving indexation accuracy.
  </p>
</section>

<section id="schema-implementation" class="space-y-4">
  <h2>Schema Implementation Strategies</h2>
  <p>
    To resolve entity ambiguity, implement these structural parameters in your pages:
  </p>
  <ul>
    <li><strong>SameAs Linking:</strong> Use the <code>sameAs</code> schema attribute inside entity definitions to point directly to authoritative, verified profiles.</li>
    <li><strong>Explicit Parent Associations:</strong> Connect sub-entities (like authors or articles) directly to parent elements (like publishers or websites) using unique ID hashes.</li>
    <li><strong>Authoritative External References:</strong> When discussing technical topics, link terms to their primary definitions on official documentation sites (like the <a href="https://www.w3.org" target="_blank" rel="noopener noreferrer">W3C</a>).</li>
  </ul>
</section>
    `,
  },
};

export function getGuide(topic: string): GuideContent | undefined {
  return mockGuides[topic];
}
