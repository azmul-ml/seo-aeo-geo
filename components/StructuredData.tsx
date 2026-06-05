import { serializeJsonLd } from '@/lib/json-ld';

interface StructuredDataProps {
  schema: Record<string, unknown>;
}

/**
 * Renders a JSON-LD script tag. Global schemas use the root layout `<head>`;
 * page-level schemas use `<JsonLd />` at the top of the page (valid in body per Google).
 */
export function StructuredData({ schema }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
    />
  );
}

export default StructuredData;
