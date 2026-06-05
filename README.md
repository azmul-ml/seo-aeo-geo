# TechKnowledge Hub

A **Next.js 16** reference site demonstrating complete **SEO** (Search Engine Optimization), **AEO** (Answer Engine Optimization), and **GEO** (Generative Engine Optimization). Every pattern is implemented in working code—not just documented—so you can study, copy, and adapt it.

**Stack:** Next.js 16 App Router · React 19 · Server Components (SSR/SSG) · Tailwind CSS 4 · TypeScript

---

## Readiness scores

| Dimension | Score |
|-----------|-------|
| Technical SEO | **100/100** |
| AEO readiness | **100/100** |
| Bing readiness | **100/100** |
| AI citation readiness (GEO) | **100/100** |

See [`docs/AEO-READINESS-REPORT.md`](docs/AEO-READINESS-REPORT.md) for the full audit.

---

## What are SEO, AEO, and GEO?

| Discipline | Goal | Primary surfaces |
|------------|------|------------------|
| **SEO** | Rank in organic search and earn rich results | Google, Bing, crawlers |
| **AEO** | Win featured snippets, PAA, and voice answers | Google AI Overviews, Bing Copilot, assistants |
| **GEO** | Be discoverable, parseable, and citable by LLMs | ChatGPT, Claude, Perplexity, RAG pipelines |

This project implements a shared foundation once, then layers AEO- and GEO-specific patterns on top.

---

## How this project covers SEO, AEO, and GEO

### SEO — technical and on-page search

| Area | Implementation |
|------|----------------|
| **Metadata** | `constructMetadata()` — title, description, `alternates.canonical`, Open Graph, Twitter, robots |
| **Canonical URLs** | Metadata API + `CanonicalLink` component |
| **OG images** | Dynamic `app/opengraph-image.tsx` + per-page images |
| **Favicon / icons** | `app/icon.tsx`, PWA manifest, apple-touch-icon |
| **Structured data** | SSR JSON-LD — Organization (layout), WebPage, TechArticle, FAQPage, HowTo, Product, Offer, BreadcrumbList, ContactPage |
| **Sitemaps** | Core + blog + products + categories + image sitemap |
| **Robots** | Multi-bot rules, crawl budget protection on `/search` |
| **404** | Custom `not-found.tsx` with noindex |
| **Duplicate content** | Blog filters/pagination noindex; canonical `/blog` |
| **RSS** | `/feed.xml` for feed discovery |
| **Images** | SVG assets in `public/images/`, rendered with `next/image` and alt text |
| **Freshness** | `SITE_LAST_UPDATED` on sitemaps; per-entity `dateModified` |
| **Verification** | Google/Bing meta tag hooks via env vars |

### AEO — answer-ready content and schema

| Area | Implementation |
|------|----------------|
| **Direct answers** | `AnswerBlock` on all key page types |
| **Voice search** | `SpeakableSpecification` on WebPage schema (`#direct-answer`) |
| **Summaries** | `ContentSummary` with executive summary and key takeaways |
| **FAQ** | `FaqAccordion` + `FAQPage` JSON-LD aligned with visible Q&A |
| **How-to** | Step anchors (`#step-N`) matching HowTo schema URLs |
| **Question-shaped content** | Guides, buying guides, product comparisons |
| **E-E-A-T** | `AuthorCard`, peer review, citations, editorial policy |

### GEO — LLM citation and machine-readable exports

| Area | Implementation |
|------|----------------|
| **llms.txt** | `/llms.txt` (summary) and `/llms-full.txt` (full dynamic index) |
| **AI APIs** | Six JSON export endpoints with enriched payloads |
| **Citation license** | Attribution policy in llms.txt and API responses |
| **Entity payloads** | title, summary, directAnswer, contentText, keyFacts, FAQs, pricing, relatedEntities, citations |
| **API headers** | Canonical `Link`, `Last-Modified`, `X-Content-Type-Options` |
| **AI bot access** | GPTBot, ClaudeBot, PerplexityBot, Google-Extended allowed on `/api/ai/*` and llms files |
| **Bingbot** | Same AI export access for Copilot/Bing index parity |
| **IndexNow** | `POST /api/indexnow` + key file for rapid Bing indexing |
| **SSR schema** | JSON-LD in Server Components (first HTML paint) |

---

## Site routes

