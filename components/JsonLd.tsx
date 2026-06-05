import { CanonicalLink } from './CanonicalLink';
import { StructuredData } from './StructuredData';

interface JsonLdProps {
  schemas: Record<string, unknown>[];
  /** Canonical path for this page (hoisted to <head>). */
  canonicalPath: string;
}

/**
 * Page-level canonical URL and JSON-LD scripts.
 * Site-wide schema lives in the single root layout <head>.
 */
export function JsonLd({ schemas, canonicalPath }: JsonLdProps) {
  const entries = schemas.filter(Boolean);

  return (
    <>
      <CanonicalLink path={canonicalPath} />
      {entries.map((schema, index) => (
        <StructuredData key={index} schema={schema} />
      ))}
    </>
  );
}
