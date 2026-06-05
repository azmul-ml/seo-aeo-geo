/**
 * Static generation — full HTML pre-rendered at build time for crawlers.
 * Use on all indexable content pages.
 */
export const dynamic = 'force-static';
export const revalidate = false;

/** Dynamic routes: only paths from generateStaticParams are served. */
export const dynamicParams = false;