| Route | SEO | AEO | GEO |
|-------|-----|-----|-----|
| `/` | WebPage, FAQ schema | AnswerBlock, FAQ accordion | llms.txt |
| `/blog`, `/blog/[slug]` | TechArticle, sitemap | AnswerBlock, FAQ, Speakable | Article API |
| `/guides/[topic]` | TechArticle | AnswerBlock, summary, FAQ | Guide API |
| `/how-to/[topic]` | HowTo schema | AnswerBlock, step anchors | How-To API |
| `/faq` | FAQPage | AnswerBlock, Speakable | llms-full.txt |
| `/products`, `/products/[slug]` | Product, Offer, Review | AnswerBlock, specs | Product API |
| `/categories`, `/categories/[slug]` | CollectionPage | AnswerBlock, buying guide | Category API |
| `/brands/[slug]` | WebPage, FAQ | Trust signals | Brand API |
| `/about`, `/contact`, trust | WebPage, Person, ContactPage | Editorial transparency | — |
| `/search`, `/404` | noindex | — | — |

---

## Machine-readable discovery

| Asset | URL | Purpose |
|-------|-----|---------|
| llms.txt | `/llms.txt` | Concise site map for LLM crawlers |
| llms-full.txt | `/llms-full.txt` | Full URL and FAQ index (dynamic) |
| RSS | `/feed.xml` | Article feed |
| Article API | `/api/ai/articles/[slug]` | JSON export for RAG |
| Product API | `/api/ai/products/[slug]` | Pricing, facts, FAQs |
| Category API | `/api/ai/categories/[slug]` | Category summaries |
| Guide API | `/api/ai/guides/[topic]` | GEO guide exports |
| How-To API | `/api/ai/how-to/[topic]` | Step-by-step exports |
| Brand API | `/api/ai/brands/[slug]` | Brand entity exports |
| IndexNow | `POST /api/indexnow` | Bing rapid URL notification |

---

## Key files

```
lib/
  seo.ts           # Metadata + JSON-LD generators (Speakable, ContactPage, Offer)
  page-schemas.ts  # Per-page schema composition (deduplicated)
  catalog.ts       # Product, category, brand entities
  guides.ts        # GEO guide content
  ai-export.ts     # llms.txt builders + AI API payloads
  ai-response.ts   # Canonical Link headers for AI APIs
  indexnow.ts      # Bing IndexNow client
  utils.ts         # Articles, FAQs, how-to content

components/
  AnswerBlock.tsx      # AEO direct-answer blocks (#direct-answer)
  ContentSummary.tsx   # Executive summaries
  FAQ.tsx / FaqAccordion.tsx
  StructuredData.tsx   # SSR JSON-LD injection

app/
  icon.tsx, opengraph-image.tsx  # Generated OG/favicon
  not-found.tsx                  # SEO-safe 404
  feed.xml/route.ts              # RSS
  robots.ts                      # Crawl rules + sitemap index
  api/ai/                        # Machine-readable exports
  api/indexnow/route.ts          # IndexNow submission
```

---

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Configuration

Copy `.env.example` to `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
INDEXNOW_KEY=tkhub-indexnow-2026
NEXT_PUBLIC_BING_VERIFY=your-bing-token
NEXT_PUBLIC_GOOGLE_VERIFY=your-google-token
```

Build and start:

```bash
pnpm build
pnpm start
```

### Post-deploy checklist

1. Register in [Google Search Console](https://search.google.com/search-console) and [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Submit all sitemaps from `robots.ts`.
3. Validate with [Google Rich Results Test](https://search.google.com/test/rich-results) and [Schema Markup Validator](https://validator.schema.org/).
4. Test AI exports: `/api/ai/articles/seo-fundamentals-2026`, `/llms-full.txt`.
5. Trigger IndexNow: `POST /api/indexnow` with `{ "urls": ["https://your-domain.com/"] }`.

---

## Further documentation

- [`docs/AEO-GEO-IMPLEMENTATION.md`](docs/AEO-GEO-IMPLEMENTATION.md) — implementation guide
- [`docs/AEO-READINESS-REPORT.md`](docs/AEO-READINESS-REPORT.md) — audit with 100/100 scores

---

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
- [Schema.org](https://schema.org/)
- [llms.txt convention](https://llmstxt.org/)
- [IndexNow protocol](https://www.indexnow.org/)
