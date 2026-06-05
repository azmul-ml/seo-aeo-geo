# TechKnowledge Hub

A **Next.js 16** reference site that demonstrates end-to-end **SEO** (Search Engine Optimization), **AEO** (Answer Engine Optimization), and **GEO** (Generative Engine Optimization). It is a working template—not just documentation—showing how to build pages, metadata, structured data, and machine-readable exports so content ranks in traditional search, surfaces in answer engines, and gets cited by AI assistants.

**Stack:** Next.js 16 App Router · React 19 · Server Components (SSR/SSG) · Tailwind CSS 4 · TypeScript

---

## What are SEO, AEO, and GEO?

| Discipline | Goal | Primary surfaces |
|------------|------|------------------|
| **SEO** | Rank pages in organic search and earn rich results | Google, Bing, crawlers |
| **AEO** | Win featured snippets, People Also Ask, and voice/assistant answers | Google AI Overviews, Bing Copilot, Siri/Alexa-style queries |
| **GEO** | Be discoverable, parseable, and citable by LLMs and RAG pipelines | ChatGPT, Claude, Perplexity, Gemini, custom AI agents |

All three share a foundation—clear entities, trustworthy content, crawlable HTML, and explicit semantics—but each layer adds requirements. This project implements the shared base once, then layers AEO- and GEO-specific patterns on top.

---

## How this project covers SEO, AEO, and GEO

### SEO — technical and on-page search optimization

| Area | Implementation |
|------|----------------|
| **Metadata** | `constructMetadata()` in `lib/seo.ts` — title, description, canonical, Open Graph, Twitter cards, robots on every primary route |
| **Canonical URLs** | `CanonicalLink` component hoists `<link rel="canonical">` into `<head>` |
| **Structured data** | Server-rendered JSON-LD via `StructuredData` / `JsonLd` — Organization, WebSite, WebPage, BreadcrumbList, TechArticle, ItemList, Product, Offer, Review, and more |
| **Sitemaps** | Core `/sitemap.xml` plus segment sitemaps for blog, products, and categories, plus `/sitemap-images.xml` |
| **Robots** | `app/robots.ts` — crawl rules, sitemap index, Bingbot and AI-bot policies |
| **Static generation** | `generateStaticParams` on dynamic routes for pre-rendered, crawl-friendly HTML |
| **Semantic HTML** | `article`, `section`, `nav`, `aside`, `dl/dt/dd`, `table`, `figure` on content templates |
| **Internal linking** | Breadcrumbs, related entities, category/product graphs in `lib/catalog.ts` |
| **Trust signals** | About, contact, editorial policy, privacy, and terms pages with WebPage/Person schema |
| **Crawl budget** | `/search` is `noindex` and disallowed in robots |

### AEO — answer-ready content and schema

| Area | Implementation |
|------|----------------|
| **Direct answers** | `AnswerBlock` — concise, quotable answer paragraphs at the top of key pages |
| **Executive summaries** | `ContentSummary` — key takeaways and TL;DR blocks on articles and guides |
| **FAQ coverage** | `FAQ` / `FaqAccordion` + `FAQPage` JSON-LD on FAQ, product, category, brand, and blog pages |
| **How-to content** | `/how-to/[topic]` with `HowToSteps` and `HowTo` schema |
| **Question-shaped content** | Guides, buying guides on categories, product comparison tables |
| **E-E-A-T** | `AuthorCard`, reviewer attribution, citations on articles, editorial policy page |
| **Table of contents** | `TableOfContents` for long-form scanability and jump links |
| **Bing parity** | Explicit `Bingbot` allow rules for Copilot and Bing index alignment |

### GEO — generative engine and LLM citation readiness

| Area | Implementation |
|------|----------------|
| **llms.txt** | `/llms.txt` — concise site map for LLM crawlers; `/llms-full.txt` — full URL and FAQ index |
| **Machine-readable APIs** | `/api/ai/articles/[slug]`, `/api/ai/products/[slug]`, `/api/ai/categories/[slug]` — JSON exports for RAG pipelines |
| **Structured entity payloads** | `lib/ai-export.ts` — title, summary, keyFacts, FAQs, pricing, relatedEntities, citations, lastModified |
| **AI bot access** | `robots.ts` allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended, and others on `/api/ai/*` and llms files |
| **SSR-visible schema** | JSON-LD rendered in Server Components (not client-only) so bots see semantics in first HTML |
| **Entity graphs** | Products, categories, brands, and articles linked with `RelatedEntities` for context-rich citations |
| **Publisher identity** | Organization schema site-wide; publisher field on all AI export payloads |

