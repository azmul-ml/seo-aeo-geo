import type { Article, HowToGuide } from './utils';
import { mockFaqs } from './utils';
import {
  type ArticleSchemaProps,
  type FAQItem,
  type HowToSchemaProps,
  generateArticleSchema,
  generateBlogPostingSchema,
  generateCollectionPageSchema,
  generateFAQSchema,
  generateHowToSchema,
  generateItemListSchema,
  generateOrganizationSchema,
  generatePersonSchema,
  generateProductSchema,
  generateWebPageSchema,
  SITE_URL,
} from './seo';
import type { Author } from './utils';
import type { Product } from './catalog';
import { getAggregateRating, getBrand } from './catalog';

type Schema = Record<string, unknown>;

function compact(schemas: (Schema | null | undefined)[]): Schema[] {
  return schemas.filter((s): s is Schema => Boolean(s));
}

export function organizationSchema(): Schema {
  return generateOrganizationSchema();
}

export function webPageSchema(path: string, name: string, description: string): Schema {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return generateWebPageSchema({
    id: `${SITE_URL}${normalized}`,
    name,
    description,
  });
}

export function faqSchemas(items: FAQItem[]): Schema[] {
  if (!items.length) return [];
  return [generateFAQSchema(items)];
}

export function articleSchemas(props: ArticleSchemaProps): Schema[] {
  return [generateArticleSchema(props), generateBlogPostingSchema(props)];
}

export function howToSchemas(props: HowToSchemaProps): Schema[] {
  return [generateHowToSchema(props)];
}

function articlePropsFromArticle(article: Article): ArticleSchemaProps {
  return {
    slug: article.slug,
    title: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    authorName: article.author.name,
    authorBio: article.author.bio,
    authorCredentials: article.author.credentials,
    reviewedByName: article.reviewedBy?.name,
    reviewedByBio: article.reviewedBy?.bio,
  };
}

const faqPageDefinitions: FAQItem[] = [
  {
    question: 'What is Answer Engine Optimization (AEO)?',
    answer:
      'Answer Engine Optimization (AEO) is the practice of structuring and phrasing digital content so conversational systems and voice assistants can extract a direct answer to a user query.',
  },
  {
    question: 'What is Generative Engine Optimization (GEO)?',
    answer:
      'Generative Engine Optimization (GEO) is the strategy of structuring web information so LLM-powered search systems select and cite it in synthesized responses.',
  },
];

/** Default site FAQs for pages without dedicated FAQ content. */
export function siteFaqSubset(count = 2): FAQItem[] {
  return mockFaqs.slice(0, count);
}

export function schemasForHome(): Schema[] {
  return compact([
    organizationSchema(),
    webPageSchema('/', 'TechKnowledge Hub Homepage', 'SEO, AEO, and GEO knowledge hub.'),
    ...faqSchemas(mockFaqs),
  ]);
}

export function schemasForFaqPage(): Schema[] {
  return compact([
    organizationSchema(),
    webPageSchema('/faq', 'Search Optimization FAQ Hub', 'FAQ hub for SEO, AEO, and GEO.'),
    ...faqSchemas([...faqPageDefinitions, ...mockFaqs]),
  ]);
}

export function schemasForBlogPost(article: Article): Schema[] {
  const path = `/blog/${article.slug}`;
  const faqs = article.pageFaqs?.length ? article.pageFaqs : siteFaqSubset(2);

  return compact([
    organizationSchema(),
    webPageSchema(path, article.title, article.description),
    ...articleSchemas(articlePropsFromArticle(article)),
    ...faqSchemas(faqs),
  ]);
}

export function schemasForBlogIndex(description: string): Schema[] {
  return compact([
    organizationSchema(),
    webPageSchema('/blog', 'Article Library', description),
    ...faqSchemas(siteFaqSubset(3)),
  ]);
}

export function schemasForGuide(
  topic: string,
  title: string,
  description: string,
  articleProps: ArticleSchemaProps,
  extraFaqs: FAQItem[] = []
): Schema[] {
  const path = `/guides/${topic}`;
  return compact([
    organizationSchema(),
    webPageSchema(path, title, description),
    ...articleSchemas(articleProps),
    ...faqSchemas(extraFaqs.length ? extraFaqs : siteFaqSubset(2)),
  ]);
}

