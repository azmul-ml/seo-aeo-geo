export interface Author {
  name: string;
  avatar: string;
  bio: string;
  credentials: string[];
  sameAs: string[];
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: Author;
  reviewedBy?: {
    name: string;
    bio: string;
    credentials: string[];
  };
  category: 'SEO' | 'AEO' | 'GEO';
  tags: string[];
  citations: { text: string; url: string }[];
  facts: { claim: string; source: string; url: string }[];
  executiveSummary?: string;
  keyTakeaways?: string[];
  pageFaqs?: { question: string; answer: string }[];
}

// Mock Authors showcasing E-E-A-T credentials for GEO
export const authors: Record<string, Author> = {
  alex: {
    name: 'Dr. Alex Johnson',
    avatar: '/images/avatars/alex.svg',
    bio: 'Dr. Alex Johnson is a search engineering specialist and former computational linguistics researcher at Stanford University. With over 15 years in search architecture, he advises enterprise firms on semantic search strategy.',
    credentials: ['Ph.D. in Computational Linguistics', 'Former Search Quality Evaluator', '15+ Years in Search Tech'],
    sameAs: ['https://twitter.com/dralexjohnson', 'https://linkedin.com/in/dralexjohnson', 'https://scholar.google.com/citations?user=alex123'],
  },
  sam: {
    name: 'Samantha Wilson',
    avatar: '/images/avatars/sam.svg',
    bio: 'Samantha Wilson is a voice user interface (VUI) designer and digital accessibility advocate. She specializes in AEO strategies, optimizing content structures for conversational systems and smart home assistants.',
    credentials: ['M.S. in Human-Computer Interaction', 'W3C Accessibility Working Group Contributor', 'Author of "Conversational Content Strategy"'],
    sameAs: ['https://twitter.com/samwilson_vui', 'https://linkedin.com/in/samwilson-vui'],
  },
  taylor: {
    name: 'Taylor Chen',
    avatar: '/images/avatars/taylor.svg',
    bio: 'Taylor Chen is a technology policy analyst and AI alignment researcher. Their focus is on how Large Language Models ingest web data, helping creators establish entity authority and verifiable factual signatures for LLM indexing.',
    credentials: ['B.S. in Computer Science (MIT)', 'Fellow at the Center for AI Safety', 'Editor at AI & Society Review'],
    sameAs: ['https://twitter.com/taylorchen_ai', 'https://linkedin.com/in/taylorchen-ai'],
  },
};

// Mock Reviewers to establish peer-review credibility (vital for GEO E-E-A-T signals)
export const reviewers = {
  elena: {
    name: 'Prof. Elena Rostova',
    bio: 'Professor of Information Sciences at MIT. Elena conducts research on knowledge representation systems and trustworthy search algorithms.',
    credentials: ['Professor of Information Sciences (MIT)', 'ACM Fellow'],
  },
};

