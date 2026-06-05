import {
  brands,
  categories,
  getAggregateRating,
  getBrand,
  getCategory,
  getProduct,
  products,
  type Brand,
  type Product,
} from './catalog';
import { getGuide, mockGuides, type GuideContent } from './guides';
import { mockArticles, mockFaqs, mockHowToGuides, type Article, type HowToGuide } from './utils';
import { SITE_URL } from './seo';

export interface AiEntityPayload {
  url: string;
  type: 'article' | 'category' | 'product' | 'guide' | 'how-to' | 'brand';
  title: string;
  summary: string;
  directAnswer?: string;
  executiveSummary?: string;
  keyTakeaways?: string[];
  contentText?: string;
  keyFacts: string[];
  faqs: { question: string; answer: string }[];
  structuredAttributes: Record<string, string | number | boolean | string[]>;
  pricing?: { amount: number; currency: string; availability: string };
  relatedEntities: { type: string; title: string; url: string }[];
  lastModified: string;
  publisher: string;
  citations?: { text: string; url: string }[];
  license?: string;
}

const CITATION_LICENSE =
  'Content may be cited with attribution and a link to the canonical URL on TechKnowledge Hub.';

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function articleToPayload(article: Article): AiEntityPayload {
  return {
    url: `${SITE_URL}/blog/${article.slug}`,
    type: 'article',
    title: article.title,
    summary: article.description,
    executiveSummary: article.executiveSummary,
    keyTakeaways: article.keyTakeaways,
    contentText: stripHtml(article.content),
    keyFacts: article.facts?.map((f) => `${f.claim} (Source: ${f.source})`) ?? [],
    faqs: article.pageFaqs ?? [],
    structuredAttributes: {
      category: article.category,
      tags: article.tags,
      author: article.author.name,
      readingTimeMinutes: Math.ceil(stripHtml(article.content).split(/\s+/).filter(Boolean).length / 225),
      peerReviewed: Boolean(article.reviewedBy),
    },
    relatedEntities: mockArticles
      .filter((a) => a.slug !== article.slug && a.category === article.category)
      .slice(0, 3)
      .map((a) => ({ type: 'article', title: a.title, url: `${SITE_URL}/blog/${a.slug}` })),
    lastModified: article.dateModified,
    publisher: 'TechKnowledge Hub',
    citations: article.citations,
    license: CITATION_LICENSE,
  };
}

function productToPayload(product: Product): AiEntityPayload {
  const rating = getAggregateRating(product);
  const brand = getBrand(product.brandSlug);
  const category = getCategory(product.categorySlug);

  return {
    url: `${SITE_URL}/products/${product.slug}`,
    type: 'product',
    title: product.name,
    summary: product.summary,
    contentText: product.description,
    keyFacts: [...product.keyFeatures, ...product.pros.map((p) => `Pro: ${p}`)],
    faqs: product.faqs,
    structuredAttributes: {
      sku: product.sku,
      brand: brand?.name ?? product.brandSlug,
      category: category?.name ?? product.categorySlug,
      specifications: JSON.stringify(product.specifications),
      useCases: product.useCases,
      ...(rating && {
        aggregateRating: rating.ratingValue,
        reviewCount: rating.reviewCount,
      }),
    },
    pricing: {
      amount: product.price,
      currency: product.currency,
      availability: product.availability,
    },
    relatedEntities: [
      ...product.relatedProductSlugs
        .map((slug) => getProduct(slug))
        .filter(Boolean)
        .map((p) => ({
          type: 'product',
          title: p!.name,
          url: `${SITE_URL}/products/${p!.slug}`,
        })),
      ...product.relatedArticleSlugs
        .map((slug) => {
          const a = mockArticles.find((x) => x.slug === slug);
          return a
            ? { type: 'article', title: a.title, url: `${SITE_URL}/blog/${a.slug}` }
            : null;
        })
        .filter(Boolean) as { type: string; title: string; url: string }[],
    ],
    lastModified: product.dateModified,
    publisher: 'TechKnowledge Hub',
    license: CITATION_LICENSE,
  };
}

