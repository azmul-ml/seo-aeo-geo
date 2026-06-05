/**
 * Catalog entities for product, category, and brand pages (demo data).
 * Structured for AI extraction APIs and Product/Offer schema markup.
 */

export interface ProductReview {
  author: string;
  datePublished: string;
  reviewBody: string;
  ratingValue: number;
}

export interface Product {
  slug: string;
  name: string;
  brandSlug: string;
  categorySlug: string;
  summary: string;
  description: string;
  keyFeatures: string[];
  specifications: Record<string, string>;
  pros: string[];
  useCases: string[];
  faqs: { question: string; answer: string }[];
  reviews: ProductReview[];
  price: number;
  currency: string;
  availability: 'InStock' | 'OutOfStock' | 'PreOrder';
  sku: string;
  image: string;
  images: string[];
  shippingInfo: string;
  returnPolicy: string;
  dateModified: string;
  relatedProductSlugs: string[];
  relatedArticleSlugs: string[];
}

export interface Category {
  slug: string;
  name: string;
  summary: string;
  overview: string;
  buyingGuide: string;
  faqs: { question: string; answer: string }[];
  relatedCategorySlugs: string[];
  productSlugs: string[];
  dateModified: string;
}

export interface Brand {
  slug: string;
  name: string;
  summary: string;
  overview: string;
  trustSignals: string[];
  faqs: { question: string; answer: string }[];
  popularProductSlugs: string[];
  dateModified: string;
}

export const categories: Category[] = [
  {
    slug: 'seo-tools',
    name: 'SEO & Crawl Analysis Tools',
    summary:
      'Software and services for technical SEO audits, crawl simulation, structured data validation, and index monitoring.',
    overview:
      'This category covers platforms that help teams audit crawlability, validate JSON-LD, monitor Core Web Vitals, and align metadata with search engine guidelines. Tools here are commonly cited when answer engines explain technical SEO workflows.',
    buyingGuide:
      'Choose a tool with server-side rendering checks, automated schema validation, sitemap diffing, and Bing/Google index status APIs. Prefer vendors that export machine-readable audit reports for AI-assisted workflows.',
    faqs: [
      {
        question: 'What should I look for in an SEO crawl tool?',
        answer:
          'Look for JavaScript rendering support, canonical conflict detection, structured data validation, and integration with Search Console and Bing Webmaster Tools.',
      },
      {
        question: 'Are SEO tools useful for AEO and GEO?',
        answer:
          'Yes. The same crawl data that improves indexation also surfaces missing FAQ markup, weak author entities, and pages lacking citation-ready summaries.',
      },
    ],
    relatedCategorySlugs: ['content-optimization'],
    productSlugs: ['schema-validator-pro', 'crawl-insight-suite'],
    dateModified: '2026-06-01T12:00:00Z',
  },
  {
    slug: 'content-optimization',
    name: 'Content Optimization Platforms',
    summary:
      'Editorial and research tools for answer-first content, entity linking, and generative search citation readiness.',
    overview:
      'Platforms in this category help authors structure direct answers, claim-and-source blocks, executive summaries, and FAQ sections aligned with AEO and GEO best practices.',
    buyingGuide:
      'Prioritize tools that enforce heading hierarchy, surface missing E-E-A-T fields, and export JSON summaries for LLM ingestion pipelines.',
    faqs: [
      {
        question: 'How do content tools support GEO?',
        answer:
          'They encourage authoritative citations, author credential fields, and explicit entity definitions that generative engines use when selecting sources.',
      },
    ],
    relatedCategorySlugs: ['seo-tools'],
    productSlugs: ['answer-studio-geo'],
    dateModified: '2026-05-28T09:00:00Z',
  },
];

