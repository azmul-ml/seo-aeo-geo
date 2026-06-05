import { getAggregateRating, getBrand, getCategory, getProduct, type Product } from './catalog';
import { mockArticles, mockFaqs, type Article } from './utils';
import { SITE_URL } from './seo';

export interface AiEntityPayload {
  url: string;
  type: 'article' | 'category' | 'product';
  title: string;
  summary: string;
  keyFacts: string[];
  faqs: { question: string; answer: string }[];
  structuredAttributes: Record<string, string | number | boolean | string[]>;
  pricing?: { amount: number; currency: string; availability: string };
  relatedEntities: { type: string; title: string; url: string }[];
  lastModified: string;
  publisher: string;
  citations?: { text: string; url: string }[];
}

function articleToPayload(article: Article): AiEntityPayload {
  return {
    url: `${SITE_URL}/blog/${article.slug}`,
    type: 'article',
    title: article.title,
    summary: article.description,
    keyFacts: article.facts?.map((f) => `${f.claim} (Source: ${f.source})`) ?? [],
    faqs: [],
    structuredAttributes: {
      category: article.category,
      tags: article.tags,
      author: article.author.name,
      readingTimeMinutes: article.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length / 225,
      peerReviewed: Boolean(article.reviewedBy),
    },
    relatedEntities: mockArticles
      .filter((a) => a.slug !== article.slug && a.category === article.category)
      .slice(0, 3)
      .map((a) => ({ type: 'article', title: a.title, url: `${SITE_URL}/blog/${a.slug}` })),
    lastModified: article.dateModified,
    publisher: 'TechKnowledge Hub',
    citations: article.citations,
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
      ...product.relatedArticleSlugs.map((slug) => {
        const a = mockArticles.find((x) => x.slug === slug);
        return a
          ? { type: 'article', title: a.title, url: `${SITE_URL}/blog/${a.slug}` }
          : null;
      }).filter(Boolean) as { type: string; title: string; url: string }[],
    ],
    lastModified: product.dateModified,
    publisher: 'TechKnowledge Hub',
  };
}

function categoryToPayload(category: NonNullable<ReturnType<typeof getCategory>>): AiEntityPayload {
  return {
    url: `${SITE_URL}/categories/${category.slug}`,
    type: 'category',
    title: category.name,
    summary: category.summary,
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
    '- Machine-readable API: /api/ai/articles/{slug}, /api/ai/products/{slug}, /api/ai/categories/{slug}',
    '',
    '## Key sections',
    `- Home: ${SITE_URL}/`,
    `- Blog: ${SITE_URL}/blog`,
    `- FAQ (AEO): ${SITE_URL}/faq`,
    `- Guides (GEO): ${SITE_URL}/guides/generative-engine-optimization`,
    `- How-To: ${SITE_URL}/how-to/nextjs-sitemap-generation`,
    `- Products: ${SITE_URL}/products/schema-validator-pro`,
    `- Categories: ${SITE_URL}/categories/seo-tools`,
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
    lines.push('', '## Products');
    for (const p of ['schema-validator-pro', 'answer-studio-geo', 'crawl-insight-suite']) {
      lines.push(`- ${p}: ${SITE_URL}/products/${p}`);
    }
    lines.push('', '## Categories');
    lines.push(`- SEO tools: ${SITE_URL}/categories/seo-tools`);
    lines.push(`- Content optimization: ${SITE_URL}/categories/content-optimization`);
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