function categoryToPayload(category: NonNullable<ReturnType<typeof getCategory>>): AiEntityPayload {
  return {
    url: `${SITE_URL}/categories/${category.slug}`,
    type: 'category',
    title: category.name,
    summary: category.summary,
    contentText: `${category.overview} ${category.buyingGuide}`,
    keyFacts: [category.overview, category.buyingGuide],
    faqs: category.faqs,
    structuredAttributes: {
      productCount: category.productSlugs.length,
      relatedCategories: category.relatedCategorySlugs,
    },
    relatedEntities: category.productSlugs
      .map((slug) => getProduct(slug))
      .filter(Boolean)
      .map((p) => ({
        type: 'product',
        title: p!.name,
        url: `${SITE_URL}/products/${p!.slug}`,
      })),
    lastModified: category.dateModified,
    publisher: 'TechKnowledge Hub',
    license: CITATION_LICENSE,
  };
}

function guideToPayload(guide: GuideContent): AiEntityPayload {
  return {
    url: `${SITE_URL}/guides/${guide.topic}`,
    type: 'guide',
    title: guide.title,
    summary: guide.description,
    directAnswer: guide.directAnswer,
    contentText: stripHtml(guide.contentHtml),
    keyFacts: guide.citations.map((c) => c.text),
    faqs: guide.pageFaqs ?? [],
    structuredAttributes: {
      author: guide.author.name,
      reviewer: guide.reviewer.name,
      peerReviewed: true,
    },
    relatedEntities: Object.keys(mockGuides)
      .filter((t) => t !== guide.topic)
      .slice(0, 2)
      .map((t) => ({
        type: 'guide',
        title: mockGuides[t].title,
        url: `${SITE_URL}/guides/${t}`,
      })),
    lastModified: guide.dateModified,
    publisher: 'TechKnowledge Hub',
    citations: guide.citations,
    license: CITATION_LICENSE,
  };
}

function howToToPayload(guide: HowToGuide, topic: string): AiEntityPayload {
  return {
    url: `${SITE_URL}/how-to/${topic}`,
    type: 'how-to',
    title: guide.title,
    summary: guide.description,
    directAnswer: guide.steps[0]?.text,
    contentText: guide.steps.map((s, i) => `Step ${i + 1}: ${s.name} — ${s.text}`).join(' '),
    keyFacts: guide.tools,
    faqs: [
      {
        question: `How long does ${guide.title} take?`,
        answer: `Approximately ${guide.estimatedTimeMinutes} minutes.`,
      },
    ],
    structuredAttributes: {
      estimatedTimeMinutes: guide.estimatedTimeMinutes,
      tools: guide.tools,
      supplies: guide.supplies,
      stepCount: guide.steps.length,
    },
    relatedEntities: Object.keys(mockHowToGuides)
      .filter((t) => t !== topic)
      .slice(0, 2)
      .map((t) => ({
        type: 'how-to',
        title: mockHowToGuides[t].title,
        url: `${SITE_URL}/how-to/${t}`,
      })),
    lastModified: '2026-06-01T08:00:00Z',
    publisher: 'TechKnowledge Hub',
    license: CITATION_LICENSE,
  };
}

function brandToPayload(brand: Brand): AiEntityPayload {
  return {
    url: `${SITE_URL}/brands/${brand.slug}`,
    type: 'brand',
    title: brand.name,
    summary: brand.summary,
    contentText: brand.overview,
    keyFacts: brand.trustSignals,
    faqs: brand.faqs,
    structuredAttributes: {
      productCount: brand.popularProductSlugs.length,
    },
    relatedEntities: brand.popularProductSlugs
      .map((slug) => getProduct(slug))
      .filter(Boolean)
      .map((p) => ({
        type: 'product',
        title: p!.name,
        url: `${SITE_URL}/products/${p!.slug}`,
      })),
    lastModified: brand.dateModified,
    publisher: 'TechKnowledge Hub',
    license: CITATION_LICENSE,
  };
}

export function exportArticle(slug: string): AiEntityPayload | null {
  const article = mockArticles.find((a) => a.slug === slug);
  return article ? articleToPayload(article) : null;
}