// Detailed content optimized for SEO (semantic structure), AEO (direct answers), and GEO (factual references, entity citations)
export const mockArticles: Article[] = [
  {
    id: 1,
    title: 'Understanding Technical SEO Fundamentals in 2026',
    slug: 'seo-fundamentals-2026',
    description: 'Learn the core principles of Technical SEO that drive crawlability, page indexation, and search rankings in the modern App Router framework.',
    category: 'SEO',
    tags: ['Technical SEO', 'Next.js', 'Metadata', 'Structured Data'],
    image: '/images/seo-fundamentals.svg',
    datePublished: '2026-01-15T08:00:00Z',
    dateModified: '2026-05-20T10:30:00Z',
    author: authors.alex,
    reviewedBy: reviewers.elena,
    citations: [
      { text: 'W3C HTML Semantic Standards', url: 'https://www.w3.org/standards/' },
      { text: 'Schema.org Vocabulary Specification', url: 'https://schema.org/' },
      { text: 'Next.js Official Metadata Documentation', url: 'https://nextjs.org/docs/app/api-reference/functions/generate-metadata' }
    ],
    facts: [
      { claim: 'JSON-LD is Google\'s preferred format for structured data.', source: 'Google Search Central', url: 'https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data' },
      { claim: 'Proper viewport definitions prevent layout shift and optimize mobile-first indexing.', source: 'Web.dev Core Web Vitals', url: 'https://web.dev/vitals/' }
    ],
    executiveSummary:
      'Technical SEO in 2026 centers on server-rendered HTML, valid JSON-LD, dynamic sitemaps, and consistent canonical URLs—especially in Next.js App Router sites where metadata and viewport APIs are split for faster parsing.',
    keyTakeaways: [
      'Use JSON-LD for instant entity understanding without heavy JavaScript execution.',
      'Generate sitemaps and robots.txt at build time to notify crawlers of new routes.',
      'Set canonical URLs on every template to prevent duplicate indexation.',
    ],
    pageFaqs: [
      {
        question: 'Does Technical SEO still matter with AI search?',
        answer:
          'Yes. Crawlability, structured data, and page speed remain prerequisites for both traditional rankings and AI citation selection.',
      },
    ],
    content: `
<h2>What is Technical SEO?</h2>
<p>
  <strong>Technical SEO</strong> refers to website and server optimizations that help search engine spiders crawl and index your site more effectively, directly improving organic visibility. Unlike content marketing, technical SEO focuses on the structural foundation of your website.
</p>
<p>
  In modern web development, particularly when using React and Next.js, technical SEO undergoes a shift from client-side runtime configurations to build-time server rendering. Standardizing sitemaps, robots configurations, meta elements, and JSON-LD schema objects ensures crawlers digest page representations correctly.
</p>

<h3>Why Does Structured Data Matter?</h3>
<p>
  Search engines utilize bots (like Googlebot) to analyze pages. While modern crawlers can execute JavaScript, parsing dynamic rendering states is resource-heavy and slow. Providing structured markup in <strong>JSON-LD format</strong> allows bots to understand the page structure instantly without executing complex UI scripts.
</p>
<p>
  According to specifications from <a href="https://schema.org" target="_blank" rel="noopener noreferrer">Schema.org</a>, structuring entities allows engines to construct explicit links between authors, organizations, and articles, forming the backbone of rich snippets in search results.
</p>

<h3>Core Technical SEO Pillars in Next.js</h3>
<p>
  To achieve optimal indexation, ensure your framework satisfies these three pillars:
</p>
<ul>
  <li><strong>Server-Side Rendering (SSR):</strong> Delivers static, semantic HTML immediately, allowing search engine bots to crawl text elements without rendering delays.</li>
  <li><strong>Dynamic Sitemaps:</strong> Automatically registers newly generated routes using dynamic sitemap generators, notifying search engines instantly.</li>
  <li><strong>Canonical URLs:</strong> Prevents duplicate content issues by establishing a single authoritative URL for each unique page via metadata declarations.</li>
</ul>

<h3>Implementing Metadata base and Viewport</h3>
<p>
  In Next.js 16+, viewport definitions (such as <code>theme-color</code> and scale settings) have been migrated to the <code>viewport</code> configuration object. Separating viewport properties from the main metadata API ensures faster client-side parsing of critical display instructions.
</p>
    `,
  },
  {
    id: 2,
    title: 'How to Optimize for Answer Engine Optimization (AEO)',
    slug: 'aeo-optimization-guide',
    description: 'Discover practical strategies to structure your articles for conversational query engines, smart home devices, and featured snippets.',
    category: 'AEO',
    tags: ['AEO', 'Featured Snippets', 'Voice Search', 'FAQ Page'],
    image: '/images/aeo-guide.svg',
    datePublished: '2026-02-10T09:00:00Z',
    dateModified: '2026-06-01T14:15:00Z',
    author: authors.sam,
    citations: [
      { text: 'W3C Accessibility Guidelines (Conversational UI)', url: 'https://www.w3.org/WAI/' },
      { text: 'Google Featured Snippet Systems', url: 'https://developers.google.com/search/docs/appearance/featured-snippets' }
    ],
    facts: [
      { claim: 'Voice searches are typically longer, query-based, and highly conversational compared to desktop queries.', source: 'Internet Trends Report', url: 'https://www.gov.uk/' },
      { claim: 'Semantic details/summary elements improve accessibility and aid answer extractors.', source: 'W3C HTML Living Standard', url: 'https://html.spec.whatwg.org/' }
    ],
    executiveSummary:
      'AEO structures content so voice assistants and featured-snippet systems can extract a direct 40–60 word answer immediately after a question-style heading, using semantic HTML and FAQPage JSON-LD.',
    keyTakeaways: [
      'Place concise answers in the first two sentences under question headings.',
      'Use FAQPage schema and details/summary blocks for PAA eligibility.',
      'Write in conversational phrasing that mirrors spoken queries.',
    ],
    pageFaqs: [
      {
        question: 'What is a featured snippet?',
        answer:
          'A featured snippet is a direct answer block shown above organic results, often sourced from pages with clear Q&A structure and strong topical relevance.',
      },
    ],
    content: `
<h2>What is Answer Engine Optimization?</h2>
<p>
  <strong>Answer Engine Optimization (AEO)</strong> is the process of structuring web content so that AI-driven answer engines (such as Siri, Alexa, Google Assistant, and Copilot) can easily extract direct responses to conversational user queries.
</p>
<p>
  While traditional SEO aims to rank pages in lists of web links, AEO focuses on getting your content pulled as the single, direct answer—often referred to as "Position Zero" or a "Featured Snippet".
</p>

<h3>Designing Content for Featured Snippets</h3>
<p>
  To satisfy featured snippet algorithms, you must structure answers matching the user's intent format. Use the <strong>"Answer Paragraph"</strong> technique:
</p>
<dl class="bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded-r-md my-6">
  <dt class="font-semibold text-indigo-900">What is the optimal snippet length?</dt>
  <dd class="text-indigo-950 mt-1">
    The ideal length for a featured snippet answer is 40 to 60 words. Structure this definition directly below a question-based heading (H2 or H3). Keep the sentences clear, factual, and write using conversational syntax.
  </dd>
</dl>

<h3>The "People Also Ask" (PAA) Framework</h3>
<p>
  User search journeys are rarely linear. Search engines track related questions via PAA accordions. By embedding an FAQ block using <code>&lt;details&gt;</code> and <code>&lt;summary&gt;</code> semantic pairs and mapping them with <code>FAQPage</code> structured data, you provide clear, isolated text fragments optimized for answer engine parsing.
</p>

<h3>Voice Search Optimization</h3>
<p>
  Voice searches utilize conversational language. Users don't type "Technical SEO sitemap guide"; they ask, "How do I create a sitemap in Next.js?". Incorporating these exact question sentences in your subheadings and providing immediate, direct answers in the first two sentences of the response fulfills the primary criteria for voice search queries.
</p>
    `,
  },
  {
    id: 3,
    title: 'Generative Engine Optimization (GEO): Adapting to AI Search',
    slug: 'geo-future-of-search',
    description: 'Explore the mechanics of Generative Engine Optimization. Learn how to design content that AI-powered search engines and LLMs will cite, trust, and summarize.',
    category: 'GEO',
    tags: ['GEO', 'LLM Search', 'EEAT', 'AI Citation'],
    image: '/images/geo-guide.svg',
    datePublished: '2026-03-05T10:00:00Z',
    dateModified: '2026-05-28T16:45:00Z',
    author: authors.taylor,
    reviewedBy: reviewers.elena,
    citations: [
      { text: 'GEO Research Paper (Arxiv)', url: 'https://arxiv.org/abs/2311.09747' },
      { text: 'Google Search Quality Evaluator Guidelines', url: 'https://static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf' }
    ],
    facts: [
      { claim: 'Including authoritative citations can increase an article\'s visibility in generative search summaries by up to 30%.', source: 'GEO: Generative Engine Optimization Study', url: 'https://arxiv.org/abs/2311.09747' },
      { claim: 'Explicit entity descriptions improve LLM vector semantic linking.', source: 'Stanford NLP Group', url: 'https://nlp.stanford.edu/' }
    ],
    executiveSummary:
      'GEO optimizes pages for generative AI search by combining authoritative outbound citations, verifiable claim-and-source blocks, strong E-E-A-T author entities, and unique information gain that RAG systems prefer over duplicate summaries.',
    keyTakeaways: [
      'Cite primary sources (.gov, .edu, standards bodies) to reduce hallucination risk for AI engines.',
      'Use Person schema and verified sameAs links for authors and reviewers.',
      'Disambiguate entities with explicit definitions and authoritative links.',
    ],
    pageFaqs: [
      {
        question: 'How do LLMs choose which sites to cite?',
        answer:
          'They favor pages with high information density, verifiable facts, clear entity relationships, and trusted author signals that match the query embedding.',
      },
    ],
    content: `
<h2>What is Generative Engine Optimization?</h2>
<p>
  <strong>Generative Engine Optimization (GEO)</strong> is a new marketing framework aimed at optimizing content so it is selected, cited, and synthesized by generative AI search systems like Google\'s AI Overviews, Perplexity, OpenAI Search, and Gemini.
</p>
<p>
  Unlike traditional search where search bots index keyword metrics, LLM-based search models evaluate text based on information density, factual credibility, entity connections, and reference authority.
</p>

<h3>Key Pillars of Generative Optimization</h3>
<p>
  To rank within AI-synthesized responses, research indicates that content must satisfy these parameters:
</p>
<ol>
  <li><strong>Authoritative Citations:</strong> AI models are prone to hallucination. To prevent this, they prioritize quoting domains that cite reputable primary sources (like <code>.edu</code>, <code>.gov</code>, or established industry studies).</li>
  <li><strong>Information Gain:</strong> LLMs aggregate hundreds of identical articles. Your page must provide unique data points, expert quotes, or unique perspectives not found in common data sets.</li>
  <li><strong>Verifiable Factual Data:</strong> Stating assertions in a structured "Claim-and-Source" layout helps vector databases identify and retrieve factually anchored knowledge.</li>
</ol>

<h3>Strengthening E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)</h3>
<p>
  GEO engines use entity validation to ensure content authors are qualified. By nesting detailed <code>Person</code> schemas containing educational credentials, peer review references (<code>reviewedBy</code>), and social verifications, you build a verified profile that AI engines cross-reference against their internal training graphs.
</p>

<h3>Disambiguating Entities</h3>
<p>
  LLMs understand language through relationships between real-world concepts (entities). When mentioning technologies or methods, define them explicitly. Link key terms to authoritative definitions. For instance, clearly state: "We construct schemas using the <a href="https://schema.org" target="_blank">Schema.org</a> standard, verified by the World Wide Web Consortium (<a href="https://www.w3.org" target="_blank">W3C</a>)." This helps the LLM link your content accurately in its semantic vector space.
</p>
    `,
  },
];

