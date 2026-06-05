/**
 * SEO, AEO, and GEO schema and metadata helpers for Next.js 16+
 * 
 * WHY:
 * - Structured Data (JSON-LD) provides explicit clues to search engines (SEO), answers engine models (AEO), and LLMs (GEO)
 *   about the meaning of a page, its entities, and their relationships.
 * - Dynamic metadata helpers ensure proper Open Graph, Twitter cards, canonical tags, and title template formatting.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://techknowledgehub.example.com';
export const SITE_NAME = 'TechKnowledge Hub';

/** Primary XML sitemap (also listed in robots.txt). */
export const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

export const SITEMAP_URLS = [
  SITEMAP_URL,
  `${SITE_URL}/blog/sitemap.xml`,
  `${SITE_URL}/products/sitemap.xml`,
  `${SITE_URL}/categories/sitemap.xml`,
  `${SITE_URL}/sitemap-images.xml`,
] as const;

/** Machine-readable site summary for LLM crawlers (llms.txt convention). */
export const LLMS_TXT_URL = `${SITE_URL}/llms.txt`;
export const LLMS_FULL_TXT_URL = `${SITE_URL}/llms-full.txt`;

/** Web App Manifest (linked from <head> on every page). */
export const MANIFEST_URL = `${SITE_URL}/manifest.webmanifest`;

/** Absolute canonical URL for a pathname (and optional query string). */
export function getCanonicalUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path.replace(/\/$/, '') || path;
  }
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export interface MetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noIndex?: boolean;
}

/**
 * Helper to generate consistent metadata across pages
 * Improves SEO by defining Open Graph, Twitter cards, and canonical URLs
 */
export function constructMetadata({
  title,
  description,
  path,
  image = '/images/default-og.jpg',
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  noIndex = false,
}: MetadataOptions) {
  const canonicalUrl = getCanonicalUrl(path);
  const absoluteImageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  return {
    title,
    description,
    // Canonical <link> is rendered via <CanonicalLink path={...} /> (hoisted to <head>)
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type,
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors: authors || [SITE_NAME],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [absoluteImageUrl],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
      },
    },
  };
}

/**
 * 1. WebSite Schema
 * Crucial for establishing site identity and providing SearchAction for sitelinks searchbox.
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: 'A comprehensive knowledge base for technology, programming, and digital trends.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * 2. Organization Schema
 * Essential for GEO and Knowledge Graph inclusion. Connects the website to a verified entity
 * with social handles (sameAs) and contact parameters.
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/images/logo.png`,
      width: '180',
      height: '60',
    },
    sameAs: [
      'https://twitter.com/techknowledgehub',
      'https://github.com/techknowledgehub',
      'https://linkedin.com/company/techknowledgehub',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-0199',
      contactType: 'customer service',
      email: 'support@techknowledgehub.example.com',
      areaServed: 'US',
      availableLanguage: ['English'],
    },
  };
}

/**
 * 3. WebPage Schema
 * Standard metadata mapping for individual pages. Helps crawlers recognize structural inheritance.
 */
export interface WebPageSchemaProps {
  id: string;
  name: string;
  description: string;
  isPartOfId?: string;
}

export function generateWebPageSchema({ id, name, description, isPartOfId }: WebPageSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': id,
    url: id,
    name,
    description,
    isPartOf: {
      '@id': isPartOfId || `${SITE_URL}/#website`,
    },
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
  };
}

/**
 * 4. Article Schema
 * Critically important for Blog posts/guides. GEO engines rely on verified author profiles (EEAT),
 * dates (freshness), and publisher associations.
 */
export interface ArticleSchemaProps {
  slug: string;
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  authorBio?: string;
  authorCredentials?: string[];
  reviewedByName?: string;
  reviewedByBio?: string;
}

export function generateArticleSchema({
  slug,
  title,
  description,
  image,
  datePublished,
  dateModified,
  authorName,
  authorBio,
  authorCredentials,
  reviewedByName,
  reviewedByBio,
}: ArticleSchemaProps) {
  const articleUrl = `${SITE_URL}/blog/${slug}`;
  const authorId = `${SITE_URL}/about/#${authorName.toLowerCase().replace(/\s+/g, '-')}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle', // Specialized Article type to convey technical depth for GEO
    '@id': `${articleUrl}/#article`,
    isPartOf: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    headline: title,
    description,
    image: image.startsWith('http') ? image : `${SITE_URL}${image}`,
    datePublished,
    dateModified,
    mainEntityOfPage: articleUrl,
    author: {
      '@type': 'Person',
      '@id': authorId,
      name: authorName,
      description: authorBio || 'Expert technology writer and developer.',
      jobTitle: authorCredentials?.[0] || 'Technical Specialist',
      sameAs: [
        `https://twitter.com/${authorName.toLowerCase().replace(/\s+/g, '')}`,
        `https://linkedin.com/in/${authorName.toLowerCase().replace(/\s+/g, '')}`,
      ],
    },
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    ...(reviewedByName && {
      reviewedBy: {
        '@type': 'Person',
        name: reviewedByName,
        description: reviewedByBio || 'Certified expert and reviewer.',
      },
    }),
  };
}

