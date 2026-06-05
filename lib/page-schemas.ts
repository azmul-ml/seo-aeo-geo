import type { Article, HowToGuide } from './utils';
import { mockFaqs } from './utils';
import type { GuideContent } from './guides';
import {
  type ArticleSchemaProps,
  type FAQItem,
  type HowToSchemaProps,
  generateArticleSchema,
  generateCollectionPageSchema,
  generateContactPageSchema,
  generateFAQSchema,
  generateHowToSchema,
  generateItemListSchema,
  generatePersonSchema,
  generateProductSchema,
  generateWebPageSchema,
  SITE_URL,
} from './seo';
import type { Author } from './utils';
import type { Product } from './catalog';
import { getAggregateRating, getBrand } from './catalog';

type Schema = Record<string, unknown>;

const SPEAKABLE = ['#direct-answer', '.speakable'];

function compact(schemas: (Schema | null | undefined)[]): Schema[] {
  return schemas.filter((s): s is Schema => Boolean(s));
}

export function webPageSchema(path: string, name: string, description: string, speakable = false): Schema {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return generateWebPageSchema({
    id: `${SITE_URL}${normalized}`,
    name,
    description,
    ...(speakable && { speakableSelectors: SPEAKABLE }),
  });
}

export function faqSchemas(items: FAQItem[]): Schema[] {
  if (!items.length) return [];
  return [generateFAQSchema(items)];
}

export function articleSchema(props: ArticleSchemaProps): Schema {
  return generateArticleSchema(props);
}

function articlePropsFromArticle(article: Article): ArticleSchemaProps {
  return {
    slug: article.slug,
    path: `/blog/${article.slug}`,
    title: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    authorName: article.author.name,
    authorBio: article.author.bio,
    authorCredentials: article.author.credentials,
    authorSameAs: article.author.sameAs,
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
    webPageSchema('/', 'TechKnowledge Hub Homepage', 'SEO, AEO, and GEO knowledge hub.', true),
    ...faqSchemas(siteFaqSubset(3)),
  ]);
}

export function schemasForFaqPage(): Schema[] {
  return compact([
    webPageSchema('/faq', 'Search Optimization FAQ Hub', 'FAQ hub for SEO, AEO, and GEO.', true),
    ...faqSchemas([...faqPageDefinitions, ...mockFaqs]),
  ]);
}

export function schemasForBlogPost(article: Article): Schema[] {
  const path = `/blog/${article.slug}`;
  const faqs = article.pageFaqs?.length ? article.pageFaqs : siteFaqSubset(2);

  return compact([
    webPageSchema(path, article.title, article.description, true),
    articleSchema(articlePropsFromArticle(article)),
    ...faqSchemas(faqs),
  ]);
}

export function schemasForBlogIndex(description: string): Schema[] {
  return compact([
    webPageSchema('/blog', 'Article Library', description),
    ...faqSchemas(siteFaqSubset(3)),
  ]);
}

export function schemasForGuide(guide: GuideContent, extraFaqs: FAQItem[] = []): Schema[] {
  const path = `/guides/${guide.topic}`;
  const faqs = extraFaqs.length ? extraFaqs : guide.pageFaqs?.length ? guide.pageFaqs : siteFaqSubset(2);

  return compact([
    webPageSchema(path, guide.title, guide.description, true),
    articleSchema({
      slug: guide.topic,
      path,
      title: guide.title,
      description: guide.description,
      image: '/images/default-og.svg',
      datePublished: guide.datePublished,
      dateModified: guide.dateModified,
      authorName: guide.author.name,
      authorBio: guide.author.bio,
      authorCredentials: guide.author.credentials,
      authorSameAs: guide.author.sameAs,
      reviewedByName: guide.reviewer.name,
      reviewedByBio: guide.reviewer.bio,
    }),
    ...faqSchemas(faqs),
  ]);
}

export function schemasForHowTo(guide: HowToGuide, topic: string): Schema[] {
  const path = `/how-to/${topic}`;
  const howToProps: HowToSchemaProps = {
    name: guide.title,
    description: guide.description,
    topic,
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
    webPageSchema(path, guide.title, guide.description, true),
    generateHowToSchema(howToProps),
    ...faqSchemas(howToFaqs),
  ]);
}

export function schemasForProduct(product: Product, slug: string): Schema[] {
  const path = `/products/${slug}`;
  const brand = getBrand(product.brandSlug);
  const rating = getAggregateRating(product);

  return compact([
    webPageSchema(path, product.name, product.summary, true),
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
      shippingInfo: product.shippingInfo,
      returnPolicy: product.returnPolicy,
      ratingValue: rating?.ratingValue,
      reviewCount: rating?.reviewCount,
      reviews: product.reviews,
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
    webPageSchema(path, name, summary, true),
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
    webPageSchema(path, name, summary, true),
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
    webPageSchema(path, name, description),
    ...faqSchemas(faqs),
  ]);
}

const contactFaqs: FAQItem[] = [
  {
    question: 'How do I contact TechKnowledge Hub?',
    answer:
      'Use the contact form on this page or email editorial@techknowledgehub.example.com for content corrections, support@techknowledgehub.example.com for product help, or partnerships@techknowledgehub.example.com for business inquiries.',
  },
  {
    question: 'How quickly does TechKnowledge Hub respond to inquiries?',
    answer:
      'Editorial and support teams aim to respond within 2 business days. Urgent factual corrections on published articles are prioritized within 24 hours.',
  },
  {
    question: 'Can I request a correction to an article?',
    answer:
      'Yes. Send the article URL, the specific claim, and your source to editorial@techknowledgehub.example.com. Corrections follow our editorial policy and are logged with a last-modified date.',
  },
];

export function schemasForContact(): Schema[] {
  return compact([
    webPageSchema('/contact', 'Contact TechKnowledge Hub', 'Contact editorial and support.', true),
    generateContactPageSchema(),
    ...faqSchemas(contactFaqs),
  ]);
}

export function schemasForAbout(people: Author[]): Schema[] {
  return compact([
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
    webPageSchema(path, name, description),
    generateCollectionPageSchema({ id: `${SITE_URL}${path}`, name, description }),
    generateItemListSchema(listName, items),
    ...faqSchemas(siteFaqSubset(2)),
  ]);
}
