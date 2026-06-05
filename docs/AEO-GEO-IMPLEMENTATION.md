# AEO / GEO Implementation Guide

Technical optimizations in TechKnowledge Hub for search, answer engines, and LLM citation.

## Configuration

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
INDEXNOW_KEY=tkhub-indexnow-2026
NEXT_PUBLIC_BING_VERIFY=your-bing-token
NEXT_PUBLIC_GOOGLE_VERIFY=your-google-token
```

## Machine-readable discovery

| Asset | URL | Purpose |
|-------|-----|---------|
| llms.txt | `/llms.txt` | Concise site map for LLM crawlers |
| llms-full.txt | `/llms-full.txt` | Full dynamic URL and FAQ index |
| RSS | `/feed.xml` | Article feed |
| Article API | `/api/ai/articles/[slug]` | JSON export for RAG pipelines |
| Product API | `/api/ai/products/[slug]` | Pricing, facts, FAQs, relations |
| Category API | `/api/ai/categories/[slug]` | Category summaries and products |
| Guide API | `/api/ai/guides/[topic]` | GEO guide exports |
| How-To API | `/api/ai/how-to/[topic]` | Step-by-step exports |
| Brand API | `/api/ai/brands/[slug]` | Brand entity exports |
| IndexNow | `POST /api/indexnow` | Bing rapid URL notification |

## Structured data (`lib/seo.ts`)

Generators: Organization, WebSite, WebPage (with Speakable), TechArticle, FAQPage, HowTo, BreadcrumbList, Person, ItemList, Product, Offer, ContactPage, CollectionPage.

Injected via `components/StructuredData.tsx` and `components/JsonLd.tsx` in Server Components.

## Sitemaps

| Sitemap | Path |
|---------|------|
| Core | `/sitemap.xml` |
| Blog | `/blog/sitemap.xml` |
| Products | `/products/sitemap.xml` |
| Categories | `/categories/sitemap.xml` |
| Images | `/sitemap-images.xml` |

Referenced in `app/robots.ts`.

## Crawl rules

- `/search` and `/404` — noindex + robots disallow on search
- `/api/ai/*` — allowed for Bingbot and major AI user-agents
- llms.txt, llms-full.txt, feed.xml — allowed for AI bots

## Content templates

- **Blog**: AnswerBlock, executive summary, key takeaways, FAQ, citations, hero image, E-E-A-T authors
- **Guides**: AnswerBlock, ContentSummary, page FAQ, citations, Guide API link
- **How-To**: AnswerBlock, step anchors, HowTo schema, How-To API link
- **Products**: hero image, AnswerBlock, specs, comparison, reviews, complete Offer schema
- **Categories**: AnswerBlock, buying guide, related products
- **Trust**: about, contact (ContactPage schema), editorial-policy, privacy, terms

## Key files

- `lib/seo.ts` — metadata + schema helpers
- `lib/page-schemas.ts` — deduplicated per-page schema composition
- `lib/catalog.ts` — product/category/brand entities
- `lib/guides.ts` — GEO guide content
- `lib/ai-export.ts` — API and llms.txt builders
- `lib/ai-response.ts` — canonical headers for AI APIs
- `lib/indexnow.ts` — Bing IndexNow client
- `components/AnswerBlock.tsx` — AEO direct-answer blocks

See `docs/AEO-READINESS-REPORT.md` for 100/100 readiness scores.