/**
 * 5. FAQPage Schema
 * Standard structured data for AEO. Helps trigger rich snippets in SERP (People Also Ask).
 */
export interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/**
 * 6. HowTo Schema
 * Renders instructional sequence steps for AEO search query templates.
 */
export interface HowToStep {
  name: string;
  text: string;
  image?: string;
  url?: string;
}

export interface HowToSchemaProps {
  name: string;
  description: string;
  steps: HowToStep[];
  estimatedTimeMinutes: number;
  tools?: string[];
  supplies?: string[];
}

export function generateHowToSchema({
  name,
  description,
  steps,
  estimatedTimeMinutes,
  tools = [],
  supplies = [],
}: HowToSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0',
    },
    totalTime: `PT${estimatedTimeMinutes}M`,
    ...(tools.length > 0 && {
      tool: tools.map((t) => ({ '@type': 'HowToTool', name: t })),
    }),
    ...(supplies.length > 0 && {
      supply: supplies.map((s) => ({ '@type': 'HowToSupply', name: s })),
    }),
    step: steps.map((step, idx) => ({
      '@type': 'HowToStep',
      name: step.name,
      text: step.text,
      url: step.url || `${SITE_URL}/how-to/#step-${idx + 1}`,
      ...(step.image && {
        image: step.image.startsWith('http') ? step.image : `${SITE_URL}${step.image}`,
      }),
    })),
  };
}

/**
 * 7. BreadcrumbList Schema
 * Optimizes internal linking layout signals and displays semantic path hierarchies on search engines.
 */
export interface BreadcrumbItem {
  name: string;
  item: string; // The URL of the page (relative or absolute)
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const isAbsolute = item.item.startsWith('http');
      const itemUrl = isAbsolute ? item.item : `${SITE_URL}${item.item}`;
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: itemUrl,
      };
    }),
  };
}

/** BlogPosting alias for article listings */
export function generateBlogPostingSchema(props: ArticleSchemaProps) {
  const base = generateArticleSchema(props);
  return { ...base, '@type': 'BlogPosting' };
}

export interface PersonSchemaProps {
  id: string;
  name: string;
  description?: string;
  jobTitle?: string;
  sameAs?: string[];
  image?: string;
}

export function generatePersonSchema({
  id,
  name,
  description,
  jobTitle,
  sameAs = [],
  image,
}: PersonSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': id,
    name,
    ...(description && { description }),
    ...(jobTitle && { jobTitle }),
    ...(image && { image: image.startsWith('http') ? image : `${SITE_URL}${image}` }),
    ...(sameAs.length > 0 && { sameAs }),
    worksFor: { '@id': `${SITE_URL}/#organization` },
  };
}

export interface ItemListEntry {
  name: string;
  url: string;
  description?: string;
}

export function generateItemListSchema(name: string, items: ItemListEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
      ...(item.description && { description: item.description }),
    })),
  };
}

export interface ProductSchemaProps {
  slug: string;
  name: string;
  description: string;
  image: string;
  sku: string;
  brandName: string;
  price: number;
  currency: string;
  availability: 'InStock' | 'OutOfStock' | 'PreOrder';
  ratingValue?: number;
  reviewCount?: number;
  reviews?: { author: string; datePublished: string; reviewBody: string; ratingValue: number }[];
}

export function generateProductSchema({
  slug,
  name,
  description,
  image,
  sku,
  brandName,
  price,
  currency,
  availability,
  ratingValue,
  reviewCount,
  reviews = [],
}: ProductSchemaProps) {
  const productUrl = `${SITE_URL}/products/${slug}`;
  const availabilityMap = {
    InStock: 'https://schema.org/InStock',
    OutOfStock: 'https://schema.org/OutOfStock',
    PreOrder: 'https://schema.org/PreOrder',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${productUrl}/#product`,
    name,
    description,
    sku,
    image: image.startsWith('http') ? image : `${SITE_URL}${image}`,
    url: productUrl,
    brand: { '@type': 'Brand', name: brandName },
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: currency,
      price: price.toFixed(2),
      availability: availabilityMap[availability],
      seller: { '@id': `${SITE_URL}/#organization` },
    },
    ...(ratingValue &&
      reviewCount && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue,
          reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
      }),
    ...(reviews.length > 0 && {
      review: reviews.map((r) => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: r.author },
        datePublished: r.datePublished,
        reviewBody: r.reviewBody,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: r.ratingValue,
          bestRating: 5,
          worstRating: 1,
        },
      })),
    }),
  };
}

export interface CollectionPageSchemaProps {
  id: string;
  name: string;
  description: string;
}

export function generateCollectionPageSchema({ id, name, description }: CollectionPageSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': id,
    url: id,
    name,
    description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}