// Mock FAQ Items for FAQ page (AEO)
export const mockFaqs = [
  {
    question: 'What is the main difference between SEO and AEO?',
    answer: 'SEO (Search Engine Optimization) focuses on ranking web pages in a list of organic links. AEO (Answer Engine Optimization) focuses on structuring content so conversational AI models and voice assistants can extract a single, direct, factual answer for the user.',
  },
  {
    question: 'How do you optimize an article for voice search?',
    answer: 'To optimize for voice search, write using natural, conversational language. Structure your content around question-based H2/H3 headings, and provide direct, concise responses (40-60 words) immediately in the first two sentences following the heading.',
  },
  {
    question: 'What does GEO stand for in digital marketing?',
    answer: 'GEO stands for Generative Engine Optimization. It is the practice of structuring and phrasing content so that Generative AI search portals (like Google AI Overviews and Perplexity) select, summarize, and cite your page as an authoritative source.',
  },
  {
    question: 'Why are JSON-LD schemas important for search optimization?',
    answer: 'JSON-LD structured data provides crawlers with direct semantic information about entities on your site (e.g. articles, authors, organizations). This eliminates the need for crawlers to execute complex JavaScript to deduce page concepts, improving indexation speed and eligibility for rich search snippets.',
  },
];

// Mock How-To Guides
export interface HowToGuide {
  topic: string;
  title: string;
  description: string;
  estimatedTimeMinutes: number;
  tools: string[];
  supplies: string[];
  steps: { name: string; text: string; image?: string }[];
}

