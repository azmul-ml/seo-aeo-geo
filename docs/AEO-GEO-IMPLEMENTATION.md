# AEO / GEO Implementation Guide

This document describes technical optimizations added to TechKnowledge Hub for AI citation readiness.

## Configuration

Set your production domain before deploy:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Machine-readable discovery

| Asset | URL | Purpose |
|-------|-----|---------|
| llms.txt | `/llms.txt` | Concise site map for LLM crawlers |
| llms-full.txt | `/llms-full.txt` | Full URL and FAQ index |
| Article API | `/api/ai/articles/[slug]` | JSON export for RAG pipelines |
| Product API | `/api/ai/products/[slug]` | Pricing, facts, FAQs, relations |
| Category API | `/api/ai/categories/[slug]` | Category summaries and products |

## Structured data (`lib/seo.ts`)

Implemented generators: Organization, WebSite, WebPage, TechArticle/BlogPosting, FAQPage, HowTo, BreadcrumbList, Person, ItemList, Product, Offer, AggregateRating, Review, CollectionPage.

Injected via `components/StructuredData.tsx` in Server Components for SSR-visible JSON-LD.

## Sitemaps

| Sitemap | Path |
|---------|------|
| Core | `/sitemap.xml` |
| Blog | `/blog/sitemap.xml` |
| Products | `/products/sitemap.xml` |
| Categories | `/categories/sitemap.xml` |
| Images | `/sitemap-images.xml` |

Referenced collectively in `app/robots.ts`.

## Crawl rules

- `/search` disallowed (noindex + robots) to protect crawl budget
- `/api/ai/*` allowed for major AI user-agents
- Bingbot explicitly allowed for Copilot/ChatGPT Search/Bing index parity

## Content templates

- **Blog**: executive summary, key takeaways, per-article FAQ, citations, E-E-A-T authors
- **Products**: specs table, comparison, reviews, shipping/returns, Product schema
- **Categories**: overview, buying guide, related categories
- **Brands**: trust signals, popular products
- **Trust**: about, contact, editorial-policy, privacy, terms

## Key files

- `lib/seo.ts` — metadata + schema helpers
- `lib/catalog.ts` — product/category/brand entities
- `lib/ai-export.ts` — API and llms.txt builders
- `lib/utils.ts` — articles, FAQs, how-to content

See `docs/AEO-READINESS-REPORT.md` for scores and remaining recommendations.