export function schemasForHowTo(guide: HowToGuide, topic: string): Schema[] {
  const path = `/how-to/${topic}`;
  const howToProps: HowToSchemaProps = {
    name: guide.title,
    description: guide.description,
    steps: guide.steps,
    estimatedTimeMinutes: guide.estimatedTimeMinutes,
    tools: guide.tools,
    supplies: guide.supplies,
  };

  const howToFaqs: FAQItem[] = [
    {
      question: `How long does it take to complete ${guide.title}?`,
      answer: `This guide takes approximately ${guide.estimatedTimeMinutes} minutes to complete.`,
    },
    {
      question: `What tools do I need for ${guide.title}?`,
      answer:
        guide.tools.length > 0
          ? `You will need: ${guide.tools.join(', ')}.`
          : 'See the prerequisites section in the guide.',
    },
  ];

  return compact([
    organizationSchema(),
    webPageSchema(path, guide.title, guide.description),
    ...howToSchemas(howToProps),
    ...articleSchemas({
      slug: `how-to/${topic}`,
      title: guide.title,
      description: guide.description,
      image: '/images/default-og.jpg',
      datePublished: '2026-01-01T08:00:00Z',
      dateModified: '2026-06-01T08:00:00Z',
      authorName: 'Dr. Alex Johnson',
      authorBio: 'Search engineering specialist and technical SEO author.',
      authorCredentials: ['Ph.D. in Computational Linguistics'],
    }),
    ...faqSchemas(howToFaqs),
  ]);
}

export function schemasForProduct(product: Product, slug: string): Schema[] {
  const path = `/products/${slug}`;
  const brand = getBrand(product.brandSlug);
  const rating = getAggregateRating(product);

  return compact([
    organizationSchema(),
    webPageSchema(path, product.name, product.summary),
    generateProductSchema({
      slug: product.slug,
      name: product.name,
      description: product.summary,
      image: product.image,
      sku: product.sku,
      brandName: brand?.name ?? product.brandSlug,
      price: product.price,
      currency: product.currency,
      availability: product.availability,
      ratingValue: rating?.ratingValue,
      reviewCount: rating?.reviewCount,
      reviews: product.reviews,
    }),
    ...articleSchemas({
      slug: `products/${slug}`,
      title: product.name,
      description: product.summary,
      image: product.image,
      datePublished: '2026-01-01T08:00:00Z',
      dateModified: product.dateModified,
      authorName: 'TechKnowledge Hub Editorial',
      authorBio: 'Product research and documentation team.',
      authorCredentials: ['Technical SEO specialists'],
    }),
    ...faqSchemas(product.faqs),
  ]);
}

export function schemasForCategory(
  slug: string,
  name: string,
  summary: string,
  faqs: FAQItem[],
  products: { name: string; url: string; description?: string }[] = []
): Schema[] {
  const path = `/categories/${slug}`;
  return compact([
    organizationSchema(),
    webPageSchema(path, name, summary),
    generateCollectionPageSchema({ id: `${SITE_URL}${path}`, name, description: summary }),
    ...faqSchemas(faqs),
    products.length > 0
      ? generateItemListSchema(`${name} Products`, products)
      : null,
  ]);
}

export function schemasForBrand(
  slug: string,
  name: string,
  summary: string,
  faqs: FAQItem[]
): Schema[] {
  const path = `/brands/${slug}`;
  return compact([
    {
      ...generateOrganizationSchema(),
      name,
      description: summary,
      url: `${SITE_URL}${path}`,
    },
    webPageSchema(path, name, summary),
    ...faqSchemas(faqs),
  ]);
}

export function schemasForTrustPage(
  path: string,
  name: string,
  description: string,
  faqs: FAQItem[] = siteFaqSubset(2)
): Schema[] {
  return compact([
    organizationSchema(),
    webPageSchema(path, name, description),
    ...faqSchemas(faqs),
  ]);
}

export function schemasForAbout(people: Author[]): Schema[] {
  return compact([
    organizationSchema(),
    webPageSchema(
      '/about',
      'About TechKnowledge Hub',
      'Editorial team credentials and organizational transparency.'
    ),
    ...faqSchemas(siteFaqSubset(2)),
    ...people.map((author) =>
      generatePersonSchema({
        id: `${SITE_URL}/about/#${author.name.toLowerCase().replace(/\s+/g, '-')}`,
        name: author.name,
        description: author.bio,
        jobTitle: author.credentials[0],
        sameAs: author.sameAs,
        image: author.avatar,
      })
    ),
  ]);
}

export function schemasForListing(
  path: string,
  name: string,
  description: string,
  listName: string,
  items: { name: string; url: string; description?: string }[]
): Schema[] {
  return compact([
    organizationSchema(),
    webPageSchema(path, name, description),
    generateCollectionPageSchema({ id: `${SITE_URL}${path}`, name, description }),
    generateItemListSchema(listName, items),
    ...faqSchemas(siteFaqSubset(2)),
  ]);
}