export function exportProduct(slug: string): AiEntityPayload | null {
  const product = getProduct(slug);
  return product ? productToPayload(product) : null;
}

export function exportCategory(slug: string): AiEntityPayload | null {
  const category = getCategory(slug);
  return category ? categoryToPayload(category) : null;
}

export function exportGuide(topic: string): AiEntityPayload | null {
  const guide = getGuide(topic);
  return guide ? guideToPayload(guide) : null;
}

export function exportHowTo(topic: string): AiEntityPayload | null {
  const guide = mockHowToGuides[topic];
  return guide ? howToToPayload(guide, topic) : null;
}

export function exportBrand(slug: string): AiEntityPayload | null {
  const brand = brands.find((b) => b.slug === slug);
  return brand ? brandToPayload(brand) : null;
}

export function buildLlmsTxtSummary(full = false): string {
  const lines: string[] = [
    '# TechKnowledge Hub',
    '',
    '> A citation-ready knowledge base for Technical SEO, Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO).',
    '',
    '## Site',
    `- Canonical: ${SITE_URL}`,
    '- Publisher: TechKnowledge Hub / TechKnowledge Labs',
    '- Contact: editorial@techknowledgehub.example.com',
    '- Citation: May cite with attribution and link to canonical URL',
    '- Machine-readable API: /api/ai/{articles|products|categories|guides|how-to|brands}/{slug}',
    '- RSS: /feed.xml',
    '',
    '## Key sections',
    `- Home: ${SITE_URL}/`,
    `- Blog: ${SITE_URL}/blog`,
    `- FAQ (AEO): ${SITE_URL}/faq`,
    `- Guides (GEO): ${SITE_URL}/guides/generative-engine-optimization`,
    `- How-To: ${SITE_URL}/how-to/nextjs-sitemap-generation`,
    `- Products: ${SITE_URL}/products`,
    `- Categories: ${SITE_URL}/categories`,
    `- Brands: ${SITE_URL}/brands/techknowledge-labs`,
    `- About / E-E-A-T: ${SITE_URL}/about`,
    `- Editorial policy: ${SITE_URL}/editorial-policy`,
    `- Privacy: ${SITE_URL}/privacy`,
    `- Terms: ${SITE_URL}/terms`,
    `- Contact: ${SITE_URL}/contact`,
    '',
    '## Policies',
    `- Editorial standards: ${SITE_URL}/editorial-policy`,
    `- Privacy: ${SITE_URL}/privacy`,
    `- Terms: ${SITE_URL}/terms`,
    `- Returns (products): see individual product pages`,
    '',
  ];

  if (full) {
    lines.push('## Articles');
    for (const a of mockArticles) {
      lines.push(`- ${a.title}: ${SITE_URL}/blog/${a.slug}`);
    }
    lines.push('', '## Guides');
    for (const g of Object.values(mockGuides)) {
      lines.push(`- ${g.title}: ${SITE_URL}/guides/${g.topic}`);
    }
    lines.push('', '## How-To');
    for (const [topic, g] of Object.entries(mockHowToGuides)) {
      lines.push(`- ${g.title}: ${SITE_URL}/how-to/${topic}`);
    }
    lines.push('', '## Products');
    for (const p of products) {
      lines.push(`- ${p.name}: ${SITE_URL}/products/${p.slug}`);
    }
    lines.push('', '## Categories');
    for (const c of categories) {
      lines.push(`- ${c.name}: ${SITE_URL}/categories/${c.slug}`);
    }
    lines.push('', '## Brands');
    for (const b of brands) {
      lines.push(`- ${b.name}: ${SITE_URL}/brands/${b.slug}`);
    }
    lines.push('', '## Global FAQs');
    for (const f of mockFaqs) {
      lines.push(`- Q: ${f.question}`);
      lines.push(`  A: ${f.answer}`);
    }
  } else {
    lines.push('## Note');
    lines.push('For the full URL and FAQ index, see /llms-full.txt');
  }

  return lines.join('\n');
}
