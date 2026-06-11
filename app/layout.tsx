import './globals.css';
import type { Metadata, Viewport } from 'next';
import { PwaRegister } from '@/components/PwaRegister';
import { SeoLink } from '@/components/SeoLink';
import { StructuredData } from '@/components/StructuredData';
import {
  generateWebsiteSchema,
  generateOrganizationSchema,
  SITE_URL,
  SITEMAP_URL,
  SITEMAP_URLS,
  LLMS_TXT_URL,
  LLMS_FULL_TXT_URL,
  MANIFEST_URL,
} from '@/lib/seo';

// 1. MetadataBase is required in Next.js for resolving absolute URLs for OpenGraph/Twitter images.
// Defines title templates so subpages automatically append "| TechKnowledge Hub"
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s | TechKnowledge Hub',
    default: 'TechKnowledge Hub | Mastering SEO, AEO, and GEO',
  },
  description: 'A comprehensive knowledge hub and blog demonstrating state-of-the-art Search Engine Optimization, Answer Engine Optimization, and Generative Engine Optimization.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'TechKnowledge Hub',
    images: [
      {
        url: '/images/default-og.svg',
        width: 1200,
        height: 630,
        alt: 'TechKnowledge Hub Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechKnowledge Hub',
    description: 'Learn Technical SEO, AEO, and GEO fundamentals.',
    images: ['/images/default-og.jpg'],
  },
  icons: {
    icon: [{ url: '/icon', type: 'image/png' }],
    apple: [{ url: '/apple-icon', sizes: '180x180', type: 'image/png' }],
  },
  appleWebApp: {
    capable: true,
    title: 'TechKnowledge',
    statusBarStyle: 'default',
  },
  applicationName: 'TechKnowledge Hub',
  ...(process.env.NEXT_PUBLIC_GOOGLE_VERIFY && {
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFY,
      ...(process.env.NEXT_PUBLIC_BING_VERIFY && {
        other: { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFY },
      }),
    },
  }),
  ...(!process.env.NEXT_PUBLIC_GOOGLE_VERIFY &&
    process.env.NEXT_PUBLIC_BING_VERIFY && {
      verification: {
        other: { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFY },
      },
    }),
};

// 2. Viewport API - Migrated out of metadata in Next.js 14+ to prevent render-blocking head parsing
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#4f46e5' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <link rel="manifest" href={MANIFEST_URL} />
        <link rel="sitemap" type="application/xml" title="Sitemap" href={SITEMAP_URL} />
        {SITEMAP_URLS.slice(1).map((href) => (
          <link
            key={href}
            rel="alternate"
            type="application/xml"
            title="Sitemap"
            href={href}
          />
        ))}
        <link rel="alternate" type="text/plain" title="LLMs.txt" href={LLMS_TXT_URL} />
        <link rel="alternate" type="text/plain" title="LLMs.txt (full index)" href={LLMS_FULL_TXT_URL} />
        <link rel="alternate" type="application/rss+xml" title="RSS Feed" href={`${SITE_URL}/feed.xml`} />
        <meta name="mobile-web-app-capable" content="yes" />
        <StructuredData schema={generateWebsiteSchema()} />
        <StructuredData schema={generateOrganizationSchema()} />
      </head>
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col antialiased">
        <PwaRegister />
        {/* Semantic Header */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex-shrink-0">
                <SeoLink href="/" className="flex items-center gap-2 font-black text-xl text-gradient">
                  TechKnowledge
                </SeoLink>
              </div>

              {/* Navigation Items */}
              <nav aria-label="Main navigation" className="hidden md:flex space-x-6 text-sm font-semibold text-slate-600">
                <SeoLink href="/" className="hover:text-indigo-600 transition-colors">Home</SeoLink>
                <SeoLink href="/blog" className="hover:text-indigo-600 transition-colors">Blog</SeoLink>
                <SeoLink href="/faq" className="hover:text-indigo-600 transition-colors">FAQ</SeoLink>
                <SeoLink href="/how-to/nextjs-sitemap-generation" className="hover:text-indigo-600 transition-colors">How-To</SeoLink>
                <SeoLink href="/guides/generative-engine-optimization" className="hover:text-indigo-600 transition-colors">GEO Guides</SeoLink>
                <SeoLink href="/products" className="hover:text-indigo-600 transition-colors">Products</SeoLink>
                <SeoLink href="/categories" className="hover:text-indigo-600 transition-colors">Categories</SeoLink>
                <SeoLink href="/about" className="hover:text-indigo-600 transition-colors">About</SeoLink>
                <SeoLink href="/contact" className="hover:text-indigo-600 transition-colors">Contact</SeoLink>
              </nav>

              {/* Search Shortcut & CTA */}
              <div className="flex items-center space-x-4">
                <SeoLink 
                  href="/search" 
                  className="p-2 text-slate-500 hover:text-indigo-600 transition-colors"
                  aria-label="Search articles"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </SeoLink>
                <SeoLink
                  href="/faq"
                  className="hidden sm:inline-block px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-lg shadow-xs"
                >
                  Search Optimization FAQ
                </SeoLink>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Semantic Footer */}
        <footer className="bg-slate-900 text-slate-400 py-12 mt-12 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Branding Section */}
              <div className="space-y-4">
                <h3 className="text-white font-extrabold text-lg">TechKnowledge Hub</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  A high-performance demonstration center highlighting modern organic crawl strategy, conversational direct answer frameworks, and LLM generative indexing parameters.
                </p>
              </div>

              {/* Hub links */}
              <div>
                <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">SEO/AEO Sections</h4>
                <ul className="space-y-2 text-sm">
                  <li><SeoLink href="/" className="hover:text-white transition-colors">Homepage</SeoLink></li>
                  <li><SeoLink href="/blog" className="hover:text-white transition-colors">Blog Archives</SeoLink></li>
                  <li><SeoLink href="/faq" className="hover:text-white transition-colors">FAQ Index (AEO)</SeoLink></li>
                  <li><SeoLink href="/about" className="hover:text-white transition-colors">E-E-A-T Profile (GEO)</SeoLink></li>
                </ul>
              </div>

              {/* Reference Standards */}
              <div>
                <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Specifications</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="https://schema.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Schema.org Vocabulary</a>
                  </li>
                  <li>
                    <a href="https://www.w3.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">W3C Living Standards</a>
                  </li>
                  <li>
                    <a href="https://developers.google.com/search" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Google Search Guidelines</a>
                  </li>
                </ul>
              </div>

              {/* Legal Info */}
              <div>
                <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Trust & Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li><SeoLink href="/contact" className="hover:text-white transition-colors">Contact</SeoLink></li>
                  <li><SeoLink href="/editorial-policy" className="hover:text-white transition-colors">Editorial Policy</SeoLink></li>
                  <li><SeoLink href="/privacy" className="hover:text-white transition-colors">Privacy Policy</SeoLink></li>
                  <li><SeoLink href="/terms" className="hover:text-white transition-colors">Terms of Service</SeoLink></li>
                  <li><a href="/llms.txt" className="hover:text-white transition-colors">llms.txt</a></li>
                </ul>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-12 pt-6 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span>&copy; {new Date().getFullYear()} TechKnowledge Hub. Built with Next.js App Router.</span>
              <div className="flex gap-4">
                <SeoLink href="/sitemap.xml" className="hover:text-slate-300">Sitemap</SeoLink>
                <SeoLink href="/blog/sitemap.xml" className="hover:text-slate-300">Blog Sitemap</SeoLink>
                <SeoLink href="/robots.txt" className="hover:text-slate-300">Robots</SeoLink>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}