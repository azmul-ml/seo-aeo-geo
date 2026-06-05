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

/** Content freshness signal for sitemaps (update when publishing). */
export const SITE_LAST_UPDATED = '2026-06-05T00:00:00Z';

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
  image = '/images/default-og.svg',
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
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
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
      title,
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
      url: `${SITE_URL}/images/logo.svg`,
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
  speakableSelectors?: string[];
}

export function generateWebPageSchema({
  id,
  name,
  description,
  isPartOfId,
  speakableSelectors,
}: WebPageSchemaProps) {
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
    ...(speakableSelectors &&
      speakableSelectors.length > 0 && {
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: speakableSelectors,
        },
      }),
  };
}

/**
 * 4. Article Schema
 * Critically important for Blog posts/guides. GEO engines rely on verified author profiles (EEAT),
 * dates (freshness), and publisher associations.
 */
export interface ArticleSchemaProps {
  slug: string;
  path?: string;
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  authorBio?: string;
  authorCredentials?: string[];
  authorSameAs?: string[];
  reviewedByName?: string;
  reviewedByBio?: string;
}

export function generateArticleSchema({
  slug,
  path,
  title,
  description,
  image,
  datePublished,
  dateModified,
  authorName,
  authorBio,
  authorCredentials,
  authorSameAs,
  reviewedByName,
  reviewedByBio,
}: ArticleSchemaProps) {
  const articlePath = path ?? `/blog/${slug}`;
  const articleUrl = `${SITE_URL}${articlePath.startsWith('/') ? articlePath : `/${articlePath}`}`;
  const authorId = `${SITE_URL}/about/#${authorName.toLowerCase().replace(/\s+/g, '-')}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
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
      ...(authorSameAs &&
        authorSameAs.length > 0 && {
          sameAs: authorSameAs,
        }),
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
  topic?: string;
  steps: HowToStep[];
  estimatedTimeMinutes: number;
  tools?: string[];
  supplies?: string[];
}

export function generateHowToSchema({
  name,
  description,
  topic,
  steps,
  estimatedTimeMinutes,
  tools = [],
  supplies = [],
}: HowToSchemaProps) {
  const basePath = topic ? `/how-to/${topic}` : '/how-to';

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
      url: step.url || `${SITE_URL}${basePath}#step-${idx + 1}`,
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

export function generateContactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${SITE_URL}/contact/#contactpage`,
    url: `${SITE_URL}/contact`,
    name: 'Contact TechKnowledge Hub',
    description: 'Contact editorial, support, and partnerships.',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    mainEntity: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
    },
  };
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
  shippingInfo?: string;
  returnPolicy?: string;
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
  shippingInfo,
  returnPolicy,
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
      itemCondition: 'https://schema.org/NewCondition',
      priceValidUntil: '2027-12-31',
      seller: { '@id': `${SITE_URL}/#organization` },
      ...(shippingInfo && {
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'US' },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 0, unitCode: 'DAY' },
            transitTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 0, unitCode: 'DAY' },
          },
          description: shippingInfo,
        },
      }),
      ...(returnPolicy && {
        hasMerchantReturnPolicy: {
          '@type': 'MerchantReturnPolicy',
          applicableCountry: 'US',
          returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
          merchantReturnDays: 14,
          description: returnPolicy,
        },
      }),
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