---

## Readiness scores (audit baseline)

From the internal audit in `docs/AEO-READINESS-REPORT.md`:

| Dimension | Score |
|-----------|-------|
| Technical SEO | 92/100 |
| AEO readiness | 88/100 |
| Bing readiness | 85/100 |
| AI citation readiness | 86/100 |

---

## Site routes

| Route | SEO | AEO | GEO |
|-------|-----|-----|-----|
| `/` | WebPage schema, metadata | Answer blocks, featured content | llms.txt entry point |
| `/blog`, `/blog/[slug]` | TechArticle, ItemList | Summary, FAQ, citations, author | Article AI API |
| `/guides/[topic]` | Article schema | Structured guides | — |
| `/how-to/[topic]` | HowTo schema | Step-by-step answers | — |
| `/faq` | FAQPage schema | Accordion Q&A | Listed in llms-full.txt |
| `/products`, `/products/[slug]` | Product, Offer, Review | Specs, comparison, product FAQs | Product AI API |
| `/categories`, `/categories/[slug]` | CollectionPage, ItemList | Buying guides | Category AI API |
| `/brands/[slug]` | Organization, FAQ | Trust signals | — |
| `/about`, `/contact`, trust pages | WebPage, Person | Editorial transparency | — |
| `/search` | noindex (crawl protection) | — | — |

---

## Key files

```
lib/
  seo.ts          # Metadata helpers + JSON-LD generators
  catalog.ts      # Product, category, brand entities
  ai-export.ts    # llms.txt builders + AI API payloads
  utils.ts        # Articles, FAQs, how-to content
  page-schemas.ts # Per-page schema composition

components/
  StructuredData.tsx   # SSR JSON-LD injection
  AnswerBlock.tsx      # AEO direct-answer blocks
  ContentSummary.tsx   # Key takeaways
  FAQ.tsx / FaqAccordion.tsx
  Breadcrumbs.tsx      # BreadcrumbList schema
  AuthorCard.tsx         # E-E-A-T signals

app/
  robots.ts       # Crawl rules + sitemap index
  sitemap.ts      # Core sitemap
  llms.txt/       # LLM discovery
  api/ai/         # Machine-readable exports
```

---

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production configuration

Set your live domain before deploy:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Then build and start:

```bash
pnpm build
pnpm start
```

### Post-deploy checklist

1. Register the site in [Google Search Console](https://search.google.com/search-console) and [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Submit all sitemaps listed in `robots.ts`.
3. Validate structured data with [Google Rich Results Test](https://search.google.com/test/rich-results) and [Schema Markup Validator](https://validator.schema.org/).
4. Add real images under `public/images/` (OG, product, article).
5. Replace placeholder contact emails if going live.

---

## Machine-readable discovery

| Asset | URL | Purpose |
|-------|-----|---------|
| llms.txt | `/llms.txt` | Concise site map for LLM crawlers |
| llms-full.txt | `/llms-full.txt` | Full URL and FAQ index |
| Article API | `/api/ai/articles/[slug]` | JSON export for RAG pipelines |
| Product API | `/api/ai/products/[slug]` | Pricing, facts, FAQs, relations |
| Category API | `/api/ai/categories/[slug]` | Category summaries and products |

---

## Further documentation

- [`docs/AEO-GEO-IMPLEMENTATION.md`](docs/AEO-GEO-IMPLEMENTATION.md) — implementation guide and configuration
- [`docs/AEO-READINESS-REPORT.md`](docs/AEO-READINESS-REPORT.md) — audit scores, validation status, and prioritized recommendations

---

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
- [Schema.org](https://schema.org/) — structured data vocabulary
- [llms.txt convention](https://llmstxt.org/) — LLM site discovery