export const mockHowToGuides: Record<string, HowToGuide> = {
  'nextjs-sitemap-generation': {
    topic: 'nextjs-sitemap-generation',
    title: 'How to Implement a Dynamic XML Sitemap in Next.js 16',
    description: 'A step-by-step tutorial to configure automatic sitemap index updates in Next.js App Router for crawl rate optimization.',
    estimatedTimeMinutes: 15,
    tools: ['Node.js (v18+)', 'Text Editor (VS Code)', 'Terminal'],
    supplies: ['Next.js project setup'],
    steps: [
      {
        name: 'Create the sitemap.ts file',
        text: 'In your Next.js App Router project, navigate to the `app/` root directory and create a new file named `sitemap.ts`. This is a special Next.js file convention that automatically handles sitemap requests.',
      },
      {
        name: 'Export the default sitemap function',
        text: 'Inside `sitemap.ts`, write and export a default async function that returns an array of objects representing sitemap entries. Each entry must contain `url` and optional `lastModified`, `changeFrequency`, and `priority` fields.',
      },
      {
        name: 'Integrate dynamic route database fetching',
        text: 'Import your database query client or fetch utility inside `sitemap.ts`. Fetch all active resource paths (like blog post slugs) and map them to full URL entries. Combine them with your static page URLs to return the complete sitemap array.',
      },
      {
        name: 'Build and verify sitemap generation',
        text: 'Run `npm run build` in your terminal. Next.js will compile the sitemap. During local development, open your browser and navigate to `http://localhost:3000/sitemap.xml` to verify the generated XML structure is correct and matches Google\'s standards.',
      },
    ],
  },
  'jsonld-schema-setup': {
    topic: 'jsonld-schema-setup',
    title: 'How to Add JSON-LD Structured Data to Next.js Components',
    description: 'Learn how to integrate valid Schema.org JSON-LD scripts inside Server Components for rich snippet eligibility.',
    estimatedTimeMinutes: 20,
    tools: ['Next.js Project', 'React 19', 'Schema Validator'],
    supplies: ['Schema.org vocabulary specs'],
    steps: [
      {
        name: 'Create a reusable StructuredData component',
        text: 'Create a new React Server Component named `StructuredData.tsx`. Define a TypeScript interface that accepts a schema object (e.g. WebSite, Article) as props.',
      },
      {
        name: 'Implement safe JSON injection',
        text: 'Inside your `StructuredData` component, return a `<script>` tag with `type="application/ld+json"`. Use `dangerouslySetInnerHTML` to inject the stringified schema safely. Since it is a Server Component, this resolves on the server, avoiding runtime JS overhead.',
      },
      {
        name: 'Import and generate schema in pages',
        text: 'In your page files (such as `app/blog/[slug]/page.tsx`), import the `StructuredData` component. Use schema generation helpers to construct the specific structured data for the page, passing it into the component props.',
      },
      {
        name: 'Validate with Rich Results Test tool',
        text: 'Deploy your page or copy the source HTML code. Paste it into Google\'s Rich Results Test tool or the Schema Markup Validator to verify that the JSON-LD is syntactically valid and fully parsed without warnings.',
      },
    ],
  },
};

// Reading Time Calculator (AEO/GEO signal for content depth and UX)
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 225; // Average adult reading speed
  const cleanText = text.replace(/<[^>]*>/g, ''); // Remove HTML tags
  const wordCount = cleanText.split(/\s+/).filter(Boolean).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Helper to format date for human display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
