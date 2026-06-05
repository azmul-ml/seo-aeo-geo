import { getCanonicalUrl } from '@/lib/seo';

interface CanonicalLinkProps {
  /** Pathname and optional query, e.g. `/blog` or `/blog?page=2` */
  path: string;
}

/**
 * Per-page canonical URL. Next.js hoists this <link> into the document <head>.
 */
export function CanonicalLink({ path }: CanonicalLinkProps) {
  return <link rel="canonical" href={getCanonicalUrl(path)} />;
}