export const brands: Brand[] = [
  {
    slug: 'techknowledge-labs',
    name: 'TechKnowledge Labs',
    summary:
      'Research-driven software brand focused on search engineering, structured data tooling, and AI-citation-ready publishing workflows.',
    overview:
      'TechKnowledge Labs builds demonstration products and knowledge bases used to validate SEO, AEO, and GEO implementations in Next.js and edge-hosted environments.',
    trustSignals: [
      'Peer-reviewed editorial standards',
      'Transparent author credentials on all guides',
      'Open citation of primary sources (W3C, Schema.org, Google Search Central)',
      'Published editorial and privacy policies',
    ],
    faqs: [
      {
        question: 'Is TechKnowledge Labs affiliated with search engines?',
        answer:
          'No. TechKnowledge Labs is an independent educational and tooling brand. Guides cite official documentation from search providers but are not endorsed by them.',
      },
    ],
    popularProductSlugs: ['schema-validator-pro', 'answer-studio-geo', 'crawl-insight-suite'],
    dateModified: '2026-06-02T08:00:00Z',
  },
];

export const products: Product[] = [
  {
    slug: 'schema-validator-pro',
    name: 'Schema Validator Pro',
    brandSlug: 'techknowledge-labs',
    categorySlug: 'seo-tools',
    summary:
      'Schema Validator Pro audits JSON-LD across your site, flags rich-result eligibility issues, and exports machine-readable fix lists for engineering teams.',
    description:
      'A technical SEO product that crawls rendered HTML, extracts JSON-LD graphs, validates against Schema.org constraints, and maps issues to page templates. Designed for teams optimizing both traditional search and AI citation pipelines.',
    keyFeatures: [
      'Batch JSON-LD validation with Schema.org rules',
      'Article, FAQ, HowTo, and Product schema templates',
      'Bing and Google rich-result preview hints',
      'CI-friendly JSON export for AI remediation agents',
    ],
    specifications: {
      'Deployment': 'SaaS + API',
      'Integrations': 'Next.js, Vercel, GitHub Actions',
      'Schema types': '40+ including Product, FAQPage, HowTo',
      'API rate limit': '10,000 pages/day (Pro)',
    },
    pros: [
      'Catches duplicate @id conflicts before deploy',
      'Explains fixes in plain language for content teams',
      'Exports structured issues for LLM-assisted patching',
    ],
    useCases: [
      'Pre-launch structured data QA for marketing sites',
      'Monitoring schema regressions after CMS updates',
      'Preparing product pages for AI shopping and citation summaries',
    ],
    faqs: [
      {
        question: 'Does Schema Validator Pro support Product schema?',
        answer:
          'Yes. It validates Product, Offer, AggregateRating, and Review nodes and reports missing offer or availability fields.',
      },
    ],
    reviews: [
      {
        author: 'Morgan Lee',
        datePublished: '2026-04-12',
        reviewBody: 'Cut our rich-result errors by 80% in the first week. The JSON export plugs directly into our CI bots.',
        ratingValue: 5,
      },
      {
        author: 'Priya Nair',
        datePublished: '2026-05-02',
        reviewBody: 'Clear explanations for non-engineers. FAQ schema warnings were especially helpful for voice search projects.',
        ratingValue: 4,
      },
    ],
    price: 89,
    currency: 'USD',
    availability: 'InStock',
    sku: 'TK-SVP-001',
    image: '/images/products/schema-validator.jpg',
    images: ['/images/products/schema-validator.jpg'],
    shippingInfo: 'Digital license delivered instantly. No physical shipping.',
    returnPolicy: '14-day money-back guarantee on annual plans.',
    dateModified: '2026-06-01T10:00:00Z',
    relatedProductSlugs: ['crawl-insight-suite'],
    relatedArticleSlugs: ['seo-fundamentals-2026'],
  },
  {
    slug: 'answer-studio-geo',
    name: 'Answer Studio GEO',
    brandSlug: 'techknowledge-labs',
    categorySlug: 'content-optimization',
    summary:
      'Answer Studio GEO helps authors write citation-ready summaries, claim-and-source blocks, and FAQ sections tuned for generative search engines.',
    description:
      'An editorial workstation that scores pages for answer-first structure, E-E-A-T completeness, and outbound citation density. Exports `/api/ai`-compatible JSON summaries for RAG pipelines.',
    keyFeatures: [
      'Executive summary and key-takeaway templates',
      'Claim-and-source linting with authority hints',
      'Author and reviewer entity cards synced to Person schema',
      'One-click AI export JSON for articles and products',
    ],
    specifications: {
      'Deployment': 'Cloud editor + API',
      'Export formats': 'JSON, Markdown, llms.txt snippets',
      'Team seats': 'Unlimited on Enterprise',
    },
    pros: [
      'Aligns content structure with Perplexity and AI Overview patterns',
      'Reduces time to publish FAQPage-ready pages',
    ],
    useCases: [
      'GEO content refreshes for knowledge bases',
      'Building llms.txt and machine-readable site summaries',
    ],
    faqs: [
      {
        question: 'Can Answer Studio export data for custom AI endpoints?',
        answer:
          'Yes. It generates JSON payloads matching title, summary, key facts, FAQs, and related entities for ingestion by internal RAG systems.',
      },
    ],
    reviews: [
      {
        author: 'Jordan Ellis',
        datePublished: '2026-05-18',
        reviewBody: 'Our AI citation rate improved after standardizing summaries. The FAQ linter is excellent.',
        ratingValue: 5,
      },
    ],
    price: 129,
    currency: 'USD',
    availability: 'InStock',
    sku: 'TK-ASG-002',
    image: '/images/products/answer-studio.jpg',
    images: ['/images/products/answer-studio.jpg'],
    shippingInfo: 'Digital license. Instant activation.',
    returnPolicy: '30-day refund on first-time annual subscriptions.',
    dateModified: '2026-05-30T14:00:00Z',
    relatedProductSlugs: ['schema-validator-pro'],
    relatedArticleSlugs: ['geo-future-of-search', 'aeo-optimization-guide'],
  },
  {
    slug: 'crawl-insight-suite',
    name: 'Crawl Insight Suite',
    brandSlug: 'techknowledge-labs',
    categorySlug: 'seo-tools',
    summary:
      'Crawl Insight Suite simulates Googlebot and Bingbot rendering, compares canonical tags, and tracks indexation signals for SSR apps.',
    description:
      'Built for JavaScript-heavy sites, Crawl Insight Suite renders pages as major crawlers do, surfaces hydration delays, and validates canonical consistency—critical for Bing-powered AI search surfaces.',
    keyFeatures: [
      'Googlebot and Bingbot render profiles',
      'Canonical and hreflang diff reports',
      'Sitemap vs. live URL reconciliation',
      'TTFB and LCP regression alerts',
    ],
    specifications: {
      'Crawl depth': 'Up to 500k URLs',
      'Render engines': 'Chromium (bot profiles)',
      'Reports': 'HTML, JSON, CSV',
    },
    pros: ['Strong Bing parity checks', 'Highlights SSR pages ideal for AI extraction'],
    useCases: ['Next.js App Router sites', 'Bing Webmaster alignment before Copilot indexing'],
    faqs: [
      {
        question: 'Why is Bing simulation important for AI search?',
        answer:
          'ChatGPT Search, Copilot, and DuckDuckGo AI lean on Bing’s index. Bingbot render parity reduces invisible content risk for AI citations.',
      },
    ],
    reviews: [
      {
        author: 'Alex Kim',
        datePublished: '2026-03-22',
        reviewBody: 'Found canonical drift between www and apex that Google Search Console missed. Bing render view was the differentiator.',
        ratingValue: 5,
      },
    ],
    price: 149,
    currency: 'USD',
    availability: 'InStock',
    sku: 'TK-CIS-003',
    image: '/images/products/crawl-insight.jpg',
    images: ['/images/products/crawl-insight.jpg'],
    shippingInfo: 'Digital delivery.',
    returnPolicy: '14-day refund on monthly plans.',
    dateModified: '2026-06-02T11:00:00Z',
    relatedProductSlugs: ['schema-validator-pro'],
    relatedArticleSlugs: ['seo-fundamentals-2026'],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getBrand(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}

export function getAggregateRating(product: Product) {
  if (product.reviews.length === 0) return null;
  const sum = product.reviews.reduce((acc, r) => acc + r.ratingValue, 0);
  return {
    ratingValue: Math.round((sum / product.reviews.length) * 10) / 10,
    reviewCount: product.reviews.length,
  };
}
